/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftKMSTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * Blockchain address to perform transaction from
     */
    account: string;
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
     * The maximum amount to be paid as the transaction fee (in TRX)
     */
    feeLimit: number;
}
