/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ApproveCeloErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The address of the smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address to be allowed to transfer or burn the fungible tokens
     */
    spender: string;
    /**
     * The amount of the tokens allowed to be transferred or burnt
     */
    amount: string;
    /**
     * The private key of the smart contract's owner; the fee will be deducted from the owner's address
     */
    fromPrivateKey: string;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
