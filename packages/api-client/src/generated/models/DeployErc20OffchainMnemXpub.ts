/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type DeployErc20OffchainMnemXpub = {
    /**
     * Name of the ERC20 token - stored as a symbol on Blockchain
     */
    symbol: string;
    /**
     * max supply of ERC20 token.
     */
    supply: string;
    /**
     * Description of the ERC20 token
     */
    description: string;
    /**
     * Base pair for ERC20 token. 1 token will be equal to 1 unit of base pair. Transaction value will be calculated according to this base pair.
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
     * Mnemonic to generate private key for the deploy account of ERC20, from which the gas will be paid (index will be used). If address is not present, mnemonic is used to generate xpub and index is set to 1. Either mnemonic and index or privateKey and address must be present, not both.
     */
    mnemonic: string;
    /**
     * derivation index of address to pay for deployment of ERC20
     */
    index: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
