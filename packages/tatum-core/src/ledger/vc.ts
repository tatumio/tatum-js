import { get, post, put } from '../connector/tatum'
import { Account } from '../model'
import { CreateCurrency } from '../model/request/CreateCurrency'
import { CurrencyOperation } from '../model/request/CurrencyOperation'
import { UpdateCurrency } from '../model/request/UpdateCurrency'
import { VC } from '../model/response/ledger/VC'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCurrency" target="_blank">Tatum API documentation</a>
 */
export const getVirtualCurrencyByName = async (name: string): Promise<VC> => get(`/v3/ledger/virtualCurrency/${name}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createCurrency" target="_blank">Tatum API documentation</a>
 */
export const createVirtualCurrency = async (data: CreateCurrency): Promise<Account> =>
  post(`/v3/ledger/virtualCurrency`, data, CreateCurrency)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/updateCurrency" target="_blank">Tatum API documentation</a>
 */
export const updateVirtualCurrency = async (data: UpdateCurrency): Promise<void> => put(`/v3/ledger/virtualCurrency/`, data, UpdateCurrency)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/mintCurrency" target="_blank">Tatum API documentation</a>
 */
export const mintVirtualCurrency = async (data: CurrencyOperation): Promise<{ reference: string }> =>
  put(`/v3/ledger/virtualCurrency/mint`, data, CurrencyOperation)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/revokeCurrency" target="_blank">Tatum API documentation</a>
 */
export const revokeVirtualCurrency = async (data: CurrencyOperation): Promise<{ reference: string }> =>
  put(`/v3/ledger/virtualCurrency/revoke`, data, CurrencyOperation)
