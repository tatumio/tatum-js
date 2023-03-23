/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CreateRecordKMS = {
    /**
     * The data to be stored on the blockchain
     */
    data: string;
    /**
     * The blockchain to store the data on
     */
    chain: 'ETH';
    /**
     * Identifier of the mnemonic / private key associated in signing application.
     * When hash identifies mnemonic, index must be present to represent specific account to pay from.
     *
     */
    signatureId: string;
    /**
     * Derivation index of sender address.
     */
    index?: number;
    /**
     * The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.
     */
    to?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
