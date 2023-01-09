/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatCurrency } from './FiatCurrency';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type VirtualCurrency = {
    /**
     * Virtual currency name. Must be prefixed with 'VC_'.
     */
    name: string;
    /**
     * Supply of virtual currency.
     */
    supply: string;
    /**
     * Base pair for virtual currency. Transaction value will be calculated according to this base pair. e.g. 1 VC_VIRTUAL is equal to 1 BTC, if basePair is set to BTC.
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * Exchange rate of the base pair. Each unit of the created curency will represent value of baseRate*1 basePair.
     */
    baseRate?: number;
    customer?: CustomerRegistration;
    /**
     * Used as a description within Tatum system.
     */
    description?: string;
    /**
     * For bookkeeping to distinct account purpose.
     */
    accountCode?: string;
    /**
     * Account number from external system.
     */
    accountNumber?: string;
    /**
     * All transaction will be billed in this currency for created account associated with this currency. If not set, EUR is used. ISO-4217
     */
    accountingCurrency?: FiatCurrency;
}
