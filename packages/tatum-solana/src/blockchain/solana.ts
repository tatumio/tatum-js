import BigNumber from 'bignumber.js'
import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { BlockResponse, TransactionResponse } from '@solana/web3.js'

export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/solana/broadcast`, { txData, signatureId })
export const getCurrentBlock = async (): Promise<number> => get(`/v3/solana/block/current`)
export const getBlock = async (roundNumber: string): Promise<BlockResponse> => get(`/v3/solana/block/${roundNumber}`)
export const getAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/solana/account/balance/${address}`)
export const getTransaction = async (txid: string): Promise<TransactionResponse> => get(`/v3/solana/transaction/${txid}`)
