---
name: project-holywin-2026-card
description: "교회 사역 카드 \"홀리윈 2026\"의 출처와 날짜 정보가 사용자 직접 제공임을 기록"
metadata: 
  node_type: memory
  type: project
  originSessionId: e1fd6f94-1895-4609-b513-dd39972b634d
  modified: 2026-10-03T13:10:31.922Z
---

`assets/data/ministry-cards.json`에 2026-09-30 추가된 "홀리윈 2026" 카드(id: 4, 배열 맨 앞)는 `https://gbc-sys.github.io/holy.win.2026/`을 참고했다. 이 페이지는 강남중앙침례교회 청년부(강청, 인스타그램 `@gangchung_gbc`)의 "홀리윈(HOLY WIN)" 캠페인 중 전도 대상자를 등록하고 함께 기도하는 신청 플랫폼(등록/수정/삭제, QR·SNS 공유 기능 포함)이다.

**Why:** 페이지 자체에는 행사 날짜가 명시되어 있지 않다. JSON의 `date` 필드값 "2026.10.24 (토)"는 WebFetch로 확인한 페이지 내용이 아니라 사용자가 대화 중 직접 알려준 값이다. 카드 썸네일 이미지는 짙은 테라코타 오렌지 배경의 꽃/별 그래픽인데, 이 색감이 같은 세션에서 `--color-hero-glow-*` 토큰을 진하게 바꾸는 참고 이미지로도 쓰였다.

**⚠️ 정정 (2026-10-03):** 이미지 경로가 `assets/images/portfolio/holywin.png`에서 `holywin.avif`로 바뀌었다 (포트폴리오/사역 카드 이미지 전체가 avif로 전환됨, [[project-gopoomgyeok-card]] 참고). 위 문단의 `.png` 경로는 더 이상 유효하지 않다.

**How to apply:** 이 카드의 날짜나 캠페인 세부 내용이 나중에 바뀌거나 불일치가 발견되면, 원본 페이지가 아니라 사용자 확인이 필요하다는 점을 먼저 고려한다. [[feedback-verify-link-content-before-guessing]] 참고.
