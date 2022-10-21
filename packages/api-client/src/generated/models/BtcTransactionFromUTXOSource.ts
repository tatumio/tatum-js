/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTransactionFromUTXOSource = {
    /**
     * The transaction hash of the UTXO to be spent
     */
    txHash: string;
    /**
     * The index of the UTXO to be spent
     */
    index: number;
    /**
     * The private key of the blockchain address that holds the UTXO to be spent
     */
    privateKey: string;
}
