/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FiatCurrency } from './FiatCurrency';

/**
 * If a customer with the specified external ID does not exist, a new customer is created. If a customer with the specified external ID exists, it is updated with the provided information.
 */
export type CustomerRegistration = {
    /**
     * The external ID of the customer; use only anonymized identification that you have in your system<br/>If a customer with the specified external ID does not exist, a new customer is created. If a customer with the specified external ID exists, it is updated with the provided information.
     */
    externalId: string;
    /**
     * The ISO 4217 code of the currency in which all transactions for all virtual accounts of the customer will be billed; to overwrite the currency for this specific virtual account, set the <code>accountingCurrency</code> parameter at the account level.
     */
    accountingCurrency?: FiatCurrency;
    /**
     * The ISO 3166-1 code of the country that the customer has to be compliant with
     */
    customerCountry?: string;
    /**
     * The ISO 3166-1 code of the country that the service provider has to be compliant with
     */
    providerCountry?: string;
}
