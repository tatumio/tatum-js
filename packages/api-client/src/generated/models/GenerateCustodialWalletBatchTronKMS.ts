/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletBatchTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: GenerateCustodialWalletBatchTronKMS.chain;
    /**
     * Sender address.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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

export namespace GenerateCustodialWalletBatchTronKMS {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
