/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletBatchTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'TRON';
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
