import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { terraTxService } from './terra.tx'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const terraKmsService = (args: { apiKey: string; provider?: string; blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, testnet: boolean) {
      const body = JSON.parse(tx.serializedTransaction)
      const txService = terraTxService(args)
      return await txService.prepare(testnet, {
        ...body,
        fromPrivateKey,
      })
    },
  }
}
