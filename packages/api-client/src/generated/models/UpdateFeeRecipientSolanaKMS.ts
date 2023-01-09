/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeRecipientSolanaKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of the smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address of the new marketplace fee recipient
     */
    treasuryWithdrawalDestination: string;
    /**
     * The blockchain address of the marketplace authority
     */
    from: string;
    /**
     * The KMS identifier of the private key of the marketspace authority
     */
    signatureId: string;
}
