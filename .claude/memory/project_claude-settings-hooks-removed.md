---
name: project-claude-settings-hooks-removed
description: 2026-11-03 .claude/settings.json의 hooks 블록 전체 삭제(Notification 포함), .env Bash deny 추가, env/teammateMode 최상위 이동, .shrimp_data gitignore+추적해제
metadata:
  type: project
---

2026-11-03, 사용자 요청으로 `.claude/settings.json`을 정리했다(커밋 `fd6e3cf`, `e925270`, `ae45633`).

- **hooks 전체 삭제**: Notification/Stop/SessionStart/PreToolUse/PostToolUse/PreCompact. 처음엔 "hooks에 관한 글"이라고만 해서 코드(`@/hooks/*`, react-hook-form)로 오해할 뻔했고, 되묻자 "Notification 알림 용도로 설정했던 것"(Claude Code hook)이라고 답했다. 이후 스크린샷으로 나머지 hook도 전부 삭제를 요청함. `.claude/hooks/` 스크립트 폴더는 이미 없었다.
- **부작용**: PreToolUse의 `.env`/`config/*.json` 차단 hook과 PostToolUse 자동 prettier가 사라졌다. 대신 `permissions.deny`에 `Bash(cat .env*)` 등 5개를 추가(접두사 매칭이라 우회 가능, 보조 장치 수준). Read deny는 `./` 기준이고 `additionalDirectories: ["/"]`라 형제 저장소 `.env`는 안 막힌다(미처리 Minor).
- **위치 정리**: `permissions` 안에 잘못 중첩돼 있던 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`을 최상위 `env`로, `teammateMode: "tmux"`를 최상위로 이동 → 에이전트 팀 기능이 이제 실제로 켜진다. 쓸 계획이 없으면 삭제를 제안하기로 했고 사용자 답은 아직 없음.
- **.shrimp_data/**: `.gitignore`에 추가하고 `git rm --cached .shrimp_data/WebGUI.md`로 추적 해제(로컬 파일 유지). 이미 추적 중이던 파일은 `.gitignore`만으론 무시되지 않는다는 점을 사용자가 스크린샷으로 의문을 제기해 설명함.

**Why:** 사용자가 알림/훅 기반 자동화를 더 이상 쓰지 않기로 함. 모노레포 폐기 후 stale한 경로도 같이 정리하고 싶어 함.

**How to apply:** hook을 다시 추가하자는 요청이 아니면 hook을 되살리지 말 것. "hooks" 같은 모호한 단어가 나오면 코드/문서/Claude Code 설정 중 무엇인지 먼저 확인할 것. `.claude/settings.json` 커밋은 `git add -f` 필요([[project_claude-dir-gitignored]]). 이전 상태는 `git show fd6e3cf~1:.claude/settings.json`으로 복구 가능.
