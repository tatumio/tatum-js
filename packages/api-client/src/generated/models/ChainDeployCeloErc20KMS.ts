/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeployCeloErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: ChainDeployCeloErc20KMS.chain;
    /**
     * Symbol of the ERC20 token
     */
    symbol: string;
    /**
     * Name of the ERC20 token
     */
    name: string;
    /**
     * Max supply of ERC20 token.
     */
    totalCap?: string;
    /**
     * Max supply of ERC20 token.
     */
    supply: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * Address on Ethereum blockchain, where all created ERC20 tokens will be transferred.
     */
    address: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: ChainDeployCeloErc20KMS.feeCurrency;
}

export namespace ChainDeployCeloErc20KMS {

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
