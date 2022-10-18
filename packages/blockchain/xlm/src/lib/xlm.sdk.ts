import { ApiServices, StellarService } from '@tatumio/api-client'
import { abstractSdkLedgerService, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { xlmVirtualAccountService } from './services/xlm.virtualAccount'
import { xlmKmsService } from './services/xlm.kms'
import { xlmTxService } from './services/xlm.tx'
import { xlmWallet } from './services/xlm.sdk.wallet'
import { XlmApiCallsType } from '../index'

const blockchain = Blockchain.XLM

export const TatumXlmSDK = (
  args: SDKArguments,
  apiCalls: XlmApiCallsType = { getAccountInfo: ApiServices.blockchain.xlm.xlmGetAccountInfo },
) => {
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    ...abstractSdkLedgerService(),
    virtualAcount: xlmVirtualAccountService({ blockchain }),
    kms: xlmKmsService({ blockchain }),
    transaction: xlmTxService(apiCalls),
    wallet: xlmWallet(),
    blockchain: {
      info: StellarService.xlmGetLastClosedLedger,
      getAccountInfo: StellarService.xlmGetAccountInfo,
      broadcast: StellarService.xlmBroadcast,
      getFee: StellarService.xlmGetFee,
      trustLine: StellarService.xlmTrustLineBlockchain,
      getLedger: StellarService.xlmGetLedger,
      getLedgerTx: StellarService.xlmGetLedgerTx,
      getTransaction: StellarService.xlmGetTransaction,
      getAccountTransactions: StellarService.xlmGetAccountTx,
      sendTransaction: StellarService.xlmTransferBlockchain,
    },
  }
}
