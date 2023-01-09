/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferSolanaBlockchainKMS = {
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
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Blockchain address to pay the fee for the transaction from
     */
    feePayer?: string;
    /**
     * Identifier of the private key used for paying the gas costs in signing application. Defaults to the signatureId.
     */
    feePayerSignatureId?: string;
}
