/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeRecipientTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'TRON';
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Address of the recipient of the fee for the trade.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Recipient address of the marketplace fee.
     */
    feeRecipient: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey?: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}
