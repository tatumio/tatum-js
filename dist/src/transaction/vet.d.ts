import { TransactionKMS, TransferVet } from '../model';
/**
 * Send VeChain transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendVetTransaction: (testnet: boolean, body: TransferVet, provider?: string | undefined) => Promise<import("../model").TransactionHash>;
/**
 * Sign VeChain pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signVetKMSTransaction: (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string | undefined) => Promise<any>;
/**
 * Sign VeChain transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the VeChain Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareVetSignedTransaction: (testnet: boolean, body: TransferVet, provider?: string | undefined) => Promise<any>;
