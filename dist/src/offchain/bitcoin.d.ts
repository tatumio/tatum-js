import { KeyPair, TransactionKMS, TransferBtcBasedOffchain, WithdrawalResponseData } from '../model';
/**
 * Send Bitcoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendBitcoinOffchainTransaction: (testnet: boolean, body: TransferBtcBasedOffchain) => Promise<{
    id: string;
    txId: string;
    completed: boolean;
}>;
/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signBitcoinOffchainKMSTransaction: (tx: TransactionKMS, mnemonic: string, testnet: boolean) => Promise<string>;
/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareBitcoinSignedOffchainTransaction: (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic?: string | undefined, keyPair?: KeyPair[] | undefined, changeAddress?: string | undefined) => Promise<string>;
