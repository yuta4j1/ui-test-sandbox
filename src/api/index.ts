class InvalidURLError extends Error {}

const BASE_PATH = 'http://localhost:8080/api/'

type RequestError = {
  message: string
}

export const getRequest = async <T>(
  relativePath: string
): Promise<T | RequestError> => {
  try {
    // parse errorを起こしてみる
    const url = new URL(relativePath, BASE_PATH)

    const res = await fetch(url.toString())
    return res.json() as T
  } catch (err) {
    if (err instanceof TypeError) {
      throw new InvalidURLError()
    }
    return { message: 'error' }
  }
}
