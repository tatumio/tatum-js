import { Memo } from 'stellar-sdk';
import { TransactionKMS, TransferXlmOffchain } from '../model';
/**
 * Send Stellar transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendXlmOffchainTransaction: (testnet: boolean, body: TransferXlmOffchain) => Promise<{
    id: string;
    txId: string;
    completed: boolean;
}>;
/**
 * Sign Stellar pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signXlmOffchainKMSTransaction: (tx: TransactionKMS, secret: string, testnet: boolean) => Promise<string>;
/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param account Stellar account with information
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param memo short memo to include in transaction
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareXlmSignedOffchainTransaction: (testnet: boolean, account: any, amount: string, address: string, secret: string, memo?: Memo<import("stellar-base").MemoType> | undefined) => Promise<string>;
