/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainMintErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'BSC' | 'XDC';
    /**
     * Amount to be minted and transfered to the recipient.
     */
    amount: string;
    /**
     * Blockchain address to send ERC-20 tokens to.
     */
    to: string;
    /**
     * Address of ERC-20 token
     */
    contractAddress: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}
