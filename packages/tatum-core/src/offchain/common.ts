import { get, httpDelete, post, put } from '../connector/tatum'
import {
    Account,
    Address,
    BroadcastWithdrawal,
    TxHash,
    Withdrawal,
    WithdrawalResponse
} from '../model'
import {AddressBatch} from '../model/request/CreateOffchainAddressesBatch'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>
 */
export const generateDepositAddress = async (id: string, index?: number): Promise<Address> => {
    const url = `/v3/offchain/account/${id}/address`
    return post(index === undefined ? url : `${url}?index=${index}`)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddressesBatch" target="_blank">Tatum API documentation</a>
 */
export const generateDepositAddresses = async (batch: AddressBatch): Promise<Address[]> => post(`/v3/offchain/account/address/batch`, batch, AddressBatch)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/addressExists" target="_blank">Tatum API documentation</a>
 */
export const checkAddressExists = async (address: string, currency: string, index?: number): Promise<Account> => {
    const url = `/v3/offchain/account/address/${address}/${currency}`
    return get(index === undefined ? url : `${url}?index=${index}`)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetWithdrawals" target="_blank">Tatum API documentation</a>
 */
export const getWithdrawals = async (status?: string, currency?: string, pageSize = 50, offset = 0): Promise<Withdrawal[]> => {
    let url = `/v3/offchain/withdrawal?pageSize=${pageSize}&offset=${offset}`
    if (status) {
        url += `&status=${status}`
    }
    if (currency) {
        url += `&currency=${currency}`
    }
    return get(url)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/assignAddress" target="_blank">Tatum API documentation</a>
 */
export const assignDepositAddress = async (id: string, address: string): Promise<Address> => post(`/v3/offchain/account/${id}/address/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/removeAddress" target="_blank">Tatum API documentation</a>
 */
export const removeDepositAddress = async (id: string, address: string): Promise<void> => httpDelete(`/v3/offchain/account/${id}/address/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>
 */
export const getDepositAddressesForAccount = async (id: string): Promise<Address[]> => get(`/v3/offchain/account/${id}/address`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>
 */
export const offchainBroadcast = async (data: BroadcastWithdrawal): Promise<TxHash> => post(`/v3/offchain/withdrawal/broadcast`, data, BroadcastWithdrawal)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainStoreWithdrawal = async (data: any): Promise<WithdrawalResponse> => post(`/v3/offchain/withdrawal`, data)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainCancelWithdrawal = async (id: string, revert = true): Promise<void> =>
  httpDelete(`/v3/offchain/withdrawal/${id}?revert=${revert}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/completeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainCompleteWithdrawal = async (id: string, txId: string): Promise<void> => put(`/v3/offchain/withdrawal/${id}/${txId}`)
