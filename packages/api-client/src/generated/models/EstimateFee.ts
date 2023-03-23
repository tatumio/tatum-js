/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EstimateFee = {
    /**
     * The blockchain to estimate the fee for
     */
    chain: 'CELO' | 'ETH' | 'BSC' | 'XDC' | 'ONE' | 'MATIC' | 'KLAY';
    /**
     * The type of the transaction
     */
    type: 'DEPLOY_ERC20' | 'DEPLOY_NFT' | 'MINT_NFT' | 'BURN_NFT' | 'TRANSFER_NFT' | 'TRANSFER_ERC20' | 'DEPLOY_AUCTION' | 'DEPLOY_MARKETPLACE';
    /**
     * (Only if <code>type=TRANSFER_ERC20</code>) The blockchain address of the sender address
     */
    sender?: string;
    /**
     * (Only if <code>type=TRANSFER_ERC20</code>) The blockchain address of the recipient address
     */
    recipient?: string;
    /**
     * (Only if <code>type=TRANSFER_ERC20</code>) The blockchain address of the smart address of the fungible token
     */
    contractAddress?: string;
    /**
     * (Only if <code>type=TRANSFER_ERC20</code>) The amount of the fungible token to be sent
     */
    amount?: string;
}
