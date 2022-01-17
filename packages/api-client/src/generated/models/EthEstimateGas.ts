/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EthEstimateGas = {
    /**
     * Sender address.
     */
    from: string;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Contract address of ERC20 token, if transaction is ERC20 token
     */
    contractAddress?: string;
    /**
     * Amount to be sent in Ether or ERC20.
     */
    amount: string;
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
     */
    data?: string;
}
