import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { ApiServices, BnbBeaconChainService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BnbApiCallsType } from '../index'
import { bnbTxService } from './services/bnb.tx'
import { bnbKmsService } from './services/bnb.kms'
import { bnbWallet } from './services/bnb.wallet'
import { Blockchain } from '@tatumio/shared-core'

export const TatumBnbSDK = (
  args: SDKArguments,
  apiCalls: BnbApiCallsType = { getAccountInfo: ApiServices.blockchain.bnb.bnbGetAccount },
) => {
  return {
    ...abstractBlockchainSdk({ apiKey: args.apiKey, blockchain: Blockchain.BNB }),
    wallet: bnbWallet,
    transaction: bnbTxService(args, apiCalls),
    kms: bnbKmsService,
    blockchain: {
      generateWallet: BnbBeaconChainService.bnbGenerateWallet,
      getCurrentBlock: BnbBeaconChainService.bnbGetCurrentBlock,
      getBlock: BnbBeaconChainService.bnbGetBlock,
      getAccount: BnbBeaconChainService.bnbGetAccount,
      getTransaction: BnbBeaconChainService.bnbGetTransaction,
      getTxByAccount: BnbBeaconChainService.bnbGetTxByAccount,
      blockchainTransfer: BnbBeaconChainService.bnbBlockchainTransfer,
      broadcast: BnbBeaconChainService.bnbBroadcast,
    },
  }
}
