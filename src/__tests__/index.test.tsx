import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserNameForm from '../components/Form'
import '@testing-library/jest-dom'

test('全ての要素が空', async () => {
  render(<UserNameForm />)
  const inputFirstName = screen.getByLabelText('FirstName')
  fireEvent.change(inputFirstName, { target: { value: 'hogehoge' } })
  const submitButton = screen.getByText('次の画面へ')
  // 「次の画面へ」ボタンをクリック
  fireEvent.click(submitButton)
  // expect(screen.getByRole('alert')).toBeFalsy()
})
