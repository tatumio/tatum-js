/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainCallSmartContractMethod = {
    /**
     * Chain to work with.
     */
    chain: ChainCallSmartContractMethod.chain;
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
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
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

export namespace ChainCallSmartContractMethod {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        BSC = 'BSC',
        XDC = 'XDC',
    }


}
