/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferCustodialWalletTronKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * The gas pump address that transfers the asset; this is the address that you <a href="#operation/PrecalculateGasPumpAddresses">precalculated</a> and <a href="#operation/ActivateGasPumpAddresses">activated</a> earlier and that is assigned to a customer in your custodial application; this is not the "master address"
     */
    custodialAddress: string;
    /**
     * The blockchain address that owns the gas pump address ("master address") in the Base58 format
     */
    from: string;
    /**
     * The blockchain address that receives the asset
     */
    recipient: string;
    /**
     * The type of the asset to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), or <code>3</code> for native blockchain currencies.
     */
    contractType: 0 | 1 | 3;
    /**
     * (Only if the asset is a fungible token or NFT) The address of the token to transfer. Do not use if the asset is a native blockchain currency.
     */
    tokenAddress?: string;
    /**
     * (Only if the asset is a fungible token or native blockchain currency) The amount of the asset to transfer. Do not use if the asset is an NFT.
     */
    amount?: string;
    /**
     * (Only if the asset is an NFT) The ID of the token to transfer. Do not use if the asset is a fungible token or native blockchain currency.
     */
    tokenId?: string;
    /**
     * The KMS identifier of the private key of the blockchain address that owns the gas pump address key ("master address")
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the "master address"
     */
    index?: number;
    /**
     * The maximum amount to be paid as the gas fee (in TRX)
     */
    feeLimit: number;
}
