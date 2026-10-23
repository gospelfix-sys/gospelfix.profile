# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

GospelFix 대표 소윤호의 공개 프로필 사이트. 과거 정적 HTML 사이트를 Next.js로 1:1 포팅한 재작성본이다. 단일 Next.js 14(App Router) 앱이며, 예전의 `frontend/` + `admin/` 모노레포 구조는 폐기되어 앱이 저장소 루트로 올라왔다. (`package.json`의 `name`이 아직 `"frontend"`인 것은 그 잔재다.)

## 명령어

패키지 매니저는 **Yarn** (`yarn.lock` 기준). 테스트 러너는 설정되어 있지 않다.

```bash
yarn dev          # 개발 서버 (localhost:3000)
yarn build        # 프로덕션 빌드
yarn lint         # next lint (ESLint 8 + next/core-web-vitals + next/typescript)
npx tsc --noEmit  # 타입체크 (strict)
```

- Supabase 초기 데이터 주입(1회성): `SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node supabase/seed.mjs` — service role 키는 로컬에서만 쓰고 커밋/배포 환경에 넣지 않는다. INSERT만 하므로 재실행하면 중복 생성된다.
- Supabase 스키마는 CLI 마이그레이션 없이 `supabase/schema.sql`을 대시보드에서 직접 실행한다. Supabase 관련 파일은 `docs/`가 아니라 `supabase/`에 둔다.

## 아키텍처

### 두 영역: 공개 프로필 vs 대시보드

- **공개 영역** (`src/app/profile/page.tsx`, `/`): 로그인과 무관. 루트 `src/app/page.tsx`는 `export { default } from './profile/page'` 한 줄로 `/`와 `/profile`이 같은 화면을 공유한다. 본문은 `profile/page.tsx` 한 곳에서만 수정한다.
- **대시보드 영역** (`src/app/(dashboard)/`): Supabase 인증 + Recoil이 필요한 미사용 스캐폴드. `RecoilProvider`/`AuthProvider`는 **루트 `layout.tsx`가 아니라 이 route group의 layout에만** 둔다 — 공개 페이지에서 불필요한 `supabase.auth.getSession()` 구독이 일어나지 않게 하려는 의도적 설계다. 공개 페이지에 Recoil/auth 의존성을 끌어들이지 말 것.

### 데이터 흐름 (Phase 1 → Phase 2 전환 중)

공개 페이지는 현재 `src/lib/profile-data.ts`의 하드코딩 픽스처(`SITE_PROFILE`, `BUSINESS_HOURS`, `PORTFOLIO_CARDS`, `MINISTRY_CARDS`)를 쓴다. Phase 2에서 Supabase 서버사이드 조회로 교체되고 이 파일은 삭제될 예정이다. 대응하는 테이블은 `supabase/schema.sql`의 `site_profile`, `business_hours`, `portfolio_cards`, `ministry_cards` (공개 읽기 + `is_admin()` 쓰기 RLS). 타입은 `src/types/profile.types.ts`.

- 카드 표시 순서 = 배열 순서. 정렬 로직이 없으니 순서 변경은 배열 순서를 직접 바꾼다.
- `src/lib/supabase/middleware.ts`는 모든 요청에서 세션 쿠키만 갱신하며 리다이렉트/보안 경계가 아니다. 환경변수가 없으면 조용히 건너뛴다. `env.ts`(`getSupabaseEnv`)도 `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY`가 비면 더미 값으로 대체한다 (대시보드에 실제 기능이 붙으면 production에서 throw하도록 바꿀 TODO가 코드에 있다).

### 스타일 레이어링 (순서 중요)

`layout.tsx`에서 `globals.css`(Tailwind preflight) → `styles/profile.css`(기존 디자인) 순으로 import한다. 같은 element 선택자(body 등)가 충돌하면 `profile.css`가 이기도록 이 순서를 유지해야 한다. 프로필 화면은 Tailwind 유틸이 아니라 `profile.css`의 클래스(`.gf-profile-page`, `.container` 등)와 CSS 변수(`--color-surface` 등)에 의존한다. 그래서 포털을 쓰는 컴포넌트(`QrShareSheet`, `BusinessHoursBadge`)는 `document.body`가 아니라 `.gf-profile-page` 노드에 포털한다. 새 오버레이를 만들 때도 같은 이유로 주의할 것.

대시보드/`components/ui/`는 shadcn/ui **base-nova** 스타일(`@base-ui/react` 기반)이다. `asChild` prop이 없으므로 링크 버튼은 `<Link className={buttonVariants()}>` 패턴을 쓴다. 디자인 토큰 문서는 `docs/01~09-*.md`.

### 기타

- 공유/QR/OG URL은 `src/lib/site-config.ts`의 `SITE_URL` 상수 한 곳에서 관리한다 (현재 vercel.app 임시 주소 — 커스텀 도메인 연결 시 변경).
- 이미지 에셋은 `public/images/`에 avif 위주. `@/*` → `./src/*` 경로 별칭.

## 개발 원칙 (`.claude/GOSPELFIX.md`)

구현 전 "GFix Craft 결정 사다리"를 따른다: 지금 꼭 필요한가 → 이미 `src/lib`·`hooks`·`store`에 있나 → Next.js 내장 → Supabase(Auth/RLS/Storage) → 설치된 패키지 → 기존 `lib/axios/`·`lib/supabase/` 패턴 → 10줄 인라인 → 최소 구현. 추상화는 세 번째 반복에서만 추출하고, `any`는 쓰지 않으며, 에러는 삼키지 않는다. 새 의존성(`yarn add`)은 근거를 문서화해야 한다. 설치된 패키지 목록은 `docs/TECH-STACK-PRIORITY.md` 참고. UI 버전 실험은 파일 복제가 아니라 컴포넌트 + `mode` prop으로 한다 (예: `ProfileHero`).

## 알려진 불일치 (stale)

저장소가 모노레포에서 단일 앱으로 바뀐 뒤 아직 정리되지 않은 곳들이다. 이 내용을 사실로 믿고 따르지 말 것.

- `.husky/pre-commit`은 `frontend/`·`admin/` 변경 시에만 빌드를 돌리므로 지금은 항상 "변경 없음 → 스킵"되고 `lint-staged`만 실행된다. `.husky/pre-push`는 `master|dev|prod` 브랜치 직접 작업을 막는다.
- `docs/ROADMAP.md`, `docs/TECH-STACK-PRIORITY.md`, `.claude/GOSPELFIX.md`는 `frontend/`+`admin/` 모노레포를 전제로 쓰여 있다. `.claude/agents/*.md`에도 옛 경로가 하드코딩되어 있다.
- `README.md`는 create-next-app 기본 문구다.
