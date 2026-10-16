---
name: project-gopoomgyeok-card
description: "포트폴리오 카드 \"고품격대패\"의 출처(퓨니코드 도메인)와 info 문구 확정 이력"
metadata: 
  node_type: memory
  type: project
  originSessionId: 95a8570d-0d15-487b-85df-8c46444e0c77
  modified: 2026-10-03T13:10:27.871Z
---

`assets/data/portfolio-cards.json`에 2026-10-03 추가된 "고품격대패" 카드(id: 3, 배열 맨 앞)는 사용자가 퓨니코드 도메인 `https://xn--i89a2dz9q2p1bhpb.com/`만 주고 "너가 알아서 채워줘"라고 요청해 WebFetch로 확인한 뒤 채웠다. 디코딩하면 "고품격대패.com"이며, 얇게 저민 고기(대패)를 전문으로 하는 프리미엄 한식 고기 프랜차이즈(셀프바 25종+, 직영 3개점) 공식 사이트다.

**Why:** 퓨니코드 도메인은 겉보기로 내용을 전혀 짐작할 수 없어 [[feedback-verify-link-content-before-guessing]] 규칙이 그대로 적용된 사례. title="고품격대패", subtitle="대패의 격이 다르다"는 페이지 슬로건에서 그대로 가져왔다. `info` 필드는 사용자가 여러 번 반복 수정했고 최종값은 `"고품격대패 공식 웹사이트"`(다른 포트폴리오 카드와 동일한 `{제목} 공식 웹사이트` 패턴). 중간에 "가맹점 문의는 공식 웹사이트에서 확인하세요" 등 문장형으로도 바꿔봤지만 최종적으로는 명사형으로 되돌아갔다.

이미지는 `./assets/images/portfolio/gopoomgyeok.avif` (사용자가 avif로 직접 변환해 제공). 같은 세션에서 포트폴리오/사역 카드 이미지 전체가 jpg/png → avif로 교체됨(`deartintsanta`, `yezakeumak`, `holywin`, `mongolia`도 함께 avif로 전환, `default.png`는 코드 어디서도 참조되지 않는 미사용 파일로 확인 후 삭제 방치).

**How to apply:** 이 카드의 가맹/사업 정보가 바뀌면 원본 페이지 재확인이 필요하다. 포트폴리오/사역 카드에 새 이미지를 추가할 때는 최근 추가분이 전부 `.avif`라는 점을 참고하되, 이는 코드 보면 바로 보이는 사실이라 별도 컨벤션 문서화는 하지 않음.
