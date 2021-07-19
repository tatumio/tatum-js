
import { get, post } from '../connector/tatum'
import { QtumIRawTransactions, QtumIRawTransactionInfo, QtumISendRawTxResult } from "../model/response/qtum/QtumTx"
import { QtumIGetInfo } from '../model/response/qtum/QtumInfo';
import { QtumIUTXO } from '../model/response/qtum/QtumUTXO';
import { QtumBlock } from '../model/response/qtum/QtumBlock';

export const getQtumUTXOs = async (address: string): Promise<QtumIUTXO> => get(`/v3/qtum/utxo/${address}`);
export const getQtumTransaction = async (id: string): Promise<QtumIRawTransactionInfo> => get(`/v3/qtum/transaction/${id}`)
export const getQtumTransactions = async (address: string, pageSize: number = 50, offset: number = 0): Promise<QtumIRawTransactions> => get(`/v3/qtum/transactions/address/${address}/?pageSize=${pageSize}&offset=${offset}`)

export const getInfo = async (address: string): Promise<QtumIGetInfo> => get(`/v3/qtum/${address}/balance`);
export const getBlock = async (): Promise<string> => get(`/v3/qtum/block/current`);
export const getCurrentBlock = async (hash: string): Promise<QtumBlock> => get(`/v3/qtum/block/${hash}`);

export const estimateFee = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gas/${nblocks}`);
export const estimateFeePerByte = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gasbytes/${nblocks}`);

export const broadcast = async (rawtx: string): Promise<QtumISendRawTxResult> => post('v3/qtum/broadcast', { rawtx });