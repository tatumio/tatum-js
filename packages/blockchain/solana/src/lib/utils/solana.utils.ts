import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
// @ts-ignore
import { encode } from 'base-58'
import _ from 'lodash'

export const solanaUtils = {
  valueOrNull: <T>(value: T | undefined): T | null => {
    return _.isUndefined(value) ? null : value
  },
  valueOrThrow: <T>(value: T | undefined | null): T => {
    if (_.isNil(value)) {
      throw new Error('Value is null or undefined')
    }
    return value
  },
  toBase58: (bytes: string | Buffer | PublicKey | BN | number | number[]): string => {
    if (Buffer.isBuffer(bytes)) {
      return encode(bytes)
    } else if (typeof bytes === 'object' && 'toBase58' in bytes) {
      return bytes.toBase58()
    } else if (BN.isBN(bytes)) {
      return encode(bytes.toArray())
    } else {
      return encode(new BN(bytes, 'le').toArray())
    }
  },
}
