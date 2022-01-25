/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainBurnCeloErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: ChainBurnCeloErc20KMS.chain;
    /**
     * Amount of tokens to be destroyed.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
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
    feeCurrency: ChainBurnCeloErc20KMS.feeCurrency;
}

export namespace ChainBurnCeloErc20KMS {

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
