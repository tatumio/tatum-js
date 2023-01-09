/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferSolanaBlockchain = {
    /**
     * Blockchain address to send assets from
     */
    from: string;
    /**
     * Blockchain address to send assets to
     */
    to: string;
    /**
     * Amount to be sent in SOL.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Address on the Solana blockchain, from which the fee will be paid for transaction. Defaults to from.
     */
    feePayer?: string;
    /**
     * Private key of the fee payer address.
     */
    feePayerPrivateKey?: string;
}
