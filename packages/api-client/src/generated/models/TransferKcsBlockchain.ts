/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferKcsBlockchain = {
    /**
     * Additional data, that can be passed to blockchain transaction as data property. Only for KCS transactions.
     */
    data?: string;
    /**
     * Nonce to be set to Kcs transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from Kcs Blockchain Account. ERC20 tokens USDC and USDT are available only for mainnet use.
     */
    currency: 'KCS' | 'USDC_KCS' | 'USDT_KCS';
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
    /**
     * Amount to be sent in Ether.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
