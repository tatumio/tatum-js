import { Chain, ChainMap, TatumChain } from '../service'

export const Utils = {
  mapChain: (chain: Chain): TatumChain => {
    const mappedChain = ChainMap[chain]
    if (!mappedChain) {
      throw new Error(`Chain ${chain} is not supported`)
    }
    return mappedChain
  },
  getChainFromNotificationChain: <TChainEnum>(notificationChain: TChainEnum): Chain => {
    const chain = Chain[notificationChain as unknown as keyof typeof Chain];
    if (!chain) {
      throw new Error(`Notification specific chain: ${notificationChain} is not castable to Chain enum`)
    }
    return chain
  },
}
