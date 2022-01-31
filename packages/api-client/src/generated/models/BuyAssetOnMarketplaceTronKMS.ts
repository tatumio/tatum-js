/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BuyAssetOnMarketplaceTronKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'TRON';
    /**
     * Address of the marketplace smart contract.
     */
    contractAddress: string;
    /**
     * Address of the recipient of the fee for the trade.
     */
    from: string;
    /**
     * In case of the ERC20 listing, it's possible to buy on behalf of someone else. This value is the address of the buyer, which should approve spending of the ERC20 tokens for the Marketplace contract. This could be used for a buying from the custodial wallet address.
     */
    buyer?: string;
    /**
     * ID of the listing. It's up to the developer to generate unique ID
     */
    listingId: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Optional address of the TRC20 token, which will be used as a selling currency of the NFT.
     */
    erc20Address?: string;
    /**
     * Amount of the assets to be sent. For ERC-721 tokens, enter 1.
     */
    amount?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey?: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}
