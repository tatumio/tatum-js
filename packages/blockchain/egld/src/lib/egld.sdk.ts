import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainElrondNetworkEgldService } from '@tatumio/api-client'

const blockchain = Blockchain.EGLD

export const TatumEgldSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
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
  }
}
