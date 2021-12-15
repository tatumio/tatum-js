import { WebDriver, post } from '@tatumio/tatum-core'

/**
 * Documentation https://tatum.io/apidoc.php#operation/SolanaWeb3Driver
 */
export const httpDriver = async (
  body: WebDriver
): Promise<{
  jsonrpc: string
  id: number
  result: string
}> => {
  return await post(`/v3/solana/web3/${process.env.TATUM_API_KEY}`, body, WebDriver)
}
