/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CallKlaytnSmartContractReadMethod = {
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
    params: Array<string>;
}
