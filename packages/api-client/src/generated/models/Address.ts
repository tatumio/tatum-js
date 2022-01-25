/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Address = {
    /**
     * Blockchain address.
     */
    address: string;
    /**
     * Currency of generated address. BTC, LTC, DOGE, BCH, ETH, XRP, XLM, BNB, TRX, ERC20, TRC20.
     */
    currency: string;
    /**
     * Derivation key index for given address.
     */
    derivationKey?: number;
    /**
     * Extended public key to derive address from. In case of XRP, this is account address, since address is defined as DestinationTag, which is address field. In case of XLM, this is account address, since address is defined as message, which is address field.
     */
    xpub?: string;
    /**
     * In case of XRP, destinationTag is the distinguisher of the account.
     */
    destinationTag?: number;
    /**
     * In case of BNB, message is the distinguisher of the account.
     */
    memo?: string;
    /**
     * In case of XLM, message is the distinguisher of the account.
     */
    message?: string;
}
