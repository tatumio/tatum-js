/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithdrawFromMarketplaceSolana = {
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
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
