/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferSolanaSplKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address to send the fungible tokens from
     */
    from: string;
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address of the fungible tokens
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have
     */
    digits: number;
    /**
     * The KMS identifier of the private key of the blockchain address that you are sending the fungible tokens from (the address that you specified in the <code>from</code> parameter); the transaction fee will be deducted from this address
     */
    signatureId: string;
    /**
     * The blockchain address from which the fee will be deducted; if not set, defaults to the address that you specified in the <code>from</code> parameter
     */
    feePayer?: string;
    /**
     * The KMS identifier of the private key of the blockchain address that you specified in the <code>feePayer</code> parameter; if not set, defaults to the signature ID that you specified in the <code>signatureId</code> parameter
     */
    feePayerSignatureId?: string;
}
