import { TatumSdk } from '../service/tatum/tatum'
import { Chain } from '../service/tatum/tatum.dto'

describe('estimate', () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      testnet: true,
    })
  })

  it('getCurrentFee', async () => {
    const fee = await tatum.fees.getCurrentFee([Chain.ethereum])
    expect(fee.ethereum).toBeDefined()
  })

  it('estimateGas', async () => {
    const estimation = await tatum.fees.estimateGas({
      chain: Chain.ethereum,
      from: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      to: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      amount: '0.1',
    })
    expect(estimation).toBeDefined()
  })
})
