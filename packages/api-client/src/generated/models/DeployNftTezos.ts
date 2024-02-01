/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftTezos = {
    /**
     * The blockchain to work with
     */
    chain: 'TEZOS';
    /**
     * Public address that will be admin of the contract. Must be a valid address of the Tezos blockchain.
     */
    ownerAddress: string;
    /**
     * Object of key-value pairs representing metadata of the contract. Keys must be strings, values can be strings, numbers, or booleans.
     */
    metadata: any;
    /**
     * Private key of account address, from which fee and storage costs for deployment of Tzip12 contract will be paid.
     */
    fromPrivateKey: string;
}
