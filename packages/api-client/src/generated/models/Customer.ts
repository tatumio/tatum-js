/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatCurrency } from './FiatCurrency';

export type Customer = {
    /**
     * Customer external ID.
     */
    externalId: string;
    /**
     * Customer internal ID within Tatum.
     */
    id: string;
    /**
     * Indicates whether customer is enabled or not
     */
    enabled: boolean;
    /**
     * Indicates whether customer is active or not
     */
    active: boolean;
    /**
     * All transaction will be accounted in this currency for all accounts of the customer. Currency can be overridden per account level. ISO-4217
     */
    accountingCurrency?: FiatCurrency;
    /**
     * Country customer has to be compliant with
     */
    customerCountry?: string;
    /**
     * Country service provider has to be compliant with
     */
    providerCountry?: string;
}
