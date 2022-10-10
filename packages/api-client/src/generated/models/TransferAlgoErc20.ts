/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgoErc20 = {
    /**
     * The ID of the virtual account to send the ERC-20-equivalent Algorand tokens from
     */
    senderAccountId: string;
    /**
     * The blockchain address to send the ERC-20-equivalent Algorand tokens to
     */
    address: string;
    /**
     * The amount of the ERC-20-equivalent Algorand tokens to send
     */
    amount: string;
    /**
     * The secret of the Algorand wallet (account). Secret, or signature Id must be present.
     */
    privateKey: string;
    /**
     * Compliance check; if the withdrawal is not compliant, it will not be processed
     */
    compliant?: boolean;
    /**
     * The identifier of the token transfer that is shown on the virtual account for the created transaction
     */
    paymentId?: string;
    /**
     * The note for the recipient; must not contain spaces
     */
    senderNote?: string;
}
