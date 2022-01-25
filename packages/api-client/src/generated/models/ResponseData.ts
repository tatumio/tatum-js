/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type ResponseData = {
    address?: Address;
    /**
     * Amount of unprocessed transaction outputs, that can be used for withdrawal. Bitcoin, Litecoin, Bitcoin Cash only.
     */
    amount?: number;
    /**
     * Last used unprocessed transaction output, that can be used. Bitcoin, Litecoin, Bitcoin Cash only. If -1, it indicates prepared vOut with amount to be transferred to pool address.
     */
    vIn?: string;
    /**
     * Index of last used unprocessed transaction output in raw transaction, that can be used. Bitcoin, Litecoin, Bitcoin Cash only.
     */
    vInIndex?: number;
    /**
     * Script of last unprocessed UTXO. Bitcoin SV only.
     */
    scriptPubKey?: string;
}
