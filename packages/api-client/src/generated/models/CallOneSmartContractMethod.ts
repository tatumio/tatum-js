/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CallOneSmartContractMethod = {
    /**
     * The address of the smart contract
     */
    contractAddress: string;
    /**
     * Amount of the assets to be sent.
     */
    amount?: string;
    /**
     * Name of the method to invoke on smart contract.
     */
    methodName: string;
    /**
     * ABI of the method to invoke.
     */
    methodABI: any;
    params: Array<string>;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to ONE transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    fee?: CustomFee;
}
