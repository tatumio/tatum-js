/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainMintErc20 = {
    /**
     * Chain to work with.
     */
    chain: ChainMintErc20.chain;
    /**
     * Amount to be minted and transfered to the recipient.
     */
    amount: string;
    /**
     * Blockchain address to send ERC-20 tokens to.
     */
    to: string;
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

export namespace ChainMintErc20 {

    /**
     * Chain to work with.
     */
    export enum chain {
        ETH = 'ETH',
        BSC = 'BSC',
        MATIC = 'MATIC',
        XDC = 'XDC',
        ONE = 'ONE',
    }


}
