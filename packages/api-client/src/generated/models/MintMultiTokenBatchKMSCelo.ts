/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultiTokenBatchKMSCelo = {
    /**
     * Chain to work with.
     */
    chain: MintMultiTokenBatchKMSCelo.chain;
    /**
     * Blockchain address to send Multi Token token to.
     */
    to: Array<string>;
    /**
     * ID of token to be created.
     */
    tokenId: Array<Array<string>>;
    /**
     * ID of token to be created.
     */
    amounts: Array<Array<string>>;
    /**
     * Data in bytes
     */
    data?: string;
    /**
     * Address of Multi Token token
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
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: MintMultiTokenBatchKMSCelo.feeCurrency;
}

export namespace MintMultiTokenBatchKMSCelo {

    /**
     * Chain to work with.
     */
    export enum chain {
        CELO = 'CELO',
    }

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
