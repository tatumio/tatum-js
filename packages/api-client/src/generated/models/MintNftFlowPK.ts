/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftFlowPK = {
    /**
     * Chain to work with.
     */
    chain: MintNftFlowPK.chain;
    /**
     * Blockchain address to send NFT token to.
     */
    to: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
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

export namespace MintNftFlowPK {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
