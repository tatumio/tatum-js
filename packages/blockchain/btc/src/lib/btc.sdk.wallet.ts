import { Blockchain } from '@tatumio/shared-core'
import { btcBasedWallet } from '@tatumio/shared-blockchain-btc-based'
import { btcWalletUtils } from './btc.wallet.utils'

export const btcWallet = () => {
  return btcBasedWallet({ blockchain: Blockchain.BTC, utils: btcWalletUtils() })
}
