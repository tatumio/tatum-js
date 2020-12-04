/**
 *
 * @export
 * @interface VetBlock
 */
export interface VetBlock {
    /**
     * block number (height)
     * @type {number}
     * @memberof VetBlock
     */
    number: number;
    /**
     * block identifier
     * @type {string}
     * @memberof VetBlock
     */
    id: string;
    /**
     * RLP encoded block size in bytes
     * @type {number}
     * @memberof VetBlock
     */
    size: number;
    /**
     * parent block ID
     * @type {string}
     * @memberof VetBlock
     */
    parentID: string;
    /**
     * block unix timestamp
     * @type {number}
     * @memberof VetBlock
     */
    timestamp: number;
    /**
     * block gas limit (max allowed accumulative gas usage of transactions)
     * @type {number}
     * @memberof VetBlock
     */
    gasLimit: number;
    /**
     * Address of account to receive block reward
     * @type {string}
     * @memberof VetBlock
     */
    beneficiary: string;
    /**
     * accumulative gas usage of transactions
     * @type {number}
     * @memberof VetBlock
     */
    gasUsed: number;
    /**
     * sum of all ancestral blocks' score
     * @type {number}
     * @memberof VetBlock
     */
    totalScore: number;
    /**
     * root hash of transactions in the block
     * @type {string}
     * @memberof VetBlock
     */
    txsRoot: string;
    /**
     * supported txs features bitset
     * @type {number}
     * @memberof VetBlock
     */
    txsFeatures: number;
    /**
     * root hash of accounts state
     * @type {string}
     * @memberof VetBlock
     */
    stateRoot: string;
    /**
     * root hash of transaction receipts
     * @type {string}
     * @memberof VetBlock
     */
    receiptsRoot: string;
    /**
     * the one who signed this block
     * @type {string}
     * @memberof VetBlock
     */
    signer: string;
    /**
     * transactions IDs
     * @type {Array<string>}
     * @memberof VetBlock
     */
    transactions: string[];
}
