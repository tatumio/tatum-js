/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TronTx = {
    /**
     * Result of the smart contract invocation.
     */
    ret: Array<any>;
    /**
     * List of signatures of the transaction.
     */
    signature: Array<string>;
    /**
     * The block in which the transaction was included.
     */
    blockNumber: number;
    /**
     * Transaction ID.
     */
    txID: string;
    /**
     * Usage of the network.
     */
    netUsage?: number;
    /**
     * Raw data of the transaction.
     */
    rawData: {
        /**
         * Smart contract invocations details.
         */
        contract: Array<{
            parameter?: {
                value?: {
                    /**
                     * The amount transferred within the transaction.
                     */
                    data?: string;
                    /**
                     * The amount transferred within the transaction.
                     */
                    amount?: number;
                    /**
                     * Address of the sender.
                     */
                    owner_address?: string;
                    /**
                     * Address of the recipient.
                     */
                    to_address?: string;
                    /**
                     * Address of the sender in Base58 encoding.
                     */
                    ownerAddressBase58?: string;
                    /**
                     * Address of the recipient in Base58 encoding.
                     */
                    toAddressBase58?: string;
                };
                /**
                 * Type of the smart contract event.
                 */
                type_url?: string;
            };
            /**
             * Type of the Smart contract.
             */
            type?: string;
        }>;
        /**
         * The height of the transaction reference block.
         */
        ref_block_bytes?: number;
        /**
         * The hash of the transaction reference block.
         */
        ref_block_hash?: number;
        /**
         * Expiration of the transaction.
         */
        expiration: number;
        /**
         * Time of the transaction.
         */
        timestamp: number;
    };
}
