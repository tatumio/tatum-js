import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainElrondNetworkEgldService } from '@tatumio/api-client'
import { egldRecord } from './services/egld.record'

const blockchain = Blockchain.EGLD

export const TatumEgldSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    record: egldRecord(),
    blockchain: {
      broadcast: BlockchainElrondNetworkEgldService.egldBroadcast,
      getBlock: BlockchainElrondNetworkEgldService.egldGetBlock,
      getCurrentBlock: BlockchainElrondNetworkEgldService.eGldGetCurrentBlock,
      generateWallet: BlockchainElrondNetworkEgldService.egldGenerateWallet,
      generateAddress: BlockchainElrondNetworkEgldService.egldGenerateAddress,
      generatePrivateKeyOfAddress: BlockchainElrondNetworkEgldService.egldGenerateAddressPrivateKey,
      getBalance: BlockchainElrondNetworkEgldService.egldGetBalance,
      getTransaction: BlockchainElrondNetworkEgldService.egldGetTransaction,
      getTransactionsSentFromAddress: BlockchainElrondNetworkEgldService.egldGetTransactionAddress,
      getCountOfTransactionSentFromAddress: BlockchainElrondNetworkEgldService.egldGetTransactionCount,
    },
    node: {
      post: BlockchainElrondNetworkEgldService.egldNodePost,
      get: BlockchainElrondNetworkEgldService.egldNodeGet,
    },
  }
}
