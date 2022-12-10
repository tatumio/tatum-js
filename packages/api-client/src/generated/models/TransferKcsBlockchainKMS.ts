/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferKcsBlockchainKMS = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
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
     * Currency to transfer from Kcs Blockchain Account. ERC20 tokens BETH, BBTC, BADA, WMATIC, BDOT, BXRP, BLTC, BBCH, KCS are available only for mainnet use.
     */
    currency: 'BETH' | 'BBTC' | 'BADA' | 'WMATIC' | 'BDOT' | 'BXRP' | 'BLTC' | 'BBCH' | 'MATIC' | 'KCS';
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
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
