import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalPage from '../components/ModalPage'
import '@testing-library/jest-dom'

test('ボタンを押下すると、モーダルが開く', async () => {
  render(<ModalPage />)
  const modalButton = screen.getByText('modal open')
  userEvent.click(modalButton)

  // DOM更新など、期待結果を少し待つ必要がある場合は `waitFor` を使用する
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
