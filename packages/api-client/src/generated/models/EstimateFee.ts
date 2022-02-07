/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFee = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'ONE' | 'MATIC';
    /**
     * Type of transaction
     */
    type: 'DEPLOY_ERC20' | 'DEPLOY_NFT' | 'MINT_NFT' | 'BURN_NFT' | 'TRANSFER_NFT' | 'TRANSFER_ERC20' | 'DEPLOY_CUSTODIAL_WALLET' | 'DEPLOY_AUCTION' | 'DEPLOY_MARKETPLACE';
    /**
     * Sender address, if type is TRANSFER_ERC20
     */
    sender?: string;
    /**
     * Blockchain address to send assets, if type is TRANSFER_ERC20
     */
    recipient?: string;
    /**
     * Contract address of ERC20 token, if type is TRANSFER_ERC20
     */
    contractAddress?: string;
    /**
     * Amount to be sent in ERC20, if type is TRANSFER_ERC20
     */
    amount?: string;
    /**
     * If address should support ERC20 tokens, it should be marked as true. Valid only for DEPLOY_CUSTODIAL_WALLET.
     */
    enableFungibleTokens?: boolean;
    /**
     * If address should support ERC721 tokens, it should be marked as true. Valid only for DEPLOY_CUSTODIAL_WALLET option.
     */
    enableNonFungibleTokens?: boolean;
    /**
     * If address should support ERC1155 tokens, it should be marked as true. Valid only for DEPLOY_CUSTODIAL_WALLET option.
     */
    enableSemiFungibleTokens?: boolean;
    /**
     * If address should support batch transfers of the assets, it should be marked as true. Valid only for DEPLOY_CUSTODIAL_WALLET option.
     */
    enableBatchTransactions?: boolean;
}
