import {
  CeloDeployMultiToken,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  CeloBurnMultiToken,
  CeloBurnMultiTokenBatch,
  CeloTransferMultiToken,
  CeloTransferMultiTokenBatch,
  deployMultiToken as deployCeloMultiToken,
  mintMultiToken as mintCeloMultiToken,
  mintMultiTokenBatch as mintCeloMultiTokenBatch,
  burnMultiToken as burnCeloMultiTokenTransaction,
  burnMultiTokenBatch as burnCeloMultiTokenBatchTransaction,
  transferMultiToken as transferCeloMultiTokenTransaction,
  transferMultiTokenBatch as transferCeloMultiTokenBatchTransaction,
} from '@tatumio/tatum-celo'
import {
  deployMultiToken as deployPolygonMultiToken,
  mintMultiToken as mintPolygonMultiToken,
  mintMultiTokenBatch as mintPolygonMultiTokenBatchSigned,
  burnMultiToken as burnPolygonMultiTokenSignedTransaction,
  burnMultiTokenBatch as burnPolygonMultiTokenBatchSignedTransaction,
  transferMultiToken as transferPolygonMultiTokenSignedTransaction,
  transferMultiTokenBatch as transferPolygonMultiTokenSignedBatchTransaction,
} from '@tatumio/tatum-polygon'
import {
  deployMultiToken as deployOneMultiToken,
  mintMultiToken as mintOneMultiToken,
  mintMultiTokenBatch as mintOneMintMultiTokenBatchSigned,
  burnMultiToken as burnOneMultiTokenSignedTransaction,
  burnMultiTokenBatch as burnOneMultiTokenBatchSignedTransaction,
  transferMultiToken as transferOneMultiTokenSignedTransaction,
  transferMultiTokenBatch as transferOneMultiTokenSignedBatchTransaction,
} from '@tatumio/tatum-one'
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
} from '@tatumio/tatum-eth'
import {
  deployMultiToken as deployBscMultiToken,
  mintMultiToken as mintBscMultiToken,
  mintMultiTokenBatch as mintBscMultiTokenBatch,
  burnMultiToken as burnBscMultiTokenTransaction,
  burnMultiTokenBatch as burnBscBatchMultiTokenTransaction,
  transferMultiToken as transferBscMultiTokenTransaction,
  transferMultiTokenBatch as transferBscMultiTokenBatchTransaction,
} from '@tatumio/tatum-bsc'
import {
  erc1155TokenABI as abi,
  AddMinter,
  BurnMultiToken,
  Currency,
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  prepareAddMultiTokenMinterAbstraction,
  TransferMultiToken,
  TransferMultiTokenBatch,
  TransactionHash,
} from '@tatumio/tatum-core'
import { sendAlgoCreateFractionalNFTSignedTransaction, sendAlgoTransferFractionalNFTSignedTransaction } from '@tatumio/tatum-algo'
import { sendAlgoBurnFractionalNFTSignedTransaction } from '@tatumio/tatum-algo'
import { helperBroadcastTx, helperPrepareSCCall } from 'src/helpers'

