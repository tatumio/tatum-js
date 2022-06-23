/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBchKeyPair = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets to. For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain addresses as a comma separated string.
     */
    address: string;
    /**
     * Amount to be withdrawn to blockchain.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain amounts. List of recipient addresses must be present in the address field and total sum of amounts must be equal to the amount field.
     */
    multipleAmounts?: Array<string>;
    /**
     * Fee to be submitted as a transaction fee to blockchain. If none is set, default value of 0.00005 BCH is used.
     */
    fee?: string;
    /**
     * Array of assigned blockchain addresses with their private keys.
     * Either mnemonic, keyPair or signature Id must be present - depends on the type of account and xpub.
     * Tatum KMS does not support keyPair type of off-chain transaction, only mnemonic based.
     *
     */
    keyPair: Array<{
        /**
         * Blockchain address assigned to account withdrawal is made from.
         */
        address?: string;
        /**
         * Private key of blockchain address.
         */
        privateKey?: string;
    }>;
    /**
     * Used to parametrize withdrawal as a change address for left coins from transaction. XPub or attr must be used.
     */
    attr: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
}
