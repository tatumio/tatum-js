/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeployAlgoErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Symbol of the ERC20 token
     */
    symbol: string;
    /**
     * Name of the ERC20 token
     */
    name: string;
    /**
     * Max supply of ERC20 token.
     */
    totalCap?: string;
    /**
     * Initial supply of ERC20 token. If totalCap is not defined, this will be the total cap.
     */
    supply: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * Address on the blockchain, where all created ERC20 tokens will be transferred.
     */
    address: string;
    /**
     * Blockchain address to create token from
     */
    from: string;
    /**
     * The URL pointing to the metadata
     */
    url: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
