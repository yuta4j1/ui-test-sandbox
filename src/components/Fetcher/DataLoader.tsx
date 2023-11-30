import React from 'react'

let data: string | null = null

export const DataLoader: React.FC<{}> = () => {
  console.log("[Render] DataLoader")
  if (!data) {
    throw new Promise<void>(resolve => {
      setTimeout(() => {
        data = 'OK!!!'
        resolve()
      }, 3000)
    })
  }
  return <p>Result: {data}</p>
}
