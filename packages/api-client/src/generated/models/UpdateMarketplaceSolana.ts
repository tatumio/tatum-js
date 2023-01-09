/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of the smart contract
     */
    contractAddress: string;
    /**
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee?: number;
    /**
     * The blockchain address of the marketplace authority
     */
    from: string;
    /**
     * The address that will be able to withdraw funds from the marketplace treasury account to own address
     */
    treasuryWithdrawalDestination?: string;
    /**
     * The address that will be able to withdraw funds from the marketplace fee account to own address
     */
    feeWithdrawalDestination?: string;
    /**
     * Set to "false" if you do not want the marketplace to sign all operations related to the listings and sales; if not set, defaults to "true" (the marketplace must sign all the operations)
     */
    requiresSignOff?: boolean;
    /**
     * The private key of the marketplace authority
     */
    fromPrivateKey: string;
}
