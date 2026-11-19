import type { Metadata } from 'next'
import Link from 'next/link'
import { MINISTRY_CARDS } from '@/lib/profile-data'
import MinistryCarousel from '@/components/profile/MinistryCarousel'
import Footer from '@/components/profile/Footer'

export const metadata: Metadata = {
  title: '교회 사역 | GospelFix',
  alternates: { canonical: '/churchministry' },
}

export default function ChurchMinistryPage() {
  return (
    <div className="gf-profile-page">
      <div className="container">
        <MinistryCarousel cards={MINISTRY_CARDS} />

        <div className="section flex justify-center">
          <Link href="/" className="ministry-card-btn ministry-card-btn--outline max-w-[200px]">
            프로필로 돌아가기
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  )
}
