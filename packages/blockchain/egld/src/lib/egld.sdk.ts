import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { ElrodnService } from '@tatumio/api-client'
import { egldRecord } from './services/egld.record'
import { egldWallet } from './services/egld.wallet'
import { egldTransactionService } from './services/egld.tx'
import { egldOffchainService } from './services/egld.offchain'
import { egldKmsService } from './services/egld.kms'

const blockchain = Blockchain.EGLD

export const TatumEgldSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    record: egldRecord(),
    wallet: egldWallet(),
    transaction: egldTransactionService(),
    offchain: egldOffchainService({ blockchain }),
    kms: egldKmsService({ blockchain }),
    blockchain: {
      broadcast: ElrodnService.egldBroadcast,
      getBlock: ElrodnService.egldGetBlock,
      getCurrentBlock: ElrodnService.eGldGetCurrentBlock,
      generateWallet: ElrodnService.egldGenerateWallet,
      generateAddress: ElrodnService.egldGenerateAddress,
      generatePrivateKeyOfAddress: ElrodnService.egldGenerateAddressPrivateKey,
      getBalance: ElrodnService.egldGetBalance,
      getTransaction: ElrodnService.egldGetTransaction,
      getTransactionsSentFromAddress: ElrodnService.egldGetTransactionAddress,
      getCountOfTransactionSentFromAddress: ElrodnService.egldGetTransactionCount,
    },
    node: {
      post: ElrodnService.egldNodePost,
      get: ElrodnService.egldNodeGet,
    },
  }
}
