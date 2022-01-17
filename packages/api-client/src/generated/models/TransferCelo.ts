/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCelo = {
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
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
     * Private key of sender address. Either mnemonic and index, privateKey or signature Id must be present - depends on the type of account and xpub.
     */
    privateKey: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: TransferCelo.feeCurrency;
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

export namespace TransferCelo {

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
