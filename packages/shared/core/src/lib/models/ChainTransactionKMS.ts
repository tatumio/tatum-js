import { PendingTransaction } from '@tatumio/api-client'

export type ChainTransactionKMS = Omit<PendingTransaction, 'chain'>
