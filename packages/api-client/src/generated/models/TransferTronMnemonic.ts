/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronMnemonic = {
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent in Tron.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Fee to be submitted as a transaction fee to blockchain. If none is set, default value of 2.5 TRX is used.
     */
    fee?: string;
    /**
     * Derivation index of sender address.
     */
    index: number;
    /**
     * Mnemonic to generate private key for sender address. Either mnemonic and index, privateKey or signature Id must be present - depends on the type of account and xpub.
     */
    mnemonic: string;
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
}
