/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelSellAssetOnMarketplaceTron = {
    /**
     * Blockchain to work with.
     */
    chain: CancelSellAssetOnMarketplaceTron.chain;
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Optional address of the TRC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace CancelSellAssetOnMarketplaceTron {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
