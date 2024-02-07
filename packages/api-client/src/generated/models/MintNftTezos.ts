/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftTezos</code> schema lets you mint NFTs on Tezos.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.<br/>
 */
export type MintNftTezos = {
    /**
     * The blockchain to work with
     */
    chain: 'TEZOS';
    /**
     * The URL pointing to the NFT metadata</a>
     */
    url: string;
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The blockchain address to send the NFT to
     */
    ownerAddress: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
    /**
     * The private key of the blockchain address that will pay the fee for the transaction
     */
    fromPrivateKey: string;
}
