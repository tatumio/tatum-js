import { TransactionKMS, TransferXrp } from '../model';
/**
 * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendXrpTransaction: (body: TransferXrp) => Promise<import("../model").TransactionHash>;
/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signXrpKMSTransaction: (tx: TransactionKMS, secret: string) => Promise<string>;
/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareXrpSignedTransaction: (body: TransferXrp) => Promise<string>;
