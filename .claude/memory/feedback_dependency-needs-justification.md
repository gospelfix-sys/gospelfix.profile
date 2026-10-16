---
name: dependency-needs-justification
description: yarn add로 미사용 의존성을 먼저 설치하면 code-reviewer가 BLOCKED 판정 — 구체적 사용 계획을 문서에 남기면 APPROVED로 전환됨
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 342100ed-d21e-49c3-9d62-a1db70f8ef12
  modified: 2026-10-16T04:53:38.419Z
---

이 저장소에서 "커밋/푸시" 요청 시 자동으로 돌아가는 code-reviewer 에이전트는, `yarn add`로 패키지를 설치했지만 코드 어디에서도 import하지 않은 상태(목적 없는 의존성 선추가)를 `CLAUDE.md`의 GFix Craft 9단계 결정 사다리(1단계 NEED, 5단계 PKG) 위반으로 보고 **BLOCKED** 판정을 내린다. 실제 사례: `motion` 패키지를 frontend에 설치만 하고 커밋하려 했을 때 1차 리뷰가 BLOCKED, 사용자가 "추후 챗봇 UI에 쓸 예정이고 기존 tailwindcss-animate/tw-animate-css를 그때 교체할 계획"이라는 구체적 근거를 주자 2차 리뷰에서 APPROVED(조건부)로 전환됨. 조건부 승인의 "조건"은 그 근거를 `docs/ROADMAP.md` 같은 저장소 문서에 한 줄 남기는 것 — [[motion-chatbot-plan]] 참고.

**Why:** `GOSPELFIX.md`가 "yarn add를 하려는 순간 → 5단계 재확인", "'나중에 유용할 것 같아서' → 1단계 위반"을 경고 신호로 명시하고 있어서, 사용처 없는 설치는 기본적으로 의심 대상이다. 다만 리뷰어는 "근거가 전혀 없음"과 "근거가 명확히 제시됨"을 구분해서 판단한다 — 후자는 사다리 취지(막연한 선추가 방지)를 위반하지 않는다고 본다.

**How to apply:** 앞으로 사용자가 당장 쓰지 않을 패키지를 미리 설치해달라고 하면, (1) 왜/언제 쓸 건지 먼저 물어보고, (2) 커밋 전에 그 근거를 `docs/ROADMAP.md`(또는 관련 문서)에 한 줄이라도 남기도록 제안한다. 이렇게 하면 code-reviewer 재검토 없이도 1차에 APPROVED 받을 가능성이 높다.
