import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
  XinFinService,
} from '@tatumio/api-client'
import { abstractSdkLedgerService, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { xdcWeb3 } from './services/xdc.web3'
import { xdcKmsService } from './services/xdc.kms'
import { xdcTxService } from './services/xdc.tx'
import { xdcWallet } from './services/xdc.wallet'
import { virtualAccountService } from './services/xdc.virtualAccount'

const blockchain = Blockchain.XDC

export const TatumXdcSDK = (args: SDKArguments) => {
  const web3 = xdcWeb3({ blockchain })
  const api = XinFinService
  const txService = xdcTxService({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const wallet = xdcWallet()
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    wallet,
    kms: xdcKmsService({ blockchain, web3 }),
    ledger: abstractSdkLedgerService(),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
    },
    smartContract: txService.smartContract,
    multiToken: txService.multiToken,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.xdcWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: XinFinService.xdcBroadcast,
      getTransactionsCount: XinFinService.xdcGetTransactionCount,
      getCurrentBlock: XinFinService.xdcGetCurrentBlock,
      getBlock: XinFinService.xdcGetBlock,
      getBlockchainAccountBalance: XinFinService.xdcGetBalance,
      get: XinFinService.xdcGetTransaction,
      estimateGas: BlockchainFeesService.xdcEstimateGas,
      smartContractInvocation: XinFinService.xdcBlockchainSmartContractInvocation,
      blockchainTransfer: XinFinService.xdcBlockchainTransfer,
      generateAddress: XinFinService.xdcGenerateAddress,
      generateAddressPrivateKey: XinFinService.xdcGenerateAddressPrivateKey,
      generateWallet: XinFinService.xdcGenerateWallet,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      web3Driver: XinFinService.xdcWeb3Driver,
    },
    virtualAccount,
  }
}
