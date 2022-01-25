/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferAlgoErc20 = {
    /**
     * Chain to work with.
     */
    chain: ChainTransferAlgoErc20.chain;
    /**
     * Blockchain address to send ERC20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * assetIndex - asset index uniquely specifying the asset
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}

export namespace ChainTransferAlgoErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        ALGO = 'ALGO',
    }


}
