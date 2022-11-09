/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferAlgoErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * Blockchain address to send ERC20 token to
     */
    to: string;
    /**
     * Blockchain address to send ERC20 token from
     */
    from: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * assetIndex - asset index uniquely specifying the asset
     */
    contractAddress: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
