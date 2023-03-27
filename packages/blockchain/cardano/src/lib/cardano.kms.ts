import { Blockchain } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { PendingTransaction } from '@tatumio/api-client'

export const cardanoKmsService = (args: { blockchain: Blockchain }, signKmsTransaction: (tx: PendingTransaction, privateKeys: string[], options: { testnet: boolean }) => Promise<string>) => {
  return {
    ...abstractBlockchainKms(args),
    sign: signKmsTransaction,
  }
}
