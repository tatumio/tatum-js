/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeRecipientTron = {
    /**
     * Blockchain to work with.
     */
    chain: 'TRON';
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Recipient address of the marketplace fee.
     */
    feeRecipient: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}
