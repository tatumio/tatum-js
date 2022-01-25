/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletBatchTron = {
    /**
     * Blockchain to work with.
     */
    chain: TransferCustodialWalletBatchTron.chain;
    /**
     * Address of custodial wallet to transfer from
     */
    custodialAddress: string;
    /**
     * Address of the token to transfer. Not valid for native address transfers.
     */
    tokenAddress?: Array<string>;
    /**
     * Type of the asset to transfer. 0 - ERC20, 1 - ERC721, 3 - native asset
     */
    contractType: Array<0 | 1 | 3>;
    /**
     * Blockchain address to send assets to
     */
    recipient: Array<string>;
    /**
     * Amount of the assets to be sent. Not valid for ERC-721 tokens.
     */
    amount?: Array<string>;
    /**
     * ID of token, if transaction is for ERC-721.
     */
    tokenId?: Array<string>;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace TransferCustodialWalletBatchTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
