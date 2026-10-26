'use client'

import { useEffect, useState } from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useSheetMotion } from '@/hooks/useSheetMotion'

// 로드 전에는 스켈레톤을 보여주고, 로드/에러 시 이미지로 교체한다.
// 캐시된 이미지는 React가 onLoad를 붙이기 전에 로드가 끝날 수 있어 ref에서 complete를 확인한다.
function MockupImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`mockup-gallery-slide${loaded ? '' : ' is-loading'}`}>
      {!loaded && <div className="mockup-gallery-skeleton" aria-hidden />}
      <img
        ref={(el) => {
          if (el?.complete) setLoaded(true)
        }}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}

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
              <DialogPrimitive.Title className="qr-sheet-title">{title} PUP-UP 스토어</DialogPrimitive.Title>
              <DialogPrimitive.Close className="qr-sheet-close" aria-label="닫기">
                <X aria-hidden focusable={false} />
              </DialogPrimitive.Close>
            </div>
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={12} className="mockup-gallery-swiper">
              {images.map((src, i) => (
                <SwiperSlide key={src}>
                  <MockupImage src={src} alt={`${title} PUP-UP 스토어 ${i + 1}`} />
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
                  PUP-UP 스토어 FREE 구매하러 가기
                </a>
              </div>
            )}
          </DialogPrimitive.Popup>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
