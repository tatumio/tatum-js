/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftFlowMnemonic</code> schema lets you mint NFTs natively on Flow and sign the transaction with your wallet mnemonic.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftFlowMnemonic = {
    /**
     * Chain to work with.
     */
    chain: 'FLOW';
    /**
     * Blockchain address to send NFT token to.
     */
    to: string;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Mnemonic to generate private key of sender address.
     */
    mnemonic: string;
    /**
     * Derivation index of sender address.
     */
    index: number;
}
