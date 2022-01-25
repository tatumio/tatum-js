/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftTron = {
    /**
     * Chain to work with.
     */
    chain: BurnNftTron.chain;
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Max limit for fee to be paid, in TRX.
     */
    feeLimit: number;
}

export namespace BurnNftTron {

    /**
     * Chain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
