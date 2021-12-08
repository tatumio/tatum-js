import { get, post } from '@tatumio/tatum-core'
import { QtumIUTXO, QtumIGetInfo, QtumBlock, QtumIRawTransactionInfo, QtumIRawTransactions, QtumISendRawTxResult } from '../model'

export const getUTXOs = async (address: string): Promise<QtumIUTXO> => get(`/v3/qtum/utxo/${address}`)
export const getTransaction = async (id: string): Promise<QtumIRawTransactionInfo> => get(`/v3/qtum/transaction/${id}`)
export const getTransactions = async (address: string, pageSize = 50, offset = 0): Promise<QtumIRawTransactions> =>
  get(`/v3/qtum/transactions/address/${address}/?pageSize=${pageSize}&offset=${offset}`)

export const getBalance = async (address: string): Promise<QtumIGetInfo> => get(`v3/qtum/account/balance/${address}`)
export const getCurrentBlock = async (): Promise<string> => get(`/v3/qtum/block/current`)
export const getBlock = async (hash: string): Promise<QtumBlock> => get(`/v3/qtum/block/${hash}`)

export const estimateFee = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gas/${nblocks}`)
export const estimateFeePerByte = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gasbytes/${nblocks}`)

export const broadcast = async (rawtx: string): Promise<QtumISendRawTxResult> => post('v3/qtum/broadcast', { rawtx })
