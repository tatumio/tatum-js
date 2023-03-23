/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type BuyAssetOnMarketplaceCeloKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The blockchain address of the marketplace smart contract
     */
    contractAddress: string;
    /**
     * The ID of the listing with the asset that you want to buy
     */
    listingId: string;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    /**
     * (Only if you pay with the native blockchain currency) The price of the asset that you want to buy plus the marketplace fee. Do not use if you pay with fungible tokens.
     */
    amount?: string;
    /**
     * (Only if you pay with the fungible tokens) The blockchain address of the fungible tokens. Do not use if you pay with the native blockchain currency.
     */
    erc20Address?: string;
    /**
     * (Only if you want to buy the asset on behalf of someone else and this person wants to pay with the fungible tokens; for example, for buying the asset from a custodial wallet address) The blockchain address of the buyer on whose behalf you are buying the asset<br/>The buyer must <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve" target="_blank">allow the marketplace smart contract to access their tokens</a> before you make the purchase.
     */
    buyer?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
