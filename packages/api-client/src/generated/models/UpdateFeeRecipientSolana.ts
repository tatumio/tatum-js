/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeRecipientSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of a smart contract
     */
    contractAddress: string;
    /**
     * Recipient address of the marketplace fee.
     */
    treasuryWithdrawalDestination: string;
    /**
     * Marketplace authority.
     */
    from: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
