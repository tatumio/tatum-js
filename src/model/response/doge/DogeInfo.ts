/**
 *
 * @export
 * @interface DogeInfo
 */
export interface DogeInfo {
    /**
     * Chain of the blockchain, main or test.
     * @type {string}
     * @memberof DogeInfo
     */
    chain: string;
    /**
     * Last block.
     * @type {number}
     * @memberof DogeInfo
     */
    blocks: number;
    /**
     * Last headers.
     * @type {number}
     * @memberof DogeInfo
     */
    headers: number;
    /**
     * Hash of the last block.
     * @type {string}
     * @memberof DogeInfo
     */
    bestblockhash: string;
    /**
     * Difficulty of the PoW algorithm.
     * @type {number}
     * @memberof DogeInfo
     */
    difficulty: number;
}
