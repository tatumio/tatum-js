import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { ApiServices, BitcoinCashService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { bchTransactions } from './services/bch.sdk.tx'
import { bchWallet } from './bch.sdk.wallet'
import { BchApiCallsType } from '..'
import { signKmsTransaction } from './services/bch.sdk.virtualAccount'
import { signBitcoinCashKMSTransaction } from './services/bch.sdk.kms'

const blockchain = Blockchain.BCH

export const TatumBchSDK = (
  args: SDKArguments,
  apiCalls: BchApiCallsType = {
    bchGetRawTransaction: ApiServices.blockchain.bcash.bchGetRawTransaction,
  },
) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    kms: {
      ...btcBasedSdk({ ...args, blockchain }).kms,
      signBitcoinCashKMSTransaction,
    },
    wallet: bchWallet(),
    transaction: bchTransactions(apiCalls),
    virtualAccount: {
      ...btcBasedSdk({ ...args, blockchain }).virtualAccount,
    },
    blockchain: {
      info: BitcoinCashService.bchGetBlockChainInfo,
      broadcast: BitcoinCashService.bchBroadcast,
      getBlockHash: BitcoinCashService.bchGetBlockHash,
      getBlock: BitcoinCashService.bchGetBlock,
      getTxForAccount: BitcoinCashService.bchGetTxByAddress,
      getTransaction: BitcoinCashService.bchGetRawTransaction,
      send: BitcoinCashService.bchTransferBlockchain,
    },
  }
}
