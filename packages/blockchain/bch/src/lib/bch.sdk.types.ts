import { BchTransaction, BchTransactionKMS } from '@tatumio/api-client'

export type BchTransactionTypes = BchTransaction | BchTransactionKMS

export interface Signature {
  id: string
  index?: number
}
