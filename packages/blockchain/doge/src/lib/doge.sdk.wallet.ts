import { Blockchain } from '@tatumio/shared-core'

import { btcBasedWallet, btcBasedWalletUtils } from '@tatumio/shared-blockchain-btc-based'

export const dogeWallet = () => {
  const blockchain = Blockchain.DOGE
  return btcBasedWallet({ blockchain, utils: btcBasedWalletUtils(blockchain) })
}
