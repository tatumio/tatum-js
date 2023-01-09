/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferKCSKMS = {
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent in KCS.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Identifier of the mnemonic / private key associated in signing application.
     * When hash identifies mnemonic, index must be present to represent specific account to pay from.
     * Private key, mnemonic or signature Id must be present.
     *
     */
    signatureId: string;
    /**
     * Derivation index of sender address.
     */
    index?: number;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
    /**
     * Gas limit for transaction in gas price. If not set, automatic calculation will be used.
     */
    gasLimit?: string;
    /**
     * Gas price in Gwei. If not set, automatic calculation will be used.
     */
    gasPrice?: string;
}
