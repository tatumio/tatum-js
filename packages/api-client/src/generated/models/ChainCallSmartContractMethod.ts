/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ChainCallSmartContractMethod = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'BSC' | 'XDC';
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Name of the method to invoke on smart contract.
     */
    methodName: string;
    /**
     * ABI of the method to invoke.
     */
    methodABI: any;
    /**
     * Parameters of the method to be invoked.
     */
    params: Array<string>;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
