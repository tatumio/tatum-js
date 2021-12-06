import {
  post,
  Account,
  Address,
  CreateErc20Offchain,
  checkAddressExists as checkAddressExistsCore,
  Currency,
  getWithdrawals as getWithdrawalsCore,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createErc20" target="_blank">Tatum API documentation</a>
 */
export const registerEthereumErc20 = async (data: CreateErc20Offchain): Promise<Account> =>
  post(`/v3/offchain/ethereum/erc20`, data, CreateErc20Offchain)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeErc20Address" target="_blank">Tatum API documentation</a>
 */
export const storeErc20ContractAddress = async (name: string, address: string): Promise<Address> =>
  post(`/v3/offchain/ethereum/erc20/${name}/${address}`)

export const checkAddressExists = async (address: string, index?: number) => {
  return checkAddressExistsCore(address, Currency.ETH, index)
}

export const getWithdrawals = async (status?: string, pageSize = 50, offset = 0) => {
  return getWithdrawalsCore(status, Currency.ETH, pageSize, offset)
}
