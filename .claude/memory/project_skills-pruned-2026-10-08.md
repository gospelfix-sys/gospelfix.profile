---
name: skills-pruned-2026-10-08
description: ".claude/skills에서 애니메이션/디자인/중복 커밋 스킬 10개 삭제됨, 프로젝트 관련 8개만 유지"
metadata: 
  node_type: memory
  type: project
  originSessionId: a2337021-84b5-4ade-92d1-d8ffb90910f8
  modified: 2026-10-08T06:00:00.071Z
---

2026-10-08에 `.claude/skills` 18개 중 10개를 사용자 승인 하에 삭제함: `animate`, `animation-vocabulary`, `apple-design`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `review-animations`, `pick-ui-library`, `prototype`, `git-commit`.

유지된 8개: `gfix-craft`, `gfix-review`, `gfix-audit`, `gfix-debt`, `gfix-gain`(프로젝트 고유 철학), `ask-sonner`(frontend가 sonner 실제 사용), `code-review`/`commit`(code-reviewer→git-commit-pusher 에이전트 연동 워크플로우).

**Why:** 애니메이션 계열은 두 앱 어디에도 framer-motion/gsap 등 의존성이 없어 트리거 조건이 없었음. `pick-ui-library`/`prototype`은 shadcn/ui 확정 후 불필요. `git-commit`은 `commit` 스킬과 규칙이 정반대로 충돌(서명 포함 여부, push 여부, 언어)해서 혼란을 유발함 — `commit`이 이 프로젝트의 실제 워크플로우([[feedback_commit-workflow]] 참고용, 아직 미작성)와 일치하므로 `git-commit`을 제거함.

**How to apply:** 앞으로 이 프로젝트에서 새 스킬 추가를 검토할 때 이 기준(실제 의존성/문서 참조 존재 여부)으로 판단할 것. `.claude/skills`는 git 커밋 이력이 없는 untracked 디렉터리이므로 삭제는 복구 불가 — 다시 삭제 작업을 할 땐 먼저 사용자 확인을 받을 것.

같은 날 `.claude-plugin/`과 `CLAUDE.md`가 파일시스템에서 사라진 것을 발견했으나(이 작업과 무관, 원인 미확인) 사용자에게 보고만 하고 넘어감 — 다음 세션에서 CLAUDE.md 부재가 확인되면 복구 필요 여부를 물어볼 것.
