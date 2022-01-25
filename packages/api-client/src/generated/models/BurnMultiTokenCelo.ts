/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenCelo = {
    /**
     * Chain to work with.
     */
    chain: BurnMultiTokenCelo.chain;
    /**
     * Address of holder
     */
    account: string;
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * amount of token to be destroyed.
     */
    amount: string;
    /**
     * Address of Multi Token token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: BurnMultiTokenCelo.feeCurrency;
}

export namespace BurnMultiTokenCelo {

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
