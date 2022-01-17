/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBscBlockchainKMS = {
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
    currency: TransferBscBlockchainKMS.currency;
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
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}

export namespace TransferBscBlockchainKMS {

    /**
     * Currency to transfer from BSC Blockchain Account. BEP20 tokens BETH, BBTC, BADA, WBNB, BDOT, BXRP, BLTC, BBCH are available only for mainnet use.
     */
    export enum currency {
        BETH = 'BETH',
        BBTC = 'BBTC',
        BADA = 'BADA',
        WBNB = 'WBNB',
        BDOT = 'BDOT',
        BXRP = 'BXRP',
        BLTC = 'BLTC',
        BBCH = 'BBCH',
        BSC = 'BSC',
    }


}
