import { get } from '@tatumio/tatum-core'

const getUrl = (resource: string) => `/v3/egld/node/${process.env.TATUM_API_KEY}/${resource}`

/**
 * Documentation https://tatum.io/apidoc.php#operation/EgldNodeGet
 */
export const networkConfig = async (): Promise<any> => {
  return get(getUrl('network/config'))
}
