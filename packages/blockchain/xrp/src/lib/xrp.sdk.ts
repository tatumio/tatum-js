import { BlockchainXrpService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xrpOffchainService } from './services/xrp.offchain'
import { xrpKmsService } from './services/xrp.kms'
import { xrpTxService } from './services/xrp.tx'
import { xrpWallet } from './services/xrp.sdk.wallet'

const blockchain = Blockchain.XRP

export const TatumXrpSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    offchain: xrpOffchainService({ blockchain }),
    kms: xrpKmsService({ blockchain }),
    transaction: xrpTxService(),
    wallet: xrpWallet(),
    blockchain: {
      broadcast: BlockchainXrpService.xrpBroadcast,
      info: BlockchainXrpService.xrpGetLastClosedLedger,
      getFee: BlockchainXrpService.xrpGetFee,
      getAccountTx: BlockchainXrpService.xrpGetAccountTx,
      getLedger: BlockchainXrpService.xrpGetLedger,
      getTx: BlockchainXrpService.xrpGetTransaction,
      getAccountInfo: BlockchainXrpService.xrpGetAccountInfo,
      getAccountBalance: BlockchainXrpService.xrpGetAccountBalance,
      sendTransaction: BlockchainXrpService.xrpTransferBlockchain,
    },
  }
}
