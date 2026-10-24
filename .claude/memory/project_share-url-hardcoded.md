---
name: project-share-url-hardcoded
description: 공유/QR/OG메타데이터가 쓰는 SITE_URL은 window.location.href 대신 고정 상수 — 현재 gospelfix.com 도메인 미연결로 vercel.app 임시 지정 상태
metadata:
  node_type: memory
  type: project
  originSessionId: c7003524-b320-40d3-9e17-70aac91f29b7
  modified: 2026-10-16T04:10:17.089Z
---

(2026-10-16 갱신: Next.js 마이그레이션으로 구 정적 사이트의 `assets/js/qr.js`/`app.js` 경로는 더 이상 존재하지 않음. 현재는 `frontend/src/lib/site-config.ts`의 `SITE_URL` 단일 상수로 통합됨.)

`frontend/src/lib/site-config.ts`의 `SITE_URL`은 `window.location.href`(현재 페이지 주소)를 쓰지 않고 고정 문자열이다. `frontend/src/app/layout.tsx`(OG/canonical 메타데이터), `frontend/src/components/profile/QrShareSheet.tsx`(QR코드), `frontend/src/hooks/useShareProfile.ts`(공유 버튼) 세 곳이 이 상수를 가져다 쓴다.

**Why:** 로컬 개발 서버 주소나 임시 배포 주소가 QR코드·공유 링크·OG 썸네일에 그대로 노출되는 걸 막기 위해 실행 환경에 의존하지 않는 상수로 고정했다(기존 정적 사이트 시절부터의 설계 의도 계승).

**2026-10-16 발견한 함정:** `SITE_URL`이 `https://gospelfix.com`으로 하드코딩돼 있었는데, 실제로는 `gospelfix.com` 도메인이 **이 Vercel 프로젝트(profile-eta-red.vercel.app)에 연결되어 있지 않고** 완전히 다른 기존 사이트("GospelFix - Curated Gospel News", Cloudflare+LiteSpeed 서버)를 가리키고 있었다. 그래서 `og:image`가 `gospelfix.com/images/...`를 참조 → 404 → 카카오톡 공유 시 제목/설명은 뜨는데 썸네일만 안 뜨는 증상이 발생했다(`og:title`/`og:description`은 값이 HTML에 직접 박히지만 `og:image`는 URL이라 크롤러가 별도로 재요청하기 때문).

사용자 선택에 따라 `SITE_URL`을 `https://profile-eta-red.vercel.app`로 **임시 변경**해둔 상태(커밋 `2b568ed`). code-reviewer가 "나중에 `NEXT_PUBLIC_SITE_URL` 환경변수로 분리하면 도메인 연결 시 재배포 없이 전환 가능"이라고 제안했으나 이번 핫픽스 범위에서는 보류함.

**How to apply:** gospelfix.com 도메인을 Vercel 프로젝트에 실제로 연결하면(Vercel Settings → Domains) `site-config.ts`의 `SITE_URL`을 다시 `https://gospelfix.com`으로 되돌려야 한다 — 되돌리는 걸 잊으면 영원히 vercel.app 주소로 공유/QR/OG가 나간다. 반대로 배포 주소(vercel.app 프로젝트명 등)가 바뀌는 경우에도 이 한 곳만 고치면 된다(구 정적 사이트 시절과 달리 지금은 단일 상수라 여러 파일을 동기화할 필요 없음).

---
**⚠️ 2026-10-24 — 현재 배포 주소 불명 + 미커밋 SITE_URL 변경이 위험:** 사용자가 `SITE_URL`을 `https://gospelfix-ashy.vercel.app`로 바꿔달라고 해 작업 트리에 반영했으나(미커밋), curl 확인 결과 그 도메인 루트는 **'모다(MODA)'라는 다른 사이트**(og:url=gospelfix.vercel.app)이고 `/images/profile.jpg`도 404 → 그대로 푸시하면 공유/QR이 MODA로 가고 og:image가 깨진다. 기존 값 `profile-eta-red.vercel.app`도 같은 날 루트·이미지 모두 404라 이 프로필 사이트의 실제 Production 도메인은 확인되지 않았다. `homepageUrl`(`gospelfix-ashy.vercel.app/layer`, 홈페이지 링크)과 `SITE_URL`(이 프로필 자신의 주소)은 서로 다른 개념이니 같은 도메인이라고 가정하지 말 것.

**How to apply:** `site-config.ts`가 `gospelfix-ashy`로 바뀐 채 커밋되려 하면 막고, Vercel 대시보드(이 저장소 프로젝트의 Production 도메인)를 사용자에게 확인받은 뒤 그 값으로 설정한다. 사용자의 선택(site-config 제외 4파일 먼저 커밋 vs 도메인 확인 후 5파일 커밋)은 이 메모 작성 시점에 미응답. 위 본문의 `frontend/` 경로는 모노레포 시절 표기이며 지금은 `src/...`.
