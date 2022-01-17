/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoInvokeSmart = {
    /**
     * Number of decimals of asset being transferred.
     */
    numOfDecimals: number;
    /**
     * Additional GAS to be paid for smart contract invocation.
     */
    additionalInvocationGas?: number;
    /**
     * Amount to be sent.
     */
    amount: number;
    /**
     * Function to be invoked on Smart Contract.
     */
    scriptHash: string;
    /**
     * Recipient address.
     */
    to: string;
    /**
     * Private key of address to invoke smart contract.
     */
    fromPrivateKey: string;
}
