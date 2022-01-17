/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintErc20Celo = {
    /**
     * Amount to be minted and transfered to the recipient.
     */
    amount: string;
    /**
     * Blockchain address to send ERC-20 tokens to.
     */
    to: string;
    /**
     * Address of ERC-20 token
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
    feeCurrency: MintErc20Celo.feeCurrency;
}

export namespace MintErc20Celo {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
