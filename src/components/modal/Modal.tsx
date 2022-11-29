import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { hideOthers } from 'aria-hidden'
import { createFocusTrap } from 'focus-trap'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  background-color: #cbd5e1;
  opacity: 0.6;
`

const ModalSectionStyle = styled.section`
  position: fixed;
  top: 200;
  left: 0;
  z-index: 3;
  background-color: white;
`

const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)

const ModalDialog: React.FC<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setIsOpen }) => {
  const el = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen || el.current === null) {
      return
    }

    const onClose = () => setIsOpen(false)

    const trap = createFocusTrap(el.current, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      returnFocusOnDeactivate: true,
      onDeactivate: onClose,
      fallbackFocus: btnRef.current ?? undefined
    })
    trap.activate()

    return () => {
      trap.deactivate()
    }
  }, [el, isOpen, setIsOpen])

  return (
    <ModalSectionStyle ref={el}>
      <h2>Choosing an Apple</h2>
      <button ref={btnRef}>aaa</button>
      <p role="document">
        This document provides a guide to help with the important task of
        choosing the correct Apple.
      </p>
      <button onClick={() => setIsOpen(false)}>閉じる</button>
    </ModalSectionStyle>
  )
}

export const ModalContainer: React.FC<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setIsOpen }) => {
  const el = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen || el.current === null) {
      return
    }
    return hideOthers(el.current)
  }, [isOpen, el])

  return createPortal(
    <div role="dialog" aria-modal="true" tabIndex={-1} ref={el}>
      <Backdrop tabIndex={-1} onClick={() => setIsOpen(false)} />
      <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>,
    modalRoot
  )
}
