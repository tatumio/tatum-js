import { httpDriver } from './node'

const PROVIDER = 'https://moonbeam-alpha.api.onfinality.io/public'

describe('httpDriver', () => {
  process.env.TATUM_API_KEY = '4cc0a7d8-265b-4fa4-8dcb-7b088bfeb627'
  it('should call core api driver', async () => {
    expect(
      await httpDriver({
        jsonrpc: '2.0',
        method: 'web3_clientVersion',
        params: [],
        id: 2,
      })
    ).toEqual({
      jsonrpc: '2.0',
      id: 2,
      result: PROVIDER,
    })
  })
})
