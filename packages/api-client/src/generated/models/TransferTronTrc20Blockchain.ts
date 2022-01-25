/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronTrc20Blockchain = {
    /**
     * Private key of the address, from which the TRX will be sent.
     */
    fromPrivateKey: string;
    /**
     * Recipient address of TRON account in Base58 format.
     */
    to: string;
    /**
     * Address of the TRC20 token to transfer.
     */
    tokenAddress: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
    /**
     * Amount to be sent in TRX.
     */
    amount: string;
}
