import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function httpDriverExample() {
  const netVersion = await tatumSDK.httpDriver(Currency.ETH, {
    id: 1,
    method: 'net_version',
    params: [],
  })

  const balance = await tatumSDK.httpDriver(Currency.ETH, {
    id: 2,
    method: 'eth_getBalance',
    params: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', 'latest'],
  })
}

export async function exchangeRateExample() {
  const rate = await tatumSDK.getExchangeRate(Currency.ETH)
  const rateWithBasePair = await tatumSDK.getExchangeRate(Currency.ETH, 'EUR')
}
