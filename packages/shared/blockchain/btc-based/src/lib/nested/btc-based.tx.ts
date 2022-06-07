import { CancelablePromise, TransactionHashKMS } from '@tatumio/api-client'

export type BtcBasedTx<T, TX> = {
  sendTransaction: (body: T, options: { testnet: boolean }) => Promise<TransactionHashKMS>
  prepareSignedTransaction: (
    body: T,
    options: { testnet: boolean },
    apiCalls?: {
      btcGetTxByAddress: (address: string, pageSize: number, offset?: number) => CancelablePromise<Array<TX>>
    },
  ) => Promise<string>
}
