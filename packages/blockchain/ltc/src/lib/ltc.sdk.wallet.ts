import { Blockchain } from '@tatumio/shared-core'

import { btcBasedWallet, btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'

export const ltcWallet = () => {
  const blockchain = Blockchain.LTC
  return btcBasedWallet({ blockchain, utils: btcBasedWalletUtils(blockchain) })
}
