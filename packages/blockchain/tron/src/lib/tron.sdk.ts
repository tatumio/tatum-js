import { BlockchainUtilsService, TronService } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { abstractNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
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
  const { nft, storage } = abstractNft()
  const { getNFTTransaction, getNFTAccountBalance, getNFTMetadataURI, getNFTRoyalty } = nft

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
      getNFTRoyalty,
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
      sendTransaction: TronService.tronTransfer,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      getTransactions: TronService.tronAccountTx,
      getTrc20Transactions: TronService.tronAccountTx20,
      generateWallet: TronService.generateTronwallet,
      generateAddress: TronService.tronGenerateAddress,
      generatePrivateKey: TronService.tronGenerateAddressPrivateKey,
      createTrc10: TronService.tronCreateTrc10,
      createTrc20: TronService.tronCreateTrc20,
      transferTrc10: TronService.tronTransferTrc10,
      transferTrc20: TronService.tronTransferTrc20,
      tronFreeze: TronService.tronFreeze,
    },
    virtualAccount,
  }
}
