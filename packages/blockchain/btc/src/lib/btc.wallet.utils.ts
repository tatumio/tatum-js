import { fromBase58 } from 'bip32'
import { ECPair, payments } from 'bitcoinjs-lib'
import { Blockchain, blockchainUtils } from '@tatumio/shared-core'
import { btcBasedWalletUtils, BtcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'

export const btcWalletUtils = (): BtcBasedWalletUtils => {
  const blockchain = Blockchain.BTC
  return {
    ...btcBasedWalletUtils(blockchain),
    generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const w = fromBase58(xpub, network).derivePath(String(i))
      return payments.p2wpkh({ pubkey: w.publicKey, network }).address as string
    },
    generateAddressFromPrivateKey: (privateKey: string, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const keyPair = ECPair.fromWIF(privateKey, network)
      return payments.p2wpkh({ pubkey: keyPair.publicKey, network }).address as string
    },
  }
}