/**
 * Deploy MultiTokens (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const deployMultiToken = async (
  testnet: boolean,
  body: DeployMultiToken | CeloDeployMultiToken | EthDeployMultiToken,
  provider?: string
): Promise<TransactionHash | string | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return deployCeloMultiToken(testnet, body as CeloDeployMultiToken, provider)
    case Currency.MATIC:
      return deployPolygonMultiToken(body as DeployMultiToken, provider)
    case Currency.ONE:
      return deployOneMultiToken(body as DeployMultiToken, provider)
    case Currency.ETH:
      return deployEthMultiToken(body as DeployMultiToken, provider)
    case Currency.BSC:
      return deployBscMultiToken(body, provider)
  }
}

/**
 * Mint MultiTokens (1155)
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintMultiToken = async (
  testnet: boolean,
  body: MintMultiToken | CeloMintMultiToken,
  provider?: string
): Promise<TransactionHash | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return mintCeloMultiToken(testnet, body as CeloMintMultiToken, provider)
    case Currency.ETH:
      return mintEhtMultiToken(body, provider)
    case Currency.MATIC:
      return mintPolygonMultiToken(body, provider)
    case Currency.ONE:
      return mintOneMultiToken(body, provider)
    case Currency.BSC:
      return mintBscMultiToken(body, provider)
    case Currency.ALGO:
      return sendAlgoCreateFractionalNFTSignedTransaction(testnet, body as MintMultiToken, provider)
  }
}

/**
 * Mint MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintMultiTokenBatch = async (
  testnet: boolean,
  body: MintMultiTokenBatch | CeloMintMultiTokenBatch,
  provider?: string
): Promise<TransactionHash | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return mintCeloMultiTokenBatch(testnet, body as CeloMintMultiTokenBatch, provider)
    case Currency.ETH:
      return mintEthMultiTokenBatch(body, provider)
    case Currency.MATIC:
      return mintPolygonMultiTokenBatchSigned(body, provider)
    case Currency.ONE:
      return mintOneMintMultiTokenBatchSigned(body, provider)
    case Currency.BSC:
      return mintBscMultiTokenBatch(body, provider)
  }
}

/**
 * Burn MultiTokens (1155).
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const burnMultiToken = async (
  testnet: boolean,
  body: CeloBurnMultiToken | EthBurnMultiToken,
  provider?: string
): Promise<TransactionHash | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return burnCeloMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider)
    case Currency.ETH:
      return burnEthMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return burnPolygonMultiTokenSignedTransaction(body, provider)
    case Currency.ONE:
      return burnOneMultiTokenSignedTransaction(body, provider)
    case Currency.BSC:
      return burnBscMultiTokenTransaction(body, provider)
    case Currency.ALGO:
      return sendAlgoBurnFractionalNFTSignedTransaction(testnet, body as BurnMultiToken, provider)
  }
}

/**
 * Burn MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const burnMultiTokenBatch = async (
  testnet: boolean,
  body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch,
  provider?: string
): Promise<TransactionHash | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return burnCeloMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider)
    case Currency.ETH:
      return burnEthBatchMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return burnPolygonMultiTokenBatchSignedTransaction(body, provider)
    case Currency.ONE:
      return burnOneMultiTokenBatchSignedTransaction(body, provider)
    case Currency.BSC:
      return burnBscBatchMultiTokenTransaction(body, provider)
  }
}

/**
 * Transfer MultiTokens (1155).
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const transferMultiToken = async (
  testnet: boolean,
  body: CeloTransferMultiToken | TransferMultiToken,
  provider?: string
): Promise<TransactionHash | string | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return transferCeloMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
    case Currency.ETH:
      return transferEthMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return transferPolygonMultiTokenSignedTransaction(body, provider)
    case Currency.ONE:
      return transferOneMultiTokenSignedTransaction(body, provider)
    case Currency.BSC:
      return transferBscMultiTokenTransaction(body, provider)
    case Currency.ALGO:
      return sendAlgoTransferFractionalNFTSignedTransaction(testnet, body as TransferMultiToken, provider)
  }
}

/**
 * Transfer MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const transferMultiTokenBatch = async (
  testnet: boolean,
  body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch,
  provider?: string
): Promise<TransactionHash | string | undefined> => {
  switch (body.chain) {
    case Currency.CELO:
      return transferCeloMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider)
    case Currency.ETH:
      return transferEthMultiTokenBatchTransaction(body, provider)
    case Currency.MATIC:
      return transferPolygonMultiTokenSignedBatchTransaction(body, provider)
    case Currency.ONE:
      return transferOneMultiTokenSignedBatchTransaction(body, provider)
    case Currency.BSC:
      return transferBscMultiTokenBatchTransaction(body, provider)
  }
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'grantRole', params, undefined, provider, abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAddMultiTokenMinter(testnet, body, provider), body.signatureId)

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
