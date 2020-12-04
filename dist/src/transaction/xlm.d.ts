import { TransactionKMS, TransferXlm } from '../model';
/**
 * Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendXlmTransaction: (testnet: boolean, body: TransferXlm) => Promise<import("../model").TransactionHash>;
/**
 * Sign Stellar pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signXlmKMSTransaction: (tx: TransactionKMS, secret: string, testnet: boolean) => Promise<string>;
/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareXlmSignedTransaction: (testnet: boolean, body: TransferXlm) => Promise<string>;
