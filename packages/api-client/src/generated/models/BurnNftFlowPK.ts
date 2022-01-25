/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftFlowPK = {
    /**
     * Chain to work with.
     */
    chain: BurnNftFlowPK.chain;
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
     * Private key of sender address. Private key, mnemonic and index or signature Id must be present.
     */
    privateKey: string;
}

export namespace BurnNftFlowPK {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
