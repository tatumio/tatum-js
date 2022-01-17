/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApproveNftSpendingCeloKMS = {
    /**
     * Blockchain to work with.
     */
    chain: ApproveNftSpendingCeloKMS.chain;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: ApproveNftSpendingCeloKMS.feeCurrency;
    /**
     * Address of the ERC20 token, which is used for buying NFT asset from the marketplace.
     */
    contractAddress: string;
    /**
     * Address of the auction smart contract - new spender.
     */
    spender: string;
    /**
     * True if asset is NFT of type ERC721, false if ERC1155.
     */
    isErc721: boolean;
    /**
     * ID of token, if transaction is for ERC-721 or ERC-1155.
     */
    tokenId: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}

export namespace ApproveNftSpendingCeloKMS {

    /**
     * Blockchain to work with.
     */
    export enum chain {
        CELO = 'CELO',
    }

    /**
     * Currency to pay for transaction gas
     */
    export enum feeCurrency {
        CELO = 'CELO',
        CUSD = 'CUSD',
        CEUR = 'CEUR',
    }


}
