// 모든 페이지 공통: 상단 메뉴, 숫자 포맷, 복사, 로컬 저장 도우미
(function () {
  const PAGES = [
    ["index.html", "홈"],
    ["docs.html", "참조문서 검색"],
    ["calc.html", "선정기준 계산"],
    ["checklist.html", "구비서류"],
    ["deadline.html", "기한 계산"],
    ["counsel.html", "상담기록"],
    ["templates.html", "안내문구"],
  ];
  const here = location.pathname.split("/").pop() || "index.html";
  const header = document.createElement("header");
  header.className = "topbar";
  header.innerHTML =
    '<div class="inner"><a class="brand" href="index.html">복지업무 <span>도우미</span></a><nav class="nav">' +
    PAGES.map(([href, name]) => `<a href="${href}"${href === here ? ' class="active"' : ""}>${name}</a>`).join("") +
    "</nav></div>";
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.innerHTML =
    "업무 참고용 도구입니다. 최종 판단은 해당 연도 사업안내·법령 원문과 시스템(행복이음) 결과를 기준으로 하세요.<br>" +
    "개인정보는 서버로 전송되지 않으며, 입력값은 이 PC의 브라우저 밖으로 나가지 않습니다.";
  document.body.append(footer);

  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  document.body.append(toastEl);
  let toastTimer;

  window.App = {
    won(n) {
      if (n == null || isNaN(n)) return "-";
      return Math.round(n).toLocaleString("ko-KR") + "원";
    },
    toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
    },
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.append(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      App.toast("복사했습니다");
    },
    load(key, fallback) {
      try {
        const v = localStorage.getItem("welfare:" + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    save(key, value) {
      try {
        localStorage.setItem("welfare:" + key, JSON.stringify(value));
      } catch (e) {}
    },
    esc(s) {
      return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },
    download(filename, text, type = "application/json") {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type }));
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },
    // YYYY-MM-DD (로컬 시간 기준)
    ymd(d) {
      const p = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    },
  };
})();
