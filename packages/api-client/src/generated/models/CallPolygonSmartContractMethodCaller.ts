/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CallPolygonSmartContractMethodCaller = {
    /**
     * The address of the account, which will be sender and fee payer of this transaction
     */
    caller: string;
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
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}
