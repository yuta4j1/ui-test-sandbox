import React, { useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
0% {
  opacity: 0;
  margin-top: 24px;
}
70% {
  opacity: 0.8;
  margin-top: -4px;
}
100% {
  opacity: 1;
  margin-top: 0px;
}
`

const fadeOut = keyframes`
from {
  opacity: 1;
  margin-top: 0px;
}
to {
  opacity: 0;
  margin-top: 24px;
}
`

const fadeOutRule = css(
  [
    '',
    ' 0.2s cubic-bezier(0.55,  0.055, 0.675, 0.19 );',
  ] as any as TemplateStringsArray,
  fadeOut
)

const fadeInRule = css(
  [
    '',
    ' 0.4s cubic-bezier(0.6,  -0.28,  0.735, 0.045);',
  ] as any as TemplateStringsArray,
  fadeIn
)

const Container = styled.div<{ closing?: boolean }>`
  background: #fff;
  padding: 12px;
  display: flex;
  box-shadow: 0px 0px 15px -9px #777777;
  max-width: 300px;
  animation: ${props => (props.closing ? fadeOutRule : fadeInRule)};
`

const Message = styled.span`
  font-size: 14px;
  flex-grow: 1;
`

const UndoButton = styled.button`
  color: #c7c7c7;
  border: none;
  background: transparent;
  cursor: pointer;
`

const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`

const Toast: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [closing, setClosing] = useState(false)

  return (
    <Container closing={closing}>
      <Message>{'Not Archived'}</Message>
      <UndoButton>Undo</UndoButton>
      <CloseButton
        onClick={() => {
          requestAnimationFrame(() => setClosing(true))
          setTimeout(() => {
            onClose()
          }, 200)
        }}
      >
        ✖️
      </CloseButton>
    </Container>
  )
}

const ToggleButton = styled.button`
  cursor: pointer;
  margin-bottom: 24px;
`

export const ToastContainer = () => {
  const [show, setShow] = useState(false)
  return (
    <div aria-live="polite" aria-atomic="true">
      <ToggleButton onClick={() => setShow(true)}>Show Toast</ToggleButton>
      {show && <Toast onClose={() => setShow(false)} />}
    </div>
  )
}
