/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftFlowMnemonic = {
    /**
     * Chain to work with.
     */
    chain: BurnNftFlowMnemonic.chain;
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
     * Mnemonic to generate private key of sender address.
     */
    mnemonic: string;
    /**
     * Derivation index of sender address.
     */
    index: number;
}

export namespace BurnNftFlowMnemonic {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
