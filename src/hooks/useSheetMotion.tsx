'use client'

import { useRef } from 'react'
import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { motion, useReducedMotion } from 'motion/react'

// .qr-sheet-* 바텀시트(QrShareSheet, MockupGallery)가 공유하는 motion 진입/퇴장 처리.
// 닫힐 때 base-ui가 곧장 언마운트하지 않도록 막고(preventUnmountOnClose), 시트의 exit
// 애니메이션이 끝난 뒤 actionsRef.unmount()로 DOM에서 제거한다.
export function useSheetMotion(open: boolean, setOpen: (open: boolean) => void) {
  const actionsRef = useRef<DialogPrimitive.Root.Actions | null>(null)
  const reduceMotion = useReducedMotion()

  const onOpenChange = (next: boolean, details: DialogPrimitive.Root.ChangeEventDetails) => {
    if (!next) details.preventUnmountOnClose()
    setOpen(next)
  }

  const backdropRender = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
    />
  )

  const popupRender = (
    <motion.div
      initial="closed"
      animate={open ? 'open' : 'closed'}
      variants={{ open: { y: 0 }, closed: { y: '100%' } }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 38, mass: 0.9 }}
      onAnimationComplete={(definition) => {
        if (definition === 'closed') actionsRef.current?.unmount()
      }}
    />
  )

  return { actionsRef, onOpenChange, backdropRender, popupRender }
}
