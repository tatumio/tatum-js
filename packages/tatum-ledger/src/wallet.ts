export type Wallet = WalletWithMnemonic | WalletWithAddress

export interface WalletWithMnemonic {
  /**
   * mnemonic seed
   */
  mnemonic: string

  /**
   * extended public key to derive addresses from
   */
  xpub: string
}

export interface WalletWithAddress {
  /**
   * address of wallet
   */
  address: string

  /**
   * private key
   */
  privateKey: string
}
