/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeTron = {
    /**
     * Blockchain to work with.
     */
    chain: UpdateFeeTron.chain;
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Percentage of the selling amount of the NFT asset. 100 - 1%
     */
    marketplaceFee: number;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace UpdateFeeTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
