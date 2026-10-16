---
name: dashboard-nav-precise-path
description: "Supabase/Vercel 같은 대시보드 UI 경로를 안내할 때 \"A 또는 B\" 식으로 헤징하지 말고 스크린샷으로 실제 사이드바 라벨을 확인한 뒤 단일 경로로 안내할 것"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a2337021-84b5-4ade-92d1-d8ffb90910f8
  modified: 2026-10-08T07:35:04.545Z
---

Supabase에서 이메일 인증(Confirm email) 토글 위치를 안내할 때 처음에 "Authentication → Providers → Email (또는 버전에 따라 Authentication → Settings)"처럼 두 가지 가능성을 헤징해서 답했다가, 사용자가 그 경로로 들어갔다가 다른 화면(Emails → Templates)에 도착해서 "어디야?" 라고 재질문함. 사용자가 스크린샷을 보내준 뒤에야 실제 사이드바에 "Sign In / Providers"라는 정확한 라벨이 있다는 걸 확인하고 정정함.

**Why:** 헤징된 경로 안내는 실제로 틀렸을 때 사용자가 엉뚱한 화면까지 들어갔다가 다시 물어봐야 하는 왕복을 만든다. 사용자가 스크린샷을 캡처해서 보내주는 수고까지 들었다.

**How to apply:** Supabase/Vercel 등 외부 대시보드의 메뉴 위치를 안내할 때, 확실하지 않으면 "또는"으로 두 경로를 동시에 제시하지 말고 — 사용자가 이미 보내준 스크린샷(사이드바가 보이는)이 있으면 거기 적힌 정확한 라벨을 그대로 인용해서 안내한다. 스크린샷이 없고 확신이 없으면, 추측 경로를 주기 전에 "스크린샷을 보내주시면 정확한 위치를 짚어드릴게요"라고 먼저 요청하는 편이 왕복을 줄인다.
