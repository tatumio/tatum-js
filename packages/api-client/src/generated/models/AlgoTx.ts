/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AlgoTx = {
    /**
     * rewards applied to close-remainder-to account.
     */
    closeRewards?: number;
    /**
     * closing amount for transaction.
     */
    closingAmount?: number;
    /**
     * Round when the transaction was confirmed.
     */
    confirmedRound?: number;
    /**
     * Transaction fee
     */
    fee?: number;
    /**
     * First valid round for this transaction.
     */
    firstValid?: number;
    /**
     * Hash of genesis block
     */
    genesisHash?: string;
    /**
     * genesis block ID.
     */
    genesisId?: string;
    /**
     * transaction ID
     */
    id?: string;
    /**
     * Offset into the round where this transaction was confirmed.
     */
    intraRoundOffset?: number;
    /**
     * Last valid round for this transaction.
     */
    lastValid?: number;
    /**
     * Free form data
     */
    note?: string;
    /**
     * payment Transaction
     */
    paymentTransaction?: any;
    /**
     * rewards applied to receiver account.
     */
    receiverRewards?: number;
    /**
     * Time when the block this transaction is in was confirmed.
     */
    roundTime?: number;
    /**
     * Sender's address
     */
    sender?: string;
    /**
     * rewards applied to sender account.
     */
    senderRewards?: number;
    /**
     * signature
     */
    signature?: any;
    /**
     * indicates what type of transaction this is. Different types have differnet fields.
     */
    txType?: string;
}
