/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainMintErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'BSC' | 'MATIC' | 'KLAY' | 'XDC' | 'ONE';
    /**
     * Amount to be minted and transferred to the recipient.
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
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
