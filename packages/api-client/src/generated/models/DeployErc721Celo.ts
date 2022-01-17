/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployErc721Celo = {
    /**
     * Name of the ERC721 token
     */
    name: string;
    /**
     * Symbol of the ERC721 token
     */
    symbol: string;
    /**
     * Private key of Celo account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: DeployErc721Celo.feeCurrency;
}

export namespace DeployErc721Celo {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
