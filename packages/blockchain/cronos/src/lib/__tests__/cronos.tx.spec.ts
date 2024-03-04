import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumCronosSDK } from '../cronos.sdk'
import { cronosTx } from '../services/cronos.tx'
import { Blockchain } from '@tatumio/shared-core'
import {
  erc20TestFactory,
  erc721TestFactory,
  ganacheHelper,
  multiTokenTestFactory,
  nativeTestFactory,
  smartContractTestFactory,
} from '@tatumio/shared-testing-evm-based'

const blockchain = Blockchain.CRO

describe('CronosSDK - tx', () => {
  const sdk = TatumCronosSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  afterEach(() => {
    jest.clearAllMocks()
  })

  const cronosTxService = cronosTx({
    blockchain: blockchain,
    web3: {
      getClient: () => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '250000000'
      },
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(cronosTxService.native, inmemoryBlockchain.accounts)
    })
  })

  describe('erc20', () => {
    xdescribe('decimals', () => {
      erc20TestFactory.decimals(sdk.erc20, TEST_DATA.CRO)
    })

    describe.skip('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(cronosTxService.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(cronosTxService.erc20, inmemoryBlockchain.accounts)
      })

      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(cronosTxService.erc20, TEST_DATA.CRO)
      })

      // TODO:  not applicable for inmemoryBlockchain
      xdescribe('approveSignedTransaction', () => {
        erc20TestFactory.prepare.approveSignedTransaction(cronosTxService.erc20, TEST_DATA.CRO)
      })

      // TODO:  Returned error: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(sdk.erc20, TEST_DATA.CRO)
      })
    })
  })

  describe('erc721', () => {
    jest.setTimeout(99999)
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.CRO)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.CRO)
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.CRO)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.CRO)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.CRO)
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(sdk.multiToken, TEST_DATA.CRO)
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.CRO)
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.CRO,
        )
      })
    })

    xdescribe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.CRO,
        )
      })
    })
  })
})
