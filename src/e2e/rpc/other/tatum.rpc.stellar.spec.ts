import process from 'process'
import { ApiVersion, Network, Stellar, TatumSDK } from '../../../service'
import { e2eUtil } from '../../e2e.util'

const getStellarRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Stellar>({
    network: testnet ? Network.STELLAR_TESTNET : Network.STELLAR,
    verbose: e2eUtil.isVerbose,
    ...(testnet && { apiKey: { v3: process.env.V3_API_KEY_TESTNET } }),
    ...(!testnet && { apiKey: process.env.V4_API_KEY_MAINNET }),
    version: testnet ? ApiVersion.V3 : ApiVersion.V4,
  })

describe.skip('Stellar', () => {
  let tatum: Stellar

  describe('mainnet', () => {
    beforeEach(async () => {
      tatum = await getStellarRpc(false)
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

    // TODO: Unstable
    it.skip('should get account detail', async () => {
      const response = await tatum.rpc.getAccount({
        accountId: 'GA2224DCGO3WHC4EALA2PR2BZEMAYZPBPTHS243ZYYWQMBWRPJSZH5A6',
      })
      expect(response).toBeDefined()
    })

    it('should get fee stats', async () => {
      const response = await tatum.rpc.getFeeStats()
      expect(response).toBeDefined()
    })

    it.skip('should get ledger', async () => {
      const response = await tatum.rpc.getLedger({
        sequence: 49750265,
      })
      expect(response).toBeDefined()
    })

    it('should get offers', async () => {
      const response = await tatum.rpc.getOffers()
      expect(response).toBeDefined()
    })

    describe('should get strict send', () => {
      it('destinationAccount', async () => {
        const response = await tatum.rpc.getStrictSendPaymentPaths({
          sourceAssetType: 'native',
          sourceAmount: '1',
          destinationAccount: 'GB3LIKQ6GOJ6D4EYKVS47L2SBY66SJO4MN4CZCMUPNBUJ2L3PF62ECBA',
        })
        expect(response).toBeDefined()
      })

      it('destinationAssets', async () => {
        const response = await tatum.rpc.getStrictSendPaymentPaths({
          sourceAssetType: 'native',
          sourceAmount: '1',
          sourceAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
          destinationAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
        })
        expect(response).toBeDefined()
      })
    })

    describe('should get strict receive', () => {
      it('sourceAssets', async () => {
        const response = await tatum.rpc.getStrictReceivePaymentPaths({
          destinationAssetType: 'native',
          destinationAmount: '1',
          sourceAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
        })
        expect(response).toBeDefined()
      })

      it('sourceAccount', async () => {
        const response = await tatum.rpc.getStrictReceivePaymentPaths({
          destinationAssetType: 'native',
          destinationAmount: '1',
          sourceAccount: 'GB3LIKQ6GOJ6D4EYKVS47L2SBY66SJO4MN4CZCMUPNBUJ2L3PF62ECBA',
        })
        expect(response).toBeDefined()
      })
    })
  })

  describe('testnet', () => {
    beforeEach(async () => {
      tatum = await getStellarRpc(true)
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

    // TODO: Unstable
    it.skip('should get account detail', async () => {
      const response = await tatum.rpc.getAccount({
        accountId: 'GDNTXNPBK4YLQKBGPCZ5CAHUGQIXKKGSJAWQGO5XR73TQCAYSWQOCCFP',
      })
      expect(response).toBeDefined()
    })

    it('should get fee stats', async () => {
      const response = await tatum.rpc.getFeeStats()
      expect(response).toBeDefined()
    })

    it('should get ledger', async () => {
      const response = await tatum.rpc.getLedgers()
      expect(response).toBeDefined()
    })

    it('should get offers', async () => {
      const response = await tatum.rpc.getOffers()
      expect(response).toBeDefined()
    })

    describe('should get strict send', () => {
      it('destinationAccount', async () => {
        const response = await tatum.rpc.getStrictSendPaymentPaths({
          sourceAssetType: 'native',
          sourceAmount: '1',
          destinationAccount: 'GB3LIKQ6GOJ6D4EYKVS47L2SBY66SJO4MN4CZCMUPNBUJ2L3PF62ECBA',
        })
        expect(response).toBeDefined()
      })

      it('destinationAssets', async () => {
        const response = await tatum.rpc.getStrictSendPaymentPaths({
          sourceAssetType: 'native',
          sourceAmount: '1',
          sourceAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
          destinationAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
        })
        expect(response).toBeDefined()
      })
    })

    describe('should get strict receive', () => {
      it('sourceAssets', async () => {
        const response = await tatum.rpc.getStrictReceivePaymentPaths({
          destinationAssetType: 'native',
          destinationAmount: '1',
          sourceAssets: ['USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
        })
        expect(response).toBeDefined()
      })

      it('sourceAccount', async () => {
        const response = await tatum.rpc.getStrictReceivePaymentPaths({
          destinationAssetType: 'native',
          destinationAmount: '1',
          sourceAccount: 'GDNTXNPBK4YLQKBGPCZ5CAHUGQIXKKGSJAWQGO5XR73TQCAYSWQOCCFP',
        })
        expect(response).toBeDefined()
      })
    })
  })
})
