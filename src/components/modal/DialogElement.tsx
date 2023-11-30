import { useRef } from 'react'

export const DialogElement = () => {
  const elmRef = useRef<HTMLDialogElement | null>(null)

  return (
    <>
      <button onClick={() => elmRef.current?.showModal()}>OpenMopdal</button>
      <dialog ref={elmRef} onClick={() => elmRef.current?.close()}>
        <section>
          <h2>Dialog Contents</h2>
          <div>Element</div>
        </section>
      </dialog>
    </>
  )
}
