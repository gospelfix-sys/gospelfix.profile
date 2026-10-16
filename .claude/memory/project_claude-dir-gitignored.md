---
name: project-claude-dir-gitignored
description: [정정됨 2026-10-08] .claude/는 gitignore 아닌 untracked일 뿐 + 이 저장소는 "다른 프로젝트"가 아니라 구 정적 GospelFix 사이트의 Next.js 재작성본
metadata: 
  node_type: memory
  type: project
  originSessionId: 32c008f9-b0e8-4033-8cbb-315f22bd4886
  modified: 2026-10-08T07:34:25.830Z
---

**2026-10-08 정정:** 아래 원래 내용(커밋 `e3b49cc`/`f890e54`, 정적 HTML/GitHub Pages 사이트 전제)은 이 디렉터리(`GOSPELFIX/profile`, Next.js 14 + Supabase 모노레포)와 맞지 않는다. 직접 확인한 결과 `.gitignore`에 `claude` 관련 라인이 없고, `git status`에서 `.claude/`가 `??`(untracked, not ignored)로 뜬다. git log도 `650e970 Initial commit` 단 하나뿐이라, 과거의 다중 커밋 이력과도 무관하다. 아마 과거 다른 GospelFix 프로젝트에서 작성된 메모리가 이 프로젝트 경로에 잘못 연결됐거나, 저장소가 그 사이 재초기화된 것으로 보인다.

**2026-10-08 추가 정정(같은 날, 더 뒤에):** "다른 프로젝트"라는 추정은 틀렸다 — `frontend/src/lib/profile-data.ts`(정적 사이트를 1:1 포팅한 픽스처), `supabase/schema.sql`(구 `docs/supabase-schema.sql`)의 `site_profile`/`portfolio_cards`/`ministry_cards` 스키마를 보면, 이 모노레포는 [[project_hero-component-state]], [[project_holywin-2026-card]], [[project_gopoomgyeok-card]], [[project_share-url-hardcoded]]가 다루던 **그 정적 GospelFix 프로필 사이트를 Next.js+Supabase로 다시 쓴 동일 계보**다. 즉 "저장소가 재초기화됐다"가 맞는 설명이고, "다른 프로젝트"는 아니다. 옛 정적 사이트 관련 메모리는 여전히 콘텐츠 맥락(카드 출처, 히어로 모드 등)으로 유효하니 참고할 것 — 다만 구현(HTML/CSS/Vanilla JS)은 이제 Next.js 컴포넌트로 바뀌었으므로 파일 경로는 CLAUDE.md 기준으로 다시 확인해야 한다.

**현재 사실:** `.claude/`는 git에 전혀 커밋된 적 없는 **완전한 untracked 디렉터리**다. 즉 `git add -A`를 돌리면 바로 스테이징되고, 반대로 **git 히스토리가 없으니 삭제하면 복구 불가능**하다 (`.claude-plugin/`도 동일 — 2026-10-08에 원인 불명으로 디스크에서 사라짐, 사용자 확인 필요).

**Why:** 이전 메모리가 다른 저장소(정적 사이트, GitHub Pages)의 경위를 기록한 것이어서 이 프로젝트에 그대로 적용하면 "git status에 안 보이니 안전하다"고 오판해 untracked 파일을 부주의하게 삭제할 위험이 있었음.

**How to apply:** 이 저장소에서 `.claude/`(또는 `.claude-plugin/`) 아래 파일을 삭제·수정하기 전엔 매번 `.gitignore`와 `git status`를 직접 확인하고, "untracked = 복구 불가"를 전제로 사용자 확인을 받을 것. "다 커밋해줘" 요청 시에도 이 디렉터리를 자동 포함할지 먼저 확인한다(이 원칙 자체는 유지).

## 추가: `.serena/` (2026-10-04)

커밋 `f890e54`(2026-10-04)에서 같은 패턴으로 `.serena/`(Serena MCP 서버의 로컬 프로젝트 설정 디렉터리, `project.yml`/`project.local.yml` 등)도 `.gitignore`에 추가됨. 사용자가 "다른 것 변경 파일 다 커밋/푸쉬해줘"라고 했을 때, `.claude/` 선례를 근거로 바로 커밋하지 않고 AskUserQuestion으로 먼저 확인한 뒤 "gitignore에 추가" 선택을 받고 진행함.

**일반화된 적용 규칙:** 사용자가 "다 커밋해줘"라고 해도, git status에 뜨는 미추적 디렉터리가 `.claude/`·`.serena/`류의 로컬 MCP/에디터 툴 설정으로 보이면 자동으로 `git add -A`에 포함시키지 말 것. 먼저 디렉터리 내용을 확인하고(설정 파일인지, 캐시인지), 사용자에게 "이번처럼 gitignore 처리할지/그대로 커밋할지/보류할지" 확인한 뒤 진행한다. 새로운 로컬 툴 디렉터리(`.cursor/`, `.vscode/` 등)를 발견해도 동일한 절차를 따른다.
