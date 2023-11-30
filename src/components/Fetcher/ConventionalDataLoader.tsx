import React, { useEffect, useState } from 'react'

const DataLoad = async () => {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('OK!!')
    }, 3000)
  })
}

export const ConventionalDataLoader: React.FC<{}> = () => {
  console.log('[Render] ConventionalDataLoader')
  const [data, setData] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await DataLoad()
      setData(res)
      setLoading(false)
    })()
  }, [])
  return <>{loading ? <p>loading...</p> : <p>Data is {data}</p>}</>
}
