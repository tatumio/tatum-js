import { Network, Stellar, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getStellarRpc = async () =>
  await TatumSDK.init<Stellar>({
    network: Network.STELLAR,
    verbose: e2eUtil.isVerbose,
  })

describe('Stellar', () => {
  let tatum: Stellar

  beforeEach(async () => {
    tatum = await getStellarRpc()
  })

  afterEach(async () => {
    await tatum.destroy()
  })

  it('should get accounts', async () => {
    const response = await tatum.rpc.getAccounts({
      asset: 'USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
    })
    expect(response).toBeDefined()
  })

  it('should get account detail', async () => {
    const response = await tatum.rpc.getAccount({
      accountId: 'GA2224DCGO3WHC4EALA2PR2BZEMAYZPBPTHS243ZYYWQMBWRPJSZH5A6',
    })
    expect(response).toBeDefined()
  })

  it('should get fee stats', async () => {
    const response = await tatum.rpc.getFeeStats()
    expect(response).toBeDefined()
  })

  it('should get ledger', async () => {
    const response = await tatum.rpc.getLedger({
      sequence: 49750265,
    })
    expect(response).toBeDefined()
  })

  it('should get offers', async () => {
    const response = await tatum.rpc.getOffers({})
    expect(response).toBeDefined()
  })

  it('should get strict send', async () => {
    const response = await tatum.rpc.getStrictSendPaymentPaths({
      sourceAssetType: 'native',
      sourceAmount: '1',
      destinationAccount: 'GB3LIKQ6GOJ6D4EYKVS47L2SBY66SJO4MN4CZCMUPNBUJ2L3PF62ECBA',
    })
    expect(response).toBeDefined()
  })

  it('should get strict receive', async () => {
    const response = await tatum.rpc.getStrictReceivePaymentPaths({
      destinationAssetType: 'native',
      destinationAmount: '1',
      sourceAssets: 'USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
    })
    expect(response).toBeDefined()
  })
})
