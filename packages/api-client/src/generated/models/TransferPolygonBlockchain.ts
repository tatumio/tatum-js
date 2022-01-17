/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferPolygonBlockchain = {
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
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
    currency: TransferPolygonBlockchain.currency;
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

export namespace TransferPolygonBlockchain {

    /**
     * Currency to transfer from Polygon Blockchain Account. ERC20 tokens USDC and USDT are available only for mainnet use.
     */
    export enum currency {
        MATIC = 'MATIC',
        USDC_MATIC = 'USDC_MATIC',
        USDT_MATIC = 'USDT_MATIC',
    }


}
