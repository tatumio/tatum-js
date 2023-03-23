/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type AddNftMinterKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'KCS' | 'MATIC' | 'ONE';
    /**
     * The blockchain address of the NFT smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address to add to the smart contract as an NFT minter<br/>To find the address of the Tatum NFT minter for your blockchain, see the table in "Use your own smart contract to mint NFTs" in <a href="#operation/NftMintErc721">Mint an NFT</a>.<br/>This address will cover your NFT minting fees. The number of credits equivalent to the fees will be then deducted from the credit allowance of your paid pricing plan.
     */
    minter: string;
    /**
     * The KMS identifier of the private key of the blockchain address that has priviledges to add an NFT minter to the NFT smart contract (the owner of the smart contract or a blockchain address that was granted such priviledges)
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address that holds the NFT smart contract that was generated from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
    /**
     * (Celo only) The currency in which the transaction fee will be paid
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
}
