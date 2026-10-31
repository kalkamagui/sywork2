// 원문 PDF 전문 검색: 사용자가 넣은 PDF에서 텍스트를 뽑아 이 PC 브라우저(IndexedDB)에 저장
// PDF 해석 라이브러리(pdf.js)는 가져올 때만 인터넷에서 불러오고, 검색은 오프라인으로 됩니다.
(function () {
  const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  const DB_NAME = "welfare-fulltext";
  let dbPromise;
  let cache = null; // [{ meta, pages: [text] }]

  function db() {
    dbPromise ||= new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const d = req.result;
        d.createObjectStore("docs", { keyPath: "id" }); // 메타 + 페이지 텍스트
        d.createObjectStore("files"); // 원본 PDF (원문 열기용)
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  async function tx(store, mode, fn) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const t = d.transaction(store, mode);
      const req = fn(t.objectStore(store));
      t.oncomplete = () => resolve(req && req.result);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("PDF 해석 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인하세요."));
      document.head.append(s);
    });
  }

  let pdfjsReady;
  function pdfjs() {
    pdfjsReady ||= (async () => {
      await loadScript(PDFJS + "pdf.min.js");
      const lib = window.pdfjsLib;
      // file:// 에서도 동작하도록 워커를 blob 주소로 띄움
      try {
        const code = await (await fetch(PDFJS + "pdf.worker.min.js")).text();
        lib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
      } catch (e) {
        lib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js";
      }
      return lib;
    })();
    pdfjsReady.catch(() => (pdfjsReady = null));
    return pdfjsReady;
  }

  function pageText(content) {
    let out = "";
    for (const it of content.items) {
      out += it.str;
      if (it.hasEOL) out += "\n";
    }
    return out.replace(/[ \t ]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  }

  // 검색어 글자 사이 공백을 허용 (PDF 추출 시 띄어쓰기가 흐트러지는 경우 대비)
  function looseRegex(term) {
    const chars = [...term.replace(/\s+/g, "")].map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(chars.join("\\s*"), "i");
  }

  window.FullText = {
    supported: typeof indexedDB !== "undefined",

    async list() {
      if (!cache) {
        const docs = (await tx("docs", "readonly", (s) => s.getAll())) || [];
        cache = docs.map(({ pages, ...meta }) => ({ meta, pages }));
      }
      return cache.map((c) => c.meta).sort((a, b) => a.title.localeCompare(b.title, "ko"));
    },

    // meta: { title, org, year, url }
    async add(file, meta, onProgress = () => {}) {
      const lib = await pdfjs();
      const data = await file.arrayBuffer();
      const pdf = await lib.getDocument({
        data: data.slice(0), cMapUrl: PDFJS + "cmaps/", cMapPacked: true,
      }).promise;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        pages.push(pageText(await page.getTextContent()));
        page.cleanup();
        onProgress(i, pdf.numPages);
      }
      await pdf.destroy();
      const chars = pages.reduce((n, p) => n + p.length, 0);
      if (chars < pdf.numPages * 5) throw new Error("글자를 거의 찾지 못했습니다. 스캔 이미지로 된 PDF는 검색할 수 없습니다.");
      const doc = {
        id: "ft-" + Date.now(), title: meta.title || file.name.replace(/\.pdf$/i, ""), org: meta.org || "",
        year: meta.year || "", url: meta.url || "", fileName: file.name, size: file.size,
        pageCount: pages.length, addedAt: App.ymd(new Date()), pages,
      };
      await tx("docs", "readwrite", (s) => s.put(doc));
      try {
        await tx("files", "readwrite", (s) => s.put(new Blob([data], { type: "application/pdf" }), doc.id));
      } catch (e) {
        doc.noFile = true; // 저장 공간이 부족하면 텍스트만 보관
        await tx("docs", "readwrite", (s) => s.put(doc));
      }
      const { pages: _, ...m } = doc;
      cache?.push({ meta: m, pages });
      return m;
    },

    async remove(id) {
      await tx("docs", "readwrite", (s) => s.delete(id));
      await tx("files", "readwrite", (s) => s.delete(id));
      if (cache) cache = cache.filter((c) => c.meta.id !== id);
    },

    // 모든 검색어가 같은 쪽에 있는 쪽을 찾음. 반환: [{ meta, page, snippet(html) , hits }]
    search(terms, limit = 200) {
      if (!cache || !terms.length) return [];
      const res = terms.map(looseRegex);
      const out = [];
      for (const { meta, pages } of cache) {
        for (let i = 0; i < pages.length; i++) {
          const text = pages[i];
          if (!res.every((r) => r.test(text))) continue;
          let hits = 0;
          for (const t of terms) hits += text.split(t).length - 1;
          out.push({ meta, page: i + 1, text, hits: hits || 1 });
        }
      }
      out.sort((a, b) => b.hits - a.hits);
      return out.slice(0, limit).map((r) => ({ ...r, snippet: snippet(r.text, res) }));
    },

    async open(id, page) {
      const blob = await tx("files", "readonly", (s) => s.get(id));
      if (!blob) return false;
      window.open(URL.createObjectURL(blob) + "#page=" + page, "_blank", "noopener");
      return true;
    },
  };

  function snippet(text, res, radius = 70) {
    const m = res[0].exec(text);
    const at = m ? m.index : 0;
    const start = Math.max(0, at - radius);
    const end = Math.min(text.length, at + (m ? m[0].length : 0) + radius * 2);
    let html = App.esc((start ? "…" : "") + text.slice(start, end).replace(/\s+/g, " ") + (end < text.length ? "…" : ""));
    for (const r of res) html = html.replace(new RegExp(r.source, "gi"), (s) => `<mark>${s}</mark>`);
    return html;
  }
})();
