/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftTezos = {
    /**
     * The blockchain to work with
     */
    chain: 'TEZOS';
    /**
     * Blockchain address that owns the NFT token
     */
    from: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * The blockchain address of the NFT smart contract
     */
    contractAddress: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
    /**
     * The private key of the blockchain address that owns the token or has rights to transfer the token. This address will pay the fee for the transaction,
     */
    fromPrivateKey: string;
}
