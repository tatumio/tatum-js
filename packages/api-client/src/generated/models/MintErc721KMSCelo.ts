/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintErc721KMSCelo = {
    /**
     * ID of token to be created.
     */
    tokenId: string;
    /**
     * Blockchain address to send ERC721 token to
     */
    to: string;
    /**
     * Address of ERC721 token
     */
    contractAddress: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
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
    feeCurrency: MintErc721KMSCelo.feeCurrency;
}

export namespace MintErc721KMSCelo {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
