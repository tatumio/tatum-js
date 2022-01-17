/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferCeloErc20TokenKMS = {
    /**
     * Chain to work with.
     */
    chain: ChainTransferCeloErc20TokenKMS.chain;
    /**
     * Blockchain address to send ERC20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Number of decimal points that ERC20 token has.
     */
    digits: number;
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
    feeCurrency: ChainTransferCeloErc20TokenKMS.feeCurrency;
}

export namespace ChainTransferCeloErc20TokenKMS {

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
