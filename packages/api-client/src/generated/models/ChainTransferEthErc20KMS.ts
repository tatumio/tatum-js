/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferEthErc20KMS = {
    /**
     * Chain to work with.
     */
    chain: ChainTransferEthErc20KMS.chain;
    /**
     * Blockchain address to send ERC20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Number of decimal points that ERC20 token has.
     */
    digits: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
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

export namespace ChainTransferEthErc20KMS {

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
