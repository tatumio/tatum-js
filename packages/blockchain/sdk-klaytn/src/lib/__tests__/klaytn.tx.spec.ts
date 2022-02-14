import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { klaytnTxService } from '../services/klaytn.tx'
import { TatumKlaytnSDK } from '../sdk-klaytn'
import {
  erc20TestFactory,
  erc721TestFactory,
  ganacheHelper,
  multiTokenTestFactory,
} from '@tatumio/shared-testing-evm-based'
import { Currency } from '@tatumio/api-client'
import { nativeTestFactory } from '../../../../../shared/testing/evm-based/src/lib/evm-based.native.test-factory'

const blockchain = Blockchain.KLAY

describe('KlaytnSDK - tx', () => {
  const sdk = TatumKlaytnSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const klaytnTx = klaytnTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '10'
      },
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(klaytnTx.native, inmemoryBlockchain.accounts)
    })
  })

  // @TODO Deploy contract
  describe('erc20', () => {
    describe('decimals', () => {
      // TODO: after live deployment
      // erc20TestFactory.decimals(sdk.transaction.erc20, TEST_DATA.KLAYTN)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(klaytnTx.erc20, inmemoryBlockchain.accounts)
        // erc20TestFactory.prepare.deploySignedTransactionChain(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(klaytnTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(klaytnTx.erc20, TEST_DATA.KLAYTN)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(
          sdk.transaction.erc721,
          TEST_DATA.KLAYTN,
          Currency.KLAY,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(
          sdk.transaction.multiToken,
          TEST_DATA.KLAYTN,
          'KLAY',
        )
      })
    })
  })
})
