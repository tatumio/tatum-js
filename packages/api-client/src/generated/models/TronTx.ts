/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronTx = {
    /**
     * Block, where which the transactio nwas included.
     */
    blockNumber: number;
    /**
     * Result of the smart contract invocation.
     */
    ret: {
        /**
         * Return value of the smart contract invocation.
         */
        contractRet: string;
        /**
         * Fee of the blockchain transaction. Not present every time, depends on the type of the smart contract, which was invoked.
         */
        fee?: number;
    };
    /**
     * List of signatures of the transaction.
     */
    signature: Array<string>;
    /**
     * Transaction ID.
     */
    txID: string;
    /**
     * Fee paid for the transaction.
     */
    netFee?: number;
    /**
     * Usage of the network.
     */
    netUsage?: number;
    /**
     * Fee paid for the energy.
     */
    energyFee?: number;
    /**
     * Usage of the energy.
     */
    energyUsage?: number;
    /**
     * Total energy used.
     */
    energyUsageTotal?: number;
    /**
     * List of internal smart contract transactions.
     */
    internalTransactions?: Array<{
        /**
         * Internal TX ID.
         */
        internal_tx_id?: string;
        /**
         * Recipient address.
         */
        to_address?: string;
        /**
         * Sender address.
         */
        from_address?: string;
    }>;
    /**
     * Raw data of the transaction.
     */
    rawData: {
        /**
         * Expiration of the transaction.
         */
        expiration: number;
        /**
         * Time of the transaction.
         */
        timestamp: number;
        /**
         * Max limit of the fee.
         */
        fee_limit?: number;
        /**
         * Smart contract invocations details.
         */
        contract: Array<{
            /**
             * Type of the Smart contract.
             */
            type?: string;
            parameter?: {
                /**
                 * Type of the smart contract event.
                 */
                type_url?: string;
                value?: {
                    /**
                     * Data of the contract method.
                     */
                    data?: string;
                    /**
                     * Address of the sender.
                     */
                    owner_address?: string;
                    /**
                     * Address of the recipient.
                     */
                    contract_address?: string;
                    /**
                     * Address of the sender in Base58 encoding.
                     */
                    ownerAddressBase58?: string;
                    /**
                     * Address of the recipient in Base58 encoding.
                     */
                    contractAddressBase58?: string;
                };
            };
        }>;
    };
}
