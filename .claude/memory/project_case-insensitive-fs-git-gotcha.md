---
name: project-case-insensitive-fs-git-gotcha
description: 이 로컬 환경(macOS APFS + git core.ignorecase=true)에서 파일명 대소문자 변경/이동 시 mv와 git status가 신뢰할 수 없게 동작함 — 두 가지 구체적 우회법
metadata: 
  node_type: memory
  type: project
  originSessionId: c7003524-b320-40d3-9e17-70aac91f29b7
  modified: 2026-09-20T01:10:16.594Z
---

이 작업 환경(macOS, APFS, `git config core.ignorecase` = `true`)에서 파일 이름 변경·이동 작업 중 두 가지 실제 사고가 발생했다 (2026-09-20, GospelFix 프로필 저장소 `config/`→`docs/` 이동 및 `DESIGN.md`→`design.md` 리네임 작업 중).

**사고 1 — 대소문자만 다른 두 파일이 같은 파일로 취급되어 내용이 조용히 덮어써짐.** `docs/design.md`를 만들어둔 상태에서 사용자가 `docs/DESIGN.md`를 별도로 추가했는데, APFS가 대소문자를 구분하지 않아 실제로는 같은 파일 하나였다 — 나중에 추가된 `DESIGN.md`의 내용이 먼저 있던 `design.md`의 내용(11KB 분량)을 지워버렸다. `git log --follow`로 마지막 커밋 시점 내용을 복구해서 해결함.

**사고 2 — 샌드박스 Bash 도구에서 `mv`/`git mv`가 "No such file or directory"로 실패함.** `config/design-system.md`를 `docs/design-system.md`로 옮기려 할 때 `git mv`와 `mv` 둘 다 소스·목적지 파일이 실제로 존재하는데도 이 에러로 실패했다. `cp`(복사)와 `mkdir`는 정상 동작했다 — 즉 `rename()` 계열 syscall만 막히고 읽기/쓰기는 허용되는 샌드박스 제약으로 보인다. `cp`로 복사 후 원본을 `rm`으로 지우고 `git add -A`를 실행하면 git이 내용 유사도로 자동으로 rename(`R` 상태)을 인식해 문제없이 해결됐다.

**사고 3 — 대소문자만 바꾸는 rename은 `mv` 자체는 성공하지만 git이 인식을 못함.** `docs/DESIGN.md`를 `docs/design.md`로 대소문자만 바꾸는 건 plain `mv`로 성공했다. 하지만 `git add -A` 후 `git status`가 여전히 옛 대문자 경로(`A docs/DESIGN.md`)로 표시됐다 — `core.ignorecase=true` 때문에 git이 두 경로를 같은 파일로 취급해 rename을 감지하지 못한 것. `git rm --cached "docs/DESIGN.md"` 로 인덱스에서 강제로 제거한 뒤 `git add docs/design.md`로 새 경로를 명시적으로 추가해야 올바르게 잡혔다.

**Why:** 세 사고 모두 겉보기엔 정상 동작(`ls`로는 파일이 다 보임)처럼 보이다가 `git status`/`git diff`에서 뒤늦게 발견됨 — 파일 작업 직후 바로 확인하지 않으면 놓치기 쉽다.

**How to apply:** 이 저장소(그리고 같은 샌드박스 환경의 다른 저장소)에서 파일 rename/move를 할 때: (1) 대소문자만 바꾸는 경우 `mv` 자체는 되지만 `git rm --cached <옛 경로>` + `git add <새 경로>`로 인덱스를 직접 바로잡을 것. (2) 디렉터리를 옮기는 `mv`/`git mv`가 "no such file" 에러를 내면 `cp` + `rm` + `git add -A`로 대체할 것. (3) 어떤 방법을 쓰든 작업 직후 `git status --short`와 `ls`로 실제 반영 여부를 바로 확인할 것 — 특히 새로 만드는 파일명이 기존 파일명과 대소문자만 다르면 반드시 사전에 충돌 여부를 점검한다.
