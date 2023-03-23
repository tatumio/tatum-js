/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type DeployTrcOffchainKMSXpub = {
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
     * The type of the token
     */
    type: 'TRC10' | 'TRC20';
    /**
     * The description of the token; used as a description within the Tatum platform and as a currency name on the blockchain
     */
    description: string;
    /**
     * The extended public key of the TRON wallet from which a deposit address for the virtual account will be generated
     */
    xpub: string;
    /**
     * The derivation index to use together with the extended public key to generate the deposit address
     */
    derivationIndex: number;
    /**
     * The blockchain address from which the fee for deploying the smart contract will be deducted
     */
    from: string;
    /**
     * The KMS identifier of either the <b>private key</b> of the blockchain address from which the fee for deploying the smart contract will be deducted, or the <b>mnemonic</b> of the TRON wallet to generate the private key for the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    /**
     * The base pair for the virtual currency that represents the token; used to calculate the value of a transaction
     */
    basePair: FiatOrCryptoCurrency;
    /**
     * The exchange rate for the base pair; one unit of the created virtual currency equals 1 unit of <code>basePair</code>*<code>baseRate</code>
     */
    baseRate?: number;
    /**
     * (TRC-10 tokens only) The URL of the project that the token is created for<br/>Use this parameter only with TRC-10 tokens. Do <b>not</b> use this parameter with TRC-20 tokens.
     */
    url?: string;
    customer?: CustomerRegistration;
}
