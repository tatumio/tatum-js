/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftKadena</code> schema lets you mint NFTs on Kadena.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.<br/>
 */
export type MintNftKadena = {
    /**
     * The blockchain to work with
     */
    chain: 'KADENA';
    /**
     * The URL pointing to the NFT metadata</a>
     */
    url: string;
    /**
     * The Id of Kadena chain
     */
    chainId: string;
    /**
     * The private key of the blockchain address that will pay the fee for the transaction
     */
    fromPrivateKey: string;
}
