import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IoMdArrowDropdown } from 'react-icons/io'

const Wrapper = styled.div`
  position: relative;
`

const SelectContainer = styled.button`
  border: 1px solid;
  border-radius: 4px;
  display: flex;
  align-items: center;
  min-height: 20px;
  width: 200px;
  cursor: pointer;
`

const SelectedValueContainer = styled.div`
  margin-right: 8px;
  width: 100%;
`

const IconContainer = styled.div`
  padding: 0 8px;
`

const SelctorOptionContainer = styled.div`
  position: absolute;
  z-index: 2;
`

const SelectorOptionList = styled.ul`
  list-style: none;
`

const SelectorOptionStyle = styled.li<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#e0e0e0' : '#fff')};
  padding: 4px;
  cursor: pointer;
`

const AccessibleSelectorContainer = styled.div`
  margin-top: 5rem;
  padding: 3rem;
`

const OptionsBox = styled.div`
  padding: 8px;
  border: 1px solid #000;
  border-radius: 8px;
  curor: pointer;
`

const ListItem = styled.li<{ $selected?: boolean }>`
  padding: 8px 2rem;
  border-radius: 4px;
  list-style: none;
  cursor: pointer;
  background: ${props => (props.$selected ? '#90bbd1' : '#fff')};
  color: ${props => (props.$selected ? '#fff' : '#000')};
`

const dataOptions: SelectOption[] = [
  {
    id: 'aaa',
    value: 'abcdefghij',
  },
  {
    id: 'bbb',
    value: 'sdjf;oasfao;d',
  },
  {
    id: 'ccc',
    value: 'xhuoidjfkx',
  },
  {
    id: 'ddd',
    value: 'yraewulfsnf',
  },
  {
    id: 'eee',
    value: 'kkkyudfoadsffa',
  },
]

type SelectOption = {
  id: string
  value: string
}

const options: SelectOption[] = [
  {
    id: 'aaa',
    value: 'test1',
  },
  {
    id: 'b',
    value: 'test2',
  },
  {
    id: 'cccc',
    value: '333333',
  },
]

const SelectorPage: React.FC<{}> = ({}) => {
  const [selected, setSelected] = useState<SelectOption | null>(null)
  const [isOptionOpen, toggleOptionOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const optionBoxRef = useRef<HTMLDivElement | null>(null)

  return (
    <main>
      <h2>Selector Sandbox</h2>
      <Wrapper>
        <SelectContainer
          onClick={() => toggleOptionOpen(v => !v)}
          aria-expanded={isOptionOpen}
          aria-haspopup={'listbox'}
          onKeyDown={() => toggleOptionOpen(v => !v)}
        >
          <SelectedValueContainer>
            {selected?.value ?? ''}
          </SelectedValueContainer>
          <IconContainer>
            <IoMdArrowDropdown size={18} />
          </IconContainer>
        </SelectContainer>
        {isOptionOpen && (
          <SelectorOptions
            values={options}
            setValue={(v: SelectOption | null) => {
              setSelected(v)
              toggleOptionOpen(false)
            }}
            selectedOption={selected}
          />
        )}
      </Wrapper>
      <select>
        {options.map(v => (
          <option key={v.id}>{v.value}</option>
        ))}
      </select>
      <AccessibleSelectorContainer
        onClick={() => optionBoxRef.current?.focus()}
      >
        <OptionsBox
          ref={optionBoxRef}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              for (const value of dataOptions.entries()) {
                if (value[1].id === selectedOptions[0]) {
                  if (value[0] === dataOptions.length - 1) {
                    setSelectedOptions([dataOptions[0].id])
                  } else {
                    setSelectedOptions([dataOptions[value[0] + 1].id])
                  }
                  break
                }
              }
            }
            if (e.key === 'ArrowUp') {
              for (const value of dataOptions.entries()) {
                if (value[1].id === selectedOptions[0]) {
                  if (value[0] === 0) {
                    setSelectedOptions([dataOptions[dataOptions.length - 1].id])
                  } else {
                    setSelectedOptions([dataOptions[value[0] - 1].id])
                  }
                  break
                }
              }
            }
          }}
        >
          <ul role="option">
            {dataOptions.map(v => (
              <ListItem
                key={v.id}
                role="presentation"
                onClick={e => {
                  e.preventDefault()
                  optionBoxRef.current?.focus()
                  if (selectedOptions.includes(v.id)) {
                    setSelectedOptions(
                      selectedOptions.filter(vv => vv !== v.id)
                    )
                  } else {
                    // shift key
                    // setSelectedOptions([...selectedOptions, v.id])
                    if (e.metaKey && !e.ctrlKey) {
                      console.log('control')
                      setSelectedOptions([...selectedOptions, v.id])
                    } else {
                      setSelectedOptions([v.id])
                    }
                  }
                }}
                $selected={selectedOptions.includes(v.id)}
                aria-selected={selectedOptions.includes(v.id)}
              >
                {v.value}
              </ListItem>
            ))}
          </ul>
        </OptionsBox>
      </AccessibleSelectorContainer>
    </main>
  )
}

const SelectorOptions: React.FC<{
  values: SelectOption[]
  setValue: (v: SelectOption | null) => void
  selectedOption: SelectOption | null
}> = ({ values, setValue, selectedOption }) => {
  const [selectedId, setSelectedId] = useState(selectedOption?.id)
  const listRef = useRef<HTMLUListElement | null>(null)
  useEffect(() => {
    listRef.current?.focus()
  }, [])
  return (
    <SelctorOptionContainer tabIndex={0}>
      <SelectorOptionList
        role="listbox"
        tabIndex={-1}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            if (selectedId) {
              const idx = values.findIndex(v => v.id === selectedId)
              if (values.length === idx + 1) {
                setSelectedId(values[0].id)
              } else {
                setSelectedId(values[idx + 1].id)
              }
            } else {
              setSelectedId(values[0].id)
            }
          } else if (e.key === 'ArrowUp') {
            if (selectedId) {
              const idx = values.findIndex(v => v.id === selectedId)
              if (idx === 0) {
                setSelectedId(values[values.length - 1].id)
              } else {
                setSelectedId(values[idx - 1].id)
              }
            } else {
              setSelectedId(values[0].id)
            }
          } else if (e.key === 'Enter') {
            setValue(values.find(v => v.id === selectedId) ?? null)
          }
        }}
        ref={listRef}
      >
        {values.map(v => (
          <SelectorOptionStyle
            key={v.id}
            onClick={() => setValue(v)}
            tabIndex={0}
            role="option"
            selected={v.id === selectedId}
            aria-selected={v.id === selectedOption?.id}
          >
            {v.value}
          </SelectorOptionStyle>
        ))}
      </SelectorOptionList>
    </SelctorOptionContainer>
  )
}

export default SelectorPage
