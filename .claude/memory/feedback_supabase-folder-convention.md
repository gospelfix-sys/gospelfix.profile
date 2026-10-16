---
name: supabase-folder-convention
description: "Supabase 관련 작업/SQL은 모두 supabase/ 폴더에 둔다, docs/에 두지 않는다"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a2337021-84b5-4ade-92d1-d8ffb90910f8
  modified: 2026-10-08T06:32:32.951Z
---

이 프로젝트(`GOSPELFIX/profile`)에서 Supabase 관련 파일(스키마 SQL, 시드 스크립트, 마이그레이션 노트 등)은 **반드시 저장소 루트의 `supabase/` 폴더**에 둔다. `docs/`에 섞어두지 않는다.

2026-10-08에 사용자가 명시적으로 요청해서 기존에 `docs/`에 있던 `supabase-schema.sql`, `seed-supabase.mjs`를 각각 `supabase/schema.sql`, `supabase/seed.mjs`로 이동했고, `CLAUDE.md`의 관련 경로 참조도 전부 갱신함.

**Why:** 사용자가 Supabase 관련 산출물을 다른 문서(PRD/ROADMAP/디자인 가이드 등)와 섞이지 않게 별도 폴더로 분리해서 찾기 쉽게 하길 원함.

**How to apply:** 앞으로 이 프로젝트에서 Supabase 스키마를 수정하거나 새 SQL/시드/마이그레이션 파일을 만들 때는 자동으로 `supabase/` 아래에 생성한다. `docs/`에 새로 만들지 않는다. CLAUDE.md의 "Supabase 스키마" 섹션이 이 컨벤션을 명시하고 있으니 작업 전에 참고할 것.
