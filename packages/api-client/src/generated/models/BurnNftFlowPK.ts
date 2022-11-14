/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftFlowPK = {
    /**
     * The blockchain to work with
     */
    chain: 'FLOW';
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Private key of sender address. Private key, mnemonic and index or signature Id must be present.
     */
    privateKey: string;
}
