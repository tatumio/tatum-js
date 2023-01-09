/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferOneBlockchainKMS = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Currency of the transfer.
     */
    currency: 'ONE';
    /**
     * Nonce to be set to ONE transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    fee?: CustomFee;
    /**
     * Amount to be sent in One.
     */
    amount: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
