import { TransactionKMS } from './TransactionKMS'

export type ChainTransactionKMS = Omit<TransactionKMS, 'chain'>
