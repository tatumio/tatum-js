/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BroadcastWithdrawal = {
    /**
     * Currency of signed transaction to be broadcast, BTC, LTC, DOGE, BNB, XLM, TRX, BCH, ETH, XRP, ERC20, TRC20
     */
    currency: string;
    /**
     * Raw signed transaction to be published to network.
     */
    txData: string;
    /**
     * Withdrawal ID to be completed by transaction broadcast
     */
    withdrawalId?: string;
    /**
     * ID of prepared payment template to sign. This is should be stored on a client side to retrieve ID of the blockchain transaction, when signing application signs the transaction and broadcasts it to the blockchain.
     */
    signatureId?: string;
}
