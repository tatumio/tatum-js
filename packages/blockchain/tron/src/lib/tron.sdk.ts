import { BlockchainUtilsService, TronService } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { tronWeb } from './services/tron.web'
import { tronTx } from './services/tron.tx'
import { tronWallet } from './services/tron.wallet'
import { tronRecord } from './services/tron.record'
import { tronKmsService } from './services/tron.kms'
import { virtualAccountService } from './services/tron.virtualAccount'

const blockchain = Blockchain.TRON

export const TatumTronSDK = (args: SDKArguments) => {
  const web = tronWeb()
  const txService = tronTx({ tronWeb: web })
  const virtualAccount = virtualAccountService({ blockchain, tronWeb: web })
  const abstractSdk = abstractBlockchainSdk({ ...args, blockchain })
  const { nft, storage } = abstractSdkNft()
  const { getNFTTransaction, getNFTAccountBalance, getNFTMetadataURI } = nft

  return {
    ...abstractSdk,
    transaction: txService.native,
    trc10: txService.trc10,
    trc20: txService.trc20,
    kms: tronKmsService({ blockchain }),
    nft: {
      ...txService.trc721,
      getNFTTransaction,
      getNFTAccountBalance,
      getNFTMetadataURI,
    },
    storage,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    wallet: tronWallet({ tronWeb: web }),
    tronWeb: web,
    record: tronRecord(),
    blockchain: {
      broadcast: TronService.tronBroadcast,
      getCurrentBlock: TronService.tronGetCurrentBlock,
      getBlock: TronService.tronGetBlock,
      getTrc10Detail: TronService.tronTrc10Detail,
      getAccount: TronService.tronGetAccount,
      getTransaction: TronService.tronGetTransaction,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      getTransactions: TronService.tronAccountTx,
      getTrc20Transactions: TronService.tronAccountTx20,
    },
    virtualAccount,
  }
}
