import { get, post } from '../connector/tatum'
import { CreateTransaction, Transaction, TransactionFilter } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByReference" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByReference = async (reference: string): Promise<Transaction[]> =>
  get(`/v3/ledger/transaction/reference/${reference}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/sendTransaction" target="_blank">Tatum API documentation</a>
 */
export const storeTransaction = async (transaction: CreateTransaction): Promise<{ reference: string }> =>
  post(`/v3/ledger/transaction`, transaction, CreateTransaction)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByAccount = async (filter: TransactionFilter, pageSize = 50, offset = 0): Promise<Transaction[]> =>
  post(`/v3/ledger/transaction/account?pageSize=${pageSize}&offset=${offset}`, filter, TransactionFilter)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByCustomer = async (filter: TransactionFilter, pageSize = 50, offset = 0): Promise<Transaction[]> =>
  post(`/v3/ledger/transaction/customer?pageSize=${pageSize}&offset=${offset}`, filter, TransactionFilter)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByLedger = async (filter: TransactionFilter, pageSize = 50, offset = 0): Promise<Transaction[]> =>
  post(`/v3/ledger/transaction/ledger?pageSize=${pageSize}&offset=${offset}`, filter, TransactionFilter)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByAccount = async (filter: TransactionFilter): Promise<number> =>
  post(`/v3/ledger/transaction/account?count=true`, filter, TransactionFilter)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByCustomer = async (filter: TransactionFilter): Promise<number> =>
  post(`/v3/ledger/transaction/customer?count=true`, filter, TransactionFilter)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByLedger = async (filter: TransactionFilter): Promise<number> =>
  post(`/v3/ledger/transaction/ledger?count=true`, filter, TransactionFilter)
