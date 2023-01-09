/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferEthBlockchainKMS = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from Ethereum Blockchain Account.
     */
    currency: 'USDT' | 'LEO' | 'LINK' | 'UNI' | 'FREE' | 'GMC' | 'GMC_BSC' | 'RMD' | 'MKR' | 'USDC' | 'BAT' | 'TUSD' | 'BUSD' | 'PAX' | 'PAXG' | 'MMY' | 'WBTC' | 'XCON' | 'ETH';
    fee?: CustomFee;
    /**
     * Amount to be sent in Ether.
     */
    amount: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
