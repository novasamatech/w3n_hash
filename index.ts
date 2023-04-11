import { blake2AsU8a } from '@polkadot/util-crypto'
import * as multibase from 'multibase'
import * as https from 'https'

async function main(url: string) {
  const response = await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res
      if (statusCode !== 200) {
        reject(new Error(`Request failed with status code ${statusCode}`))
        return
      }
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        resolve(rawData)
      })
    }).on('error', (e) => {
      reject(new Error(`Request failed with error ${e.message}`))
    })
  })
  console.log("Data to encode:\n", response)
  const buffer = Buffer.from(response as string)
  const hash = blake2AsU8a(buffer)
  const encoded = multibase.encode('base64urlpad', hash)
  console.log(Buffer.from(encoded).toString('utf-8'))
}

main("https://url/to/yours/file")
