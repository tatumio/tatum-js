/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferPolygonBlockchain = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Nonce to be set to Polygon transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from Polygon Blockchain Account. ERC20 tokens like USDC_MATIC, USDT_MATIC, GAMEE, INTENT, EURTENT, GOLDAX are available only for mainnet use.
     */
    currency: 'MATIC' | 'USDC_MATIC' | 'USDT_MATIC' | 'GAMEE' | 'INTENT' | 'EURTENT' | 'GOLDAX';
    fee?: CustomFee;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
