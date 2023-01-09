/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCeloMnemonic = {
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Derivation index of sender address.
     */
    index: number;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Gas limit for transaction in gas price. If not set, automatic calculation will be used.
     */
    gasLimit?: string;
    /**
     * Gas price in Gwei. If not set, automatic calculation will be used.
     */
    gasPrice?: string;
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
