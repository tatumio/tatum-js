/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountAddress = {
    address: string;
    /**
     * Display name. Data collected from different sources like moderation lists, dns, collections names and over.
     */
    name?: string;
    /**
     * Is this account was marked as part of scammers activity
     */
    is_scam: boolean;
    icon?: string;
    is_wallet: boolean;
};
