/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type VC = {
    /**
     * Virtual currency name. Must be prefixed with 'VC_'.
     */
    name: string;
    /**
     * Supply of virtual currency.
     */
    supply: string;
    /**
     * Virtual currency account.
     */
    accountId: string;
    /**
     * Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.
     */
    baseRate: number;
    /**
     * Number of decimal places of this virtual currency.
     */
    precision?: number;
    /**
     * Type of Tron token.
     */
    trcType?: 'TRC10' | 'TRC20';
    /**
     * Base pair for virtual currency. Transaction value will be calculated according to this base pair. e.g. 1 VC_VIRTUAL is equal to 1 BTC, if basePair is set to BTC.
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * ID of customer associated with virtual currency.
     */
    customerId?: string;
    /**
     * Used as a description within Tatum system.
     */
    description?: string;
    /**
     * Address of ERC20 token, when virtual currency is based on the Ethereum blockchain.
     */
    erc20Address?: string;
    /**
     * Blockchain account for XLM or XRP based virtual currencies, which is marked as the issuer of the custom blockchain asset.
     */
    issuerAccount?: string;
    /**
     * Blockchain, on which this virtual currency is paired on. Not present, when Tatum's private ledger is used as a base ledger.
     */
    chain?: 'ETH' | 'XRP' | 'XLM';
    /**
     * Ethereum address, where initial supply was minted, when virtual currency is based on the Ethereum blockchain.
     */
    initialAddress?: string;
}
