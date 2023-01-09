/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerRegistration } from './CustomerRegistration';
import type { FiatOrCryptoCurrency } from './FiatOrCryptoCurrency';

export type DeployErc20OffchainKMSXpub = {
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
     * Identifier of the mnemonic / private key associated in signing application.
     * When hash identifies mnemonic, index must be present to represent specific account to pay from.
     * Private key, mnemonic or signature Id must be present.
     *
     */
    signatureId: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
