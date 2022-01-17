/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OffchainAddresses = {
    addresses: Array<{
        /**
         * ID of the account, for which blockchain address will be created.
         */
        accountId: string;
        /**
         * Derivation key index for given address to generate. If not present, first not used address will be created.
         */
        derivationKey?: number;
    }>;
}
