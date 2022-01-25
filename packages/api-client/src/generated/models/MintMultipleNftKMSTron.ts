/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftKMSTron = {
    /**
     * Chain to work with.
     */
    chain: MintMultipleNftKMSTron.chain;
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * Blockchain address to perform transaction from
     */
    account: string;
    /**
     * ID of token to be created.
     */
    tokenId: Array<string>;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: Array<string>;
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

export namespace MintMultipleNftKMSTron {

    /**
     * Chain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
