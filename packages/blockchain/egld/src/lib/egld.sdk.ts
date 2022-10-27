import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { ElrondService } from '@tatumio/api-client'
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
    virtualAccount: egldOffchainService({ blockchain }),
    kms: egldKmsService({ blockchain }),
    blockchain: {
      broadcast: ElrondService.egldBroadcast,
      getBlock: ElrondService.egldGetBlock,
      getCurrentBlock: ElrondService.eGldGetCurrentBlock,
      generateWallet: ElrondService.egldGenerateWallet,
      generateAddress: ElrondService.egldGenerateAddress,
      generatePrivateKeyOfAddress: ElrondService.egldGenerateAddressPrivateKey,
      getBalance: ElrondService.egldGetBalance,
      getTransaction: ElrondService.egldGetTransaction,
      getTransactionsSentFromAddress: ElrondService.egldGetTransactionAddress,
      getCountOfTransactionSentFromAddress: ElrondService.egldGetTransactionCount,
    },
    node: {
      post: ElrondService.egldNodePost,
      get: ElrondService.egldNodeGet,
    },
  }
}
