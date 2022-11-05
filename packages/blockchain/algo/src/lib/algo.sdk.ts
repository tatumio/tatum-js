import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk, abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { AlgorandService, ApiServices, FungibleTokensErc20OrCompatibleService } from '@tatumio/api-client'
import { algoWeb } from './services/algo.web'
import { algoWallet } from './services/algo.wallet'
import { algoTxService } from './services/algo.tx'
import { AlgoApiCallsType } from '../index'

const blockchain = Blockchain.ALGO

export const TatumAlgoSDK = (
  args: SDKArguments,
  apiCalls: AlgoApiCallsType = {
    getBlockchainAccountBalance: ApiServices.blockchain.algo.algorandGetBalance,
  },
) => {
  const web = algoWeb(args)
  const txService = algoTxService({ algoWeb: web }, apiCalls)
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })

  const { mintNFT, transferNFT, burnNFT, getNFTAccountBalance, getNFTContractAddress } = nft

  return {
    ...abstractSdk,
    algoWeb: web,
    wallet: algoWallet(),
    transaction: txService.native.send,
    token: {
      receiveAsset: txService.asset.send.receive,
      fungible: {
        ...txService.fungible,
        getFTTransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
        getFTAccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
        getFTAccountBalances: FungibleTokensErc20OrCompatibleService.erc20GetBalanceAddress,
      },
      nft: {
        ...txService.nft.send,
        getNFTAccountBalance,
        getNFTContractAddress,
      },
    },
    blockchain: {
      broadcast: AlgorandService.algorandBroadcast,
      getBlock: AlgorandService.algorandGetBlock,
      getCurrentBlock: AlgorandService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: AlgorandService.algorandGetBalance,
      getTransaction: AlgorandService.algorandGetTransaction,
      getPayTransactionByFromTo: AlgorandService.algorandGetPayTransactionsByFromTo,
    },
    virtualAccount: {
      ...abstractBlockchainVirtualAccount({ blockchain }),
      ...txService.virtualAccount,
    },
    node: {
      indexerGetDriver: AlgorandService.algoNodeIndexerGetDriver,
      getDriver: AlgorandService.algoNodeGetDriver,
      postDriver: AlgorandService.algoNodePostDriver,
    },
  }
}
