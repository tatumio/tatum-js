import { BlockchainXlmService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xlmOffchainService } from './services/xlm.offchain'
import { xlmKmsService } from './services/xlm.kms'
import { xlmTxService } from './services/xlm.tx'
import { xlmWallet } from './services/xlm.sdk.wallet'

const blockchain = Blockchain.XLM

export const TatumXlmSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    offchain: xlmOffchainService({ blockchain }),
    kms: xlmKmsService({ blockchain }),
    transaction: xlmTxService(),
    wallet: xlmWallet(),
    blockchain: {
      info: BlockchainXlmService.xlmGetLastClosedLedger,
      getAccountInfo: BlockchainXlmService.xlmGetAccountInfo,
      broadcast: BlockchainXlmService.xlmBroadcast,
      getFee: BlockchainXlmService.xlmGetFee,
      trustLine: BlockchainXlmService.xlmTrustLineBlockchain,
      getLedger: BlockchainXlmService.xlmGetLedger,
      getLedgerTx: BlockchainXlmService.xlmGetLedgerTx,
      getTransaction: BlockchainXlmService.xlmGetTransaction,
      getAccountTransactions: BlockchainXlmService.xlmGetAccountTx,
      sendTransaction: BlockchainXlmService.xlmTransferBlockchain,
    },
  }
}
