import { SDKS } from '../sdk.common'
import { Blockchain, blockchainHelper, Currency, Web3Request, Web3Response } from '@tatumio/shared-core'

// @TODO replace with evm
export const httpDriver = (sdks: SDKS, currency: Currency, request: Web3Request): Promise<Web3Response> => {
  const blockchain = blockchainHelper.getBlockchainByCurrency(currency)

  switch (blockchain) {
    case Blockchain.ETH:
      return sdks.eth.httpDriver(request)
    default:
      throw new Error(`httpDriver not supported for ${currency}`)
  }
}
