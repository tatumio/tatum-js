/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithdrawFromMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of the smart contract
     */
    contractAddress: string;
    /**
     * Blockchain address of the marketplace fee recipient
     */
    from: any;
    /**
     * Amount of funds to withdraw.
     */
    amount: string;
    /**
     * The private key of the marketplace fee recipient
     */
    fromPrivateKey: string;
}
