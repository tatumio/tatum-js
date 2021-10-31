export interface Wallet {
  /**
   * mnemonic seed
   */
  mnemonic: string

  /**
   * extended public key to derive addresses from
   */
  xpub: string
}
