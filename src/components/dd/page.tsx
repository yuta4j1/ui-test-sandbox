import { useState } from 'react'
import styled from 'styled-components'
import { DraggableCard } from './DraggableCard'

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid;
  padding: 24px;
  border-radius: 12px;
  gap: 24px;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: #e0ebeb;
  width: 300px;
  min-height: 500px;
  border-radius: 16px;
`

type CardProps = { id: string; text: string }

type ColumnWithCards = {
  [columnKey: string]: CardProps[]
}

const initialState: ColumnWithCards = {
  a: [
    { id: '1', text: 'hogehogefuga' },
    { id: '2', text: 'testtest' },
  ],
  b: [
    { id: '3', text: 'aaaaadiuads' },
    { id: '4', text: 'jsdjaidsiad' },
  ],
}

const visitData = (
  targetId: string,
  columnWithCards: ColumnWithCards
): CardProps | undefined => {
  for (const columnKey of Object.keys(columnWithCards)) {
    for (const card of columnWithCards[columnKey]) {
      if (card.id === targetId) {
        return card
      }
    }
  }
}

export const DragAndDropPage = () => {
  const [columnWithCards, setColumnWithCards] =
    useState<ColumnWithCards>(initialState)

  const swapCard = (droppedId: string, selfId: string): void => {
    const newDatas = Object.keys(columnWithCards).reduce((acc, curr) => {
      const cards = columnWithCards[curr]
      let newCards = cards.map(v => {
        if (v.id === droppedId) {
          return visitData(selfId, columnWithCards) ?? { id: '0', text: 'a' }
        } else if (v.id === selfId) {
          return visitData(droppedId, columnWithCards) ?? { id: '0', text: 'a' }
        } else {
          return v
        }
      })
      acc[curr] = newCards
      return acc
    }, {} as ColumnWithCards)
    setColumnWithCards(newDatas)
  }

  return (
    <PageContainer>
      <BoardContainer>
        {Object.keys(columnWithCards).map(v => (
          <ColumnContainer key={v}>
            {columnWithCards[v].map(card => (
              <DraggableCard key={card.id} {...card} dropHandler={swapCard} />
            ))}
          </ColumnContainer>
        ))}
      </BoardContainer>
    </PageContainer>
  )
}
