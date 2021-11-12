import { Account, Address, post, CreateTrcOffchain } from '@tatumio/tatum-core'

export {
  generateDepositAddress,
  generateDepositAddresses,
  checkAddressExists,
  getWithdrawals,
  assignDepositAddress,
  removeDepositAddress,
  getDepositAddressesForAccount,
  offchainBroadcast,
  offchainStoreWithdrawal,
  offchainCancelWithdrawal,
  offchainCompleteWithdrawal,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeTrcAddress" target="_blank">Tatum API documentation</a>
 */
export const storeTrcContractAddress = async (name: string, address: string): Promise<Address> =>
  post(`/v3/offchain/tron/trc/${name}/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createTrc" target="_blank">Tatum API documentation</a>
 */
export const registerTronTrc = async (data: CreateTrcOffchain): Promise<Account> => post(`/v3/offchain/tron/trc`, data, CreateTrcOffchain)
