/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithdrawFromMarketplaceSolanaKMS = {
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
     * The KMS identifier of the private key of the marketplace fee recipient
     */
    signatureId: string;
}
