/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatCurrency } from './FiatCurrency';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type Erc20 = {
    /**
     * The name of the token; used as an identifier within the Tatum platform and as a currency symbol on the blockchain
     */
    symbol: string;
    /**
     * The supply of the token
     */
    supply: string;
    /**
     * The number of decimal places that the token has
     */
    decimals: number;
    /**
     * The description of the token; used as a description within the Tatum platform and as a currency name on the blockchain
     */
    description: string;
    /**
     * The extended public key of the wallet from which a deposit address for the virtual account will be generated; the supply of the token will be stored on this address<br/><b>NOTE:</b>On Solana, you only can assign an existing address to the virtual account; use the <code>Erc20Address</code> schema of this API.
     */
    xpub: string;
    /**
     * The derivation index to use together with the extended public key to generate the deposit address
     */
    derivationIndex: number;
    /**
     * The base pair for the virtual currency that represents the token; used to calculate the value of a transaction
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * The exchange rate for the base pair; one unit of the created virtual currency equals 1 unit of <code>basePair</code>*<code>baseRate</code>
     */
    baseRate?: number;
    customer?: CustomerRegistration;
    /**
     * The ISO 4217 code of the currency in which all transactions for the created virtual account will be billed
     */
    accountingCurrency?: FiatCurrency;
}
