import Web3 from 'web3';
import { CreateRecord, DeployEthErc20, TransactionKMS, TransferCustomErc20, TransferEthErc20 } from '../model';
/**
 * Estimate Gas price for the transaction.
 * @param client
 */
export declare const ethGetGasPriceInWei: (client: Web3) => Promise<string>;
/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signEthKMSTransaction: (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string | undefined) => Promise<string>;
/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareStoreDataTransaction: (testnet: boolean, body: CreateRecord, provider?: string | undefined) => Promise<string>;
/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareEthOrErc20SignedTransaction: (testnet: boolean, body: TransferEthErc20, provider?: string | undefined) => Promise<string>;
/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareCustomErc20SignedTransaction: (testnet: boolean, body: TransferCustomErc20, provider?: string | undefined) => Promise<string>;
/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareDeployErc20SignedTransaction: (testnet: boolean, body: DeployEthErc20, provider?: string | undefined) => Promise<string>;
/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendStoreDataTransaction: (testnet: boolean, body: CreateRecord, provider?: string | undefined) => Promise<import("../model").TransactionHash>;
/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendEthOrErc20Transaction: (testnet: boolean, body: TransferEthErc20, provider?: string | undefined) => Promise<import("../model").TransactionHash>;
/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendCustomErc20Transaction: (testnet: boolean, body: TransferCustomErc20, provider?: string | undefined) => Promise<import("../model").TransactionHash>;
/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendDeployErc20Transaction: (testnet: boolean, body: DeployEthErc20, provider?: string | undefined) => Promise<import("../model").TransactionHash>;
