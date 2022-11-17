/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferAlgoErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address to send the fungible tokens from
     */
    from: string;
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
    digits?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
