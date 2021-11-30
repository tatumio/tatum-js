import BigNumber from 'bignumber.js'
import { Erc20Transaction } from 'src/model/response/common/Erc20Transaction'
import { get, Sort, validateBody } from '../connector/tatum'
import { ApproveErc20, Currency } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/Erc20GetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getERC20TransactionsByAddress = async (
  chain: Currency,
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
): Promise<Erc20Transaction[]> =>
  get(
    `/v3/blockchain/token/transaction/${chain}/${address}/${tokenAddress}?pageSize=${pageSize}&offset=${offset}&from=${from}&to=${to}&sort=${sort}`
  )

/**
 * Prepare approve ERC20 signed transaction.
 * @param testnet if we are on testnet or not
 * @param body body of the approve operation
 * @param provider optional Web3 provider
 */
export const prepareApproveErc20Abstraction = async (
  getErc20ContractDecimalsFn: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<any>,
  testnet: boolean,
  body: ApproveErc20,
  provider?: string
) => {
  await validateBody(body, ApproveErc20)
  const amount = new BigNumber(body.amount)
    .multipliedBy(new BigNumber(10).pow(await getErc20ContractDecimalsFn(body.contractAddress, provider, testnet)))
    .toString(16)
  const params = [body.spender.trim(), `0x${amount}`]
  body.amount = '0'
  return { body, params }
}
