/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAdaKMS = {
    /**
     * Blockchain address to send assets to
     */
    address: string;
    /**
     * Amount to be sent in ADA.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Fee to be submitted as a transaction fee to blockchain. If none is set, default value of 1 ADA is used.
     */
    fee?: string;
    /**
     * Blockchain address to send assets from
     */
    from: string;
    /**
     * Identifier of the mnemonic / private key associated in signing application.
     * When hash identifies mnemonic, index must be present to represent specific account to pay from.
     * Private key, mnemonic or signature Id must be present.
     *
     */
    signatureId: string;
    /**
     * Extended public key (xpub) of the wallet associated with the accounts. XPub or attr must be used with signatureId.
     */
    xpub: string;
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
}
