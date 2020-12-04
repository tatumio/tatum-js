/**
 *
 * @export
 * @interface BtcInfo
 */
export interface BtcInfo {
    /**
     * Chain of the blockchain, main or test.
     * @type {string}
     * @memberof BtcInfo
     */
    chain: string;
    /**
     * Last block.
     * @type {number}
     * @memberof BtcInfo
     */
    blocks: number;
    /**
     * Last headers.
     * @type {number}
     * @memberof BtcInfo
     */
    headers: number;
    /**
     * Hash of the last block.
     * @type {string}
     * @memberof BtcInfo
     */
    bestblockhash: string;
    /**
     * Difficulty of the algorithm.
     * @type {number}
     * @memberof BtcInfo
     */
    difficulty: number;
}
