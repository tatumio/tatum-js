import { Blockchain } from '@tatumio/shared-core'

import { btcBasedWallet } from '@tatumio/shared-blockchain-btc-based'
import { bchWalletUtils } from './bch.wallet.utils'

export const bchWallet = () => {
  return btcBasedWallet({ blockchain: Blockchain.BCH, utils: bchWalletUtils() })
}
