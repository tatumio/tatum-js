/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferBscBlockchainKMS = {
    /**
     * (Only for BSC transactions) Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Nonce to be set to BSC transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from BSC Blockchain Account. BEP20 tokens like BETH, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH, CAKE are available only for mainnet use.
     */
    currency: 'BETH' | 'BBTC' | 'BADA' | 'WBNB' | 'BDOT' | 'BXRP' | 'BLTC' | 'BBCH' | 'BSC';
    fee?: CustomFee;
    /**
     * Amount to be sent.
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
