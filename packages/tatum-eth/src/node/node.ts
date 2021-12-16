import { post, GetWebDriver, WebDriver } from '@tatumio/tatum-core'

/**
 * Documentation https://tatum.io/apidoc.php#operation/EthWeb3Driver
 */
export const httpDriver = async (body: GetWebDriver): Promise<WebDriver> => {
  return await post(`/v3/ethereum/web3/${process.env.TATUM_API_KEY}`, body, GetWebDriver)
}
