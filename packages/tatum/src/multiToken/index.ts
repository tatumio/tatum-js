import {
  CeloDeployMultiToken,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  deployMultiToken as deployCeloMultiToken,
  mintMultiToken as mintCeloMultiToken,
  mintMultiTokenBatch as mintCeloMultiTokenBatch,
  burnMultiToken as burnCeloMultiTokenTransaction,
  burnMultiTokenBatch as burnCeloMultiTokenBatchTransaction,
  transferMultiToken as transferCeloMultiTokenTransaction,
  transferMultiTokenBatch as transferCeloMultiTokenBatchTransaction,
} from '@tatumio/tatum-celo/src'
import {
  deployMultiToken as deployPolygonMultiToken,
  mintMultiToken as mintPolygonMultiToken,
  mintMultiTokenBatch as mintPolygonMultiTokenBatchSigned,
  burnMultiToken as burnPolygonMultiTokenSignedTransaction,
  burnMultiTokenBatch as burnPolygonMultiTokenBatchSignedTransaction,
  transferMultiToken as transferPolygonMultiTokenSignedTransaction,
  transferMultiTokenBatch as transferPolygonMultiTokenSignedBatchTransaction,
} from '@tatumio/tatum-polygon/src'
import {
  deployMultiToken as deployOneMultiToken,
  mintMultiToken as mintOneMultiToken,
  mintMultiTokenBatch as mintOneMintMultiTokenBatchSigned,
  burnMultiToken as burnOneMultiTokenSignedTransaction,
  burnMultiTokenBatch as burnOneMultiTokenBatchSignedTransaction,
  transferMultiToken as transferOneMultiTokenSignedTransaction,
  transferMultiTokenBatch as transferOneMultiTokenSignedBatchTransaction,
} from '@tatumio/tatum-one/src'
import {
  deployMultiToken as deployEthMultiToken,
  EthDeployMultiToken,
  EthBurnMultiToken,
  EthBurnMultiTokenBatch,
  mintMultiToken as mintEhtMultiToken,
  mintMultiTokenBatch as mintEthMultiTokenBatch,
  burnMultiToken as burnEthMultiTokenTransaction,
  burnMultiTokenBatch as burnEthBatchMultiTokenTransaction,
  transferMultiToken as transferEthMultiTokenTransaction,
  transferMultiTokenBatch as transferEthMultiTokenBatchTransaction,
} from '@tatumio/tatum-eth/src'
import {
  deployMultiToken as deployBscMultiToken,
  mintMultiToken as mintBscMultiToken,
  mintMultiTokenBatch as mintBscMultiTokenBatch,
  burnMultiToken as burnBscMultiTokenTransaction,
  burnMultiTokenBatch as burnBscBatchMultiTokenTransaction,
  transferMultiToken as transferBscMultiTokenTransaction,
  transferMultiTokenBatch as transferBscMultiTokenBatchTransaction,
} from '@tatumio/tatum-bsc/src'
import {
  Currency,
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
} from '@tatumio/tatum-core'
import { CeloBurnMultiToken, CeloBurnMultiTokenBatch, CeloTransferMultiToken, CeloTransferMultiTokenBatch } from '@tatumio/tatum-celo'

export const deployMultiToken = async (
  testnet: boolean,
  body: DeployMultiToken | CeloDeployMultiToken | EthDeployMultiToken,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return deployCeloMultiToken(testnet, body as CeloDeployMultiToken, provider)
    case Currency.MATIC:
      return deployPolygonMultiToken(testnet, body as DeployMultiToken, provider)
    case Currency.ONE:
      return deployOneMultiToken(testnet, body as DeployMultiToken, provider)
    case Currency.ETH:
      return deployEthMultiToken(body as DeployMultiToken, provider)
    case Currency.BSC:
      return deployBscMultiToken(testnet, body, provider)
  }
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return mintCeloMultiToken(testnet, body as CeloMintMultiToken, provider)
    case Currency.ETH:
      return mintEhtMultiToken(body, provider)
    case Currency.MATIC:
      return mintPolygonMultiToken(testnet, body, provider)
    case Currency.ONE:
      return mintOneMultiToken(testnet, body, provider)
    case Currency.BSC:
      return mintBscMultiToken(testnet, body, provider)
  }
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return mintCeloMultiTokenBatch(testnet, body as CeloMintMultiTokenBatch, provider)
    case Currency.ETH:
      return mintEthMultiTokenBatch(body, provider)
    case Currency.MATIC:
      return mintPolygonMultiTokenBatchSigned(testnet, body, provider)
    case Currency.ONE:
      return mintOneMintMultiTokenBatchSigned(testnet, body, provider)
    case Currency.BSC:
      return mintBscMultiTokenBatch(testnet, body, provider)
  }
}
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return burnCeloMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider)
    case Currency.ETH:
      return burnEthMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return burnPolygonMultiTokenSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return burnOneMultiTokenSignedTransaction(testnet, body, provider)
    case Currency.BSC:
      return burnBscMultiTokenTransaction(testnet, body, provider)
  }
}
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return burnCeloMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider)
    case Currency.ETH:
      return burnEthBatchMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return burnPolygonMultiTokenBatchSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return burnOneMultiTokenBatchSignedTransaction(testnet, body, provider)
    case Currency.BSC:
      return burnBscBatchMultiTokenTransaction(testnet, body, provider)
  }
}

export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return transferCeloMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
    case Currency.ETH:
      return transferEthMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return transferPolygonMultiTokenSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return transferOneMultiTokenSignedTransaction(testnet, body, provider)
    case Currency.BSC:
      return transferBscMultiTokenTransaction(testnet, body, provider)
  }
}

export const transferMultiTokenBatch = async (
  testnet: boolean,
  body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return transferCeloMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider)
    case Currency.ETH:
      return transferEthMultiTokenBatchTransaction(body, provider)
    case Currency.MATIC:
      return transferPolygonMultiTokenSignedBatchTransaction(testnet, body, provider)
    case Currency.ONE:
      return transferOneMultiTokenSignedBatchTransaction(testnet, body, provider)
    case Currency.BSC:
      return transferBscMultiTokenBatchTransaction(testnet, body, provider)
  }
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
