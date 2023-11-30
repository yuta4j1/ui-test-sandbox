import * as Fetcher from '.'

const mockData = { result: 'test ok!' }

export function mockGetHello() {
  return jest.spyOn(Fetcher, 'getRequest').mockResolvedValueOnce(mockData)
}
