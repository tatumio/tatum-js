/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgo = {
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
    fee: string;
    /**
     * The secret of the Algorand wallet (account). Secret, or signature Id must be present.
     */
    privateKey: string;
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
