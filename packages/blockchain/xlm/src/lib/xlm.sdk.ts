import { BlockchainXlmService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xlmOffchainService } from './services/xlm.offchain'
import { xlmKmsService } from './services/xlm.kms'
import { xlmTxService } from './services/xlm.tx'

const blockchain = Blockchain.XLM

export const TatumXlmSDK = (args: SDKArguments) => {
  const api = BlockchainXlmService

  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    api,
    offchain: xlmOffchainService({ blockchain }),
    kms: xlmKmsService({ blockchain }),
    transaction: xlmTxService(),
    wallet: BlockchainXlmService.xlmWallet,
    blockchain: {
      getAccountInfo: BlockchainXlmService.xlmGetAccountInfo,
      broadcast: BlockchainXlmService.xlmBroadcast,
      getCurrentLedger: BlockchainXlmService.xlmGetLastClosedLedger,
      getFee: BlockchainXlmService.xlmGetFee,
      getLedger: BlockchainXlmService.xlmGetLedger,
      getLedgerTx: BlockchainXlmService.xlmGetLedgerTx,
      getTransaction: BlockchainXlmService.xlmGetTransaction,
      getAccountTransactions: BlockchainXlmService.xlmGetAccountTx,
    },
  }
}
