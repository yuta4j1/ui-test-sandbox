import { FC, ReactElement, useState, useCallback, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  //   const MyModal: FC<{ text: string }> = useCallback(
  //     ({ text }) => {
  //       return (
  //         <Modal isOpen={isOpen}>
  //           <h1>モーダル</h1>
  //           <span>{text}</span>
  //           <button onClick={onClose}>閉じる</button>
  //         </Modal>
  //       )
  //     },
  //     [isOpen, onClose]
  //   )

  type RenderElementFunc = (props: { text: string }) => ReactElement

  const MyModal: RenderElementFunc = useCallback(
    ({ text }) => {
      useEffect(() => {
        console.log('Mount: MyModal Render!')
        return () => {
          console.log('Unmount : MyModal Render!')
        }
      }, [])

      return (
        <Modal isOpen={isOpen}>
          <h1>モーダル</h1>
          <span>{text}</span>
          <button onClick={onClose}>閉じる</button>
        </Modal>
      )
    },
    [isOpen]
  )

  return { MyModal, onOpen } as const
}
