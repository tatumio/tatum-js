/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OffchainEstimateFee = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets to. For BTC, LTC, and DOGE, it is possible to enter list of multiple recipient blockchain addresses as a comma separated string.
     */
    address: string;
    /**
     * Amount to be withdrawn to blockchain.
     */
    amount: string;
    /**
     * For BTC, LTC, and DOGE, it is possible to enter list of multiple recipient blockchain amounts. List of recipient addresses must be present in the address field and total sum of amounts must be equal to the amount field.
     */
    multipleAmounts?: Array<string>;
    /**
     * Used to parametrize withdrawal as a change address for left coins from transaction. XPub or attr must be used.
     */
    attr?: string;
    /**
     * Extended public key (xpub) of the wallet associated with the accounts.
     */
    xpub?: string;
}
