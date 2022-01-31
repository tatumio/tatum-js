/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithdrawalObject = {
    /**
     * ID of the withdrawal
     */
    id: string;
    /**
     * Transaction ID of broadcast transaction
     */
    txId?: string;
    /**
     * Sender account ID
     */
    accountId: string;
    /**
     * Status of the withdrawal
     */
    status?: 'InProgress' | 'Done' | 'Cancelled';
    /**
     * Blockchain address to send assets to. For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain addresses as a comma separated string.
     */
    address: string;
    /**
     * Transaction internal reference - unique identifier within Tatum ledger. In order of failure, use this value to search for problems.
     */
    reference: string;
    /**
     * Amount to be withdrawn to blockchain.
     */
    amount: string;
    /**
     * <p>Used to parametrize withdrawal. Used for XRP withdrawal to define destination tag of recipient, or XLM memo of the recipient, if needed.<br/>
     * For Bitcoin, Litecoin, Bitcoin Cash, used as a change address for left coins from transaction.</p>
     *
     */
    attr?: string;
    /**
     * Fee to be submitted as a transaction fee to blockchain.
     */
    fee: string;
    /**
     * For BTC, LTC, DOGE and BCH, it is possible to enter list of multiple recipient blockchain amounts. List of recipient addresses must be present in the address field and total sum of amounts must be equal to the amount field.
     */
    multipleAmounts?: Array<string>;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account
     */
    senderNote?: string;
}
