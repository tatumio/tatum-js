/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type DeployTrcOffchainPKXpub = {
    /**
     * Name of the TRC token - stored as a symbol on Blockchain
     */
    symbol: string;
    /**
     * max supply of TRC token.
     */
    supply: string;
    /**
     * Number of decimal points of the token.
     */
    decimals: number;
    /**
     * Type of TRC token to create.
     */
    type: 'TRC10' | 'TRC20';
    /**
     * Description of the TRC token
     */
    description: string;
    /**
     * URL of the project. Applicable for TRC-10 only.
     */
    url?: string;
    /**
     * Base pair for TRC token. 1 token will be equal to 1 unit of base pair. Transaction value will be calculated according to this base pair.
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.
     */
    baseRate?: number;
    customer?: CustomerRegistration;
    /**
     * Extended public key (xpub), from which address, where all initial supply will be stored, will be generated. Either xpub and derivationIndex, or address must be present, not both.
     */
    xpub: string;
    /**
     * Derivation index for xpub to generate specific deposit address.
     */
    derivationIndex: number;
    /**
     * Private key of Tron account address, from which gas for deployment of TRC will be paid. Private key, mnemonic or signature Id must be present.
     */
    privateKey: string;
}
