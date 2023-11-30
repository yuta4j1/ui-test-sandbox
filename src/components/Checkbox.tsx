import React from 'react'
import styled from 'styled-components'

const Check = styled.input`
  accent-color: red;
  cursor: pointer;
`

export const Checkbox: React.FC<{ id: string }> = ({id}) => {
  return <Check type="checkbox" id={id} />
}

export const StyledCheckbox = styled(Checkbox)`
  > input[type="checkbox"]:checked {
    accent-color: red;
  }
`
