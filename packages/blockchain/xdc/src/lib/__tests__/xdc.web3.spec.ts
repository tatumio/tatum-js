import { xdcWeb3 } from '@tatumio/xdc'
import { Blockchain } from '@tatumio/shared-core'

describe('XDC web3', () => {
  const web3 = xdcWeb3({ blockchain: Blockchain.XDC })

  it('getGasPriceInWei', async () => {
    expect(parseInt(await web3.getGasPriceInWei())).toBeGreaterThan(0)
  })
})
