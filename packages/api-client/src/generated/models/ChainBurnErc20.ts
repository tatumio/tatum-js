/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainBurnErc20 = {
    /**
     * Chain to work with.
     */
    chain: ChainBurnErc20.chain;
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

export namespace ChainBurnErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        BSC = 'BSC',
        MATIC = 'MATIC',
        XDC = 'XDC',
        ONE = 'ONE',
        ALGO = 'ALGO',
    }


}
