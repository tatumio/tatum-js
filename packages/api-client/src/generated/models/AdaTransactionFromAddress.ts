/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdaTransactionFromAddress = {
    /**
     * The array of blockchain addresses to send the assets from and their private keys. For each address, the last 100 transactions are scanned for any UTXO to be included in the transaction.
     */
    fromAddress: Array<{
        /**
         * The blockchain address to send the assets from
         */
        address: string;
        /**
         * The private key of the address to send the assets from
         */
        privateKey: string;
    }>;
    /**
     * The array of blockchain addresses to send the assets to and the amounts that each address should receive (in ADA). The difference between the UTXOs calculated in the <code>fromAddress</code> section and the total amount to receive calculated in the <code>to</code> section will be used as the gas fee. To explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent, set the <code>fee</code> and <code>changeAddress</code> parameters.
     */
    to: Array<{
        /**
         * The blockchain address to receive the assets
         */
        address: string;
        /**
         * The amount to receive (in ADA)
         */
        value: number;
    }>;
    /**
     * The fee to be paid for the transaction (in ADA).
     */
    fee: number;
    /**
     * The blockchain address to send any extra assets remaning after covering the fee to.
     */
    changeAddress: string;
}
