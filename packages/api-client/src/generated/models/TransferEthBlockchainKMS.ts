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
    currency: TransferEthBlockchainKMS.currency;
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

export namespace TransferEthBlockchainKMS {

    /**
     * Currency to transfer from Ethereum Blockchain Account.
     */
    export enum currency {
        USDT = 'USDT',
        LEO = 'LEO',
        LINK = 'LINK',
        UNI = 'UNI',
        FREE = 'FREE',
        GMC = 'GMC',
        GMC_BSC = 'GMC_BSC',
        RMD = 'RMD',
        MKR = 'MKR',
        USDC = 'USDC',
        BAT = 'BAT',
        TUSD = 'TUSD',
        BUSD = 'BUSD',
        PAX = 'PAX',
        PAXG = 'PAXG',
        PLTC = 'PLTC',
        MMY = 'MMY',
        WBTC = 'WBTC',
        XCON = 'XCON',
        ETH = 'ETH',
    }


}
