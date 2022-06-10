import { Blockchain, blockchainUtils } from '@tatumio/shared-core'

import { btcBasedWallet } from '@tatumio/shared-blockchain-btc-based'
import { ECPair, payments } from 'bitcoinjs-lib'
import { fromBase58 } from 'bip32'

export const btcWallet = () => {
  const blockchain = Blockchain.BTC
  const btcBased = btcBasedWallet({ blockchain })

  return {
    ...btcBased,
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
