import { Chain, ChainMap, TatumChain } from '../service'
import { Blockchain } from '../dto/Blockchain.dto'
import BigNumber from 'bignumber.js'

export const Utils = {
  mapChain: (chain: Chain): TatumChain => {
    const mappedChain = ChainMap[chain]
    if (!mappedChain) {
      throw new Error(`Chain ${chain} is not supported`)
    }
    return mappedChain
  },
  delay: (t: number) => new Promise((resolve) => setTimeout(resolve, t)),
  statusPayloadExtractor: (blockchain: Blockchain, payload: { id: number, jsonrpc: string, result?: number | string | { count: number } }) => {
    switch (blockchain) {
      case Blockchain.BITCOIN:
      case Blockchain.LITECOIN:
        return new BigNumber(payload.result as number || -1).toNumber()
      case Blockchain.ETHEREUM:
      case Blockchain.POLYGON:
        return new BigNumber(payload.result as string || -1).toNumber()
      case Blockchain.MONERO:
        return (payload.result as { count: number } | undefined)?.count || -1
    }
  },
  fetchWithTimeout: async (url: string, config: RequestInit, timeout = 5000): Promise<{ response: Response, responseTime: number }> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const start = Date.now()
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    const responseTime = Date.now() - start
    clearTimeout(id);
    return { responseTime, response };
  },
}
