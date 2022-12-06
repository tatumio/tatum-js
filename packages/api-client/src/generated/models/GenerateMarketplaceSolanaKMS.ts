/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateMarketplaceSolanaKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee: number;
    /**
     * The address that will be the owner of the marketplace
     */
    from: string;
    /**
     * Address of a SPL token contract
     */
    treasuryMint?: string;
    /**
     * The address that will be able to withdraw funds from the marketplace treasury account to own address
     */
    treasuryWithdrawalDestination?: string;
    /**
     * The address that will be able to withdraw funds from the marketplace fee account to own address
     */
    feeWithdrawalDestination?: string;
    /**
     * Flag - DESC TOODO
     */
    requiresSignOff?: boolean;
    /**
     * Flag - DESC TOODO
     */
    canChangeSalePrice?: boolean;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
