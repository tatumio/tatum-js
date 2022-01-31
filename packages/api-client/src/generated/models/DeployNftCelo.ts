/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * True if the contract is provenance type - each transfer of the NFT can track the provenance history of the transaction. Based on this features, percentage royalties could be enabled.
     */
    provenance?: boolean;
    /**
     * True if anyone will be able to mint NFTs, false by default for deployer as a default minter.
     */
    publicMint?: boolean;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of Ethereum account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
