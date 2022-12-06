/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithdrawFromMarketplaceSolanaKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of a smart contract
     */
    contractAddress: string;
    /**
     * Blockchain address
     */
    from: any;
    /**
     * Amount of funds to withdraw.
     */
    amount: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
