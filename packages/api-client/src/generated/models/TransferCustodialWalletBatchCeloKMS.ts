/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletBatchCeloKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The gas pump address that transfers the assets
     */
    custodialAddress: string;
    /**
     * The blockchain address that receives the assets
     */
    recipient: Array<string>;
    /**
     * The type of the assets to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), <code>2</code> for Multi Tokens (ERC-1155 or equivalent), or <code>3</code> for native blockchain currencies.
     */
    contractType: Array<0 | 1 | 2 | 3>;
    /**
     * (Only if the assets are fungible tokens, NFTs, or Multi Tokens) The addresses of the tokens to transfer. Do not use if the assets are a native blockchain currency.
     */
    tokenAddress?: Array<string>;
    /**
     * (Only if the assets are fungible tokens, Multi Tokens, or a native blockchain currency) The amounts of the assets to transfer. Do not use if the assets are NFTs.
     */
    amount?: Array<string>;
    /**
     * (Only if the assets are Multi Tokens or NFTs) The IDs of the tokens to transfer. Do not use if the assets are fungible tokens or a native blockchain currency.
     */
    tokenId?: Array<string>;
    /**
     * The KMS identifier of the private key of the blockchain address that owns the gas pump address key ("master address")
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the specific address from the mnemonic
     */
    index?: number;
    /**
     * The currency to pay for the gas fee
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
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
