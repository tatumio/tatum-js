describe('Check custodial using abstract function', () => {
  it('my own abstract clojure function', async () => {
    const abstractFn = async (
      testnet: boolean,
      r: string,
      prepareSmartContractWriteMethodInvocation: (
        r: string,
        provider?: string,
        testnet?: boolean
      ) => Promise<{ body: string; feeLimit: number; from?: string; provider?: string }>,
      provider: string
    ) => {
      r = 'hello world'
      provider = 'inside my abstract function'
      return await prepareSmartContractWriteMethodInvocation(r, provider, testnet)
    }

    const myFn = async (body: string, feeLimit: number, from?: string, provider?: string) => {
      // console.log(body, feeLimit, from, provider)
      return { body, feeLimit, from, provider }
    }

    const feeLimit = 1000
    const from = 'fromMe'
    const result = await abstractFn(true, 'myRArgument', (_r, _provider) => myFn(_r, feeLimit, from, _provider), 'myProvider')

    expect(result).toEqual({ body: 'hello world', feeLimit: 1000, from: 'fromMe', provider: 'inside my abstract function' })
  })
})
