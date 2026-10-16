---
name: feedback-card-order-is-array-order
description: "portfolio/ministry 카드는 \"우선순위\" 필드가 없고 JSON 배열 순서 = 표시 순서. 재정렬 요청 시 기준을 추측하지 말고 결과 순서를 직접 물을 것"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 32c008f9-b0e8-4033-8cbb-315f22bd4886
  modified: 2026-09-15T07:45:48.622Z
---

`assets/data/portfolio-cards.json`, `assets/data/ministry-cards.json`에는 `priority`나 `order` 같은 명시적 필드가 없다. `cards.js`도 정렬 로직이 없어서, 화면에 보이는 카드 순서는 그냥 JSON 배열에 나열된 순서 그대로다.

**Why:** 2026-09-15 세션에서 사용자가 "우선순위를 오름차순으로 바꿔달라"고 요청했을 때, 어떤 기준(id/날짜/제목)인지 몰라 여러 차례 되물어야 했다. 포트폴리오는 id 기준으로 답을 들었다가 곧이어 "순서를 반대로"라고 정정했고, 사역 카드는 날짜 기준으로 정렬했다가 새 카드를 추가한 뒤 "맨 앞으로"라고 다시 바뀌었다. 즉 사용자가 말하는 "우선순위"는 고정된 정렬 기준이 아니라 그때그때 원하는 "보여지는 순서" 자체를 가리키는 경우가 많았다.

**How to apply:** 이 저장소에서 카드 "우선순위"/순서 변경 요청을 받으면, id/날짜/알파벳 같은 정렬 기준을 먼저 추측해서 제안하기보다 "현재 순서는 A→B→C인데, 어떤 순서로 바꿀까요?"처럼 결과 순서를 직접 확인하는 질문을 우선한다. 카드 목록에 새 항목이 추가될 때는(예: [[feedback-verify-link-content-before-guessing]] 상황의 몽골 카드), 그 항목의 위치(맨 앞/맨 뒤/특정 위치)도 별도로 확인해야 한다.
