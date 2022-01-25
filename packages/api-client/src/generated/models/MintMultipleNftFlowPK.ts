/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftFlowPK = {
    /**
     * Chain to work with.
     */
    chain: MintMultipleNftFlowPK.chain;
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: Array<string>;
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

export namespace MintMultipleNftFlowPK {

    /**
     * Chain to work with.
     */
    export enum chain {
        FLOW = 'FLOW',
    }


}
