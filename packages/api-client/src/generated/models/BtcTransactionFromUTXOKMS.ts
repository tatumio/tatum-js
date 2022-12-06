/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BtcTransactionFromUTXOKMSSource } from './BtcTransactionFromUTXOKMSSource';
import type { BtcTransactionFromUTXOKMSTarget } from './BtcTransactionFromUTXOKMSTarget';

export type BtcTransactionFromUTXOKMS = {
    /**
     * The array of transaction hashes, indexes of its UTXOs, and the signature IDs of the associated blockchain addresses
     */
    fromUTXO: Array<BtcTransactionFromUTXOKMSSource>;
    /**
     * The array of blockchain addresses to send the assets to and the amounts that each address should receive (in BTC). The difference between the UTXOs calculated in the <code>fromUTXO</code> section and the total amount to receive calculated in the <code>to</code> section will be used as the gas fee. To explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent, set the <code>fee</code> and <code>changeAddress</code> parameters.
     */
    to: Array<BtcTransactionFromUTXOKMSTarget>;
    /**
     * The fee to be paid for the transaction (in BTC); if you are using this parameter, you have to also use the <code>changeAddress</code> parameter because these two parameters only work together.
     */
    fee?: string;
    /**
     * The blockchain address to send any extra assets remaning after covering the fee; if you are using this parameter, you have to also use the <code>fee</code> parameter because these two parameters only work together.
     */
    changeAddress?: string;
}
