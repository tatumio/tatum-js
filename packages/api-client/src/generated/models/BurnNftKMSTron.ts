/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftKMSTron = {
    /**
     * Chain to work with.
     */
    chain: 'TRON';
    /**
     * Blockchain address to perform transaction from
     */
    from: string;
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Max limit for fee to be paid, in TRX.
     */
    feeLimit: number;
}
