/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWallet = {
    /**
     * Blockchain to work with.
     */
    chain: TransferCustodialWallet.chain;
    /**
     * Address of custodial wallet to transfer from
     */
    custodialAddress: string;
    /**
     * Address of the token to transfer. Not valid for native address transfers.
     */
    tokenAddress?: string;
    /**
     * Type of the asset to transfer. 0 - ERC20, 1 - ERC721, 2 - ERC1155, 3 - native asset
     */
    contractType: TransferCustodialWallet.contractType;
    /**
     * Blockchain address to send assets to
     */
    recipient: string;
    /**
     * Amount of the assets to be sent. Not valid for ERC-721 tokens.
     */
    amount?: string;
    /**
     * ID of token, if transaction is for ERC-721 or ERC-1155.
     */
    tokenId?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}

export namespace TransferCustodialWallet {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        ONE = 'ONE',
        XDC = 'XDC',
        BSC = 'BSC',
        MATIC = 'MATIC',
    }

    /**
     * Type of the asset to transfer. 0 - ERC20, 1 - ERC721, 2 - ERC1155, 3 - native asset
     */
    export enum contractType {
        '_0' = 0,
        '_1' = 1,
        '_2' = 2,
        '_3' = 3,
    }


}
