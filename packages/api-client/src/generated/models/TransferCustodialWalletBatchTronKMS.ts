/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletBatchTronKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * The gas pump address that transfers the assets
     */
    custodialAddress: string;
    /**
     * The gas pump address that transfers the assets in the Base58 format
     */
    from: string;
    /**
     * The blockchain address that receives the assets
     */
    recipient: Array<string>;
    /**
     * The type of the assets to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), or <code>3</code> for native blockchain currencies.
     */
    contractType: Array<0 | 1 | 3>;
    /**
     * (Only if the assets are fungible tokens or NFTs) The addresses of the tokens to transfer. Do not use if the assets are a native blockchain currency.
     */
    tokenAddress?: Array<string>;
    /**
     * (Only if the assets are fungible tokens or a native blockchain currency) The amounts of the assets to transfer. Do not use if the assets are NFTs.
     */
    amount?: Array<string>;
    /**
     * (Only if the assets are NFTs) The IDs of the tokens to transfer. Do not use if the assets are fungible tokens or a native blockchain currency.
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
     * The maximum amount to be paid as the gas fee (in TRX)
     */
    feeLimit: number;
}
