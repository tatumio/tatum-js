/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferErc20 = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send ERC20 token to
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
     * Gas limit for transaction in gas price. If not set, automatic calculation will be used.
     */
    gasLimit?: string;
    /**
     * Gas price in Gwei. If not set, automatic calculation will be used.
     */
    gasPrice?: string;
    /**
     * Private key of sender address. Either mnemonic and index, privateKey or signature Id must be present - depends on the type of account and xpub.
     */
    privateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
}
