import { ec as EC } from 'elliptic'
import { keccak_256 } from 'js-sha3'

const hexChar2byte = (c: string) => {
  let d = 0

  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
  else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0)

  return d
}

const isHexChar = (c: string) => {
  if ((c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f') || (c >= '0' && c <= '9')) {
    return 1
  }

  return 0
}

// TODO: should return Uint8Array
const hexStr2byteArray = (str: string): any => {
  const byteArray = []
  let d = 0
  let j = 0
  let k = 0

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i)

    if (isHexChar(c)) {
      d <<= 4
      d += hexChar2byte(c)
      j++

      if (0 === j % 2) {
        byteArray[k++] = d
        d = 0
      }
    }
  }

  return byteArray
}

// @ts-ignore
const byte2hexStr = (byte) => {
  const hexByteMap = '0123456789ABCDEF'

  let str = ''
  str += hexByteMap.charAt(byte >> 4)
  str += hexByteMap.charAt(byte & 0x0f)

  return str
}

const byteArray2hexStr = (byteArray: Uint8Array) => {
  let str = ''

  for (const byte of byteArray) {
    str += byte2hexStr(byte)
  }

  return str
}

const computeAddress = (pubBytes: Uint8Array) => {
  if (pubBytes.length === 65) pubBytes = pubBytes.slice(1)

  const hash = keccak_256(pubBytes).toString()
  const addressHex = '41' + hash.substring(24)

  return hexStr2byteArray(addressHex)
}

const generatePubKey = (bytes: Buffer) => {
  const ec = new EC('secp256k1')
  const key = ec.keyFromPublic(bytes, 'bytes')
  const pubkey = key.getPublic()
  const x = pubkey.getX()
  const y = pubkey.getY()
  let xHex = x.toString('hex')
  while (xHex.length < 64) {
    xHex = '0' + xHex
  }
  let yHex = y.toString('hex')
  while (yHex.length < 64) {
    yHex = '0' + yHex
  }
  return '04' + xHex + yHex
}

export const generateAddress = (publicKey: Buffer) =>
  byteArray2hexStr(computeAddress(hexStr2byteArray(generatePubKey(publicKey))))
