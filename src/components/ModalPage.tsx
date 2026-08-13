import { useState, Profiler, useEffect } from 'react'
import MyModal from './modal'
import Modal from 'react-modal'
import { DialogElement as DialogModal } from './modal/DialogElement'
import { useModal } from './modal/useModal'

Modal.setAppElement('#root')

const NotMyModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  text: string
}> = ({ isOpen, onClose, text }) => {
  useEffect(() => {
    console.log('Mount')
    return () => {
      console.log('unmount')
    }
  }, [])
  return (
    <Modal isOpen={isOpen}>
      <h1>{text}</h1>
      <button onClick={onClose}>閉じる</button>
    </Modal>
  )
}

const Toggle = () => {
  const [type, setType] = useState<'a' | 'b'>('a')
  useEffect(() => {
    console.log('Mount Toggle.')
    return () => {
      console.log('Unmount Toggle.')
    }
  }, [])
  return (
    <div>
      <button
        onClick={() =>
          setType(v => {
            if (v === 'a') {
              return 'b'
            } else {
              return 'a'
            }
          })
        }
      >
        変換
      </button>
      <span>{type}</span>
    </div>
  )
}

const ModalPage = () => {
  const { MyModal, onOpen } = useModal()
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [showToggle, setShowToggle] = useState(false)
  const [btnStatus, setBtnStatus] = useState(false)
  return (
    <main id="modal">
      <h1>モーダルページ</h1>
      <p>アクセシブルなモーダルを実装してみる。</p>
      <button onClick={() => setIsOpen(true)}>modal open</button>
      {/* <button onClick={() => setIsRModal(true)}>Rモーダル open</button> */}
      <input type="text" onChange={e => setText(e.target.value)} />
      <NotMyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={text}
      />

      <button onClick={onOpen}>Hooks開く</button>
      {/* <Profiler
        id="RenderPropsModal"
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime
        ) => {
          console.log(`ID: ${id} is Rendered.`)
          console.log(`Phase: ${phase}`)
          console.log('actualDuration', actualDuration)
          console.log('commitTime', commitTime)
        }}
      >
        <MyModal text={'aaa'} />
      </Profiler> */}
      {MyModal({ text: 'aaaa' })}
      <div>
        <button onClick={() => setBtnStatus(v => !v)} aria-label="トグルボタン">
          ➕
        </button>
        <p>{btnStatus ? '活性' : '非活性'}</p>
      </div>
      <button onClick={() => setShowToggle(v => !v)}>Toggle表示/非表示</button>
      {showToggle && <Toggle />}
      <DialogModal />
    </main>
  )
}

export default ModalPage
