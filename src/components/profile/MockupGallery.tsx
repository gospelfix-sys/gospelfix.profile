'use client'

import { useEffect, useState } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useSheetMotion } from '@/hooks/useSheetMotion'

// QrShareSheet와 같은 이유로 .gf-profile-page에 포털한다(CSS 변수가 그 노드에만 스코프됨).
// 시트/딤 스타일은 .qr-sheet-* 클래스를 재사용하고 갤러리 본문만 .mockup-gallery-*로 추가한다.
export default function MockupGallery({
  title,
  images,
  label,
  className,
  purchaseUrl,
}: {
  title: string
  images: string[]
  label: string
  className: string
  purchaseUrl?: string
}) {
  const [open, setOpen] = useState(false)
  const { actionsRef, onOpenChange, backdropRender, popupRender } = useSheetMotion(open, setOpen)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalContainer(document.querySelector<HTMLElement>('.gf-profile-page'))
  }, [])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} actionsRef={actionsRef}>
      <DialogPrimitive.Trigger className={className} aria-label={`${title} ${label}`}>{label}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal container={portalContainer}>
        <div className="qr-sheet-root">
          <DialogPrimitive.Backdrop className="qr-sheet-backdrop" render={backdropRender} />
          <DialogPrimitive.Popup className="qr-sheet mockup-gallery" render={popupRender}>
            <div className="qr-sheet-handle" />
            <div className="qr-sheet-header">
              <DialogPrimitive.Title className="qr-sheet-title">{title} 목업</DialogPrimitive.Title>
              <DialogPrimitive.Close className="qr-sheet-close" aria-label="닫기">
                <X aria-hidden focusable={false} />
              </DialogPrimitive.Close>
            </div>
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={12} className="mockup-gallery-swiper">
              {images.map((src, i) => (
                <SwiperSlide key={src}>
                  <img src={src} alt={`${title} 목업 ${i + 1}`} loading="lazy" decoding="async" />
                </SwiperSlide>
              ))}
            </Swiper>
            {purchaseUrl && (
              <div className="qr-sheet-footer">
                <a
                  href={purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qr-sheet-save-btn mockup-gallery-buy-btn"
                >
                  목업 FREE 구매하러 가기
                </a>
              </div>
            )}
          </DialogPrimitive.Popup>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
