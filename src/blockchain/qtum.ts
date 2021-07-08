import { get, post } from '../connector/tatum'
import { QtumIRawTransactions, QtumIRawTransactionInfo, QtumIContractCall, QtumISendRawTxResult } from "src/model/response/qtum/qtumTx"
import { QtumIGetInfo, } from 'src/model/response/qtum/qtumInfo';
import { QtumIUTXO } from 'src/model/response/qtum/qtumUTXO';
export const getQtumUTXOs = async (address: string): Promise<QtumIUTXO> => get(`/v3/qtum/utxo/${address}`);
export const getQtumTransaction = async (id: string): Promise<QtumIRawTransactionInfo>=>get(`/v3/qtum/transaction/${id}`)
export const getQtumTransactions = async (address: string,pageNum:number): Promise<QtumIRawTransactions>=>get(`/v3/qtum/transactions/address/${address}/${pageNum}`)

export const getInfo = async (address: string): Promise<QtumIGetInfo> => get(`/v3/qtum/${address}/balance`);

export const estimateFee = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gas/${nblocks}`);
export const estimateFeePerByte = async (nblocks: number): Promise<any> => get(`/v3/qtum/transactions/gasbytes/${nblocks}`);

export const broadcast = async (rawtx: string): Promise<QtumISendRawTxResult> => post('v3/qtum/broadcast', { rawtx });

export const smartContract = async (address: string,encodedData: string): Promise<QtumIContractCall> => post('v3/qtum/smartcontract',{address,encodedData})
