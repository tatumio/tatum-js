import { BchTx } from '@tatumio/api-client'

export type BchApiCallsType = {
    bchGetRawTransaction: (hash: string) => Promise<BchTx>
}

export * from './lib/bch.sdk'
export * from './lib/bch.sdk.wallet'
// export { BchTransactionTypes, bchTransactions } from './lib/services/bch.sdk.tx'
export * from './lib/bch.wallet.utils'
export * from './lib/bch.types'
