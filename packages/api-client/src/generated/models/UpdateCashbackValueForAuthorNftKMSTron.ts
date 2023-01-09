/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateCashbackValueForAuthorNftKMSTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * The ID of the NFT to update royalty information for
     */
    tokenId: string;
    /**
     * The blockchain address of the NFT to update royalty information for
     */
    contractAddress: string;
    /**
     * The new value of the royalty cashback to be set for the author of the NFT; to disable the royalties for the NFT completely, set this parameter to 0
     */
    cashbackValue: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX)
     */
    feeLimit: number;
    /**
     * The blockchain address of the NFT author from which the transaction will be performed
     */
    account: string;
    /**
     * The KMS identifier of the private key of the NFT author's address
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the NFT author's address that was generated from the mnemonic
     */
    index?: number;
}
