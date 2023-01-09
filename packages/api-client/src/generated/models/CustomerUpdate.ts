/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryCode } from './CountryCode';
import type { FiatCurrency } from './FiatCurrency';

export type CustomerUpdate = {
    /**
     * External customer ID. If not set, it will not be updated.
     */
    externalId: string;
    /**
     * All transaction will be accounted in this currency for all accounts. Currency can be overridden per account level. If not set, it will not be updated. ISO-4217
     */
    accountingCurrency?: FiatCurrency;
    /**
     * Country customer has to be compliant with. If not set, it will not be updated. ISO-3166-1.
     */
    customerCountry?: CountryCode;
    /**
     * Country service provider has to be compliant with. If not set, it will not be updated. ISO-3166-1
     */
    providerCountry?: CountryCode;
}
