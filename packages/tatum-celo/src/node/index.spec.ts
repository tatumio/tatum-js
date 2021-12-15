import { httpDriver } from '.'

describe('httpDriver', () => {
  process.env.TATUM_API_KEY = 'be8215a0-7504-40b3-9ae2-6667554b56f8'
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
      result: 'celo/v1.4.1-stable/linux-amd64/go1.16.9',
    })
  })
})
