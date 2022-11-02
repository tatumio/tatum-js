/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftKMSCelo</code> schema lets you mint NFTs natively on Celo and sign the transaction with your signature ID.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftKMSCelo = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
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
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The KMS identifier of the private key of the blockchain address that will pay the fee for the transaction
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address to pay the transaction fee that was generated from the mnemonic
     */
    index?: number;
    /**
     * The blockchain address of the custom fungible token
     */
    erc20?: any;
    /**
     * Set to "true" if the NFT smart contract is of the <a href="#operation/NftDeployErc721">provenance type</a>; otherwise, set to "false".
     */
    provenance?: boolean;
    /**
     * The blockchain addresses where the royalties will be sent every time the minted NFT is transferred; the royalties are paid in the native blockchain currency, CELO
     */
    authorAddresses?: Array<string>;
    /**
     * The amounts of the royalties that will be paid to the authors of the minted NFT every time the NFT is transferred; the amount is defined as a fixed amount of the native blockchain currency for <a href="#operation/NftDeployErc721">cashback smart contracts</a> or as a percentage of the NFT price for <a href="#operation/NftDeployErc721">provenance smart contracts</a>
     */
    cashbackValues?: Array<string>;
    /**
     * The fixed amounts of the native blockchain currency to which the cashback royalty amounts will be compared to; if the fixed amount specified in this parameter is greater than the amount of the cashback royalties, this fixed amount will be sent to the NFT authors instead of the cashback royalties
     */
    fixedValues?: Array<string>;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
