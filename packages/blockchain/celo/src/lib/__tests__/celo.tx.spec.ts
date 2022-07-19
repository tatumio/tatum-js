import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, expectHexString } from '@tatumio/shared-testing-common'
import { TatumCeloSDK } from '../celo.sdk'
import { smartContractTestFactory } from '@tatumio/shared-testing-evm-based'

describe('CeloSDK - tx', () => {
  const sdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('native', () => {
    describe('prepare', () => {
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_20?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      describe('transferSignedTransaction', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.prepare.transferSignedTransaction(
            {
              to: address,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20?.PRIVATE_KEY,
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.prepare.transferSignedTransaction(
            {
              to: address,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('should throw', async () => {
          try {
            await sdk.transaction.prepare.transferSignedTransaction(
              {
                to: '',
                signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
                feeCurrency: 'CUSD',
                amount: '',
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.message).toMatch(
              'The target (to) address, currency, feeCurrency or the amount cannot be empty',
            )
          }
        })
      })

      describe('storeDataTransaction', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.transaction.prepare.storeDataTransaction(
            {
              to: address,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20?.PRIVATE_KEY,
              feeCurrency: 'CUSD',
              data: 'some data',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.transaction.prepare.storeDataTransaction(
            {
              to: address,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency: 'CUSD',
              data: 'some data',
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

  describe('erc20', () => {
    const provider = TEST_DATA.CELO?.PROVIDER

    describe('prepare', () => {
      describe('deploy', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.erc20.prepare.deploySignedTransaction(
            {
              name: 'My ERC20',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
              feeCurrency: 'CUSD',
              symbol: 'ERC_SYMBOL',
              supply: '100',
              digits: 10,
              address: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.erc20.prepare.deploySignedTransaction(
            {
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              name: 'My ERC20',
              feeCurrency: 'CUSD',
              symbol: 'ERC_SYMBOL',
              supply: '100',
              digits: 10,
              address: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      describe('burn', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.erc20.prepare.burnSignedTransaction(
            {
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
              feeCurrency: 'CUSD',
              amount: '5',
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.erc20.prepare.burnSignedTransaction(
            {
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency: 'CUSD',
              amount: '5',
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })
    })

    describe('mint', () => {
      it('should be valid from privateKey', async () => {
        const result = await sdk.erc20.prepare.mintSignedTransaction(
          {
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
            feeCurrency: 'CUSD',
            amount: '100000',
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.erc20.prepare.mintSignedTransaction(
          {
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            feeCurrency: 'CUSD',
            amount: '5',
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            to: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
          },
          provider,
          true,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    })

    describe('transfer', () => {
      it('should be valid from privateKey', async () => {
        const result = await sdk.erc20.prepare.transferSignedTransaction(
          {
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
            feeCurrency: 'CUSD',
            amount: '5',
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            to: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.erc20.prepare.transferSignedTransaction(
          {
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            feeCurrency: 'CUSD',
            amount: '5',
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            to: TEST_DATA.CELO.TESTNET.ERC_20!.ADDRESS,
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
      describe('deploy', () => {
        const provider = TEST_DATA.CELO?.PROVIDER

        it('should be valid from privateKey', async () => {
          const result = await sdk.nft.prepare.deploySignedTransaction(
            {
              name: 'My ERC721',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
              feeCurrency: 'CUSD',
              symbol: 'ERC_SYMBOL',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.nft.prepare.deploySignedTransaction(
            {
              name: 'My ERC721',
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency: 'CUSD',
              symbol: 'ERC_SYMBOL',
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      describe('mint', () => {
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

        it('should be valid from privateKey', async () => {
          const result = await sdk.nft.prepare.mintSignedTransaction(
            {
              to: address,
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
          const result = await sdk.nft.prepare.mintSignedTransaction(
            {
              to: address,
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
            await sdk.nft.prepare.mintSignedTransaction(
              {
                to: 'someinvalidaddress',
                tokenId: new Date().getTime().toString(),
                url: 'https://my_token_data.com',
                contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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

        it('missing address', async () => {
          try {
            await sdk.nft.prepare.mintSignedTransaction(
              {
                to: address,
                tokenId: new Date().getTime().toString(),
                url: 'https://my_token_data.com',
                contractAddress: '',
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
                chain: 'CELO',
                feeCurrency: 'CUSD',
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.message).toMatch('Contract address and fee currency should not be empty')
          }
        })
      })

      describe('mint multiple', () => {
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.nft.prepare.mintMultipleSignedTransaction(
            {
              to: [address, address],
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
          const result = await sdk.nft.prepare.mintMultipleSignedTransaction(
            {
              to: [address, address],
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
            await sdk.nft.prepare.mintMultipleSignedTransaction(
              {
                to: ['someinvalidaddress', 'onemoreinvalid'],
                tokenId: [new Date().getTime().toString()],
                url: ['https://my_token_data.com', 'https://my_token_data2.com'],
                contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
        const provider = TEST_DATA.CELO?.PROVIDER
        const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
          : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        it('should be valid from privateKey', async () => {
          const result = await sdk.nft.prepare.mintCashbackSignedTransaction(
            {
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
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.nft.prepare.mintCashbackSignedTransaction(
            {
              to: address,
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
            await sdk.nft.prepare.mintCashbackSignedTransaction(
              {
                to: 'invalidaddress',
                contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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

        it('missing address', async () => {
          try {
            await sdk.nft.prepare.mintCashbackSignedTransaction(
              {
                to: address,
                contractAddress: '',
                fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
            expect(e.message).toMatch('Contract address and fee currency should not be empty!')
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
        const result = await sdk.nft.prepare.mintMultipleCashbackSignedTransaction(
          {
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
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.mintMultipleCashbackSignedTransaction(
          {
            to: [address, address],
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
          await sdk.nft.prepare.mintMultipleCashbackSignedTransaction(
            {
              to: ['someinvalidaddress', 'onemoreinvalid'],
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
        const result = await sdk.nft.prepare.mintProvenanceSignedTransaction(
          {
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
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.mintProvenanceSignedTransaction(
          {
            to: address,
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
          await sdk.nft.prepare.mintProvenanceSignedTransaction(
            {
              to: 'invalidaddress',
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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

      it('missing address', async () => {
        try {
          await sdk.nft.prepare.mintProvenanceSignedTransaction(
            {
              to: address,
              contractAddress: '',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
          expect(e.message).toMatch('Contract address and fee currency should not be empty!')
        }
      })
    })

    describe('mint multiple provenance', () => {
      const provider = TEST_DATA.CELO?.PROVIDER
      const address = TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        ? TEST_DATA.CELO.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      it('should be valid from privateKey', async () => {
        const result = await sdk.nft.prepare.mintMultipleProvenanceSignedTransaction(
          {
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
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.mintMultipleProvenanceSignedTransaction(
          {
            to: [address, address],
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
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
          await sdk.nft.prepare.mintMultipleProvenanceSignedTransaction(
            {
              to: ['someinvalidaddress', 'onemoreinvalid'],
              tokenId: [new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data2.com'],
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
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
        const result = await sdk.nft.prepare.transferSignedTransaction(
          {
            to: address,
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.transferSignedTransaction(
          {
            to: address,
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
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
          await sdk.nft.prepare.transferSignedTransaction(
            {
              to: 'invalidaddress',
              contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
              tokenId: new Date().getTime().toString(),
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
        const result = await sdk.nft.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            feeCurrency: 'CUSD',
            cashbackValue: '0.8',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
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
        const result = await sdk.nft.prepare.burnSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            feeCurrency: 'CUSD',
          },
          provider,
          true,
        )
        expectHexString(result)
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.nft.prepare.burnSignedTransaction(
          {
            contractAddress: TEST_DATA.CELO.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
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

      describe('deploy', () => {
        // UNPREDICTABLE_GAS_LIMIT error
        /*it('should be valid from privateKey', async () => {
          const result = await sdk.multiToken.prepare.deployMultiTokenTransaction(
            {
              chain: 'CELO',
              uri: 'example.com',
              fromPrivateKey: privateKey,
              feeCurrency: 'CUSD',
              publicMint: true,
            },
            provider,
            true,
          )
          expectHexString(result)
        })*/

        it('should be valid from signatureId', async () => {
          const result = await sdk.multiToken.prepare.deployMultiTokenTransaction(
            {
              uri: 'example.com',
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              feeCurrency: 'CUSD',
              publicMint: true,
            },
            provider,
            true,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      describe('mint', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.multiToken.prepare.mintMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.multiToken.prepare.mintMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
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
            await sdk.multiToken.prepare.mintMultiTokenTransaction(
              {
                to: 'someinvalidaddress',
                tokenId: new Date().getTime().toString(),
                contractAddress,
                fromPrivateKey: privateKey,
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

        it('missing address', async () => {
          try {
            await sdk.multiToken.prepare.mintMultiTokenTransaction(
              {
                to: account,
                tokenId: new Date().getTime().toString(),
                contractAddress: '', // false
                fromPrivateKey: privateKey,
                feeCurrency: 'CUSD',
                amount: '1',
              },
              provider,
              true,
            )
            fail()
          } catch (e: any) {
            expect(e.message).toMatch('Contract address and fee currency should not be empty')
          }
        })
      })

      describe('mint batch', () => {
        it('should be valid from privateKey', async () => {
          const result = await sdk.multiToken.prepare.mintMultiTokenBatchTransaction(
            {
              to: [account, account],
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [[new Date().getTime().toString()]],
              feeCurrency: 'CUSD',
              amounts: [['1'], ['1']],
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.multiToken.prepare.mintMultiTokenBatchTransaction(
            {
              to: [account],
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
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
            await sdk.multiToken.prepare.mintMultiTokenBatchTransaction(
              {
                to: ['someinvalidaddress', 'onemoreinvalid'],
                tokenId: [[new Date().getTime().toString()]],
                contractAddress,
                fromPrivateKey: privateKey,
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
          const result = await sdk.multiToken.prepare.transferMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
              feeCurrency: 'CUSD',
              amount: '1',
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.multiToken.prepare.transferMultiTokenTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
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
            await sdk.multiToken.prepare.transferMultiTokenTransaction(
              {
                to: 'invalidaddress',
                contractAddress,
                fromPrivateKey: privateKey,
                tokenId: new Date().getTime().toString(),
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
          const result = await sdk.multiToken.prepare.transferMultiTokenBatchTransaction(
            {
              to: account,
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [new Date().getTime().toString()],
              feeCurrency: 'CUSD',
              amounts: ['1'],
            },
            provider,
            true,
          )
          expectHexString(result)
        })

        it('should be valid from signatureId', async () => {
          const result = await sdk.multiToken.prepare.transferMultiTokenBatchTransaction(
            {
              to: account,
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: [new Date().getTime().toString()],
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
            await sdk.multiToken.prepare.transferMultiTokenBatchTransaction(
              {
                to: 'invalidaddress',
                contractAddress,
                fromPrivateKey: privateKey,
                tokenId: [new Date().getTime().toString()],
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
          const result = await sdk.multiToken.prepare.burnMultiTokenTransaction(
            {
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: new Date().getTime().toString(),
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
          const result = await sdk.multiToken.prepare.burnMultiTokenTransaction(
            {
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: new Date().getTime().toString(),
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
          const result = await sdk.multiToken.prepare.burnMultiTokenBatchTransaction(
            {
              contractAddress,
              fromPrivateKey: privateKey,
              tokenId: [new Date().getTime().toString()],
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
          const result = await sdk.multiToken.prepare.burnMultiTokenBatchTransaction(
            {
              contractAddress,
              signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
              tokenId: [new Date().getTime().toString()],
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
      xdescribe('Transfer from custodial wallet', () => {
        it('valid with signatureId', async () => {
          try {
            const result = await sdk.custodial.prepare.transferFromCustodialWallet(
              {
                chain: 'CELO',
                signatureId: TEST_DATA.CELO.TESTNET.CUSTODIAL.SIGNATURE_ID,
                custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.CONTRACT_ADDRESS,
                recipient: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
                amount: '1',
                contractType: 0,
                feeCurrency: 'CELO',
              },
              true,
              TEST_DATA.CELO?.PROVIDER,
            )
            const json = JSON.parse(result)
            expectHexString(json.data)
          } catch (e) {
            console.log(e)
            expect(e).not.toBeDefined()
          }
        })

        it('valid with privateKey', async () => {
          const result = await sdk.custodial.prepare.transferFromCustodialWallet(
            {
              chain: 'CELO',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
              custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.CONTRACT_ADDRESS,
              recipient: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
              amount: '1',
              contractType: 0,
              feeCurrency: 'CELO',
            },
            true,
            TEST_DATA.CELO?.PROVIDER,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      xdescribe('Batch transfer from custodial wallet', () => {
        it('valid with signatureId', async () => {
          const result = await sdk.custodial.prepare.batchTransferFromCustodialWallet(
            {
              chain: 'CELO',
              feeCurrency: 'CELO',
              signatureId: TEST_DATA.CELO.TESTNET.CUSTODIAL.SIGNATURE_ID,
              custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.SIGNATURE_ID,
              tokenId: ['0', '1', '0'],
              amount: ['1', '1', '0.00001'],
              contractType: [0, 2, 3],
              tokenAddress: [
                '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
                '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
                '0',
              ],
              recipient: [
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              ],
            },
            true,
            TEST_DATA.CELO?.PROVIDER,
          )

          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('valid from privateKey', async () => {
          const result = await sdk.custodial.prepare.batchTransferFromCustodialWallet(
            {
              chain: 'CELO',
              feeCurrency: 'CELO',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
              custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.CONTRACT_ADDRESS,
              tokenId: ['0', '1', '0'],
              amount: ['1', '1', '0.00001'],
              contractType: [0, 2, 3],
              tokenAddress: [
                '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
                '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
                '0',
              ],
              recipient: [
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              ],
            },
            true,
            TEST_DATA.CELO?.PROVIDER,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      // Returned error: execution reverted
      xdescribe('Approve from custodial wallet', () => {
        it('valid with signatureId', async () => {
          try {
            const result = await sdk.custodial.prepare.approveFromCustodialWallet(
              {
                chain: 'CELO',
                feeCurrency: 'CELO',
                signatureId: TEST_DATA.CELO.TESTNET.CUSTODIAL.SIGNATURE_ID,
                contractType: 0,
                custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.CONTRACT_ADDRESS,
                tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
                spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
                tokenId: '1',
                amount: '1',
              },
              TEST_DATA.CELO?.PROVIDER,
            )
            const json = JSON.parse(result)
            expectHexString(json.data)
          } catch (e) {
            console.log('Approve error: ', e)
            expect(e).not.toBeDefined()
          }
        })

        it('valid from privateKey', async () => {
          const result = await sdk.custodial.prepare.approveFromCustodialWallet(
            {
              chain: 'CELO',
              feeCurrency: 'CELO',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
              contractType: 0,
              custodialAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.CONTRACT_ADDRESS,
              tokenAddress: TEST_DATA.CELO.TESTNET.CUSTODIAL.TOKEN_ADDRESS,
              spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              tokenId: '1',
              amount: '1',
            },
            TEST_DATA.CELO?.PROVIDER,
          )

          const json = JSON.parse(result)
          expectHexString(json.data)
        })
      })

      describe('Custodial wallet batch', () => {
        it('valid with signatureId', async () => {
          const result = await sdk.custodial.prepare.custodialWalletBatch(
            {
              chain: 'CELO',
              feeCurrency: 'CELO',
              signatureId: TEST_DATA.CELO.TESTNET.CUSTODIAL.SIGNATURE_ID,
              owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              batchCount: 1,
            },
            true,
            TEST_DATA.CELO?.PROVIDER,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        })

        it('valid from privateKey', async () => {
          const result = await sdk.custodial.prepare.custodialWalletBatch(
            {
              chain: 'CELO',
              feeCurrency: 'CUSD',
              fromPrivateKey: TEST_DATA.CELO.TESTNET.CUSTODIAL.PRIVATE_KEY,
              owner: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              batchCount: 1,
            },
            true,
            TEST_DATA.CELO?.PROVIDER,
          )

          expectHexString(result)
        })
      })
    })
  })

  describe('smart contract', () => {
    describe('prepare', () => {
      describe('smart contract write method invocation', () => {
        smartContractTestFactory.prepare.smartContractWriteMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.CELO,
        )
      })
    })

    describe('send', () => {
      describe('smart contract read method invocation', () => {
        smartContractTestFactory.send.smartContractReadMethodInvocationTransaction(
          sdk.smartContract,
          TEST_DATA.CELO,
        )
      })
    })
  })
})
