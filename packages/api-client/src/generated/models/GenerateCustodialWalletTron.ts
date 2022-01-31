/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateCustodialWalletTron = {
    /**
     * Blockchain to work with.
     */
    chain: 'TRON';
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
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
     * If address should support ERC1155 tokens, it should be marked as true. Not supported for TRON.
     */
    enableSemiFungibleTokens: boolean;
    /**
     * If address should support batch transfers of the assets, it should be marked as true.
     */
    enableBatchTransactions: boolean;
}
