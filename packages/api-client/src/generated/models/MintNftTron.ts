/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftTron</code> schema lets you mint NFTs natively on TRON and sign the transaction with your private key.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX)
     */
    feeLimit: number;
    /**
     * The private key of the blockchain address that will pay the fee for the transaction
     */
    fromPrivateKey: string;
    /**
     * The blockchain addresses where the royalties will be sent every time the minted NFT is transferred; the royalties are paid in the native blockchain currency, TRX
     */
    authorAddresses?: Array<string>;
    /**
     * The amounts of the royalties that will be paid to the authors of the minted NFT every time the NFT is transferred; the amount is defined as a fixed amount of the native blockchain currency
     */
    cashbackValues?: Array<string>;
}
