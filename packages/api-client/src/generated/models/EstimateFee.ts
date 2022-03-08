/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFee = {
    /**
     * Blockchain to estimate fee for.
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'ONE' | 'MATIC' | 'KLAY';
    /**
     * Type of transaction
     */
    type: 'DEPLOY_ERC20' | 'DEPLOY_NFT' | 'MINT_NFT' | 'BURN_NFT' | 'TRANSFER_NFT' | 'TRANSFER_ERC20' | 'DEPLOY_AUCTION' | 'DEPLOY_MARKETPLACE';
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
}
