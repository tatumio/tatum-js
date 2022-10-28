/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBscBlockchain = {
  /**
   * Additional data, that can be passed to blockchain transaction as data property. Only for BSC transactions.
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
  currency: 'BSC' | 'BETH' | 'BBTC' | 'RMD' | 'USDC_BSC' | 'B2U_BSC' | 'BADA' | 'WBNB' | 'GMC_BSC' | 'BDOT' | 'BXRP' | 'BLTC' | 'BBCH' | 'HAG' | 'CAKE' | 'BUSD_BSC' | 'BUSDT_BSC';
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
