---
name: git-commit-pusher-no-bash
description: git-commit-pusher 서브에이전트가 이 환경에서 Bash 도구에 접근하지 못해 커밋/푸시를 끝까지 수행할 수 없음 — 직접 처리할 것
metadata: 
  node_type: memory
  type: reference
  originSessionId: a2337021-84b5-4ade-92d1-d8ffb90910f8
  modified: 2026-10-08T07:34:54.577Z
---

이 세션 환경에서 `git-commit-pusher` 서브에이전트(Agent 툴, `subagent_type: "git-commit-pusher"`)를 두 차례 호출했는데, 둘 다 `.claude/settings.json`에 `"Bash"` 권한이 명시돼 있음에도 실제로는 Bash 도구를 쓰지 못하고(도구 목록에 없음) 중간에 멈추거나 사용자에게 "Bash 도구를 줘" 또는 "대신 이 명령어를 실행해달라"고 되묻는 결과만 반환함.

**Why:** 정확한 원인은 확인 못 했지만(서브에이전트 종류별 도구 로딩 설정 문제로 추정), 이 환경에서는 재현성 있게 실패함. 반면 `code-reviewer` 서브에이전트는 Bash 없이도(Read/Grep/Glob만으로) 리뷰 작업을 문제없이 완수함 — Bash가 꼭 필요한 건 git-commit-pusher 쪽 작업(add/commit/push 실행)이라 이 에이전트 타입에서만 문제가 드러남.

**How to apply:** "커밋/푸시해줘" 요청이 오면: (1) `code-reviewer` 에이전트로 리뷰를 먼저 받아 APPROVED 확인 (프로젝트 규칙), (2) **git-commit-pusher에 위임하지 말고** 코디네이터(메인 세션)가 직접 Bash로 `git add`/`git commit`/`git push`를 실행한다. git-commit-pusher를 다시 시도해볼 수는 있지만(환경이 바뀌었을 수 있으니), 멈추거나 되묻는 응답이 오면 바로 직접 처리로 전환할 것 — 재시도에 턴을 낭비하지 않는다.

**재확인 (2026-10-23):** 홀리윈 목업 갤러리 커밋 때 git-commit-pusher를 다시 호출했으나 동일하게 "셸 도구 없음"으로 명령어만 돌려주고 끝났다(환경 변화 없음). 이번에는 첫 시도 후 곧바로 코디네이터가 직접 `git add`/`commit`/`push`를 실행해 처리했다 — 위 How to apply의 "한 번 시도 후 바로 전환"이 옳은 흐름이었다. 첫 시도를 생략하고 바로 직접 실행해도 무방하다. 이때 code-reviewer가 BLOCKED(Major 2건: 버튼 aria-label, seed.mjs 동기화)를 냈고, 수정 후 리뷰어의 "조건부 APPROVED" 문구에 따라 재리뷰 없이 진행했다([[dependency-needs-justification]]와 같은 패턴).
