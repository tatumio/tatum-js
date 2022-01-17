/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletTron = {
    /**
     * Blockchain to work with.
     */
    chain: TransferCustodialWalletTron.chain;
    /**
     * Address of custodial wallet to transfer from
     */
    custodialAddress: string;
    /**
     * Address of the token to transfer. Not valid for native address transfers.
     */
    tokenAddress?: string;
    /**
     * Type of the asset to transfer. 0 - ERC20, 1 - ERC721, 3 - native asset
     */
    contractType: TransferCustodialWalletTron.contractType;
    /**
     * Blockchain address to send assets to
     */
    recipient: string;
    /**
     * Amount of the assets to be sent. Not valid for ERC-721 tokens.
     */
    amount?: string;
    /**
     * ID of token, if transaction is for ERC-721.
     */
    tokenId?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace TransferCustodialWalletTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }

    /**
     * Type of the asset to transfer. 0 - ERC20, 1 - ERC721, 3 - native asset
     */
    export enum contractType {
        '_0' = 0,
        '_1' = 1,
        '_3' = 3,
    }


}
