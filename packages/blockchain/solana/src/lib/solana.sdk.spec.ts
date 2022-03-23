import { TatumSolanaSDK } from './solana.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { TerraWallet } from '@tatumio/api-client'

describe('TatumSolanaSDK', () => {
  jest.setTimeout(99999)
  const sdk = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Transactions', () => {
    const provider = TEST_DATA.SOLANA.PROVIDER
    const address = TEST_DATA.SOLANA.ADDRESS
    const privateKey = TEST_DATA.SOLANA.PRIVATE_KEY
    const to = TEST_DATA.SOLANA.TO_ADDRESS
    const contractAddress = TEST_DATA.SOLANA.CONTRACT_ADDRESS
    const signatureId = TEST_DATA.SOLANA.SIGNATURE_ID

    describe('mint', () => {
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.mintNft(
          {
            to,
            fromPrivateKey: privateKey,
            chain: 'SOL',
            from: address,
            metadata: {
              name: 'TOKEN',
              symbol: 'TTM',
              sellerFeeBasisPoints: 0,
              uri: 'https://tatum.io/images/logo/logo.svg',
            },
          },
          provider,
        )

        expect(result.txId).toBeDefined()
        expect(result.nftAddress).toBeDefined()
        expect(result.nftAccountAddress).toBeDefined()
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.mintNft(
          {
            to,
            signatureId,
            chain: 'SOL',
            from: address,
            metadata: {
              name: 'TOKEN',
              symbol: 'TTM',
              sellerFeeBasisPoints: 0,
              uri: 'https://tatum.io/images/logo/logo.svg',
            },
          },
          provider,
        )

        expect(result.txData).toBeDefined()
        expect(result.mintPK).toBeDefined()
      })
    })

    describe('transfer nft', () => {
      xit('should be valid from privateKey', async () => {
        const result = await sdk.transaction.transferNft(
          {
            to,
            fromPrivateKey: privateKey,
            from: address,
            contractAddress: contractAddress,
            chain: 'SOL',
          },
          provider,
        )

        expect(result.txId).toBeDefined()
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.transferNft(
          {
            to,
            signatureId,
            from: address,
            chain: 'SOL',
            contractAddress: contractAddress,
          },
          provider,
        )

        expect(result.txData).toBeDefined()
      })
    })

    describe('KMS', () => {
      it('should sign transaction', async () => {
        const txData = await sdk.transaction.send(
          {
            from: address,
            signatureId: signatureId,
            to,
            amount: '0.001',
          },
          'https://api.testnet.solana.com',
        )
        const result = await sdk.kms.sign(
          { hashes: [], id: '', serializedTransaction: JSON.stringify(txData) },
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          'https://api.testnet.solana.com',
        )

        expect(result).toBeDefined()
      })
    })

    describe('send solana', () => {
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.send(
          {
            to,
            fromPrivateKey: privateKey,
            from: address,
            amount: '0.01',
          },
          provider,
        )

        expect(result).toBeDefined()
      })

      it('should be valid from signatureId', async () => {
        const result = await sdk.transaction.send(
          {
            to,
            signatureId,
            from: address,
            amount: '0.01',
          },
          provider,
        )

        expect(result).toBeDefined()
      })
    })
  })

  describe('wallet', () => {
    it('should generate SOL wallet', async () => {
      const wallet = (await sdk.wallet.wallet()) as TerraWallet
      expect(wallet.privateKey).toBeDefined()
      expect(wallet.address).toBeDefined()
    })
  })
})
