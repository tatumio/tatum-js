/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftTezos = {
    /**
     * The blockchain to work with
     */
    chain: 'TEZOS';
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
    /**
     * Public address of the owner. Owner is admin and minter of the token. Must be a valid address of the Tezos blockchain.
     */
    ownerAddress: string;
}
