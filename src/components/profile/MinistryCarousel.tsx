import type { CardData } from '@/types/profile.types'
import CardCarousel from './CardCarousel'

export default function MinistryCarousel({ cards }: { cards: CardData[] }) {
  return (
    <div className="section ministry-section">
      <div className="section-header">
        <h2 className="section-title">교회 사역</h2>
      </div>
      <CardCarousel cards={cards} className="swiper ministry-swiper" />
    </div>
  )
}
