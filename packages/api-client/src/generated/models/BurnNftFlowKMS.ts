/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftFlowKMS = {
    /**
     * Chain to work with.
     */
    chain: BurnNftFlowKMS.chain;
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Derivation index of sender address.
     */
    index?: number;
}

export namespace BurnNftFlowKMS {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
