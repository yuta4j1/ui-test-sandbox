import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  padding: 12px;
  color: black;
  background: #fff;
  border-radius: 8px;
  height: 80px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`

export const DraggableCard: React.FC<{
  id: string
  text: string
  dropHandler: (droppedId: string, selfId: string) => void
}> = ({ id, text, dropHandler }) => {
  return (
    <CardContainer
      draggable="true"
      onDragEnter={e => {
        e.preventDefault()
      }}
      onDragOver={e => {
        e.preventDefault()
      }}
      onDragStart={e => {
        e.dataTransfer.setData('text/plain', id)
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
