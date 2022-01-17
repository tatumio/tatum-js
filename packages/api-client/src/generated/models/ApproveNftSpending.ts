/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApproveNftSpending = {
    /**
     * Blockchain to work with.
     */
    chain: ApproveNftSpending.chain;
    /**
     * Address of the auction smart contract - new spender.
     */
    spender: string;
    /**
     * True if asset is NFT of type ERC721, false if ERC1155.
     */
    isErc721: boolean;
    /**
     * ID of token, if transaction is for ERC-721 or ERC-1155.
     */
    tokenId: string;
    /**
     * Address of the ERC20 token, which is used for buying NFT asset from the marketplace.
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}

export namespace ApproveNftSpending {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        ONE = 'ONE',
        BSC = 'BSC',
        MATIC = 'MATIC',
    }


}
