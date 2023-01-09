/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftTron = {
    /**
     * The blockchain to work with
     */
    chain: 'TRON';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The maximum amount to be paid as the transaction fee (in TRX); deployment of a smart contract on TRON costs around 580 TRX
     */
    feeLimit: number;
}
