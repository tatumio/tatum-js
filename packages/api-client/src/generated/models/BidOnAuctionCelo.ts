/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type BidOnAuctionCelo = {
    /**
     * Blockchain to work with.
     */
    chain: 'CELO';
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Address of the auction smart contract.
     */
    contractAddress: string;
    /**
     * Optional address of the ERC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * In case of the ERC20 auction, it's possible to bid on behalf of someone else. This value is the address of the bidder, which should approve spending of the ERC20 tokens for the Auction contract. This could be used for a bidding from the custodial wallet address.
     */
    bidder?: string;
    /**
     * ID of the auction.
     */
    id: string;
    /**
     * Amount of the assets to be bid. This must include auction fee.
     */
    bidValue: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
