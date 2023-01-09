/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UiTokenAmount } from './UiTokenAmount';

export type TokenBalance = {
    /**
     * Index of the account in which the token balance is provided for.
     */
    accountIndex?: number;
    /**
     * Pubkey of the token's mint.
     */
    mint?: string;
    /**
     * Pubkey of token balance's owner.
     */
    owner?: string;
    /**
     * Pubkey of the Token program that owns the account.
     */
    programId?: string;
    uiTokenAmount?: UiTokenAmount;
}
