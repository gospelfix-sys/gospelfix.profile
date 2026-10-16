---
name: motion-chatbot-plan
description: "frontend에 motion(구 framer-motion 후신) 설치됨 — 추후 챗봇 UI 구현 때 tailwindcss-animate/tw-animate-css를 대체할 예정, swiper는 유지"
metadata: 
  node_type: memory
  type: project
  originSessionId: 342100ed-d21e-49c3-9d62-a1db70f8ef12
  modified: 2026-10-16T04:53:47.358Z
---

2026-10-16, `frontend`에 `motion@14.3.0` 패키지(`yarn add motion`, 커밋 `aca2168`)를 설치했다. 현재는 어떤 컴포넌트에서도 import하지 않은 선설치 상태다.

사용자가 밝힌 계획:
- 용도: 추후 구현 예정인 **공개 프로필 사이트 챗봇 UI**(아직 미착수, `docs/ROADMAP.md`의 "Future: MVP 이후" 섹션에 항목 추가됨).
- 챗봇 UI 구현 시점에 현재 설치된 CSS 기반 애니메이션 라이브러리 `tailwindcss-animate`, `tw-animate-css`를 **완전히 삭제하고 `motion`으로 대체**할 계획.
- 카드 캐러셀에 쓰이는 `swiper`는 이번 교체 대상이 **아님** — 계속 유지.

이 경위는 [[feedback_dependency-needs-justification]]에서 다룬 code-reviewer BLOCKED → APPROVED 전환의 배경이기도 하다.

**Why:** 챗봇 기능 구현 전에 애니메이션 레이어를 motion으로 통합하는 아키텍처 결정을 미리 해둔 것 — 막연한 선추가가 아니라 구체적 교체 대상/유지 대상을 구분한 계획.

**How to apply:** 다음에 챗봇 UI 작업이나 `tailwindcss-animate`/`tw-animate-css` 관련 작업이 들어오면 이 계획을 전제로 움직일 것. `motion` import가 실제로 등장하기 시작하면(=챗봇 UI 착수 신호), `tailwindcss-animate`/`tw-animate-css` 제거 작업도 같이 챙길 것. `swiper`는 건드리지 말 것.
