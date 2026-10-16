---
name: feedback-icon-generation-full-set
description: 소스 이미지로 favicon/아이콘 만들 때 표준 풀세트(ico+16/32/192/512+apple-touch-icon) 생성 후 index.html head까지 자동 연결하는 걸 선호함
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 25c58507-9a18-467e-9049-8055e25566e3
  modified: 2026-10-04T00:05:07.769Z
---

2026-10-04, `assets/images/appIcon.png`로 favicon/아이콘 세트를 만들어달라는 요청에서 범위를 AskUserQuestion으로 확인했을 때, "표준 풀세트(권장)"와 "생성 후 index.html head 아이콘 링크도 교체(권장)" 둘 다 추천 옵션을 그대로 선택함 — 별다른 반박 없이 승인.

**Why:** 사용자가 매번 각 파일 크기나 HTML 연결 여부를 일일이 지정하길 원하지 않고, 업계 표준 관례(favicon.ico 멀티사이즈 + 16/32/192/512 PNG + apple-touch-icon)를 기본값으로 받아들임.

**How to apply:** 앞으로 로고/아이콘 교체 요청이 오면 바로 표준 풀세트를 기본으로 제안하고, 기존 `<link rel="icon">` 블록도 함께 교체하는 걸 기본 동선으로 삼을 것. 다만 매번 생성 전 1회 확인 질문은 유지(비용이 낮고, 과거 교체 흔적 — [[project_claude-dir-gitignored]] 사례처럼 — 임의 판단보다 확인이 안전했음).
