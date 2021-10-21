/**
 *
 * @export
 * @interface AlgoTx
 */
 export interface AlgoTx {
    /**
     * [rc] rewards applied to close-remainder-to account.
     * @type {number}
     * @memberof AlgoTx
     */
    closeRewards: number;

    /**
     * [ca]closing amount for transaction.
     * @type {number}
     * @memberof AlgoTx
     */
    closingAmount: number;

    /**
     * Round when the transaction was confirmed.
     * @type {number}
     * @memberof AlgoTx
     */
    confirmedRound: number;

     /**
     * [fee] Transaction fee.
     * @type {number}
     * @memberof AlgoTx
     */
    fee: number;

    /**
     * [fv] First valid round for this transaction.
     * @type {number}
     * @memberof AlgoTx
     */
    firstValid: number;

    /**
     * [gh] Hash of genesis block.
     * @type {string}
     * @memberof AlgoTx
     */
    
    genisisHash: string;

    /**
     * [gen] genesis block ID.
     * @type {string}
     * @memberof AlgoTx
     */
    genesisId: string;

    /**
     * Transaction ID.
     * @type {string}
     * @memberof AlgoTx
     */
    id: string;

    /**
     * Offset into the round where this transaction was confirmed.
     * @type {number}
     * @memberof AlgoTx
     */
    intraRoundOffset: number;

    /**
     * [lv] Last valid round for this transation.
     * @type {number}
     * @memberof AlgoTx
     */
    lastValid: number;

    /**
     * [note] Free form data.
     * @type {string}
     * @memberof AlgoTx
     */
    note: string;

    /**
     * optional
     * @type {any}
     * @memberof AlgoTx
     */
    paymentTransaction: any;

    /**
     * [rr] rewards applied to receiver account
     * @type {number}
     * @memberof AlgoTx
     */
    receiverRewards: number;

    /**
     * Time when the block this transaction is in was confirmed.
     * @type {number}
     * @memberof AlgoTx
     */
    roundTime: number;

    /**
     * [snd] Sender's address
     * @type {string}
     * @memberof AlgoTx
     */
    sender: string;

    /**
     * [rs] rewards applied to sender account
     * @type {number}
     * @memberof AlgoTx
     */
    senderRewards: number;

    /**
     * signature
     * @type {any}
     * @memberof AlgoTx
     */
    signature: any;

    /**
     * [type] Indicates what type of transaction this is. Different types have different fields.
     * 
     * Valid types, and where their fields are stored:
     * [pay] payment-transaction
     * [keyreg] keyreg-transaction
     * [acfg] asset-config-transaction
     * [axfer] asset-transfer-transaction
     * [afrz] asset-freeze-transaction
     * [appl] application-transaction
     * 
     * @type {string}
     * @memberof AlgoTx
     */
    txType: string;
}