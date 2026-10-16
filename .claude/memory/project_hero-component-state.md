---
name: project-hero-component-state
description: "프로필 히어로 섹션은 HeroModule 컴포넌트(mode prop)로 구현되어 있고, 현재 라이브 모드/콘텐츠 상태"
metadata: 
  node_type: memory
  type: project
  originSessionId: 43c78fa0-e62e-4f5a-8ed4-ce2810056d1e
  modified: 2026-09-15T07:37:05.592Z
---

프로필 히어로 섹션(이름/사진/소개/태그/연락 버튼)은 `assets/js/hero.js`의 `HeroModule` 컴포넌트로 구현되어 있다. `index.html`의 `<div id="profileHero" data-mode="...">`가 mode prop 역할을 하며, `HeroModule.init()`이 이 값을 읽어 `TEMPLATES.classic` 또는 `TEMPLATES.gradient`를 렌더링한다.

- `classic`: 기존 디자인 — 전체 프로필 사진 + 이름·배지가 한 행에 있는 정보 카드
- `gradient`: 새 디자인 — 은은한 블러쉬 그라데이션 배경(`.hero-glow-zone`) + 원형 아바타 + 상단 아이콘 버튼(뒤로가기/공유/홈페이지) + 이메일·전화·공유·홈페이지 액션 버튼 행. **현재 라이브 기본값.**

**Why:** 2026-09-14, 사용자가 아이폰 연락처 상세 화면 참고 이미지(블러쉬 그라데이션 배경 + 원형 아바타 + 액션 버튼 행)를 주고 히어로 리디자인을 요청. `template_a`/`template_b` 파일 분리로 시작했다가 [[feedback-ui-variant-as-component]] 피드백을 받아 컴포넌트+mode prop 구조로 리팩터링함. 이후 세부 조정이 이어짐:
- 참고 이미지의 "Edit(연필)" 버튼은 이 사이트에 편집 기능이 없어 실제 동작하는 "홈페이지 링크"로 대체 (죽은 버튼을 만들지 않기 위한 판단)
- 배경 그라데이션에 이동+회전+확대(6s) 모션을 적용하되, 흰 정보 카드까지 포함하지 않는 `.hero-glow-zone` wrapper로 범위를 한정 (처음엔 `.profile-hero` 전체 기준으로 잘못 계산해서 범위가 부정확했음). ~~이 모션은 원래 `body::before`(넓은 화면 장식용 블러 원)의 `float` 애니메이션과 동일하게 맞춘 것이었다~~ — 그 `body::before`/`float`는 2026-09-15에 사용자 요청으로 완전히 삭제됐다(커밋 `7c4f90d`). `.hero-glow-zone::before`의 `heroGlowFloat` 애니메이션은 이제 짝이 되는 외부 요소 없이 단독으로 존재한다.
- 아바타 옆 장식용 상태 표시점(회색 원) 삭제 — 아무 기능도 없어서 사용자가 "이게 뭐냐"고 물었고 제거를 선택함
- "GX" 배지 칩 삭제 — 의미가 코드/커밋 이력 어디에도 문서화되어 있지 않아 사용자가 불필요하다고 판단
- 소개 문구를 "AI Agent 자동화 솔루션 전문가 | GospelFix 대표"에서 "가스펄픽스(GospelFix) 대표"로 단순화
- 태그를 "AI 챗봇 예약 시스템 · 1:1 문의 · 온라인 서비스 · 홈페이지 · 쇼핑몰"로 변경 (카카오톡 자동응답봇 제거)
- 홈페이지 링크를 `https://gospelfix.github.io/landing`에서 `https://gospelfix.vercel.app/layer`로 변경 (index.html 소셜 섹션 + hero.js `HERO_DATA.homepageUrl` 양쪽)
- 이 작업 과정에서 기존 버그였던 `assets/js/app.js`의 `.profile-name` 셀렉터(실제 클래스와 불일치해 항상 매치 실패)를 `.profile-hero-name`으로 함께 수정
- 커밋 `0e5cc72`(2026-09-14)로 push 완료, GitHub Pages 자동 배포됨

**How to apply:** 히어로 관련 추가 요청이 오면 `assets/js/hero.js`의 `HERO_DATA`(콘텐츠)와 `TEMPLATES.gradient`/`TEMPLATES.classic`(마크업)을 먼저 확인한다. mode를 바꾸고 싶다는 요청이면 `index.html`의 `data-mode` 한 글자만 바꾸면 된다. 리뷰에서 남은 미해결 개선점(우선순위 낮음): (1) 히어로의 이메일 confirm 로직이 index.html 연락처 섹션의 것과 중복 구현되어 있어 이메일 주소를 바꿀 때 두 곳 다 고쳐야 함, (2) 히스토리 없이 직접 진입한 사용자에게는 뒤로가기 버튼이 무반응.
