/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';
import type { Erc20Currency } from './Erc20Currency';

export type TransferEthBlockchainKMS = {
    /**
     * The blockchain address of the recipient
     */
    to: string;
    /**
     * The amount to be sent
     */
    amount: string;
    /**
     * The currency in which the amount will be sent<br/>Fungible tokens (ERC-20) are available only on the mainnet.
     */
    currency: Erc20Currency;
    /**
     * The KMS identifier of the private key of the sender's blockchain address; the fee will be deducted from this address
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    fee?: CustomFee;
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
