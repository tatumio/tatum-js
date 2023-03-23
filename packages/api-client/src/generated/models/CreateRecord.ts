/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CreateRecord = {
    /**
     * The data to be stored on the blockchain
     */
    data: string;
    /**
     * The blockchain to store the data on
     */
    chain: 'BSC' | 'EGLD' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE' | 'XDC';
    /**
     * The private key of the blockchain address from which the transaction will be made and the transaction fee will be deducted
     */
    fromPrivateKey: string;
    /**
     * (Elrond only; required) The blockchain address from which the transaction will be made<br/>This is a mandatory parameter for Elrond. Do not use it with any other blockchain.
     */
    from?: string;
    /**
     * The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.
     */
    to?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * (Harmony only) The ID of the shard from which the data should be read
     */
    fromShardID?: number;
    /**
     * (Harmony only) The ID of the shard to which the data should be recorded
     */
    toShardID?: number;
    /**
     * (Ethereum only) The custom defined fee; if not present, will be calculated automatically
     */
    ethFee?: CustomFee;
}
