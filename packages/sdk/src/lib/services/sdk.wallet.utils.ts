import { Blockchain, BtcBasedBlockchain } from '@tatumio/shared-core'
import { BtcBasedWalletUtils, btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from '@tatumio/btc'
import { bchWalletUtils } from '@tatumio/bch'

const btcBasedWalletUtilsMapping: Record<BtcBasedBlockchain, BtcBasedWalletUtils> = {
  [Blockchain.BTC]: btcWalletUtils(),
  [Blockchain.BCH]: bchWalletUtils(),
  [Blockchain.LTC]: btcBasedWalletUtils(Blockchain.LTC),
  [Blockchain.DOGE]: btcBasedWalletUtils(Blockchain.DOGE),
}

export const walletSdkUtils = (blockchain: BtcBasedBlockchain): BtcBasedWalletUtils => {
  return btcBasedWalletUtilsMapping[blockchain]
}
