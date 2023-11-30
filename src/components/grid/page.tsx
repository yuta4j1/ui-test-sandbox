import React from 'react'
import styled from 'styled-components'

const GridBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  grid-template-rows: auto;
`

const Block = styled.div<{ color: string }>`
  height: 50px;
  border: 3px solid ${props => props.color};
`

const VariableBlock = styled(Block)`
  grid-column-start: 2;
`

type TestElement = { id: string; color: string; text?: string }

const elms: TestElement[] = [
  { id: '1', color: '#32a852', text: 'One' },
  { id: '2', color: '#3262a8', text: 'Two' },
  { id: '3', color: '#a83269', text: 'Three' },
  { id: '4', color: '#32a852', text: 'Four' },
  { id: '5', color: '#3262a8', text: 'Five' },
  { id: '6', color: '#3262a8', text: 'Six' },
  { id: '7', color: '#3262a8', text: 'Seven' },
]

export const GridPage = () => {
  return (
    <main>
      <h1>Hello! Grid Page</h1>
      <GridBlock>
        {elms.map(v =>
          v.id === '1' ? (
            <VariableBlock key={v.id} color={v.color}>
              {v.text ?? ''}
            </VariableBlock>
          ) : (
            <Block key={v.id} color={v.color}>
              {v.text ?? ''}
            </Block>
          )
        )}
      </GridBlock>
      <span>hogehgoe</span>
    </main>
  )
}
