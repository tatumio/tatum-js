import { TransactionKMS, TransferBtcBasedBlockchain } from '../model';
/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signBitcoinKMSTransaction: (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => Promise<string>;
/**
 * Sign Litecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signLitecoinKMSTransaction: (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => Promise<string>;
/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareBitcoinSignedTransaction: (testnet: boolean, body: TransferBtcBasedBlockchain) => Promise<string>;
/**
 * Sign Litcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareLitecoinSignedTransaction: (testnet: boolean, body: TransferBtcBasedBlockchain) => Promise<string>;
/**
 * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendBitcoinTransaction: (testnet: boolean, body: TransferBtcBasedBlockchain) => Promise<import("../model").TransactionHash>;
/**
 * Send Litecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendLitecoinTransaction: (testnet: boolean, body: TransferBtcBasedBlockchain) => Promise<import("../model").TransactionHash>;
