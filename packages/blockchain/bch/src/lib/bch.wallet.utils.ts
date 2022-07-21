import { Blockchain, blockchainUtils } from '@tatumio/shared-core'

// @ts-ignore
import * as BitcoinChashJS from '@tatumio/bitcoincashjs2-lib'
import cashaddr from 'cashaddrjs'
import { BtcBasedWalletUtils, btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'
import { bcashAddressHelper } from './utils/bch.address'
import { ECPair, payments } from 'bitcoinjs-lib'

export const bchWalletUtils = (): BtcBasedWalletUtils => {
  const blockchain = Blockchain.BCH
  return {
    ...btcBasedWalletUtils(blockchain),
    generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const hdNode = BitcoinChashJS.HDNode.fromBase58(xpub, network)
      const legacy = hdNode.derivePath(String(i)).getAddress()

      const decoded = bcashAddressHelper.decode(legacy)

      return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash)
    },
    generateAddressFromPrivateKey: (privateKey: string, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(blockchain, options)
      const keyPair = ECPair.fromWIF(privateKey, network)
      const legacy = payments.p2pkh({ pubkey: keyPair.publicKey, network }).address
      const decoded = bcashAddressHelper.decode(legacy!) // @TODO check if null

      return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash)
    },
  }
}
