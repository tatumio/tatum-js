import { Ethereum, Network, TatumSDK } from '../../service'
import { TestExtension, TestWalletProvider } from "./e2e.extensions";

const mockTestExtension = {
  sayHello: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
  network: jest.fn()
}

describe('Tatum Extension Ecosystem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('General Extension', () => {
    it('should work after being registered', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
        configureExtensions:[
          {type: TestExtension, config: mockTestExtension}
        ]
      })

      await tatum.extension(TestExtension).sayHello()

      tatum.destroy()

      expect(mockTestExtension.sayHello).toHaveBeenCalled()
      expect(mockTestExtension.init).toHaveBeenCalled()
      expect(mockTestExtension.destroy).toHaveBeenCalled()
      expect(mockTestExtension.network).toBeCalledWith(Network.ETHEREUM_SEPOLIA)
    })
  })

  describe('Wallet Extension', () => {
    it('should work after being registered', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
        configureWalletProviders:[
          {type: TestWalletProvider, config: mockTestExtension}
        ]
      })

      const result = await tatum.walletProvider.use(TestWalletProvider).connect()

      tatum.destroy()

      expect(result).toBe('connected')
      expect(mockTestExtension.sayHello).toHaveBeenCalled()
      expect(mockTestExtension.init).toHaveBeenCalled()
      expect(mockTestExtension.destroy).toHaveBeenCalled()
      expect(mockTestExtension.network).toBeCalledWith(Network.ETHEREUM_SEPOLIA)
    })
  })
})
