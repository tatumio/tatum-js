/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApproveErc20 = {
    /**
     * Chain to work with.
     */
    chain: ApproveErc20.chain;
    /**
     * Amount to be approved for the spender.
     */
    amount: string;
    /**
     * Blockchain address of the new spender.
     */
    spender: string;
    /**
     * Address of ERC-20 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}

export namespace ApproveErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        BSC = 'BSC',
        MATIC = 'MATIC',
        ONE = 'ONE',
    }


}
