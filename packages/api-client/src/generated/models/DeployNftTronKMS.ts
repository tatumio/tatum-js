/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftTronKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * Blockchain address to perform transaction from
     */
    account: string;
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX); deployment of a smart contract on TRON costs around 580 TRX
     */
    feeLimit: number;
}
