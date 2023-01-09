/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CallBscSmartContractMethodKMS = {
    /**
     * The address of the smart contract
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
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to BSC transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    fee?: CustomFee;
}
