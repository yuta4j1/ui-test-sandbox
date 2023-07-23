import process from 'node:process'
import fs from 'node:fs'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

const fastify = Fastify({
  logger: true,
})

fastify.register(cors, {
  origin: ['http://localhost:5173'],
})

fastify.register(multipart, {
  limits: {
    fileSize: 100000000, // For multipart forms, the max file size in bytes
    files: 2,
  },
})

const FILE_CHUNK_SIZE = 10 * 1024

fastify.post('/api/file', async function handler(request, reply) {
  const files = await request.files()
  if (!files) {
    return { result: 'failed' }
  }

  try {
    const writeStream = fs.createWriteStream('hoge.jpg')
    for await (const v of files) {
      console.log(" file type: ", v.type)
      const buffer = await v.toBuffer()
      for (let curr = 0; curr < buffer.length; curr += FILE_CHUNK_SIZE) {
        writeStream.write(
          buffer.subarray(curr, curr + FILE_CHUNK_SIZE),
          'utf-8',
          err => {
            if (err) {
              console.error('書き込みエラー:', err)
            }
          }
        )
      }
    }
    writeStream.end()

  } catch (err) {

  }

  try {
    // const buffer = await file.toBuffer()
    // const writeStream = fs.createWriteStream('hoge.jpg')
    // for (let curr = 0; curr < buffer.length; curr += FILE_CHUNK_SIZE) {
    //   writeStream.write(
    //     buffer.subarray(curr, curr + FILE_CHUNK_SIZE),
    //     'utf-8',
    //     err => {
    //       if (err) {
    //         console.error('書き込みエラー:', err)
    //       }
    //     }
    //   )
    // }
    
  } catch (err) {
    console.log('error!')
    // fileSize limit reached!
  }
  return { result: 'success' }
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
