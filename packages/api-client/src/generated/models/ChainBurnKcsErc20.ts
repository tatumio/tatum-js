/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainBurnKcsErc20 = {
    /**
     * Chain to work with.
     */
    chain: ChainBurnKcsErc20.chain;
    /**
     * Amount of tokens to be destroyed.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}

export namespace ChainBurnKcsErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        KCS = 'KCS',
    }


}
