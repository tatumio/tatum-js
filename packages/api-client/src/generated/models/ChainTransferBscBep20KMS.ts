/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferBscBep20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The blockchain address of the fungible tokens
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have; to find out how many decimal places are used in the fungible tokens, check out the <a href="https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress" target="_blank">smart contract</a>
     */
    digits: number;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The custom defined fee; if not present, will be calculated automatically
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
