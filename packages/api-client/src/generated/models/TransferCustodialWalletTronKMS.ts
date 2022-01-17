/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: TransferCustodialWalletTronKMS.chain;
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
    contractType: TransferCustodialWalletTronKMS.contractType;
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
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
}

export namespace TransferCustodialWalletTronKMS {

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
