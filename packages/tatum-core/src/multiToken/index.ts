import { get, Sort, validateBody } from '../connector/tatum'
import { AddMinter, Currency, MultiTokenTransaction } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/MultiTokenGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransactionsByAddress = async (
  chain: Currency,
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
): Promise<MultiTokenTransaction[]> =>
  get(
    `/v3/multitoken/transaction/${chain}/${address}/${tokenAddress}?pageSize=${pageSize}&offset=${offset}&from=${from}&to=${to}&sort=${sort}`
  )

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
  get(`/v3/multitoken/address/${chain}/${txId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */

export const getMultiTokensBalance = async (
  chain: Currency,
  contractAddress: string,
  address: string,
  tokenId: string
): Promise<string[]> => get(`/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBatchBalance = async (
  chain: Currency,
  contractAddress: string,
  address: string,
  tokenIds: string
): Promise<string[]> => get(`/v3/multitoken/balance/batch/${chain}/${contractAddress}?address=${address}&tokenId=${tokenIds}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransaction = async <TX>(chain: Currency, txId: string): Promise<TX> =>
  get(`/v3/multitoken/transaction/${chain}/${txId}`)
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenMetadata = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> =>
  get(`/v3/multitoken/metadata/${chain}/${contractAddress}/${tokenId}`)
/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 */
export const prepareAddMultiTokenMinterAbstraction = async (body: AddMinter): Promise<string[]> => {
  await validateBody(body, AddMinter)
  return ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', body.minter]
}
