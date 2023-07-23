import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 24px;
  background: #f2f0f0;
`

const UploadButton = styled.button`
  max-width: 20rem;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  background: #23afb3ff;
  font-size: 18px;
  cursor: pointer;
`

const HiddenInput = styled.input`
  display: none;
`

const FileNameText = styled.span`
  color: #4dc292;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 8px;
`

const DraggableArea = styled.div`
  display: flex;
  border-radius: 12px;
  padding: 48px;
  jsutify-content: center;
  align-items: center;
  color: #000;
  background: #e1ebfc;
  border: 2px dotted #abc7f7;
  font-size: 12px;
  cursor: pointer;
`

const CHUNK_SIZE = 1024 * 1024 // 1MB

type Block = {
  idx: number
  chunk: Blob
}

const chunkFile = (data: File, chunkSize: number): Block[] => {
  let idx = 0
  let res: Block[] = []
  console.log('data.size', data.size)
  for (let curr = 0; ; curr += chunkSize) {
    res.push({
      idx: idx++,
      chunk: data.slice(curr, curr + chunkSize),
    })
    if (curr >= chunkSize) {
      break
    }
  }

  return res
}

const FileUploadPage: React.FC<{}> = ({}) => {
  const [fileA, setFileA] = useState<File | null>(null)
  const [fileB, setFileB] = useState<File | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const inputFileRef2 = useRef<HTMLInputElement | null>(null)
  const onFileInputClickHandler = () => {
    inputFileRef.current?.click()
  }
  const onFileInputClickHandler2 = () => {
    inputFileRef2.current?.click()
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!fileA) return
    console.log('data.size', fileA.size)
    const formData = new FormData()
    // for (const idx in files) {
    //   formData.append("uploadFile" + idx, files[idx]);
    // }
    // const uploadFile = chunkFile(fileA, CHUNK_SIZE)
    // for (const v of uploadFile) {
    //   formData.append('uploadFile' + v.idx, v.chunk)
    // }
    formData.append('uploadFile', fileA)
    if (fileB) {
      formData.append('uploadFile2', fileB)
    }

    try {
      let res = await fetch('http://localhost:8080/api/file', {
        method: 'POST',
        body: formData,
      })
      let resJson = await res.json()
      if (res.status === 200) {
        console.log(resJson)
      } else {
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <PageContainer>
      <SectionContainer>
        <h3>ボタンでのファイルアップロード</h3>
        <form onSubmit={handleSubmit}>
          <UploadButton onClick={onFileInputClickHandler}>
            ファイルをアップロードする
          </UploadButton>
          <HiddenInput
            type="file"
            ref={inputFileRef}
            onChange={e => {
              const files = e.target.files
              if (files && files?.length > 0) {
                setFileA(files.item(0))
              }
            }}
          />
          <input type="submit" value="送信する" />
        </form>
        {fileA !== null && <FileNameText>{fileA.name}</FileNameText>}
      </SectionContainer>
      <SectionContainer>
        <h3>ドロップダウンでのファイルアップロード</h3>
        <DraggableArea
          onClick={onFileInputClickHandler2}
          onDragOver={e => {
            e.preventDefault()
            console.log(e)
          }}
          onDrop={e => {
            e.preventDefault()
            const files = e.dataTransfer.files
            setFileB(files.item(0))
          }}
        >
          {fileB === null && 'ファイルをドラッグ&ドロップしてください'}
          {fileB !== null && fileB.name}
        </DraggableArea>
        <HiddenInput
          type="file"
          ref={inputFileRef2}
          onChange={e => {
            const files = e.target.files
            if (files && files?.length > 0) {
              setFileB(files.item(0))
            }
          }}
        />
        {fileB !== null && <FileNameText>{fileB.name}</FileNameText>}
      </SectionContainer>
      <button
        onClick={async () => {
          const res = await fetch('http://localhost:8080/api/hello', {
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // headers: {
            //   'Content-Type': 'application/json',
            // },
          })
          const data = await res.json()
          console.log(data)
        }}
      >
        データ確認
      </button>
    </PageContainer>
  )
}

export default FileUploadPage
