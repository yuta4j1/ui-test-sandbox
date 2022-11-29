import { useState } from 'react'
import MyModal from './modal'
import Modal from 'react-modal'

// Modal.setAppElement('#root')

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [btnStatus, setBtnStatus] = useState(false)
  //   const [isRModal, setIsRModal] = useState(false)
  return (
    <main id="modal">
      <h1>モーダルページ</h1>
      <p>アクセシブルなモーダルを実装してみる。</p>
      <button onClick={() => setIsOpen(true)}>modal open</button>
      {/* <button onClick={() => setIsRModal(true)}>Rモーダル open</button> */}
      {isOpen && <MyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {/* {isRModal && (
        <Modal isOpen={isRModal}>
          <h2>AAA</h2>
          <button>hoge</button>
          <button>fuga</button>
        </Modal>
      )} */}
      <div>
        <button onClick={() => setBtnStatus(v => !v)} aria-label="トグルボタン">
          ➕
        </button>
        <p>{btnStatus ? '活性' : '非活性'}</p>
      </div>
    </main>
  )
}

export default ModalPage
