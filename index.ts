import { blake2AsU8a } from '@polkadot/util-crypto'
import * as multibase from 'multibase'

const doc = `{
  "polkadot:411f057b9107718c9624d6aa4a3f23c1/slip44:2086": [
    {
      "account": "4qBSZdEoUxPVnUqbX8fjXovgtQXcHK7ZvSf56527XcDZUukq",
      "description": "Treasury proposals transfers"
    },
    {
      "account": "4oHvgA54py7SWFPpBCoubAajYrxj6xyc8yzHiAVryeAq574G",
      "description": "Regular transfers"
    },
    {
      "account": "4taHgf8x9U5b8oJaiYoNEh61jaHpKs9caUdattxfBRkJMHvm"
    }
  ],
  "eip:1/slip44:60": [
    {
      "account": "0x8f8221AFBB33998D8584A2B05749BA73C37A938A",
      "description": "NFT sales"
    },
    {
      "account": "0x6b175474e89094c44da98b954eedeac495271d0f"
    }
  ]
}`

async function main() {
  const buffer = Buffer.from(doc)
  const hash = blake2AsU8a(buffer)
  const encoded = multibase.encode('base64urlpad', hash)
  console.log(Buffer.from(encoded).toString('utf-8'))
}

main()