import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserNameForm from '../components/Form'
import '@testing-library/jest-dom'

test('FirstNameが空', async () => {
  await act(async () => {
    render(<UserNameForm />)
  })
  const submitButton = screen.getByText('確定する')
  // 「確定」ボタンをクリック

  userEvent.click(submitButton)
  const alertElms = await screen.findAllByRole('alert')
  expect(alertElms[0]).toHaveTextContent('firstNameは必須入力です。')
})
