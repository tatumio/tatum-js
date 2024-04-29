import { get, post, validateBody } from '../connector/tatum';
import abi from '../contracts/erc1155/erc1155_abi';
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers';
import {
  AddMinter,
  BurnMultiToken,
  CeloBurnMultiToken,
  CeloBurnMultiTokenBatch,
  CeloDeployMultiToken,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  CeloTransferMultiToken,
  CeloTransferMultiTokenBatch,
  Currency,
  EthBurnMultiToken,
  EthBurnMultiTokenBatch,
  EthDeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
} from '../model';
import {
  prepareKlaytnBatchTransferMultiTokenSignedTransaction,
  prepareOneBatchTransferMultiTokenSignedTransaction,
  preparePolygonBatchTransferMultiTokenSignedTransaction,
  sendAlgoBurnFractionalNFTSignedTransaction,
  sendAlgoCreateFractionalNFTSignedTransaction,
  sendAlgoTransferFractionalNFTSignedTransaction,
  sendBscBurnBatchMultiTokenTransaction,
  sendBscBurnMultiTokenTransaction,
  sendBscDeployMultiTokenTransaction,
  sendBscMintMultiTokenBatchTransaction,
  sendBscMintMultiTokenTransaction,
  sendBscMultiTokenBatchTransaction,
  sendBscMultiTokenTransaction,
  sendCeloBurnMultiTokenBatchTransaction,
  sendCeloBurnMultiTokenTransaction,
  sendCeloDeployMultiTokenTransaction,
  sendCeloMintMultiTokenBatchTransaction,
  sendCeloMintMultiTokenTransaction,
  sendCeloTransferMultiTokenBatchTransaction,
  sendCeloTransferMultiTokenTransaction,
  sendEthBurnBatchMultiTokenTransaction,
  sendEthBurnMultiTokenTransaction,
  sendEthDeployMultiTokenTransaction,
  sendEthMintMultiTokenBatchTransaction,
  sendEthMintMultiTokenTransaction,
  sendEthMultiTokenBatchTransaction,
  sendEthMultiTokenTransaction,
  sendKlaytnBurnMultiTokenBatchSignedTransaction,
  sendKlaytnBurnMultiTokenSignedTransaction,
  sendKlaytnDeployMultiTokenSignedTransaction,
  sendKlaytnMintMultiTokenBatchSignedTransaction,
  sendKlaytnMintMultiTokenSignedTransaction,
  sendKlaytnTransferMultiTokenSignedTransaction,
  sendOneBurnMultiTokenBatchSignedTransaction,
  sendOneBurnMultiTokenSignedTransaction,
  sendOneDeployMultiTokenSignedTransaction,
  sendOneMintMultiTokenBatchSignedTransaction,
  sendOneMintMultiTokenSignedTransaction,
  sendOneTransferMultiTokenSignedTransaction,
  sendPolygonBurnMultiTokenBatchSignedTransaction,
  sendPolygonBurnMultiTokenSignedTransaction,
  sendPolygonDeployMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenBatchSignedTransaction,
  sendPolygonMintMultiTokenSignedTransaction,
  sendPolygonTransferMultiTokenSignedTransaction,
} from '../transaction';

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
  get(`/v3/multitoken/address/${chain}/${txId}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */

export const getMultiTokensBalance = async (chain: Currency, contractAddress: string, address: string, tokenId: string): Promise<string[]> =>
  get(`/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBatchBalance = async (chain: Currency, contractAddress: string, address: string, tokenIds: string): Promise<string[]> =>
  get(`/v3/multitoken/balance/batch/${chain}/${contractAddress}?address=${address}&tokenId=${tokenIds}`)


/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransaction = async (chain: Currency, txId: string): Promise<any> =>
  get(`/v3/multitoken/transaction/${chain}/${txId}`)
/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenMetadata = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> =>
  get(`/v3/multitoken/metadata/${chain}/${contractAddress}/${tokenId}`)


/**
 * Deploy MultiTokens (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken | EthDeployMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider)
    case Currency.MATIC:
      return sendPolygonDeployMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnDeployMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneDeployMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ETH:
      return sendEthDeployMultiTokenTransaction(body, provider);
    case Currency.BSC:
      return sendBscDeployMultiTokenTransaction(body, provider);
  }
}

/**
 * Mint MultiTokens (1155)
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider);
    case Currency.ETH:
      return sendEthMintMultiTokenTransaction(body, provider);
    case Currency.MATIC:
      return sendPolygonMintMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnMintMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneMintMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscMintMultiTokenTransaction(body, provider);
    case Currency.ALGO:
      return sendAlgoCreateFractionalNFTSignedTransaction(testnet, body as MintMultiToken, provider);
  }
};

/**
 * Mint MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
    case Currency.ETH:
      return sendEthMintMultiTokenBatchTransaction(body, provider);
    case Currency.MATIC:
      return sendPolygonMintMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnMintMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneMintMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscMintMultiTokenBatchTransaction(body, provider);
  }
};

/**
 * Burn MultiTokens (1155).
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken | BurnMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider);
    case Currency.ETH:
      return sendEthBurnMultiTokenTransaction(body, provider);
    case Currency.MATIC:
      return sendPolygonBurnMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnBurnMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneBurnMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscBurnMultiTokenTransaction(body, provider);
    case Currency.ALGO:
      return sendAlgoBurnFractionalNFTSignedTransaction(testnet, body as BurnMultiToken, provider);
  }
};

/**
 * Burn MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloBurnMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider);
    case Currency.ETH:
      return sendEthBurnBatchMultiTokenTransaction(body, provider);
    case Currency.MATIC:
      return sendPolygonBurnMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnBurnMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneBurnMultiTokenBatchSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscBurnBatchMultiTokenTransaction(body, provider)
  }
}

/**
 * Transfer MultiTokens (1155).
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloTransferMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
    case Currency.ETH:
      return sendEthMultiTokenTransaction(body, provider)
    case Currency.MATIC:
      return sendPolygonTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return sendKlaytnTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return sendOneTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscMultiTokenTransaction(body, provider);
    case Currency.ALGO:
      return sendAlgoTransferFractionalNFTSignedTransaction(testnet, body as TransferMultiToken, provider);
  }
}

/**
 * Transfer MultiTokens (1155) in a batch call.
 * @param testnet if we use testnet or not
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return sendCeloTransferMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider);
    case Currency.ETH:
      return sendEthMultiTokenBatchTransaction(body, provider);
    case Currency.MATIC:
      return preparePolygonBatchTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.KLAY:
      return prepareKlaytnBatchTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.ONE:
      return prepareOneBatchTransferMultiTokenSignedTransaction(testnet, body, provider);
    case Currency.BSC:
      return sendBscMultiTokenBatchTransaction(body, provider);
  }
};

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  await validateBody(body, AddMinter);
  const params = ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', body.minter];
  return await helperPrepareSCCall(testnet, body, AddMinter, 'grantRole', params, undefined, provider, abi);
};

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  if (body.signatureId) {
    return await post(`/v3/multitoken/mint/add`, body);
  }
  return helperBroadcastTx(body.chain, await prepareAddMultiTokenMinter(testnet, body, provider))
};
