import React, { useEffect, useState } from 'react'
import { getRequest } from '../../api'

export const SampleRequest = () => {
  const [message, setMessage] = useState('')
  useEffect(() => {
    ;(async () => {
      const data = await getRequest<{ result: string }>('hello')
      console.log(data)
      setMessage((data as { result: string }).result)
    })()
  }, [])
  return (
    <div>
      <h3>SampleRequest</h3>
      <p>Data: {message}</p>
    </div>
  )
}
