---
name: feedback-ui-variant-as-component
description: 여러 UI 버전을 실험/비교할 때 파일을 통째로 복제하지 말고 mode prop을 받는 컴포넌트로 만들 것
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 43c78fa0-e62e-4f5a-8ed4-ce2810056d1e
  modified: 2026-09-14T08:17:45.890Z
---

여러 UI 디자인 버전을 실험하거나 비교해야 할 때, `template_a.html`/`template_b.html`처럼 HTML 파일과 에셋 폴더를 통째로 복제하는 방식을 쓰지 않는다. 대신 해당 영역을 하나의 컴포넌트로 만들고, mode prop(빌드 도구가 없는 정적 사이트라면 HTML `data-*` 속성)을 받아 렌더링을 전환하는 방식을 기본값으로 쓴다.

**Why:** 사용자가 히어로 섹션 리디자인을 진행하며 처음에 `template_a.html`+`assets_a/`(백업), `template_b.html`+`assets_b/`(새 디자인) 방식으로 작업했는데, 이후 "이렇게 파일을 나누지 말고 해당 영역을 컴포넌트를 만들어서 props으로 mode를 전달하면 UI가 변경되도록 수정해줘"라고 명시적으로 교정했다. 파일 복제 방식은 이미지 등 에셋까지 중복되고, 콘텐츠를 수정할 때 여러 파일을 동시에 고쳐야 하는 문제가 있었다.

**How to apply:** [[project-hero-component-state]]에서 실제로 적용한 패턴 — `assets/js/hero.js`의 `HeroModule` IIFE가 `TEMPLATES` 객체(모드별 템플릿 함수)를 갖고, `index.html`의 `<div id="profileHero" data-mode="...">`가 prop 역할을 한다. 이 프로젝트(GospelFix profile)나 유사한 빌드 도구 없는 정적 사이트에서 "A안/B안을 만들어봐 달라", "다른 스타일로도 보여줘" 같은 요청이 오면 처음부터 이 컴포넌트+data 속성 패턴으로 시작한다.
