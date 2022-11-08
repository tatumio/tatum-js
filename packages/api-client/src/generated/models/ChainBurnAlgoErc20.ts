/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainBurnAlgoErc20 = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * assetIndex - asset index uniquely specifying the asset
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
