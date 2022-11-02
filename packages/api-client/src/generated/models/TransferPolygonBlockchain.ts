/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferPolygonBlockchain = {
    /**
     * Additional data, that can be passed to blockchain transaction as data property. Only for MATIC transactions.
     */
    data?: string;
    /**
     * Nonce to be set to Polygon transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from Polygon Blockchain Account. ERC20 tokens USDC and USDT are available only for mainnet use.
     */
    currency: 'MATIC' | 'USDC_MATIC' | 'USDT_MATIC';
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
     * Amount to be sent.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
