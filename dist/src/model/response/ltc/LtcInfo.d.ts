/**
 *
 * @export
 * @interface LtcInfo
 */
export interface LtcInfo {
    /**
     * Chain of the blockchain, main or test.
     * @type {string}
     * @memberof LtcInfo
     */
    chain: string;
    /**
     * Last block.
     * @type {number}
     * @memberof LtcInfo
     */
    blocks: number;
    /**
     * Last headers.
     * @type {number}
     * @memberof LtcInfo
     */
    headers: number;
    /**
     * Hash of the last block.
     * @type {string}
     * @memberof LtcInfo
     */
    bestblockhash: string;
    /**
     * Difficulty of the PoW algorithm.
     * @type {number}
     * @memberof LtcInfo
     */
    difficulty: number;
}
