import { Account, Address, post, CreateTrcOffchain, ChainCreateTrcOffchain, Currency } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeTrcAddress" target="_blank">Tatum API documentation</a>
 */
export const storeTrcContractAddress = async (name: string, address: string): Promise<Address> =>
  post(`/v3/offchain/tron/trc/${name}/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createTrc" target="_blank">Tatum API documentation</a>
 */
export const registerTronTrc = async (data: ChainCreateTrcOffchain): Promise<Account> =>
  post(`/v3/offchain/tron/trc`, { ...data, chain: Currency.TRON }, CreateTrcOffchain)
