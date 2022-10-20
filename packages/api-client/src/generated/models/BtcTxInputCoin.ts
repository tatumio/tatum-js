/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTxInputCoin = {
    version?: number;
    blockNumber?: number;
    /**
     * Amount of the transaction, in Satoshis (1 BTC = 100 000 000 Satoshis)
     */
    value?: number;
    script?: string;
    /**
     * Sender address.
     */
    address?: string;
    /**
     * Coinbase transaction - miner fee.
     */
    coinbase?: boolean;
}
