---
name: project-profile-data-json-split
description: "2026-11-19 프로필 데이터를 src/data/*.json으로 분리, 교회 사역을 /churchministry로 분리 — 남은 하드코딩·미해결 후속 항목 기록"
metadata:
  node_type: memory
  type: project
  originSessionId: 089e07ae-b57d-4fbf-93db-19a5c260bf62
  modified: 2026-11-19T03:14:25.893Z
---

2026-11-19 세션에서 사용자 요청으로 구조가 바뀌었다(커밋 cfa015a~fc07cfa, main 직접 푸시).

- 교회 사역 섹션은 메인(`/`, `/profile`)에서 빠지고 `/churchministry` 페이지로 이동했다. 메인에서 들어가는 길은 소셜 영역의 "교회 사역 보기" 항목 하나뿐이다(사용자가 메인의 별도 "교회 사역 보기" 버튼 블록은 삭제 요청). 새 페이지 하단의 "프로필로 돌아가기" 버튼은 가운데 정렬.
- 하드코딩 픽스처는 `src/data/{site-profile,business-hours,portfolio-cards,ministry-cards}.json`으로 분리됐고, `src/lib/profile-data.ts`는 `as` 단언으로 타입만 입히는 로더다(export 이름 불변). JSON import는 리터럴 유니온을 `string`으로 넓혀서 `imageType` 오타 같은 건 컴파일에서 안 잡힌다 — 카드를 추가하면 `yarn build`로 확인.

**Why:** 사용자가 "모든 정보를 JSON파일로 분리"를 요청했다. 다만 이번에 옮긴 건 `profile-data.ts`의 네 가지뿐이라 **아직 컴포넌트에 하드코딩된 값**이 남아 있다: 인스타그램 주소/핸들(`SocialSection.tsx`), 캐치프레이즈(`profile/page.tsx`), 푸터 문구(`Footer.tsx`), 섹션 제목. 사용자에게 이 범위 차이를 알렸고 추가 이전 여부는 아직 응답이 없다.

**How to apply:** 카드·영업시간·프로필 값을 고칠 땐 JSON 파일을 수정한다(CLAUDE.md "데이터 흐름"에 반영됨). `supabase/seed.mjs`는 같은 데이터를 별도로 갖고 있어 JSON과 어긋날 수 있다(주석도 옛 경로 `frontend/src/lib/profile-data.ts`를 가리킴) — 시드 전에 대조할 것. 사용자가 "나머지 하드코딩도 옮겨줘"라고 하면 위 4곳을 `SiteProfile` 타입 확장과 함께 처리.

**⚠️ 미해결 후속 (code-reviewer 지적, 미처리):** `public/images/mockup.holy.win.2026/.DS_Store`가 정적 파일로 배포될 수 있어 `.gitignore` 확인 필요, `profile.types.ts`의 `mockupImages` Phase 2 TODO(DB에 컬럼 없음) 유지 중, 홀리윈 카드 태그 `'PUP-UP 스토어'`가 `POP-UP` 오타일 가능성(사용자 미확인). 도메인 배포 확인은 [[project-share-url-hardcoded]] 참고.
