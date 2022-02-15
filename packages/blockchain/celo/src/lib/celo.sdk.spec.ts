import {
  REPLACE_ME_WITH_TATUM_API_KEY,
  TEST_DATA,
  walletTestFactory,
  expectHexString,
} from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from './celo.sdk'

describe('TatumCeloSDK', () => {
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

  describe('native', () => {
    describe('prepare', () => {
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.native.prepare.transferSignedTransaction(
          {
            to: address,
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20?.PRIVATE_KEY,
            feeCurrency: 'CUSD',
            currency: 'CUSD',
            amount: '1',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.native.prepare.transferSignedTransaction(
          {
            to: address,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            feeCurrency: 'CUSD',
            currency: 'CUSD',
            amount: '1',
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    })
  })

  describe('erc721', () => {
    describe('prepare', () => {
      jest.setTimeout(99999)
      describe('mint', () => {
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintSignedTransaction(
            {
              to: address,
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
                contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
                chain: 'CELO',
                feeCurrency: 'CUSD',
              },
              provider,
              true,
            )
            fail()
          } catch (e) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })

      describe('mint multiple', () => {
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintMultipleSignedTransaction(
            {
              to: [address, address],
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
                contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
                chain: 'CELO',
                feeCurrency: 'CUSD',
              },
              provider,
              true,
            )
            fail()
          } catch (e) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })

      describe('mint cashback', () => {
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.erc721.prepare.mintCashbackSignedTransaction(
            {
              to: address,
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
                contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
          } catch (e) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })
    })

    describe('mint multiple cashback', () => {
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleCashbackSignedTransaction(
          {
            to: [address, address],
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintProvenanceSignedTransaction(
          {
            to: address,
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.mintMultipleProvenanceSignedTransaction(
          {
            to: [address, address],
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.transferSignedTransaction(
          {
            to: address,
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
              contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
      const provider = TEST_DATA.CELO?.PROVIDER
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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
      const provider = TEST_DATA.CELO?.PROVIDER
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.erc721.prepare.burnSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.MAINNET.ERC_721!.PRIVATE_KEY,
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
            contractAddress: TEST_DATA.CELO.MAINNET.ERC_721!.CONTRACT_ADDRESS,
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

  describe('multiToken', () => {
    describe('prepare', () => {
      const contractAddress = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const account = TEST_DATA.CELO.TESTNET?.MULTITOKEN?.ADDRESS
      const provider = TEST_DATA.CELO.TESTNET?.PROVIDER
      describe('mint', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.mintMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.mintMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.multiToken.prepare.mintMultiTokenTransaction(
              {
                to: 'someinvalidaddress',
                tokenId: new Date().getTime().toString(),
                contractAddress,
                fromPrivateKey: privateKey,
                chain: 'CELO',
                feeCurrency: 'CUSD',
                amount: '1',
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

      describe('mint batch', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.mintMultiTokenBatchTransaction(
            {
              to: [account, account],
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [[new Date().getTime().toString()]],
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: [['1'], ['1']],
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.mintMultiTokenBatchTransaction(
            {
              to: [account],
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: [['1'], ['1']],
              tokenId: [[new Date().getTime().toString()]],
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.multiToken.prepare.mintMultiTokenBatchTransaction(
              {
                to: ['someinvalidaddress', 'onemoreinvalid'],
                tokenId: [[new Date().getTime().toString()]],
                contractAddress,
                fromPrivateKey: privateKey,
                chain: 'CELO',
                feeCurrency: 'CUSD',
                amounts: [['1'], ['1']],
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
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.transferMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.transferMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.multiToken.prepare.transferMultiTokenTransaction(
              {
                to: 'invalidaddress',
                contractAddress,
                fromPrivateKey: privateKey,
                tokenId: new Date().getTime().toString(),
                chain: 'CELO',
                feeCurrency: 'CUSD',
                amount: '1',
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

      describe('transfer batch', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.transferMultiTokenBatchTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [new Date().getTime().toString()],
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: ['1'],
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.transferMultiTokenBatchTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: [new Date().getTime().toString()],
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: ['1'],
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('invalid address', async () => {
          try {
            await sdk.transaction.multiToken.prepare.transferMultiTokenBatchTransaction(
              {
                to: 'invalidaddress',
                contractAddress,
                fromPrivateKey: privateKey,
                tokenId: [new Date().getTime().toString()],
                chain: 'CELO',
                feeCurrency: 'CUSD',
                amounts: ['1'],
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

      describe('burn', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.burnMultiTokenTransaction(
            {
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
              account,
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.burnMultiTokenTransaction(
            {
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amount: '1',
              account,
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      describe('burn batch', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.multiToken.prepare.burnMultiTokenBatchTransaction(
            {
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [new Date().getTime().toString()],
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: ['1'],
              account,
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.multiToken.prepare.burnMultiTokenBatchTransaction(
            {
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: [new Date().getTime().toString()],
              chain: 'CELO',
              feeCurrency: 'CUSD',
              amounts: ['1'],
              account,
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

  describe('custodial', () => {
    describe('prepare', () => {
      it('valid with signatureId', async () => {
        const result = await sdk.transaction.custodial.prepare.generateCustodialWalletSignedTransaction(
          {
            chain: 'CELO',
            feeCurrency: 'CUSD',
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            enableFungibleTokens: true,
            enableNonFungibleTokens: true,
            enableSemiFungibleTokens: false,
            enableBatchTransactions: true,
            fee: {
              gasLimit: '326452',
              gasPrice: '20',
            },
          },
          TEST_DATA.CELO?.PROVIDER,
          true,
        )
        expect(result).not.toBeNull()
      })
    })

    it('valid from privateKey', async () => {
      const result = await sdk.transaction.custodial.prepare.generateCustodialWalletSignedTransaction(
        {
          chain: 'CELO',
          feeCurrency: 'CUSD',
          fromPrivateKey: '0xfc1d28660e7a8a874e846044bf8fcb0d825216300f581fa048cf719c0c6e89fc',
          enableFungibleTokens: true,
          enableNonFungibleTokens: true,
          enableSemiFungibleTokens: false,
          enableBatchTransactions: true,
          fee: {
            gasLimit: '326452',
            gasPrice: '20',
          },
        },
        TEST_DATA.CELO?.PROVIDER,
        true,
      )
      expect(result).not.toBeNull()
    })
  })
})
