---
name: memory-dual-storage
description: "메모리 운영 방식 — 글로벌 auto-memory가 유일한 자동 로드 소스, .claude/memory/는 git 공유용 사본(수동 동기화)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 342100ed-d21e-49c3-9d62-a1db70f8ef12
  modified: 2026-10-16T05:03:10.386Z
---

2026-10-16, 사용자가 메모리를 프로젝트 내부 `.claude/memory/`에 저장해달라고 요청했다. 자동 로드 메커니즘이 글로벌 경로(`~/.claude/projects/.../memory/`)에 하드와이어돼 있어 저장 위치 자체를 하네스 차원에서 옮길 수 없다는 점을 설명한 뒤, 운영 방식을 확정했다:

- **글로벌 메모리가 유일한 "살아있는" 소스**: 세션 시작 시 자동으로 시스템 프롬프트에 주입되는 곳은 오직 `~/.claude/projects/.../memory/`뿐이다. `save-memory` 스킬/auto-memory 트리거는 계속 여기에 쓴다.
- **`.claude/memory/`는 git으로 팀과 공유하기 위한 수동 사본**: 자동 로드되지 않는다. 2026-10-16에 그 시점까지의 메모리 23개 전체를 복사해 커밋 `88c41f5`로 처음 git에 올렸다([[project_claude-dir-gitignored]]의 "완전 untracked" 서술이 이 디렉터리에 한해 깨짐 — 해당 메모리에 정정 반영함).
- 커밋 전 code-reviewer 리뷰에서 로컬 절대경로 노출(사용자명 `mac` 포함 풀패스) 2건을 지적받아 상대경로로 치환 후 커밋했다 — [[feedback_dependency-needs-justification]]과 같은 패턴(리뷰 → 지적 → 수정 → 재커밋).

**Why:** 하네스의 auto-memory 로드 경로는 고정이라 변경 불가. 사용자는 그래도 팀이 git으로 메모리 맥락을 볼 수 있길 원했고, "글로벌 유지 + 사본 추가"를 명시적으로 선택함(완전 전환이나 글로벌 포기 옵션은 거절됨).

**How to apply:** 앞으로 `save-memory`를 실행하거나 새 메모리를 저장할 때, 글로벌 경로에 쓰는 것은 기존과 동일하되, **추가로 같은 내용을 `<프로젝트 루트>/.claude/memory/`에도 동일 파일명으로 복사**해야 한다(두 사본의 내용이 어긋나지 않게). 둘 중 하나만 고치고 끝내지 말 것. `.claude/memory/` 변경은 git 변경 사항이므로, 사용자가 커밋/푸시를 요청하면 이 프로젝트의 커밋 규칙(code-reviewer 선행)을 그대로 따른다.
