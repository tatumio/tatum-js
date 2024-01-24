import { expectHexString, REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { polygonTxService } from '../services/polygon.tx'
import { TatumPolygonSDK } from '../polygon.sdk'
import {
  custodialTestFactory,
  erc20TestFactory,
  erc721TestFactory,
  ganacheHelper,
  marketplaceTestFactory,
  multiTokenTestFactory,
  nativeTestFactory,
  smartContractTestFactory,
} from '@tatumio/shared-testing-evm-based'
import { Currency } from '@tatumio/api-client'

const blockchain = Blockchain.POLYGON

describe.skip('PolygonSDK - tx', () => {
  const sdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const inmemoryBlockchain = ganacheHelper.inmemoryBlockchain(blockchain)

  const polygonTx = polygonTxService({
    blockchain,
    web3: {
      getClient: (provider?: string) => inmemoryBlockchain.web3,
      async getGasPriceInWei(): Promise<string> {
        return '@TODO'
      },
    },
  })

  beforeEach(async () => {
    await ganacheHelper.initWeb3(inmemoryBlockchain.web3)
  })

  describe('transaction', () => {
    describe('native', () => {
      nativeTestFactory.prepare.transferSignedTransaction(polygonTx.native, inmemoryBlockchain.accounts)

      describe('storeDataTransaction', () => {
        it('valid with privateKey', async () => {
          const result = await sdk.transaction.prepare.storeDataTransaction({
            data: 'Hello world.',
            fromPrivateKey: inmemoryBlockchain.accounts[0].privateKey,
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            gasLimit: '53632',
            gasPrice: '20',
          })

          expectHexString(result)
        })

        // TODO we dont have kms support here?
        // it('valid with signatureId', async () => {
        //   const nonce = 3252345722143
        //
        //   const result = await sdk.transaction.prepare.storeDataTransaction({
        //     data: 'Hello world.',
        //     signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
        //     nonce,
        //     to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
        //     gasLimit: '53632',
        //     gasPrice: '20',
        //   })
        //
        //   const json = JSON.parse(result)
        //
        //   expect(json.nonce).toBe(nonce)
        //   expect(json.gasPrice).toBe('20000000000')
        //   expectHexString(json.data)
        // })
      })
    })
  })

  // @TODO Deploy contract
  describe('erc20', () => {
    describe('decimals', () => {
      erc20TestFactory.decimals(sdk.erc20, TEST_DATA.POLYGON)
    })

    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc20TestFactory.prepare.deploySignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      describe('transferSignedTransaction', () => {
        erc20TestFactory.prepare.transferSignedTransaction(polygonTx.erc20, inmemoryBlockchain.accounts)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('mintSignedTransaction', () => {
        erc20TestFactory.prepare.mintSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
      })

      // TODO: Returned error: evm: execution reverted
      xdescribe('burnSignedTransaction', () => {
        erc20TestFactory.prepare.burnSignedTransaction(polygonTx.erc20, TEST_DATA.POLYGON)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('deploySignedTransaction', () => {
        erc721TestFactory.prepare.deploySignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('transferSignedTransaction', () => {
        erc721TestFactory.prepare.transferSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintSignedTransaction', () => {
        erc721TestFactory.prepare.mintSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('burnSignedTransaction', () => {
        erc721TestFactory.prepare.burnSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintCashbackSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintMultipleCashbackSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleCashbackSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintMultipleSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('updateCashbackForAuthorSignedTransaction', () => {
        erc721TestFactory.prepare.updateCashbackForAuthorSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintProvenanceSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })

      describe('mintMultipleProvenanceSignedTransaction', () => {
        erc721TestFactory.prepare.mintMultipleProvenanceSignedTransaction(sdk.nft, TEST_DATA.POLYGON)
      })
    })
  })

  describe('marketplace', () => {
    describe('prepare', () => {
      describe('generateMarketplace', () => {
        marketplaceTestFactory.prepare.generateMarketplace(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('approveSpending', () => {
        marketplaceTestFactory.prepare.approveSpending(sdk.marketplace, inmemoryBlockchain.accounts, 'MATIC')
      })

      describe('createMarketplaceListing', () => {
        marketplaceTestFactory.prepare.sellMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('buyMarketplaceListing', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      // @TODO: returns "Returned values aren't valid..."
      xdescribe('buyMarketplaceListingErc20', () => {
        marketplaceTestFactory.prepare.buyMarketplaceListingErc20(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })

      describe('cancelMarketplaceListing', () => {
        marketplaceTestFactory.prepare.cancelMarketplaceListing(
          sdk.marketplace,
          TEST_DATA.POLYGON,
          'MATIC',
          inmemoryBlockchain.accounts,
        )
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      describe('deployMultiToken', () => {
        multiTokenTestFactory.prepare.deployMultiTokenTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('mintMultiToken', () => {
        multiTokenTestFactory.prepare.mintMultiTokenTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('mintMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.mintMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('transferMultiToken', () => {
        multiTokenTestFactory.prepare.transferMultiTokenTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('transferMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.transferMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('burnMultiToken', () => {
        multiTokenTestFactory.prepare.burnMultiTokenTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })

      describe('burnMultiTokenBatch', () => {
        multiTokenTestFactory.prepare.burnMultiTokenBatchTransaction(sdk.multiToken, TEST_DATA.POLYGON)
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.POLYGON,
        )
      })
    })

    describe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.POLYGON,
        )
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      xdescribe('transfer from custodial wallet', () => {
        custodialTestFactory.prepare.transferFromCustodialWallet(sdk.custodial, TEST_DATA.POLYGON, 'MATIC')
      })

      xdescribe('batch transfer from custodial wallet', () => {
        custodialTestFactory.prepare.batchTransferFromCustodialWallet(
          sdk.custodial,
          TEST_DATA.POLYGON,
          'MATIC',
        )
      })

      xdescribe('approve from custodial wallet', () => {
        custodialTestFactory.prepare.approveFromCustodialWallet(sdk.custodial, TEST_DATA.POLYGON, 'MATIC')
      })

      xdescribe('generate batch custodial wallet', () => {
        custodialTestFactory.prepare.custodialWalletBatch(sdk.custodial, TEST_DATA.POLYGON, 'MATIC')
      })
    })
  })
})
