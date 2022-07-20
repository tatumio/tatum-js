import { Blockchain, BtcBasedBlockchainsType } from '@tatumio/shared-core'
import { BtcBasedWalletUtils, btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from '@tatumio/btc'
import { bchWalletUtils } from '@tatumio/bch'

type BtcBasedWalletUtilsMapping = { [key in BtcBasedBlockchainsType]: BtcBasedWalletUtils }

const btcBasedWalletUtilsMapping: BtcBasedWalletUtilsMapping = {
  [Blockchain.BTC]: btcWalletUtils(),
  [Blockchain.BCH]: bchWalletUtils(),
  [Blockchain.LTC]: btcBasedWalletUtils(Blockchain.LTC),
  [Blockchain.DOGE]: btcBasedWalletUtils(Blockchain.DOGE),
}

export const walletSdkUtils = (blockchain: Blockchain): BtcBasedWalletUtils => {
  return btcBasedWalletUtilsMapping[blockchain]
}
