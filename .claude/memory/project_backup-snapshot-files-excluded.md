---
name: project-backup-snapshot-files-excluded
description: index_2.html/assets_v2 백업 스냅샷은 2026-09-15에 사용자 요청으로 완전 삭제됨 (더 이상 존재하지 않음)
metadata: 
  node_type: memory
  type: project
  originSessionId: 43c78fa0-e62e-4f5a-8ed4-ce2810056d1e
  modified: 2026-09-15T06:55:32.645Z
---

`index_2.html`과 `assets_v2/`는 리디자인 이전 상태를 보존하던 백업 스냅샷이었으나, **2026-09-15 사용자가 명시적으로 삭제를 요청**하여 커밋 `cf2dc4e`(🗂️ File: 리디자인 이전 백업 스냅샷 삭제)로 저장소에서 완전히 제거됐다. 더 이상 이 저장소에 존재하지 않는다.

**Why:** 이전(2026-09-14)에는 "전역 변경 시 기본 제외" 방침이 유효했지만, 이는 어디까지나 파일이 존재하는 동안 부주의하게 건드리지 않기 위한 기본값이었을 뿐 영구 보존 규칙은 아니었다. 사용자가 "index_2.html 관련된 모든 것 다 삭제해"라고 명시적으로 지시했고, 다른 파일에서 참조가 전혀 없음을 확인한 뒤 삭제했다.

**How to apply:** 이 저장소에서 `index_2.html`이나 `assets_v2/`를 언급하는 작업을 받으면, 더 이상 존재하지 않는 파일이라는 점을 인지한다. 혹시 유사한 백업 스냅샷 파일이 새로 생기면(예: `index_3.html` 등) 이 메모리를 참고하되, 존재 여부는 먼저 확인할 것.
