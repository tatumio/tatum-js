import { ApiServices, XrpService } from '@tatumio/api-client'
import { abstractSdkLedgerService, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xrpVirtualAccountService } from './services/xrp.offchain'
import { xrpKmsService } from './services/xrp.kms'
import { xrpTxService } from './services/xrp.tx'
import { xrpWallet } from './services/xrp.sdk.wallet'
import { XrpApiCallsType } from '../index'

const blockchain = Blockchain.XRP

export const TatumXrpSDK = (
  args: SDKArguments,
  apiCalls: XrpApiCallsType = {
    getAccountDetail: ApiServices.blockchain.xrp.xrpGetAccountInfo,
    getFee: ApiServices.blockchain.xrp.xrpGetFee,
  },
) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    ledger: abstractSdkLedgerService(),
    virtualAccount: xrpVirtualAccountService({ blockchain }),
    kms: xrpKmsService({ blockchain }),
    transaction: xrpTxService(apiCalls),
    wallet: xrpWallet(),
    blockchain: {
      broadcast: XrpService.xrpBroadcast,
      info: XrpService.xrpGetLastClosedLedger,
      getFee: XrpService.xrpGetFee,
      getAccountTx: XrpService.xrpGetAccountTx,
      getLedger: XrpService.xrpGetLedger,
      getTx: XrpService.xrpGetTransaction,
      getAccountInfo: XrpService.xrpGetAccountInfo,
      getAccountBalance: XrpService.xrpGetAccountBalance,
      sendTransaction: XrpService.xrpTransferBlockchain,
    },
  }
}
