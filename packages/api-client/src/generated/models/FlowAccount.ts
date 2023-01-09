/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowAccount = {
    /**
     * Account address.
     */
    address?: string;
    /**
     * Balance of the account in smallest FLOW unit = 1 FLOW = 1e8 unit
     */
    balance?: number;
    /**
     * FUSD Balance of the account
     */
    fusdBalance?: string;
    /**
     * Account code
     */
    code?: string;
    contracts?: any;
    /**
     * Array of public keys assigned.
     */
    keys?: Array<{
        /**
         * Index of the public key.
         */
        index?: number;
        publicKey?: string;
        /**
         * Type of signature algorithm. 2 - ECDSA_secp256k1
         */
        signAlgo?: number;
        /**
         * Type of hash algo. 3 - SHA3_256
         */
        hashAlgo?: number;
        /**
         * Number of outgoing transactions for this public key.
         */
        sequenceNumber?: number;
        revoked?: boolean;
        /**
         * Weight of the key. 1000 means single signature necessary.
         */
        weight?: number;
    }>;
}
