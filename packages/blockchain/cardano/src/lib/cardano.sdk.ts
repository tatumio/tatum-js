import { Blockchain } from '@tatumio/shared-core'
import { CardanoService, TatumUrlArg } from '@tatumio/api-client'
import { cardanoTransactions } from './cardano.sdk.tx'
import { cardanoWallet } from './cardano.sdk.wallet'
import { virtualAccountService } from './cardano.virtualAccount'
import { cardanoKmsService } from './cardano.kms'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'

const blockchain = Blockchain.ADA

export const TatumCardanoSDK = (args: { apiKey: string; url?: TatumUrlArg }) => {
  const wallet = cardanoWallet(args)
  const { signKmsTransaction, ...transaction } = cardanoTransactions(args, undefined, wallet)
  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    wallet,
    kms: cardanoKmsService({ ...args, blockchain }, signKmsTransaction),
    transaction: transaction,
    blockchain: {
      info: CardanoService.adaGetBlockChainInfo,
      broadcast: CardanoService.adaBroadcast,
      getBlock: CardanoService.adaGetBlock,
      getUtxoByAddress: CardanoService.adaGetUtxoByAddress,
      getTransaction: CardanoService.adaGetRawTransaction,
      getTxByAddress: CardanoService.adaGetTxByAddress,
    },
    virtualAccount: virtualAccountService({ blockchain }),
  }
}
