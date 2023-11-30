import React, { useRef, useEffect, Suspense } from 'react'
import { DataLoader } from './DataLoader'
import { ConventionalDataLoader } from './ConventionalDataLoader'
import { SampleRequest } from './SampleRequest'

export const Fetcher: React.FC<{}> = ({}) => {
  return (
    <main>
      <h1>Data Fetch Test</h1>
      <section>
        <h2>Suspense</h2>
        <Suspense fallback={<p>loading...</p>}>
          <DataLoader />
        </Suspense>
        <ConventionalDataLoader />
      </section>
      <SampleRequest />
    </main>
  )
}
