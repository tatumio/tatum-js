import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { ApiServices, BnbBeaconChainService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BnbApiCallsType } from '../index'
import { bnbTxService } from './services/bnb.tx'
import { bnbKmsService } from './services/bnb.kms'
import { bnbWallet } from './services/bnb.wallet'
import { Blockchain } from '@tatumio/shared-core'
import { bnbVirtualAccountService } from './services/bnb.virtualAccount'
import { bnbWeb3, BnbWeb3 } from './services/bnb.web3'

export const TatumBnbSDK = (
  args: SDKArguments,
  apiCalls: BnbApiCallsType = { getAccountInfo: ApiServices.blockchain.bnb.bnbGetAccount },
) => {
  const web3: BnbWeb3 = bnbWeb3(args.provider)

  return {
    ...abstractBlockchainSdk({ ...args, blockchain: Blockchain.BNB }),
    wallet: bnbWallet(),
    transaction: bnbTxService({ web3 }, apiCalls),
    kms: bnbKmsService({ web3 }),
    virtualAccount: bnbVirtualAccountService({ web3 }, apiCalls),
    blockchain: {
      getCurrentBlock: BnbBeaconChainService.bnbGetCurrentBlock,
      getBlock: BnbBeaconChainService.bnbGetBlock,
      getAccount: BnbBeaconChainService.bnbGetAccount,
      getTransaction: BnbBeaconChainService.bnbGetTransaction,
      getTxByAccount: BnbBeaconChainService.bnbGetTxByAccount,
      broadcast: BnbBeaconChainService.bnbBroadcast,
    },
  }
}
