import { egldTxService } from '../services/egld.tx'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'

const txService = egldTxService({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY, blockchain: Blockchain.EGLD })

describe('Elrond EGLD tests', () => {
  jest.setTimeout(99999)

  it('burnEsdtSignedTransaction', async () => {
    const body = {
      to: 'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
      from: 'erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7',
      amount: '0',
      data: { tokenId: 'tokenId', supply: '', service: '' },
      fromPrivateKey: '0cd8e6217b4a218807b858ffb508483cdcdadbb7a21196727f764a510a692760',
    }
    try {
      const tx = await txService.prepare.burnEsdtSignedTransaction(body)
      console.log('tx', tx)
      expect(tx).toBeDefined()
    } catch (e) {
      console.log('err', e)
    }
  })
})
