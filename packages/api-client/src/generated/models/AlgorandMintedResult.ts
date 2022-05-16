/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AlgorandMintedResult = {
    /**
     * Transaction ID
     */
    txId?: string;
    /**
     * Identifier of the minted NFT
     */
    assetIndex?: number;
    /**
     * True, if transaction was included in the block within 5 rounds, false otherwise. False doesnt mean that transaction was not included, Tatum just doesn't wait for that much time.
     */
    confirmed?: boolean;
}
