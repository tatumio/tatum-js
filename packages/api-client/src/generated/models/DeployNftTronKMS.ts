/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftTronKMS = {
    /**
     * Chain to work with.
     */
    chain: 'TRON';
    /**
     * Blockchain address to perform transaction from
     */
    from: string;
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Max limit for fee to be paid, in TRX. For deploy, around 580 TRX is consumed.
     */
    feeLimit: number;
}
