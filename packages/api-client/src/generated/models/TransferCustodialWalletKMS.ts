/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE' | 'XDC';
    /**
     * The gas pump address that transfers the asset
     */
    custodialAddress: string;
    /**
     * The blockchain address that receives the asset
     */
    recipient: string;
    /**
     * The type of the asset to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), <code>2</code> for Multi Tokens (ERC-1155 or equivalent), or <code>3</code> for native blockchain currencies.
     */
    contractType: 0 | 1 | 2 | 3;
    /**
     * (Only if the asset is a fungible token, NFT, or Multi Token) The address of the token to transfer. Do not use if the asset is a native blockchain currency.
     */
    tokenAddress?: string;
    /**
     * (Only if the asset is a fungible token, Multi Token, or native blockchain currency) The amount of the asset to transfer. Do not use if the asset is an NFT.
     */
    amount?: string;
    /**
     * (Only if the asset is a Multi Token or NFT) The ID of the token to transfer. Do not use if the asset is a fungible token or native blockchain currency.
     */
    tokenId?: string;
    /**
     * The KMS identifier of the private key of the blockchain address that owns the gas pump address key ("master address")
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the specific address from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transfer transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The custom defined fee; if not present, will be calculated automatically
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
