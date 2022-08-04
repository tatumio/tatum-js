/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CallXdcReadSmartContractMethod = {
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
}
