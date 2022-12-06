/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTronTrc20BlockchainKMS = {
    /**
     * Sender address of TRON account in Base58 format.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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
