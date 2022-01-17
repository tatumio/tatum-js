/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferErc20CeloKMS = {
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
    feeCurrency: TransferErc20CeloKMS.feeCurrency;
}

export namespace TransferErc20CeloKMS {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
