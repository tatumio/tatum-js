/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletBatchTron = {
    /**
     * Blockchain to work with.
     */
    chain: GenerateCustodialWalletBatchTron.chain;
    /**
     * Private key of account, from which the transaction will be initiated.
     */
    fromPrivateKey: string;
    /**
     * Number of addresses to generate.
     */
    batchCount: number;
    /**
     * Owner of the addresses.
     */
    owner: string;
    /**
     * Fee limit to be set, in TRX
     */
    feeLimit: number;
}

export namespace GenerateCustodialWalletBatchTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
