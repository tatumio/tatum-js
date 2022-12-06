/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferAlgoErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The blockchain address to send the fungible tokens from
     */
    from: string;
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The asset ID (the ID of the fungible tokens)
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
}
