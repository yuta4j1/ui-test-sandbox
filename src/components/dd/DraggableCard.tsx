import { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

// ドラッグホバーした時、
const trans = keyframes`
  to {
    transform:translate(20px,50px);
  }
`

const animationRule = css(
  ['', ' 1 0.2s forwards;'] as any as TemplateStringsArray,
  trans
)

const CardContainer = styled.div<{ swappable: boolean }>`
  position: relative;
  padding: 12px;
  color: black;
  background: #fff;
  border-radius: 8px;
  height: 80px;
  cursor: grab;
  opacity: ${props => (props.swappable ? '0.4' : '1')};
  animation: ${props =>
    props.swappable
      ? css`
          ${animationRule}
        `
      : 'none'};
  &:active {
    cursor: grabbing;
  }
`

let draggingId = ''

// jotai とかのライブラリ使ってみる
// API的に、ドラッグ開始要素と、ホバーされた要素は、別の領域に持つ必要がありそう、、

export const DraggableCard: React.FC<{
  id: string
  text: string
  dropHandler: (droppedId: string, selfId: string) => void
}> = ({ id, text, dropHandler }) => {
  const [swappable, setSwappable] = useState(false)
  const el = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (el) {
      // console.log(el.current?.getBoundingClientRect())
    }
  }, [])
  return (
    <CardContainer
      ref={el}
      swappable={swappable}
      draggable="true"
      onDragEnter={e => {
        e.preventDefault()
        console.log('onDragEnter', text)
      }}
      onDragOver={e => {
        e.preventDefault()
        console.log('onDragOver', text)
        setSwappable(true)
      }}
      onDragLeave={e => {
        if (draggingId !== id) {
          setSwappable(false)
        }
      }}
      onDragStart={e => {
        e.dataTransfer.setData('text/plain', id)
        draggingId = id
        setSwappable(true)
      }}
      onDragEnd={() => {
        setSwappable(false)
      }}
      onDrop={e => {
        const droppedCardId = e.dataTransfer.getData('text/plain')
        dropHandler(droppedCardId, id)
      }}
    >
      {text}
    </CardContainer>
  )
}
