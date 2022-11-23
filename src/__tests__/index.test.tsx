import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserNameForm from '../components/Form'


test('全ての要素が空', async () => {
  render(<UserNameForm />)
  const inputFirstName = screen.getByLabelText('FirstName')
  fireEvent.change(inputFirstName, { target: { value: '' } })
  const inputLastName = screen.getByLabelText('LastName')
  fireEvent.change(inputLastName, { target: { value: '' } })
  const submitButton = screen.getByText('次の画面へ')
  // 「次の画面へ」ボタンをクリック
  fireEvent.click(submitButton)
  await waitFor(() => {
    expect(screen.getByText('FirstNameは必須入力です。')).toBeTruthy()
    expect(screen.getByText('LastNameは必須入力です。')).toBeTruthy()
  })
})
