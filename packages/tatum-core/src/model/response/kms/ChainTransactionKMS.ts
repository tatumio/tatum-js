import { WithdrawalResponseData } from '../offchain/WithdrawalResponse'

export class ChainTransactionKMS {
  public id: string

  public serializedTransaction: string

  public hashes: string[]

  public txId?: string

  public withdrawalId?: string

  public index?: number

  public withdrawalResponses?: WithdrawalResponseData[]
}
