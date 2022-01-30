import { blockchainUtils, BtcBasedBlockchain } from '@tatumio/shared-core'

import bcash from '@tatumio/bitcoincashjs2-lib'
import cashaddr from 'cashaddrjs'
import { btcBasedWallet } from '@tatumio/shared-blockchain-btc-based'
import { bcashAddressHelper } from '../utils/bch.address'
import { SdkWithWalletFunctions } from '@tatumio/shared-blockchain-abstract'
import { ECPair, payments } from 'bitcoinjs-lib'

export const bchWallet = (args: { blockchain: BtcBasedBlockchain }): SdkWithWalletFunctions => {
  const btcBased = btcBasedWallet(args)

  return {
    ...btcBased,
    generateAddressFromXPub: (xpub: string, i: number, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(args.blockchain, options)
      const hdNode = bcash.HDNode.fromBase58(xpub, network)
      const legacy = hdNode.derivePath(String(i)).getAddress()

      const decoded = bcashAddressHelper.decode(legacy)

      return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash)
    },
    generateAddressFromPrivateKey: (privateKey: string, options?: { testnet: boolean }): string => {
      const network = blockchainUtils.getNetworkConfig(args.blockchain, options)
      const keyPair = ECPair.fromWIF(privateKey, network)
      const legacy = payments.p2pkh({ pubkey: keyPair.publicKey, network }).address as string
      const decoded = bcashAddressHelper.decode(legacy)

      return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash)
    },
  }
}
