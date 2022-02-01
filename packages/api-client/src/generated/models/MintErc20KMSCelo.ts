/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintErc20KMSCelo = {
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
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
