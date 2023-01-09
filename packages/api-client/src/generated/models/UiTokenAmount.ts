/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UiTokenAmount = {
    /**
     * Raw amount of tokens as a string, ignoring decimals.
     */
    amount?: string;
    /**
     * Number of decimals configured for token's mint.
     */
    decimals?: number;
    /**
     * Token amount as a float, accounting for decimals.
     */
    uiAmount?: number | null;
    /**
     * Token amount as a string, accounting for decimals.
     */
    uiAmountString?: string;
}
