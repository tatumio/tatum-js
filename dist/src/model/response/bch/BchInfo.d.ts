/**
 *
 * @export
 * @interface BchInfo
 */
export interface BchInfo {
    /**
     * Chain of the blockchain, main or test.
     * @type {string}
     * @memberof BchInfo
     */
    chain: string;
    /**
     * Last block.
     * @type {number}
     * @memberof BchInfo
     */
    blocks: number;
    /**
     * Hash of the last block.
     * @type {string}
     * @memberof BchInfo
     */
    bestblockhash: string;
    /**
     * Difficulty of the PoW algorithm.
     * @type {number}
     * @memberof BchInfo
     */
    difficulty: number;
}
