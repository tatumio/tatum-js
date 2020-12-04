import { TransactionKMS, TransferXrpOffchain } from '../model';
/**
 * Send Xrp transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export declare const sendXrpOffchainTransaction: (testnet: boolean, body: TransferXrpOffchain) => Promise<{
    id: string;
    txId: string;
    completed: boolean;
}>;
/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const signXrpOffchainKMSTransaction: (tx: TransactionKMS, secret: string) => Promise<string>;
/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param account Xrp source account
 * @param fee fee to pay
 * @param sourceTag source tag to include in transaction
 * @param destinationTag
 * @returns transaction data to be broadcast to blockchain.
 */
export declare const prepareXrpSignedOffchainTransaction: (testnet: boolean, amount: string, address: string, secret: string, account: any, fee: string, sourceTag?: number | undefined, destinationTag?: string | undefined) => Promise<string>;
