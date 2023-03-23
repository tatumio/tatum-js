// @ts-ignore
import coininfo from 'coininfo'
// @ts-ignore
import bcash from '@tatumio/bitcoincashjs2-lib'
import { networks } from 'bitcoinjs-lib'
import { Buffer } from 'buffer'
import cashaddr from 'cashaddrjs';


interface Hash {
  hash: Buffer
}

interface Bytes extends Hash {
  version: number
}

interface Decoded extends Hash {
  prefix: string
  type: string
  format: string
}

export const bcashAddressHelper = {
  getAddress: (address: string) => {
    try {
      return bcashAddressHelper.toLegacyAddress(address)
    } catch (e) {
      return address
    }
  },
  toLegacyAddress: (address: string) => {
    const { prefix, type, hash }: Decoded = cashaddr.decode(address)
    let bitcoincash = coininfo.bitcoincash.main
    switch (prefix) {
      case 'bitcoincash':
        bitcoincash = coininfo.bitcoincash.main
        break
      case 'bchtest':
        bitcoincash = coininfo.bitcoincash.test
        break
    }

    let version: number = bitcoincash.versions.public
    switch (type) {
      case 'P2PKH':
        version = bitcoincash.versions.public
        break
      case 'P2SH':
        version = bitcoincash.versions.scripthash
        break
    }

    const hashBuf: Buffer = Buffer.from(hash)

    return bcash.address.toBase58Check(hashBuf, version)
  },
  decode: (address: string): Decoded => {
    const { version, hash }: Bytes = bcash.address.fromBase58Check(address)

    let decoded: Decoded = {
      prefix: '',
      type: '',
      hash,
      format: '',
    }
    switch (version) {
      case networks.bitcoin.pubKeyHash:
        decoded = {
          prefix: 'bitcoincash',
          type: 'P2PKH',
          hash,
          format: 'legacy',
        }
        break
      case networks.bitcoin.scriptHash:
        decoded = {
          prefix: 'bitcoincash',
          type: 'P2SH',
          hash,
          format: 'legacy',
        }
        break
      case networks.testnet.pubKeyHash:
        decoded = {
          prefix: 'bchtest',
          type: 'P2PKH',
          hash,
          format: 'legacy',
        }
        break
      case networks.testnet.scriptHash:
        decoded = {
          prefix: 'bchtest',
          type: 'P2SH',
          hash,
          format: 'legacy',
        }
        break
    }
    return decoded
  },
}
