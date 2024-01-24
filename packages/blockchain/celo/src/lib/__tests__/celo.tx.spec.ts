import { expectHexString, REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from '../celo.sdk'
import { erc20TestFactory, smartContractTestFactory } from '@tatumio/shared-testing-evm-based'
import { CeloFeeCurrency } from '../utils/celo.utils'
import { SdkErrorCode, SdkErrorMessage } from '@tatumio/shared-abstract-sdk'
import { EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { celoTestFactory } from './celo.test-factory'

describe.skip('CeloSDK - tx', () => {
  const sdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('native', () => {
    describe('prepare', () => {
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      const amounts = ['1', '0.00189500', '3']
      const celo = celoTestFactory.combineThreeArrays<CeloFeeCurrency, CeloFeeCurrency, string>(
        celoTestFactory.feeCurrencies(),
        ['CELO'],
        amounts,
      )
      const erc20 = celoTestFactory.combineThreeArrays<CeloFeeCurrency, CeloFeeCurrency, string>(
        celoTestFactory.feeCurrencies(),
        ['CUSD', 'CEUR'],
        amounts,
      )

      describe('transferSignedTransaction', () => {
        const all = celoTestFactory.combineArrays<CeloFeeCurrency, string>(
          celoTestFactory.feeCurrencies(),
          amounts,
        )
        it.each(all)('fromPrivateKey - %p %p', async (feeCurrency: CeloFeeCurrency, amount) => {
          const result = await sdk.transaction.prepare.transferSignedTransaction(
            {
              to: address,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20?.PRIVATE_KEY,
              feeCurrency,
              amount,
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it.each(all)('signatureId - %p %p', async (feeCurrency: CeloFeeCurrency, amount) => {
          const result = await sdk.transaction.prepare.transferSignedTransaction(
            {
              to: address,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency,
              amount,
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.value)
          expectHexString(json.to)
          expect(json.chainId).toBeGreaterThan(0)
        })

        celoTestFactory.testAllCurrencies('missing input - %p', async (feeCurrency) => {
          await expect(
            sdk.transaction.prepare.transferSignedTransaction(
              {
                to: '',
                signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
                feeCurrency,
                amount: '',
              },
              provider,
              true,
            ),
          ).rejects.toThrow(
            new EvmBasedSdkError({
              error: new Error(SdkErrorMessage.get(SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS)),
              code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS,
            }),
          )
        })
      })

      describe('celoOrCUsdSignedTransaction', () => {
        const all = celoTestFactory.combineThreeArrays<CeloFeeCurrency, CeloFeeCurrency, string>(
          celoTestFactory.feeCurrencies(),
          celoTestFactory.feeCurrencies(),
          amounts,
        )
        it.each(all)(
          'fromPrivateKey - %p %p %p',
          async (feeCurrency: CeloFeeCurrency, currency: CeloFeeCurrency, amount) => {
            const result = await sdk.transaction.prepare.celoOrCUsdSignedTransaction(
              {
                currency,
                to: address,
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20?.PRIVATE_KEY,
                feeCurrency,
                amount,
              },
              provider,
              true,
            )
            expectHexString(result)
          },
        )

        it.each(celo)(
          'singatureId - %p %p %p',
          async (feeCurrency: CeloFeeCurrency, currency: CeloFeeCurrency, amount) => {
            const result = await sdk.transaction.prepare.celoOrCUsdSignedTransaction(
              {
                currency,
                to: address,
                signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
                feeCurrency,
                amount,
              },
              provider,
              true,
            )
            const json = JSON.parse(result)
            expectHexString(json.value)
            expectHexString(json.to)
            expect(json.chainId).toBeGreaterThan(0)
          },
        )

        it.each(erc20)(
          'singatureId - %p %p %p',
          async (feeCurrency: CeloFeeCurrency, currency: CeloFeeCurrency, amount) => {
            const result = await sdk.transaction.prepare.celoOrCUsdSignedTransaction(
              {
                currency,
                to: address,
                signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
                feeCurrency,
                amount,
              },
              provider,
              true,
            )
            const json = JSON.parse(result)
            expectHexString(json.data)
            expectHexString(json.to)
            expect(json.chainId).toBeGreaterThan(0)
          },
        )
      })

      describe('storeDataTransaction', () => {
        celoTestFactory.testSign({
          apiFn: sdk.transaction.prepare.storeDataTransaction,
          apiArg: {
            to: address,
            data: 'some data',
          },
        })
      })
    })
  })

  describe('erc20', () => {
    describe('decimals', () => {
      it('valid', async () => {
        const result = await sdk.erc20.decimals(
          TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
          TEST_DATA.CELO.TESTNET.PROVIDER,
        )
        expect(result).toBeDefined()
      })
    })

    describe('prepare', () => {
      describe('deploy', () => {
        celoTestFactory.testSign({
          apiFn: sdk.erc20.prepare.deploySignedTransaction,
          apiArg: {
            name: 'My ERC20',
            symbol: 'ERC_SYMBOL',
            supply: '100',
            digits: 10,
            address: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
          },
        })
      })

      describe('burn', () => {
        celoTestFactory.testSign({
          apiFn: sdk.erc20.prepare.burnSignedTransaction,
          apiArg: {
            amount: '5',
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
          },
        })
      })
    })

    describe('mint', () => {
      celoTestFactory.testSign({
        apiFn: sdk.erc20.prepare.mintSignedTransaction,
        apiArg: {
          amount: '1',
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
          to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        },
      })
    })

    describe('transfer', () => {
      celoTestFactory.testSign({
        apiFn: sdk.erc20.prepare.transferSignedTransaction,
        apiArg: {
          amount: '5',
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
          to: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
        },
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      jest.setTimeout(99999)
      describe('deploy', () => {
        celoTestFactory.testSign({
          apiFn: sdk.nft.prepare.deploySignedTransaction,
          apiArg: {
            name: 'My ERC721',
            symbol: 'ERC_SYMBOL',
          },
        })
      })

      describe('mint', () => {
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

        celoTestFactory.testMethod({
          apiFn: sdk.nft.prepare.mintSignedTransaction,
          apiArg: {
            to: address,
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain: 'CELO',
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_TX,
        })
      })

      describe('mint multiple', () => {
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

        celoTestFactory.testMethod({
          apiFn: sdk.nft.prepare.mintMultipleSignedTransaction,
          apiArg: {
            to: [address, address],
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            tokenId: [new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data2.com'],
            chain: 'CELO',
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_TX,
        })
      })

      describe('mint cashback', () => {
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        celoTestFactory.testMethod({
          apiFn: sdk.nft.prepare.mintCashbackSignedTransaction,
          apiArg: {
            to: address,
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain: 'CELO',
            cashbackValues: ['0.5'],
            authorAddresses: [address],
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_CASHBACK_TX,
        })
      })
    })

    describe('mint multiple cashback', () => {
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      celoTestFactory.testMethod({
        apiFn: sdk.nft.prepare.mintMultipleCashbackSignedTransaction,
        apiArg: {
          to: [address, address],
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
          tokenId: [new Date().getTime().toString()],
          url: ['https://my_token_data.com', 'https://my_token_data2.com'],
          chain: 'CELO',
          feeCurrency: 'CUSD',
          cashbackValues: [['0.5'], ['0.5']],
          authorAddresses: [[address]],
        },
        sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_CASHBACK_TX,
      })
    })

    describe('mint provenance', () => {
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      celoTestFactory.testMethod({
        apiFn: sdk.nft.prepare.mintProvenanceSignedTransaction,
        apiArg: {
          to: address,
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
          tokenId: new Date().getTime().toString(),
          url: 'https://my_token_data.com',
          chain: 'CELO',
          feeCurrency: 'CUSD',
          cashbackValues: ['0.5'],
          authorAddresses: [address],
        },
        sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_PROVENANCE_TX,
      })
    })

    describe('mint multiple provenance', () => {
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      celoTestFactory.testMethod({
        apiFn: sdk.nft.prepare.mintMultipleProvenanceSignedTransaction,
        apiArg: {
          to: [address, address],
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
          tokenId: [new Date().getTime().toString()],
          url: ['https://my_token_data.com', 'https://my_token_data2.com'],
          chain: 'CELO',
          feeCurrency: 'CUSD',
          cashbackValues: [['0.5'], ['0.5']],
          authorAddresses: [[address]],
          fixedValues: [['1'], ['1']],
        },
        sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_PROVENANCE_TX,
      })
    })

    describe('transfer', () => {
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      celoTestFactory.testMethod({
        apiFn: sdk.nft.prepare.transferSignedTransaction,
        apiArg: {
          to: address,
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
          tokenId: new Date().getTime().toString(),
        },
        sdkErrorCode: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_TRANSFER_TX,
      })
    })

    describe('update cashback', () => {
      celoTestFactory.testSign({
        apiFn: sdk.nft.prepare.updateCashbackForAuthorSignedTransaction,
        apiArg: {
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
          tokenId: new Date().getTime().toString(),
          cashbackValue: '0.8',
        },
      })

      celoTestFactory.testAllCurrencies('empty smart contract address - %p', async (feeCurrency) => {
        await expect(
          sdk.nft.prepare.updateCashbackForAuthorSignedTransaction(
            {
              contractAddress: '',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
              cashbackValue: '0.8',
              feeCurrency,
            },
            TEST_DATA.CELO?.PROVIDER,
            true,
          ),
        ).rejects.toThrow(SdkErrorMessage.get(SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS))
      })
    })

    describe('burn', () => {
      celoTestFactory.testSign({
        apiFn: sdk.nft.prepare.burnSignedTransaction,
        apiArg: {
          contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
          tokenId: new Date().getTime().toString(),
        },
      })
    })
  })

  describe('multiToken', () => {
    describe('prepare', () => {
      const contractAddress = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const account = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.ADDRESS

      describe('deploy', () => {
        celoTestFactory.testSign({
          apiFn: sdk.multiToken.prepare.deployMultiTokenTransaction,
          apiArg: {
            uri: 'example.com',
            publicMint: true,
          },
        })
      })

      describe('mint', () => {
        celoTestFactory.testMethod({
          apiFn: sdk.multiToken.prepare.mintMultiTokenTransaction,
          apiArg: {
            to: account,
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: new Date().getTime().toString(),
            amount: '1',
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_MINT_TX,
        })
      })

      describe('mint batch', () => {
        celoTestFactory.testMethod({
          apiFn: sdk.multiToken.prepare.mintMultiTokenBatchTransaction,
          apiArg: {
            to: [account, account],
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: [[new Date().getTime().toString()]],
            amounts: [['1'], ['1']],
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_MINT_BATCH_TX,
        })
      })

      describe('transfer', () => {
        celoTestFactory.testMethod({
          apiFn: sdk.multiToken.prepare.transferMultiTokenTransaction,
          apiArg: {
            to: account,
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: new Date().getTime().toString(),
            amount: '1',
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_TRANSFER_TX,
        })
      })

      describe('transfer batch', () => {
        celoTestFactory.testMethod({
          apiFn: sdk.multiToken.prepare.transferMultiTokenBatchTransaction,
          apiArg: {
            to: account,
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: [new Date().getTime().toString()],
            amounts: ['1'],
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_TRANSFER_BATCH_TX,
        })
      })

      describe('burn', () => {
        celoTestFactory.testSign({
          apiFn: sdk.multiToken.prepare.burnMultiTokenTransaction,
          apiArg: {
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: new Date().getTime().toString(),
            amount: '1',
            account,
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_BURN_TX,
        })
      })

      describe('burn batch', () => {
        celoTestFactory.testSign({
          apiFn: sdk.multiToken.prepare.burnMultiTokenBatchTransaction,
          apiArg: {
            contractAddress,
            fromPrivateKey: privateKey,
            tokenId: [new Date().getTime().toString()],
            amounts: ['1'],
            account,
          },
          sdkErrorCode: SdkErrorCode.EVM_ERC1155_CANNOT_PREPARE_BURN_BATCH_TX,
        })
      })
    })
  })

  describe('custodial', () => {
    describe('prepare', () => {
      describe('Transfer from custodial wallet', () => {
        celoTestFactory.testSign({
          apiFn: sdk.custodial.prepare.transferFromCustodialWallet,
          apiArg: {
            chain: 'CELO',
            fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
            custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.SLAVE_ADDRESS,
            recipient: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
            amount: '1',
            contractType: 0,
          },
        })
      })

      // TODO: combination of erc20, erc721 and native
      describe('Batch transfer from custodial wallet - erc20', () => {
        celoTestFactory.testSign({
          apiFn: sdk.custodial.prepare.batchTransferFromCustodialWallet,
          apiArg: {
            chain: 'CELO',
            custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.SLAVE_ADDRESS,
            amount: ['0.5', '0.5'],
            contractType: [0, 0],
            tokenAddress: [
              TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
              TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
            ],
            recipient: [
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            ],
          },
        })
      })

      describe('Approve from custodial wallet', () => {
        celoTestFactory.testSign({
          apiFn: sdk.custodial.prepare.approveFromCustodialWallet,
          apiArg: {
            chain: 'CELO',
            contractType: 0,
            custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.SLAVE_ADDRESS,
            tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
            spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            amount: '1',
          },
        })
      })

      describe('Custodial wallet batch', () => {
        celoTestFactory.testSign({
          apiFn: sdk.custodial.prepare.custodialWalletBatch,
          apiArg: {
            chain: 'CELO',
            owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            batchCount: 1,
          },
        })
      })
    })
  })

  describe('Gas Pump', () => {
    describe('prepare', () => {
      describe('create custodial wallet', () => {
        celoTestFactory.testSign({
          apiFn: (body: any, provider?: string, testnet?: boolean) =>
            sdk.gasPump.prepare.gasPumpWalletBatch(testnet, body, provider),
          apiArg: {
            chain: 'CELO',
            from: 0,
            to: 2,
            feeCurrency: 'CELO',
            owner: TEST_DATA.CELO.TESTNET.CUSTODIAL.MASTER_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
          },
        })
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        const contractAddress = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
        celoTestFactory.testSign({
          apiFn: sdk.smartContract.prepare.smartContractWriteMethodInvocationTransaction,
          apiArg: {
            contractAddress,
            methodName: 'transferFrom',
            methodABI: {
              constant: false,
              inputs: [
                {
                  name: 'from',
                  type: 'address',
                },
                {
                  name: 'to',
                  type: 'address',
                },
                {
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
              outputs: [
                {
                  name: '',
                  type: 'bool',
                },
              ],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            params: [
              '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
              '0x8c76887d2e738371bd750362fb55887343472346',
              '1',
            ],
            fee: { gasLimit: '100000', gasPrice: '3' },
          },
        })
      })
    })

    xdescribe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.CELO,
        )
      })
    })
  })
})
