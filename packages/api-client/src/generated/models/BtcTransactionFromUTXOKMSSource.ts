/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTransactionFromUTXOKMSSource = {
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
}
