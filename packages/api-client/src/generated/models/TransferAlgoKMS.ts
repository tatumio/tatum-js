/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgoKMS = {
    /**
     * The ID of the virtual account to send Algos from
     */
    senderAccountId: string;
    /**
     * The blockchain address to send Algos to
     */
    address: string;
    /**
     * The amount to send in Algos
     */
    amount: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * The identifier of the secret of the Algorand wallet (account) in the signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * The blockchain address of the sender
     */
    from: string;
    /**
     * Compliance check; if the withdrawal is not compliant, it will not be processed
     */
    compliant?: boolean;
    /**
     * The identifier of the Algo transfer that is shown on the virtual account for the created transaction
     */
    paymentId?: string;
    /**
     * The note for the recipient; must not contain spaces
     */
    senderNote?: string;
}
