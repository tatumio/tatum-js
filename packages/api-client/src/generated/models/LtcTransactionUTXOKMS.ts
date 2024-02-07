/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LtcTransactionUTXOKMS = {
    /**
     * The array of transaction hashes, indexes of its UTXOs, and the signature IDs of the associated blockchain addresses
     */
    fromUTXO: Array<{
        /**
         * The transaction hash of the UTXO to be spent
         */
        txHash: string;
        /**
         * The index of the UTXO to be spent
         */
        index: number;
        /**
         * The KMS identifier of the private key of the blockchain address that holds the UTXO to be spent
         */
        signatureId: string;
        /**
         * Index of the address in the wallet. Required when signatureId represents the mnenomic.
         */
        signatureIdIndex?: number;
    }>;
    /**
     * The array of blockchain addresses to send the assets to and the amounts that each address should receive (in LTC). The difference between the UTXOs calculated in the <code>fromUTXO</code> section and the total amount to receive calculated in the <code>to</code> section will be used as the gas fee. To explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent, set the <code>fee</code> and <code>changeAddress</code> parameters.
     */
    to: Array<{
        /**
         * The blockchain address to receive the assets
         */
        address: string;
        /**
         * The amount to receive (in LTC)
         */
        value: number;
    }>;
    /**
     * The fee to be paid for the transaction (in LTC); if you are using this parameter, you have to also use the <code>changeAddress</code> parameter because these two parameters only work together.
     */
    fee?: string;
    /**
     * The blockchain address to send any extra assets remaning after covering the fee; if you are using this parameter, you have to also use the <code>fee</code> parameter because these two parameters only work together.
     */
    changeAddress?: string;
}
