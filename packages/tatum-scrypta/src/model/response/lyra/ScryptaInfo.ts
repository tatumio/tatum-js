/**
 *
 * @export
 * @interface ScryptaInfo
 */
export interface ScryptaInfo {
    /**
     * Chain of the blockchain, main or test.
     * @type {string}
     * @memberof ScryptaInfo
     */
    chain: string;
    /**
     * Last block.
     * @type {number}
     * @memberof ScryptaInfo
     */
    blocks: number;
    /**
     * Last headers.
     * @type {number}
     * @memberof ScryptaInfo
     */
    headers: number;
    /**
     * Hash of the last block.
     * @type {string}
     * @memberof ScryptaInfo
     */
    bestblockhash: string;
    /**
     * Difficulty of the algorithm.
     * @type {number}
     * @memberof ScryptaInfo
     */
    difficulty: number;
}