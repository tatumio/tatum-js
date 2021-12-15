import { WebDriver, post } from '@tatumio/tatum-core'

/**
 * Documentation https://tatum.io/apidoc.php#operation/BscWeb3Driver
 */
export const httpDriver = async (
  body: WebDriver
): Promise<{
  jsonrpc: string
  id: number
  result: string
}> => {
  return await post(`/v3/bsc/web3/${process.env.TATUM_API_KEY}`, body, WebDriver)
}
