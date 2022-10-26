/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AlgorandMintedResult = {
    /**
     * The ID of the transaction
     */
    txId?: string;
    /**
     * The ID of the minted NFT
     */
    assetIndex?: number;
    /**
     * If set to <code>true</code>, the transaction was included in the block within five rounds; otherwise, returned set to <code>false</code>. <code>false</code> does not mean that the transaction was not included in the block; the Tatum API just does not wait for that much time to return the response.
     */
    confirmed?: boolean;
}
