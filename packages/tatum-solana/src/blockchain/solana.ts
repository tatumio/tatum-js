import BigNumber from 'bignumber.js'
import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { BlockResponse, TransactionResponse } from '@solana/web3.js'

export const solanaBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/solana/broadcast`, { txData, signatureId })
export const solanaGetCurrentBlock = async (): Promise<number> => get(`/v3/solana/block/current`)
export const solanaGetBlock = async (roundNumber: string): Promise<BlockResponse> => get(`/v3/solana/block/${roundNumber}`)
export const solanaGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/solana/account/balance/${address}`)
export const solanaGetTransaction = async (txid: string): Promise<TransactionResponse> => get(`/v3/solana/transaction/${txid}`)
