import { TransferBchBlockchain } from '../model/request';
import { TransactionKMS } from '../model/response';
/**
 * Send Bitcoin Cash transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendBitcoinCashTransaction: (testnet: boolean, body: TransferBchBlockchain) => Promise<import("../model/response").TransactionHash>;
/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signBitcoinCashKMSTransaction: (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => Promise<any>;
/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareBitcoinCashSignedTransaction: (testnet: boolean, body: TransferBchBlockchain) => Promise<any>;
