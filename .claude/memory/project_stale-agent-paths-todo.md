---
name: stale-agent-paths-todo
description: "⚠️ 후속 조치 필요 — .claude/agents/*.md, .claude/claude-sandbox.conf에 옛 경로(GospelFix/+service/service.supabase.v2)가 하드코딩돼 있어 agent-memory가 작동 안 함"
metadata: 
  node_type: memory
  type: project
  originSessionId: a2337021-84b5-4ade-92d1-d8ffb90910f8
  modified: 2026-10-08T07:35:14.497Z
---

2026-10-08 커밋 전 code-reviewer 리뷰(초기 모노레포 커밋 건)에서 발견된 Minor 이슈, 아직 수정 안 됨:

`.claude/agents/code-reviewer.md`, `git-commit-pusher.md`, `development-planner.md`, `infra-architect.md`, `rbac-architect.md`, `.claude/claude-sandbox.conf`에 메모리/샌드박스 경로가 구 디렉터리명 `GospelFix/+service/service.supabase.v2/...`로 하드코딩돼 있음. 현재 실제 경로는 `GOSPELFIX/profile`로 바뀌어서, 이 경로를 참조하는 agent-memory 읽기/쓰기가 전부 깨져 있음(세션 중 해당 경로 파일을 읽으려다 "File does not exist" 에러 발생한 것 확인됨).

**Why:** 비밀값은 아니지만 기능적으로 agent-memory가 저장/조회되지 않는 상태고, 공개 저장소라면 로컬 경로 구조도 불필요하게 노출됨. code-reviewer가 "커밋 자체를 막을 사유는 아님"으로 판단해 그때는 그냥 넘어갔음.

**How to apply:** `.claude/` 아래 agent 정의 파일들을 다음에 건드릴 일이 있으면, 이 경로들을 현재 작업 디렉터리 기준(`GOSPELFIX/profile`)으로 일괄 치환할 것. 급한 건 아니지만 손대는 김에 같이 고치는 게 좋다.
