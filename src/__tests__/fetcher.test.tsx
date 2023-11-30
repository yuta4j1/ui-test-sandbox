import { render, screen } from '@testing-library/react'
import { SampleRequest } from '../components/Fetcher/SampleRequest'
import '@testing-library/jest-dom'
import { mockGetHello } from '../api/mock'

describe('<Fetcher /> テスト', () => {
  test('success fetch hello', async () => {
    mockGetHello()
    render(<SampleRequest />)
    expect(await screen.findByText(/test ok!/i)).toBeInTheDocument()
  })

  test('error fetch hello', async () => {})
})
