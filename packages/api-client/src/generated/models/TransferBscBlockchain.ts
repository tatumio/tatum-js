/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBscBlockchain = {
    /**
     * Additinal data, that can be passed to blockchain transaction as data property. Only for ETH transactions.
     */
    data?: string;
    /**
     * Nonce to be set to BSC transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency to transfer from BSC Blockchain Account. BEP20 tokens BETH, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH are available only for mainnet use.
     */
    currency: TransferBscBlockchain.currency;
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

export namespace TransferBscBlockchain {

    /**
     * Currency to transfer from BSC Blockchain Account. BEP20 tokens BETH, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH are available only for mainnet use.
     */
    export enum currency {
        BETH = 'BETH',
        BBTC = 'BBTC',
        RMD = 'RMD',
        USDC_BSC = 'USDC_BSC',
        B2U_BSC = 'B2U_BSC',
        BADA = 'BADA',
        WBNB = 'WBNB',
        GMC_BSC = 'GMC_BSC',
        BDOT = 'BDOT',
        BXRP = 'BXRP',
        BLTC = 'BLTC',
        BBCH = 'BBCH',
        HAG = 'HAG',
        CAKE = 'CAKE',
        BUSD_BSC = 'BUSD_BSC',
    }


}
