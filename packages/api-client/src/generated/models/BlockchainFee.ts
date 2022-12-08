/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Recommended fees to perform blockchain transaction
 */
export type BlockchainFee = {
    /**
     * Fast transaction acceptance time into block. For btc-based chains - fee per byte. For evm-based chains - gas price in wei
     */
    fast: number;
    /**
     * Medium transaction acceptance time into block. For btc-based chains - fee per byte. For evm-based chains - gas price in wei
     */
    medium: number;
    /**
     * Slow transaction acceptance time into block. For btc-based chains - fee per byte. For evm-based chains - gas price in wei
     */
    slow: number;
    /**
     * (evm-based only) This is the minimum fee needs to paid in order for the tx to be accepted into block.
     */
    baseFee?: number;
    /**
     * Last time fees were recalculated
     */
    time: string;
    /**
     * Last used to calculate fee from
     */
    block: number;
}
