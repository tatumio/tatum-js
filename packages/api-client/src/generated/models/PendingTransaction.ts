/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResponseData } from './ResponseData';

export type PendingTransaction = {
  /**
   * ID of the pending transaction
   */
  id: string;
  /**
   * Blockchain of the transaction
   */
  chain: 'ADA' | 'BNB' | 'BTC' | 'ETH' | 'XLM' | 'XRP' | 'BCH' | 'LTC' | 'DOGE' | 'VET' | 'BSC' | 'MATIC' | 'CELO' | 'FLOW' | 'TRON' | 'ONE' | 'XDC' | 'EGLD' | 'KLAY' | 'SOL';
  /**
   * List of the signature Ids to be used to sign transaction. Those hashes should be in order of signing for the BTC, LTC or BCH blockchains.
   */
  hashes: Array<string>;
  /**
   * Serialized data of the transaction to be signed. It can be JSON, HEX or any other representation based on the blockchain.
   */
  serializedTransaction: string;
  /**
   * ID of the pending off-chain withdrawal connected to this transaction
   */
  withdrawalId?: string;
  /**
   * In case of mnemonic type of signature Id, this is the index to the specific account that should be used for signature.
   */
  index?: number;
  /**
   * TX hash of successful transaction.
   */
  txId?: string;
  /**
   * Additional information used for BTC, LTC, DOGE and BCH off-chain to blockchain transactions.
   */
  withdrawalResponses?: Array<ResponseData>;
}
