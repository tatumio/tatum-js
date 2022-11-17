import {
  BurnNftAlgo as ApiBurnNftAlgo,
  BurnNftAlgoKMS as ApiBurnNftAlgoKMS,
  ChainBurnAlgoErc20 as ApiChainBurnAlgoErc20,
  ChainBurnAlgoErc20KMS as ApiChainBurnAlgoErc20KMS,
  ChainDeployAlgoErc20 as ApiDeployErc20,
  ChainDeployAlgoErc20KMS as ApiDeployErc20KMS,
  ChainTransferAlgoErc20 as ApiChainTransferAlgoErc20,
  ChainTransferAlgoErc20KMS as ApiChainTransferAlgoErc20KMS,
  MintMultiToken,
  MintMultiTokenKMS,
  MintNftAlgorand as ApiMintNftAlgorand,
  MintNftAlgorandKMS as ApiMintNftAlgorandKMS,
  MintNftExpressAlgorand as ApiMintNftExpressAlgorand,
  TransferAlgo as ApiTransferAlgo,
  TransferAlgoKMS as ApiTransferAlgoKMS,
  TransferAlgorandBlockchain as ApiTransferAlgorandBlockchain,
  TransferAlgorandBlockchainKMS as ApiTransferAlgorandBlockchainKMS,
  TransferNftAlgo as ApiTransferNftAlgo,
  TransferNftAlgoExpress as ApiTransferNftAlgoExpress,
  TransferNftAlgoKMS as ApiTransferNftAlgoKMS,
} from '@tatumio/api-client'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'

export type TransferAlgo = ApiTransferAlgo
export type TransferAlgoKMS = ApiTransferAlgoKMS

export type TransferAlgoBlockchain = ApiTransferAlgorandBlockchain
export type TransferAlgoBlockchainKMS = ApiTransferAlgorandBlockchainKMS

export type MintNftAlgoKMS = WithoutChain<ApiMintNftAlgorandKMS>
export type MintNftAlgo = WithoutChain<ApiMintNftAlgorand>
export type MintNftExpressAlgo = WithoutChain<ApiMintNftExpressAlgorand>

export type MintMultiTokenAlgo = WithoutChain<MintMultiToken>
export type MintMultiTokenAlgoKMS = WithoutChain<MintMultiTokenKMS>

export type TransferNftAlgoKMS = WithoutChain<ApiTransferNftAlgoKMS>
export type TransferNftAlgo = WithoutChain<ApiTransferNftAlgo>
export type TransferNftAlgoExpress = WithoutChain<ApiTransferNftAlgoExpress>

export type BurnNftAlgoKMS = WithoutChain<ApiBurnNftAlgoKMS>
export type BurnNftAlgo = WithoutChain<ApiBurnNftAlgo>

export type DeployAlgoErc20KMS = WithoutChain<ApiDeployErc20KMS>
export type DeployAlgoErc20 = WithoutChain<ApiDeployErc20>

export type ChainTransferAlgoErc20 = WithoutChain<ApiChainTransferAlgoErc20>
export type ChainTransferAlgoErc20KMS = WithoutChain<ApiChainTransferAlgoErc20KMS>

export type ChainBurnAlgoErc20 = WithoutChain<ApiChainBurnAlgoErc20>
export type ChainBurnAlgoErc20KMS = WithoutChain<ApiChainBurnAlgoErc20KMS>

export type AlgoApiCallsType = {
  getBlockchainAccountBalance: (account: string) => Promise<{ balance?: number }>
}
