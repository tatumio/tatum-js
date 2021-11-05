import { get, post } from '@tatumio/tatum-core'
import { QtumIUTXO, QtumIGetInfo, QtumBlock, QtumIRawTransactionInfo, QtumIRawTransactions, QtumISendRawTxResult } from '../model'

export const getQtumUTXOs = async (address: string): Promise<QtumIUTXO> => get(`/v3/qtum/utxo/${address}`)
export const getQtumTransaction = async (id: string): Promise<QtumIRawTransactionInfo> => get(`/v3/qtum/transaction/${id}`)
export const getQtumTransactions = async (address: string, pageSize = 50, offset = 0): Promise<QtumIRawTransactions> => get(`/v3/qtum/transactions/address/${address}/?pageSize=${pageSize}&offset=${offset}`)

export const getQtumBalance = async (address: string): Promise<QtumIGetInfo> => get(`v3/qtum/account/balance/${address}`)
export const getQtumCurrentBlock = async (): Promise<string> => get(`/v3/qtum/block/current`)
export const getQtumBlock = async (hash: string): Promise<QtumBlock> => get(`/v3/qtum/block/${hash}`)

export const estimateQtumFee = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gas/${nblocks}`)
export const estimateQtumFeePerByte = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gasbytes/${nblocks}`)

export const qtumBroadcast = async (rawtx: string): Promise<QtumISendRawTxResult> => post('v3/qtum/broadcast', { rawtx })