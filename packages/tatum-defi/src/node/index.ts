import { httpDriver as bscHttpDriver } from '@tatumio/tatum-bsc'
import { httpDriver as ethHttpDriver } from '@tatumio/tatum-eth'
import { httpDriver as celoHttpDriver } from '@tatumio/tatum-celo'
import { httpDriver as oneHttpDriver } from '@tatumio/tatum-one'
import { httpDriver as polygonHttpDriver } from '@tatumio/tatum-polygon'
import { httpDriver as solanaHttpDriver } from '@tatumio/tatum-solana'
import { httpDriver as xdcHttpDriver } from '@tatumio/tatum-xdc'
import { networkConfig as egldNetworkConfig } from '@tatumio/tatum-egld'
import { Currency, WebDriver } from '@tatumio/tatum-core'

export const httpDriver = async (chain: Currency, body: WebDriver): Promise<{ jsonrpc: string; id: number; result: string }> => {
  switch (chain) {
    case Currency.BSC:
      return bscHttpDriver(body)
    case Currency.ETH:
      return ethHttpDriver(body)
    case Currency.CELO:
      return celoHttpDriver(body)
    case Currency.ONE:
      return oneHttpDriver(body)
    case Currency.MATIC:
      return polygonHttpDriver(body)
    case Currency.SOL:
      return solanaHttpDriver(body)
    case Currency.XDC:
      return xdcHttpDriver(body)
    default:
      throw new Error('Unsupported chain.')
  }
}

export const networkConfig = async (chain: Currency): Promise<{ jsonrpc: string; id: number; result: string }> => {
  switch (chain) {
    case Currency.EGLD:
      return egldNetworkConfig()
    default:
      throw new Error('Unsupported chain.')
  }
}
