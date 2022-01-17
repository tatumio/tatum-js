/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftTron = {
    /**
     * Chain to work with.
     */
    chain: DeployNftTron.chain;
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of Ethereum account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Max limit for fee to be paid, in TRX. For deploy, around 580 TRX is consumed.
     */
    feeLimit: number;
}

export namespace DeployNftTron {

    /**
     * Chain to work with.
     */
    export enum chain {
        TRON = 'TRON',
    }


}
