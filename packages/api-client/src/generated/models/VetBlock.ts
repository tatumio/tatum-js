/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VetBlock = {
    /**
     * block number (height)
     */
    number?: number;
    /**
     * block identifier
     */
    id?: string;
    /**
     * RLP encoded block size in bytes
     */
    size?: number;
    /**
     * parent block ID
     */
    parentID?: string;
    /**
     * block unix timestamp
     */
    timestamp?: number;
    /**
     * block gas limit (max allowed accumulative gas usage of transactions)
     */
    gasLimit?: number;
    /**
     * Address of account to receive block reward
     */
    beneficiary?: string;
    /**
     * accumulative gas usage of transactions
     */
    gasUsed?: number;
    /**
     * sum of all ancestral blocks' score
     */
    totalScore?: number;
    /**
     * root hash of transactions in the block
     */
    txsRoot?: string;
    /**
     * supported txs features bitset
     */
    txsFeatures?: number;
    /**
     * root hash of accounts state
     */
    stateRoot?: string;
    /**
     * root hash of transaction receipts
     */
    receiptsRoot?: string;
    /**
     * the one who signed this block
     */
    signer?: string;
    /**
     * transactions IDs
     */
    transactions?: Array<string>;
}
