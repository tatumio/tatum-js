/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWallet = {
    /**
     * Blockchain to work with.
     */
    chain: 'ETH' | 'ONE' | 'BSC' | 'MATIC';
    /**
     * Private key of account, from which the transaction will be initiated.
     */
    fromPrivateKey: string;
    /**
     * If address should support ERC20 tokens, it should be marked as true.
     */
    enableFungibleTokens: boolean;
    /**
     * If address should support ERC721 tokens, it should be marked as true.
     */
    enableNonFungibleTokens: boolean;
    /**
     * If address should support ERC1155 tokens, it should be marked as true.
     */
    enableSemiFungibleTokens: boolean;
    /**
     * If address should support batch transfers of the assets, it should be marked as true.
     */
    enableBatchTransactions: boolean;
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
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
