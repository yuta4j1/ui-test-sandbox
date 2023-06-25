import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserNameForm from '../components/Form'
import '@testing-library/jest-dom'

describe('<UserNameForm /> テスト', () => {
  test('FirstNameが空', async () => {
    render(<UserNameForm />)
    const submitButton = screen.getByText('確定する')
    // 「確定」ボタンをクリック
    userEvent.click(submitButton)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).toHaveTextContent('firstNameは必須入力です。')
  })

  test('FirstNameに5文字入力し、エラーメッセージが表示されない', async () => {
    render(<UserNameForm />)
    const firstNameInput = screen.getByLabelText('FirstName')
    userEvent.type(firstNameInput, 'aaaaa')
    const submitButton = screen.getByText('確定する')
    // 「確定」ボタンをクリック
    userEvent.click(submitButton)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).not.toHaveTextContent('firstNameは必須入力です。')
  })

  test('FirstNameに5文字の全角文字を入力し、エラーメッセージが表示されない', async () => {
    render(<UserNameForm />)
    const firstNameInput = screen.getByLabelText('FirstName')
    userEvent.type(firstNameInput, 'あいうえお')
    const submitButton = screen.getByText('確定する')
    // 「確定」ボタンをクリック
    userEvent.click(submitButton)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).not.toHaveTextContent('firstNameは必須入力です。')
  })

  test('FirstNameに6文字入力し、エラーメッセージが表示される', async () => {
    render(<UserNameForm />)
    const firstNameInput = screen.getByLabelText('FirstName')
    await userEvent.type(firstNameInput, 'bbbbbb')
    const submitButton = screen.getByText('確定する')
    // 「確定」ボタンをクリック
    userEvent.click(submitButton)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).toHaveTextContent(
      'firstNameは5文字以下で入力してください。'
    )
  })

  test('FirstNameに6文字の全角文字を入力し、エラーメッセージが表示される', async () => {
    render(<UserNameForm />)
    const firstNameInput = screen.getByLabelText('FirstName')
    await userEvent.type(firstNameInput, 'ウカムルバス')
    const submitButton = screen.getByText('確定する')
    // 「確定」ボタンをクリック
    userEvent.click(submitButton)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).toHaveTextContent(
      'firstNameは5文字以下で入力してください。'
    )
  })

  test('要素が複数エラーになった際、先頭の要素にフォーカスが当たっていること', async () => {
    render(<UserNameForm />)
    // 何も入力せず、「確定」ボタンをクリック
    await userEvent.click(screen.getByText('確定する'))
    const activeElm = document.activeElement
    expect(activeElm).toBe(screen.getByLabelText('FirstName'))
  })

  test('日付項目に過去日付を入力するとエラーメッセージが表示される', async () => {
    const OriginalDate = Date
    const dateToUse = new Date('2023-01-01')
    jest.spyOn(globalThis, 'Date').mockImplementation(arg => {
      return arg ? new OriginalDate(arg) : dateToUse
    })
    render(<UserNameForm />)
    // 入力項目に任意の値を入力し、エラーメッセージを抑制する
    await userEvent.type(screen.getByLabelText('FirstName'), 'aaa')
    await userEvent.type(screen.getByLabelText('LastName'), 'bbb')
    await userEvent.type(screen.getByLabelText('Date'), '2021-06-21')
    await userEvent.click(screen.getByText('確定する'))
    console.log(screen.getByLabelText('Date').innerHTML)
    const alertElms = await screen.findAllByRole('alert')
    expect(alertElms[0]).toHaveTextContent('過去日付は選択できません')
  })
})
