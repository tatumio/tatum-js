import Web3 from 'web3';
import { TransactionKMS, TransferEthErc20Offchain, TransferEthOffchain } from '../model';
/**
 * Send Ethereum transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendEthOffchainTransaction: (testnet: boolean, body: TransferEthOffchain, provider?: string | undefined) => Promise<{
    id: string;
    txId: string;
    completed: boolean;
}>;
/**
 * Send Ethereum ERC20 transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendEthErc20OffchainTransaction: (testnet: boolean, body: TransferEthErc20Offchain, provider?: string | undefined) => Promise<{
    id: string;
    txId: string;
    completed: boolean;
}>;
/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signEthOffchainKMSTransaction: (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string | undefined) => Promise<string>;
/**
 * Sign Ethereum transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param privateKey private key to sign transaction and send funds from
 * @param address recipient address
 * @param currency Ethereum or supported ERC20
 * @param web3 instance of the web3 client
 * @param gasPrice gas price of the blockchain fee
 * @param nonce nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareEthSignedOffchainTransaction: (amount: string, privateKey: string, address: string, currency: string, web3: Web3, gasPrice: string, nonce?: number | undefined) => Promise<{
    txData: string;
    gasLimit: number;
}>;
/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param privateKey private key to sign transaction and send funds from
 * @param address recipient address
 * @param tokenAddress blockchain address of the custom ERC20 token
 * @param web3 instance of the web3 client
 * @param gasPrice gas price of the blockchain fee
 * @param nonce nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareEthErc20SignedOffchainTransaction: (amount: string, privateKey: string, address: string, web3: Web3, tokenAddress: string, gasPrice: string, nonce?: number | undefined) => Promise<{
    txData: string;
    gasLimit: number;
}>;
