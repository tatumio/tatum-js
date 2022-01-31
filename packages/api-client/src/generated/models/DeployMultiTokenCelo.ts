/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployMultiTokenCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * URI of the Multi Token contract
     */
    uri: string;
    /**
     * True if the contract is publicMint type
     */
    publicMint?: boolean;
    /**
     * Private key of account address, from which gas for deployment of ERC1155 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
