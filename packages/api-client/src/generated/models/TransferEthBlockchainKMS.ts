/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferEthBlockchainKMS = {
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
     */
    data?: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from Ethereum Blockchain Account.
     */
    currency: 'USDT' | 'LEO' | 'LINK' | 'UNI' | 'FREE' | 'GMC' | 'GMC_BSC' | 'RMD' | 'MKR' | 'USDC' | 'BAT' | 'TUSD' | 'BUSD' | 'PAX' | 'PAXG' | 'MMY' | 'WBTC' | 'XCON' | 'ETH';
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
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
