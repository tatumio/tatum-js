import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { EstimateGasVet, VetBlock, VetEstimateGas, VetTx, VetTxReceipt } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/vet/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = async (body: EstimateGasVet): Promise<VetEstimateGas> =>
  post(`/v3/vet/broadcast/transaction/gas`, body, EstimateGasVet)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/vet/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<VetBlock> => get(`/v3/vet/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (address: string): Promise<number> => get(`/v3/vet/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetEnergy" target="_blank">Tatum API documentation</a>
 */
export const getAccountEnergy = async (address: string): Promise<number> => get(`/v3/vet/account/energy/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<VetTx> => get(`/v3/vet/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
export const getTransactionReceipt = async (hash: string): Promise<VetTxReceipt> => get(`/v3/vet/transaction/${hash}/receipt`)
