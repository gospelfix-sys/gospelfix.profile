// Phase 1 임시 데이터 로더 — 실제 값은 src/data/*.json에 있고, 이 파일은 타입만 입힌다.
// Phase 2에서 Supabase 조회로 교체되면 이 파일과 src/data/는 삭제된다.
// 배열 순서 = 화면 표시 순서(정렬 로직 없음). 순서를 바꾸려면 JSON 배열 순서를 직접 바꾼다.
import type { BusinessHourEntry, CardData, SiteProfile } from '@/types/profile.types'
import siteProfile from '@/data/site-profile.json'
import businessHours from '@/data/business-hours.json'
import portfolioCards from '@/data/portfolio-cards.json'
import ministryCards from '@/data/ministry-cards.json'

// JSON import는 리터럴 유니온('image' | 'icon')을 string으로 넓혀서 타입 단언이 필요하다.
export const SITE_PROFILE = siteProfile as SiteProfile
export const BUSINESS_HOURS = businessHours as BusinessHourEntry[]
export const PORTFOLIO_CARDS = portfolioCards as CardData[]
export const MINISTRY_CARDS = ministryCards as CardData[]
