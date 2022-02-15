import { SdkWithMarketplaceFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'
import { GanacheAccount } from './ganacheHelper'

export const marketplaceTestFactory = {
  prepare: {
    generateMarketplace: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      jest.setTimeout(99999)
      const nonce = 3252345722143
      const provider = testData?.PROVIDER

      it('valid with signatureId', async () => {
        const result = await sdk.prepare.generateMarketplace(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            feeRecipient: accounts[0].address,
            marketplaceFee: 150,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            nonce,
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.generateMarketplace(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            feeRecipient: accounts[0].address,
            marketplaceFee: 150,
            fromPrivateKey: accounts[0].privateKey,
          },
          provider,
        )

        expectHexString(result)
      })
    },

    createMarketplaceListing: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      const provider = testData?.PROVIDER

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.createMarketplaceListing({
          chain,
          fee: {
            gasLimit: '1000000',
            gasPrice: '20',
          },
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
          nftAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
          tokenId: '33333',
          listingId: '1',
          isErc721: true,
          price: '1',
          seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
        })

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.createMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            nftAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
            tokenId: '33333',
            listingId: '1',
            isErc721: true,
            price: '1',
            seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
          },
          provider,
        )

        expectHexString(result)
      })
    },

    createMarketplaceListingErc20: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      const provider = testData?.PROVIDER

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.createMarketplaceListing({
          chain,
          fee: {
            gasLimit: '1000000',
            gasPrice: '20',
          },
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
          nftAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
          tokenId: '33333',
          listingId: '1',
          isErc721: true,
          price: '1',
          seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
          erc20Address: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
          amount: '1',
        })

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.createMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            nftAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
            tokenId: '33333',
            listingId: '2',
            isErc721: true,
            price: '1',
            seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
            erc20Address: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            amount: '1',
          },
          provider,
        )

        expectHexString(result)
      })
    },

    buyMarketplaceListing: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      const provider = testData?.PROVIDER

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.buyMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            listingId: '1',
            amount: '1.015',
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.buyMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            listingId: '1',
            amount: '1.015',
          },
          provider,
        )

        expectHexString(result)
      })
    },

    // @TODO Fails with "Returned values aren't valid..." (probably false address keys)
    buyMarketplaceListingErc20: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      jest.setTimeout(99999)
      const nonce = 3252345722143
      const provider = testData?.PROVIDER

      it('approved for erc20 spending', async () => {
        const approve = await sdk.prepare.approveErc20Spending(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
            spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            amount: '0.0002',
            nonce,
          },
          provider,
        )

        const json = JSON.parse(approve)
        expectHexString(json.data)
      })

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.buyMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            contractAddress: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            erc20Address: 'xxx',
            listingId: '2',
            amount: '1.015',
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.buyMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            erc20Address: 'xxx',
            listingId: '2',
            amount: '1.015',
          },
          provider,
        )

        expectHexString(result)
      })
    },

    cancelMarketplaceListing: (
      sdk: SdkWithMarketplaceFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'ONE' | 'BSC' | 'KLAY',
      accounts: GanacheAccount[],
    ) => {
      const provider = testData?.PROVIDER

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.cancelMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            listingId: '1',
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.cancelMarketplaceListing(
          {
            chain,
            fee: {
              gasLimit: '1000000',
              gasPrice: '20',
            },
            fromPrivateKey: accounts[0].privateKey,
            contractAddress: '0xd093bEd4BC06403bfEABB54667B42C48533D3Fd9',
            listingId: '1',
          },
          provider,
        )

        expectHexString(result)
      })
    },
  },
}
