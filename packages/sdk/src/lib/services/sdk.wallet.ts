import { blockchainHelper, Currency } from '@tatumio/shared-core'
import { btcBasedUtils } from '@tatumio/shared-blockchain-btc-based'
import { evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import { TronWallet } from '@tatumio/api-client'

export const walletSdk = {
  /**
   * Generate address
   * @param currency for which you want to perform this operation
   * @param xpub extended public key to generate address from
   * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
   * @param options optional testnet or mainnet version of address. Default: mainnet
   * @returns blockchain address
   */
  generateAddressFromXPub(
    currency: Currency,
    xpub: string,
    i: number,
    options?: { testnet: boolean },
  ): string {
    const blockchain = blockchainHelper.getBlockchainByCurrency(currency)

    if (blockchainHelper.isBtcBased(blockchain))
      return btcBasedUtils.generateAddressFromXPub(blockchain, xpub, i, options)

    if (blockchainHelper.isEvmBased(blockchain)) return evmBasedUtils.generateAddressFromXPub(xpub, i)

    throw new Error(`Can't find generateAddressFromXPub implementation for ${currency}`)
  },

  /**
   * Generate ERC20 private key from mnemonic seed
   * @param currency for which you want to perform this operation
   * @param mnemonic mnemonic to generate private key from
   * @param i derivation index of private key to generate.
   * @param options optional testnet or mainnet version of address. Default: mainnet
   * @returns blockchain private key to the address
   */
  async generatePrivateKeyFromMnemonic(
    currency: Currency,
    mnemonic: string,
    i: number,
    options?: { testnet: boolean },
  ): Promise<string> {
    const blockchain = blockchainHelper.getBlockchainByCurrency(currency)

    if (blockchainHelper.isBtcBased(blockchain))
      return btcBasedUtils.generatePrivateKeyFromMnemonic(blockchain, mnemonic, i, options)

    if (blockchainHelper.isEvmBased(blockchain))
      return evmBasedUtils.generatePrivateKeyFromMnemonic(blockchain, mnemonic, i, options)

    throw new Error(`Can't find generatePrivateKeyFromMnemonic implementation for ${currency}`)
  },

  /**
   * Generate address from private key
   * @param currency for which you want to perform this operation
   * @param privateKey private key to use
   * @param options optional testnet or mainnet version of address. Default: mainnet
   * @returns blockchain private key to the address
   */
  generateAddressFromPrivateKey(
    currency: Currency,
    privateKey: string,
    options?: { testnet: boolean },
  ): string {
    const blockchain = blockchainHelper.getBlockchainByCurrency(currency)

    if (blockchainHelper.isBtcBased(blockchain))
      return btcBasedUtils.generateAddressFromPrivateKey(blockchain, privateKey, options)

    if (blockchainHelper.isEvmBased(blockchain))
      return evmBasedUtils.generateAddressFromPrivateKey(blockchain, privateKey)

    throw new Error(`Can't find generateAddressFromPrivateKey implementation for ${currency}`)
  },

  // @TODO replace with general wallet (DTO)
  /**
   * Generate wallet
   * @param currency for which you want to perform this operation
   * @param mnemonic mnemonic seed to use. If not present, new one will be generated
   * @param options optional testnet or mainnet version of address. Default: false
   * @returns wallet or a combination of address and private key
   */
  async generateBlockchainWallet(
    currency: Currency,
    mnemonic?: string,
    options?: { testnet: boolean },
  ): Promise<TronWallet> {
    const blockchain = blockchainHelper.getBlockchainByCurrency(currency)

    if (blockchainHelper.isBtcBased(blockchain))
      return btcBasedUtils.generateBlockchainWallet(blockchain, mnemonic, options)

    if (blockchainHelper.isEvmBased(blockchain))
      return evmBasedUtils.generateBlockchainWallet(blockchain, mnemonic, options)

    throw new Error(`Can't find generateBlockchainWallet implementation for ${currency}`)
  },
}
