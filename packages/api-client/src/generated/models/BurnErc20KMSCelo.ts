/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnErc20KMSCelo = {
    /**
     * Amount of tokens to be destroyed.
     */
    amount: string;
    /**
     * Address of ERC721 token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId?: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: BurnErc20KMSCelo.feeCurrency;
}

export namespace BurnErc20KMSCelo {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
