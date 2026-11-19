import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { SiteProfile } from '@/types/profile.types'

export default function SocialSection({ profile }: { profile: SiteProfile }) {
  return (
    <div className="section">
      <h2 className="section-title">소셜</h2>
      <div className="card">
        <a href={profile.homepageUrl} className="list-item" target="_blank" rel="noopener noreferrer">
          <span className="item-label">GospelFix 홈페이지</span>
          <span className="item-value-group">
            <span className="item-value">가스펄픽스.com/layer</span>
            <span className="item-arrow">
              <ChevronRight />
            </span>
          </span>
        </a>
        <a href="https://instagram.com/gospelfix_creative" className="list-item" target="_blank" rel="noopener noreferrer">
          <span className="item-label">Instagram</span>
          <span className="item-value-group">
            <span className="item-value">@gospelfix_creative</span>
            <span className="item-arrow">
              <ChevronRight />
            </span>
          </span>
        </a>
        <Link href="/churchministry" className="list-item">
          <span className="item-label">교회 사역 보기</span>
          <span className="item-value-group">
            <span className="item-arrow">
              <ChevronRight />
            </span>
          </span>
        </Link>
      </div>
    </div>
  )
}
