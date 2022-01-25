/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftSolanaKMS = {
    /**
     * Chain to work with.
     */
    chain: TransferNftSolanaKMS.chain;
    /**
     * Blockchain address to send NFT token from. From this address, transaction fee will be paid.
     */
    from: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}

export namespace TransferNftSolanaKMS {

    /**
     * Chain to work with.
     */
    export enum chain {
        SOL = 'SOL',
    }


}
