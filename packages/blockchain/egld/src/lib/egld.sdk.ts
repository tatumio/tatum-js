import { Blockchain, httpHelper } from '@tatumio/shared-core'
import { BlockchainElrondNetworkEgldService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { egldOffchainService } from './services/egld.offchain'
import { egldRecord } from './services/egld.record'
import { egldWallet } from './services/egld.wallet'
import { egldTxService } from './services/egld.tx'
import { EgldSendTransaction } from './utils/egld.utils'
import { egldKmsService } from './services/egld.kms'

const blockchain = Blockchain.EGLD

export const TatumEgldSDK = (args: SDKArguments) => {
  const api = BlockchainElrondNetworkEgldService
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    api,
    kms: egldKmsService({ ...args, blockchain }),
    node: BlockchainElrondNetworkEgldService.egldNodeGet,
    offchain: egldOffchainService({ ...args, blockchain }),
    record: egldRecord(),
    wallet: egldWallet(),
    transaction: egldTxService({ ...args, blockchain }),
    blockchain: {
      broadcast: BlockchainElrondNetworkEgldService.egldBroadcast,
      getTransactionsCount: BlockchainElrondNetworkEgldService.egldGetTransactionCount,
      getCurrentBlock: BlockchainElrondNetworkEgldService.eGldGetCurrentBlock,
      getBlock: BlockchainElrondNetworkEgldService.egldGetBlock,
      getBlockchainAccountBalance: BlockchainElrondNetworkEgldService.egldGetBalance,
      getAccountErc20Balance: async (address: string, tokenId: string): Promise<number> =>
        httpHelper.get(`/v3/egld/account/esdt/balance/${address}/${tokenId}`),
      getTransaction: BlockchainElrondNetworkEgldService.egldGetTransaction,
      estimateGas: (body: EgldSendTransaction): Promise<number> => httpHelper.post('/v3/egld/gas', body),
    },
  }
}
