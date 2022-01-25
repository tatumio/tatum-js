/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftFlowMnemonic = {
    /**
     * Chain to work with.
     */
    chain: TransferNftFlowMnemonic.chain;
    /**
     * Blockchain address to send NFT token to.
     */
    to: string;
    /**
     * ID of token to be sent.
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

export namespace TransferNftFlowMnemonic {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
