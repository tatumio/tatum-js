import { fromBase58, fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { ECPair, payments } from 'bitcoinjs-lib'
import hdkey from 'hdkey'
import { Wallet } from '@tatumio/api-client'
import { BtcBasedBlockchain, blockchainUtils } from '@tatumio/shared-core'
import { logger } from '@tatumio/shared-abstract-sdk'

export type BtcBasedWalletUtils = {
  generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }) => string

  generatePrivateKeyFromMnemonic: (
    mnemonic: string,
    i: number,
    options?: { testnet: boolean },
  ) => Promise<string>

  generateAddressFromPrivateKey: (privateKey: string, options?: { testnet: boolean }) => string

  generateBlockchainWallet: (mnemonic?: string, options?: { testnet: boolean }) => Promise<Wallet>
}

export const btcBasedWalletUtils = (blockchain: BtcBasedBlockchain): BtcBasedWalletUtils => {
  return {
    generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const w = fromBase58(xpub, network).derivePath(String(i))
      return payments.p2pkh({ pubkey: w.publicKey, network }).address as string
    },
    generatePrivateKeyFromMnemonic: async (
      mnemonic: string,
      i: number,
      options?: { testnet: boolean },
    ): Promise<string> => {
      const derivationPath = blockchainUtils.getDerivationPath(blockchain, options)
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      return fromSeed(await mnemonicToSeed(mnemonic), network)
        .derivePath(derivationPath)
        .derive(i)
        .toWIF()
    },
    generateAddressFromPrivateKey: (privateKey: string, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const keyPair = ECPair.fromWIF(privateKey, network)
      return payments.p2pkh({ pubkey: keyPair.publicKey, network }).address as string
    },
    async generateBlockchainWallet(mnemonic?: string, options?: { testnet: boolean }): Promise<Wallet> {
      const derivationPath = blockchainUtils.getDerivationPath(blockchain, options)
      const mnem = mnemonic ?? generateMnemonic(256)
      const hdwallet = hdkey.fromMasterSeed(
        await mnemonicToSeed(mnem),
        blockchainUtils.getNetworkConfig(blockchain, options).bip32,
      )
      return {
        mnemonic: mnem,
        xpub: hdwallet.derive(derivationPath).toJSON().xpub,
      }
    },
  }
}
