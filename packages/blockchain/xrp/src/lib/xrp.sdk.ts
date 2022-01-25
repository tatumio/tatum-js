import { BlockchainXrpService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xrpOffchainService } from './services/xrp.offchain'
import { xrpKmsService } from './services/xrp.kms'
import { xrpTxService } from './services/xrp.tx'

const blockchain = Blockchain.XRP

export const TatumXrpSDK = (args: SDKArguments) => {
  const api = BlockchainXrpService

  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    api,
    offchain: xrpOffchainService({ blockchain }),
    kms: xrpKmsService({ blockchain }),
    transaction: xrpTxService(),
    wallet: BlockchainXrpService.xrpWallet,
    blockchain: {
      broadcast: BlockchainXrpService.xrpBroadcast,
      getLastClosedLedger: BlockchainXrpService.xrpGetLastClosedLedger,
      getFee: BlockchainXrpService.xrpGetFee,
      getAccountTx: BlockchainXrpService.xrpGetAccountTx,
      getLedger: BlockchainXrpService.xrpGetLedger,
      get: BlockchainXrpService.xrpGetTransaction,
      getAccountInfo: BlockchainXrpService.xrpGetAccountInfo,
      getAccountBalance: BlockchainXrpService.xrpGetAccountBalance,
    },
  }
}
