/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelOrSettleAuction = {
    /**
     * Blockchain to work with.
     */
    chain: 'ETH' | 'ONE' | 'BSC' | 'MATIC';
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Optional address of the ERC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * ID of the auction.
     */
    id: string;
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
