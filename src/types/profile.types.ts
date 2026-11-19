export type HeroMode = 'classic' | 'gradient'

export interface SiteProfile {
  name: string
  imageUrl: string
  subtitle: string
  company: string
  companyEn: string
  roleLines: string[]
  tags: string[]
  email: string
  phone: string
  phoneHref: string
  homepageUrl: string
}

// day: JS Date.prototype.getDay() 기준(0=일 ~ 6=토). open/close가 null이면 휴무.
export interface BusinessHourEntry {
  day: number
  label: string
  open: string | null
  close: string | null
}

export interface CardIcon {
  viewBox: string
  paths?: string[]
  circles?: { cx: number; cy: number; r: number }[]
}

export interface CardData {
  id: number
  title: string
  titleSuffix: string
  subtitle: string
  date: string
  info: string
  link: string
  tags: string[]
  // 있으면 두 번째 버튼(tags[1])이 링크 이동 대신 이 이미지들을 팝업 갤러리로 연다.
  // TODO(Phase 2): ministry_cards에 mockup_images TEXT[] 컬럼이 없다 — Supabase 전환 시 추가할 것.
  mockupImages?: string[]
  // 있으면 갤러리 하단에 "PUP-UP 스토어 FREE 구매하러 가기" 버튼이 표시된다.
  mockupPurchaseUrl?: string
  imageType: 'image' | 'icon'
  imageUrl: string | null
  icon?: CardIcon | null
  unavailable: boolean
  unavailableMessage: string | null
}
