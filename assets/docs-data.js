// 기본 참조문서 목록. 내 문서는 화면에서 추가하면 브라우저에 저장됩니다.
// category: 법령 | 지침·사업안내 | 신청·조회 | 기관·연계 | 서식·자료
window.DOC_CATALOG = [
  // 법령
  { title: "국민기초생활 보장법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/국민기초생활보장법", tags: ["기초생활", "생계급여", "의료급여", "주거급여", "교육급여", "수급자", "부양의무자", "이의신청"], desc: "급여 종류·선정기준·신청·조사·결정·이의신청 등 기초생활보장의 근거 법률" },
  { title: "기초연금법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/기초연금법", tags: ["기초연금", "노인", "선정기준액"], desc: "만 65세 이상 노인 기초연금 지급 대상·금액·신청" },
  { title: "긴급복지지원법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/긴급복지지원법", tags: ["긴급지원", "위기", "선지원", "사후조사"], desc: "위기상황 정의, 긴급지원 종류·기간, 사후조사·적정성 심사" },
  { title: "아동수당법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/아동수당법", tags: ["아동수당", "아동", "출산"], desc: "아동수당 지급 대상·신청·지급" },
  { title: "장애인복지법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/장애인복지법", tags: ["장애인", "장애등록", "장애정도", "장애수당"], desc: "장애인 등록·장애정도 심사·복지서비스" },
  { title: "장애인연금법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/장애인연금법", tags: ["장애인연금", "장애인"], desc: "중증장애인 장애인연금 지급 대상·금액" },
  { title: "한부모가족지원법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/한부모가족지원법", tags: ["한부모", "청소년한부모", "아동양육비"], desc: "한부모가족 지원 대상·복지급여" },
  { title: "사회보장급여의 이용·제공 및 수급권자 발굴에 관한 법률", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/LSW/lsSc.do?query=" + encodeURIComponent("사회보장급여의 이용"), tags: ["사회보장급여법", "신청", "조사", "확인조사", "발굴", "위기가구", "금융정보"], desc: "사회보장급여 신청·조사·결정 공통 절차, 위기가구 발굴, 지역사회보장협의체" },
  { title: "행정기본법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/행정기본법", tags: ["기간계산", "처분", "행정"], desc: "기간 계산(제6조) 등 행정 일반 원칙" },
  { title: "행정심판법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/행정심판법", tags: ["행정심판", "불복", "청구기간"], desc: "행정심판 청구기간·절차" },
  { title: "개인정보 보호법", org: "국가법령정보센터", category: "법령", url: "https://www.law.go.kr/법령/개인정보보호법", tags: ["개인정보", "동의", "제3자 제공"], desc: "상담·연계 시 개인정보 수집·제공 동의 근거" },

  // 지침·사업안내
  { title: "보건복지부 법령·자료 (사업안내 게시)", org: "보건복지부", category: "지침·사업안내", url: "https://www.mohw.go.kr", tags: ["사업안내", "지침", "국민기초생활보장사업안내", "기초연금", "긴급지원", "자활"], desc: "매년 초 '국민기초생활보장사업 안내', '긴급지원사업 안내', '기초연금 사업안내' 등이 게시됨. 정보 > 법령·자료 메뉴" },
  { title: "보건복지부 훈령·예규·고시·지침 게시판 (사업안내 PDF)", org: "보건복지부", category: "지침·사업안내", url: "https://www.mohw.go.kr/board.es?mid=a10409020000&bid=0026&act=list&keyField=TITLE&keyWord=" + encodeURIComponent("사업안내"), tags: ["사업안내", "지침", "기초연금", "장애인연금", "장애인복지", "아동분야", "자활", "긴급지원 고시", "PDF"], desc: "기초연금·장애인·아동분야·자활 사업안내 원문(PDF·HWPX)과 긴급지원 금액·위기사유 고시 게시" },
  { title: "성평등가족부 정책·사업 안내", org: "성평등가족부", category: "지침·사업안내", url: "https://www.mogef.go.kr", tags: ["성평등가족부", "여성가족부", "한부모", "청소년한부모", "아이돌봄", "가정폭력", "성폭력", "위기청소년", "학교 밖 청소년", "다문화가족"], desc: "한부모가족·아이돌봄·청소년·폭력피해자 지원 사업별 지원대상과 금액 안내 (구 여성가족부)" },
  { title: "여성긴급전화 1366", org: "성평등가족부", category: "기관·연계", url: "https://www.mogef.go.kr/sp/hrp/sp_hrp_f002.do", tags: ["1366", "가정폭력", "성폭력", "교제폭력", "긴급상담"], desc: "가정폭력·성폭력·교제폭력 피해 24시간 상담 및 보호시설 연계 (국번없이 1366)" },
  { title: "주거급여 사업안내 (국토교통부)", org: "국토교통부", category: "지침·사업안내", url: "https://www.molit.go.kr", tags: ["주거급여", "기준임대료", "수선유지", "급지"], desc: "주거급여 선정기준·기준임대료·수선유지급여 기준" },
  { title: "찾기쉬운 생활법령정보", org: "법제처", category: "지침·사업안내", url: "https://www.easylaw.go.kr", tags: ["생활법령", "민원 안내", "쉬운 설명"], desc: "민원인에게 설명할 때 참고하기 좋은 쉬운 법령 해설" },

  // 신청·조회
  { title: "복지로", org: "보건복지부·사회보장정보원", category: "신청·조회", url: "https://www.bokjiro.go.kr", tags: ["복지서비스 검색", "모의계산", "온라인 신청", "맞춤형급여"], desc: "복지서비스 검색, 모의계산, 온라인 신청 안내" },
  { title: "정부24", org: "행정안전부", category: "신청·조회", url: "https://www.gov.kr", tags: ["민원", "증명서", "보조금24", "서식"], desc: "민원서류 발급, 보조금24(받을 수 있는 혜택 조회)" },
  { title: "기초연금 (국민연금공단)", org: "보건복지부·국민연금공단", category: "신청·조회", url: "https://basicpension.mohw.go.kr", tags: ["기초연금", "모의계산", "선정기준액"], desc: "기초연금 안내, 선정기준액, 모의계산" },
  { title: "마이홈포털 (주거급여)", org: "국토교통부", category: "신청·조회", url: "https://www.myhome.go.kr", tags: ["주거급여", "임대주택", "주거복지"], desc: "주거급여·공공임대 안내 및 자가진단" },
  { title: "교육비 원클릭 신청", org: "교육부", category: "신청·조회", url: "https://oneclick.moe.go.kr", tags: ["교육급여", "교육비", "방과후"], desc: "교육급여·교육비 지원 온라인 신청" },
  { title: "사회서비스 전자바우처", org: "사회보장정보원", category: "신청·조회", url: "https://www.socialservice.or.kr", tags: ["바우처", "돌봄", "사회서비스", "장애인활동지원"], desc: "바우처 사업 안내 및 제공기관 찾기" },
  { title: "고용24", org: "고용노동부", category: "신청·조회", url: "https://www.work24.go.kr", tags: ["실업급여", "국민취업지원제도", "일자리", "실직"], desc: "실업급여·국민취업지원제도·구직 연계" },

  // 기관·연계
  { title: "사회보장정보원", org: "사회보장정보원", category: "기관·연계", url: "https://www.ssis.or.kr", tags: ["행복이음", "시스템", "사회보장정보시스템"], desc: "사회보장정보시스템(행복이음) 운영기관. 시스템 공지·매뉴얼은 행복이음 내 자료실 확인" },
  { title: "한국자활복지개발원", org: "한국자활복지개발원", category: "기관·연계", url: "https://www.kdissw.or.kr", tags: ["자활", "자활근로", "희망저축계좌", "조건부수급"], desc: "자활사업·자산형성지원(희망저축계좌 등) 안내" },
  { title: "국민건강보험공단", org: "국민건강보험공단", category: "기관·연계", url: "https://www.nhis.or.kr", tags: ["건강보험료", "재난적의료비", "장기요양"], desc: "건강보험료 확인, 재난적 의료비, 노인장기요양보험" },
  { title: "대한법률구조공단", org: "대한법률구조공단", category: "기관·연계", url: "https://www.klac.or.kr", tags: ["법률상담", "채무", "개인회생", "법률구조"], desc: "무료 법률상담·소송구조 연계 (국번없이 132)" },
  { title: "서민금융진흥원", org: "서민금융진흥원", category: "기관·연계", url: "https://www.kinfa.or.kr", tags: ["서민금융", "채무조정", "긴급생계비"], desc: "서민금융·채무조정 연계 (국번없이 1397)" },
  { title: "보건복지상담센터 129", org: "보건복지부", category: "기관·연계", url: "https://www.129.go.kr", tags: ["129", "긴급지원", "상담", "위기신고"], desc: "복지 상담 및 위기상황 신고 (국번없이 129)" },
  { title: "온라인 행정심판", org: "국민권익위원회", category: "기관·연계", url: "https://www.simpan.go.kr", tags: ["행정심판", "불복"], desc: "행정심판 온라인 청구 안내" },
];

// 외부 사이트 바로 검색. {q}가 검색어로 바뀝니다.
window.EXTERNAL_SEARCH = [
  { name: "국가법령정보센터", url: "https://www.law.go.kr/LSW/lsSc.do?query={q}" },
  { name: "보건복지부 자료 (구글)", url: "https://www.google.com/search?q=site%3Amohw.go.kr+{q}" },
  { name: "사업안내 PDF (구글)", url: "https://www.google.com/search?q={q}+%EC%82%AC%EC%97%85%EC%95%88%EB%82%B4+filetype%3Apdf" },
  { name: "복지로 (구글)", url: "https://www.google.com/search?q=site%3Abokjiro.go.kr+{q}" },
  { name: "성평등가족부 (구글)", url: "https://www.google.com/search?q=site%3Amogef.go.kr+{q}" },
  { name: "생활법령 (구글)", url: "https://www.google.com/search?q=site%3Aeasylaw.go.kr+{q}" },
  { name: "정책브리핑 (구글)", url: "https://www.google.com/search?q=site%3Akorea.kr+{q}" },
];
