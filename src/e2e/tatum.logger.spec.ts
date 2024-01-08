import { Network } from '../dto'
import { Ethereum, TatumSDK } from '../service'
import { Logger } from '../service/logger/logger.types'

describe('Logger', () => {
  let logger: Logger

  beforeEach(() => {
    logger = {
      trace: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    }
  })

  it('should warn on missing API key', async () => {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      logger,
    })
    await tatum.destroy()

    expect(logger.warn).toHaveBeenCalledWith(
      'API key not provided - only a subset of SDK features will be enabled. Generate an API Key by accessing your Dashboard: https://co.tatum.io/signup',
    )
  })
})
