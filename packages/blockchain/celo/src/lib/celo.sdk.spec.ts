import {
  expectHexString,
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
} from '@tatumio/shared-testing'
import { CELO_TEST_DATA } from 'packages/shared/testing/src/lib/test-data/celo.test-data'
import { TatumCeloSDK } from './celo.sdk'

describe('TatumCeloSDK', () => {
  jest.setTimeout(99999)
  const sdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.CELO)
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      describe('mint', () => {
        const provider = CELO_TEST_DATA?.PROVIDER
        const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintSignedTransaction(
            {
              to: address,
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              chain: 'CELO',
              feeCurrency: 'CUSD',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.erc721.prepare.mintSignedTransaction(
            {
              to: address,
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              chain: 'CELO',
              feeCurrency: 'CUSD',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.erc721.prepare.mintSignedTransaction(
              {
                to: 'someinvalidaddress',
                tokenId: new Date().getTime().toString(),
                url: 'https://my_token_data.com',
                contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
                chain: 'CELO',
                feeCurrency: 'CUSD',
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })

      describe('mint multiple', () => {
        const provider = CELO_TEST_DATA?.PROVIDER
        const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintMultipleSignedTransaction(
            {
              to: [address, address],
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              chain: 'CELO',
              feeCurrency: 'CUSD',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.erc721.prepare.mintMultipleSignedTransaction(
            {
              to: [address, address],
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              chain: 'CELO',
              feeCurrency: 'CUSD',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.erc721.prepare.mintMultipleSignedTransaction(
              {
                to: ['someinvalidaddress', 'onemoreinvalid'],
                tokenId: [new Date().getTime().toString()],
                url: ['https://my_token_data.com', 'https://my_token_data2.com'],
                contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
                chain: 'CELO',
                feeCurrency: 'CUSD',
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })

      describe('mint cashback', () => {
        const provider = CELO_TEST_DATA?.PROVIDER
        const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintCashbackSignedTransaction(
            {
              to: address,
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              chain: 'CELO',
              feeCurrency: 'CUSD',
              cashbackValues: ['0.5'],
              authorAddresses: [address],
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.erc721.prepare.mintCashbackSignedTransaction(
            {
              to: address,
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              chain: 'CELO',
              feeCurrency: 'CUSD',
              cashbackValues: ['0.5'],
              authorAddresses: [address],
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.erc721.prepare.mintCashbackSignedTransaction(
              {
                to: 'invalidaddress',
                contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
                tokenId: new Date().getTime().toString(),
                url: 'https://my_token_data.com',
                chain: 'CELO',
                feeCurrency: 'CUSD',
                cashbackValues: ['0.5'],
                authorAddresses: [address],
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })
    })

    describe('mint multiple cashback', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction(
          {
            to: [address, address],
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: [new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data2.com'],
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address]],
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction(
          {
            to: [address, address],
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: [new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data2.com'],
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address]],
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction(
            {
              to: ['someinvalidaddress', 'onemoreinvalid'],
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              chain: 'CELO',
              feeCurrency: 'CUSD',
              cashbackValues: [['0.5'], ['0.5']],
              authorAddresses: [[address]],
            },
            provider,
            true,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    })

    describe('mint provenance', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintProvenanceSignedTransaction(
          {
            to: address,
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: ['0.5'],
            authorAddresses: [address],
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.mintProvenanceSignedTransaction(
          {
            to: address,
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: ['0.5'],
            authorAddresses: [address],
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.transaction.erc721.prepare.mintProvenanceSignedTransaction(
            {
              to: 'invalidaddress',
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              chain: 'CELO',
              feeCurrency: 'CUSD',
              cashbackValues: ['0.5'],
              authorAddresses: [address],
            },
            provider,
            true,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    })

    describe('mint multiple provenance', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction(
          {
            to: [address, address],
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: [new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data2.com'],
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address]],
            fixedValues: [['1'], ['1']],
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction(
          {
            to: [address, address],
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: [new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data2.com'],
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address]],
            fixedValues: [['1'], ['1']],
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction(
            {
              to: ['someinvalidaddress', 'onemoreinvalid'],
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              chain: 'CELO',
              feeCurrency: 'CUSD',
              cashbackValues: [['0.5'], ['0.5']],
              authorAddresses: [[address]],
              fixedValues: [['1'], ['1']],
            },
            provider,
            true,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    })

    describe('transfer', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.transferSignedTransaction(
          {
            to: address,
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.transferSignedTransaction(
          {
            to: address,
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.transaction.erc721.prepare.transferSignedTransaction(
            {
              to: 'invalidaddress',
              contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
            },
            provider,
            true,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    })

    describe('update cashback', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValue: '0.8',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
            cashbackValue: '0.8',
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    })

    describe('burn', () => {
      const provider = CELO_TEST_DATA?.PROVIDER
      const address = CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        ? CELO_TEST_DATA.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.burnSignedTransaction(
          {
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: CELO_TEST_DATA.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.erc721.prepare.burnSignedTransaction(
          {
            contractAddress: CELO_TEST_DATA.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            chain: 'CELO',
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    })
  })
})
