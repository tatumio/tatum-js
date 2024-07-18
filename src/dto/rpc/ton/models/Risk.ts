/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JettonQuantity } from './JettonQuantity';
import type { NftItem } from './NftItem';

/**
 * Risk specifies assets that could be lost if a message would be sent to a malicious smart contract. It makes sense to understand the risk BEFORE sending a message to the blockchain.
 */
export type Risk = {
    /**
     * transfer all the remaining balance of the wallet.
     */
    transfer_all_remaining_balance: boolean;
    ton: number;
    jettons: Array<JettonQuantity>;
    nfts: Array<NftItem>;
};
