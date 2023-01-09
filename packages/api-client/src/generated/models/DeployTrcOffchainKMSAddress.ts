/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type DeployTrcOffchainKMSAddress = {
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
     * Address on Tron blockchain, where all initial supply will be stored. Either xpub and derivationIndex, or address must be present, not both.
     */
    address: string;
    /**
     * Blockchain address to perform operation from
     */
    from: string;
    /**
     * Identifier of the mnemonic / private key associated in signing application.
     * When hash identifies mnemonic, index must be present to represent specific account to pay from.
     * Private key, mnemonic or signature Id must be present.
     *
     */
    signatureId: string;
}
