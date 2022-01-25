/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelSellAssetOnMarketplaceTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: CancelSellAssetOnMarketplaceTronKMS.chain;
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Address of the recipient of the fee for the trade.
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
     * Optional address of the TRC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey?: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}

export namespace CancelSellAssetOnMarketplaceTronKMS {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
