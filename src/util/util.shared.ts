import { Chain, ChainMap, TatumChain } from '../service/tatum/tatum.dto'

export const Utils = {
  mapChain: (chain: Chain): TatumChain => {
    const mappedChain = ChainMap[chain]
    if (!mappedChain) {
      throw new Error(`Chain ${chain} is not supported`)
    }
    return mappedChain
  },
}
