import { TatumSolanaSDK } from './solana.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { SignatureId, SolanaMintedResult, TransactionHash } from '@tatumio/api-client'

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
      it.skip('should be valid from privateKey', async () => {
        const result = (await sdk.transaction.send.mintNft(
          {
            to,
            fromPrivateKey: privateKey,
            from: address,
            metadata: {
              name: 'TOKEN',
              symbol: 'TTM',
              sellerFeeBasisPoints: 0,
              uri: 'https://tatum.io/images/logo/logo.svg',
            },
          },
          provider,
        )) as SolanaMintedResult

        expect(result.txId).toBeDefined()
        expect(result.nftAddress).toBeDefined()
        expect(result.nftAccountAddress).toBeDefined()
      })

      it('should be valid from signatureId', async () => {
        const result = (await sdk.transaction.send.mintNft(
          {
            to,
            signatureId,
            from: address,
            metadata: {
              name: 'TOKEN',
              symbol: 'TTM',
              sellerFeeBasisPoints: 0,
              uri: 'https://tatum.io/images/logo/logo.svg',
            },
          },
          provider,
        )) as SignatureId

        expect(result.signatureId).toBeDefined()
      })
    })

    describe('transfer nft', () => {
      xit('should be valid from privateKey', async () => {
        const result = (await sdk.transaction.send.transferNft(
          {
            to,
            fromPrivateKey: privateKey,
            from: address,
            contractAddress: contractAddress,
          },
          provider,
        )) as TransactionHash

        expect(result.txId).toBeDefined()
      })

      it('should be valid from signatureId', async () => {
        const result = (await sdk.transaction.send.transferNft(
          {
            to,
            signatureId,
            from: address,
            contractAddress: contractAddress,
          },
          provider,
        )) as SignatureId

        expect(result.signatureId).toBeDefined()
      })
    })

    describe('KMS', () => {
      it.skip('should sign transaction', async () => {
        const txData = await sdk.transaction.send.send(
          {
            from: address,
            signatureId: signatureId,
            to,
            amount: '0.001',
          },
          TEST_DATA.SOLANA.PROVIDER,
        )
        const result = await sdk.kms.sign(
          { hashes: [], id: '', serializedTransaction: JSON.stringify(txData), chain: 'SOL' },
          [
            '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          ],
          TEST_DATA.SOLANA.PROVIDER,
        )

        expect(result).toBeDefined()
      })
    })

    describe('send solana', () => {
      it('should be valid from privateKey', async () => {
        const result = await sdk.transaction.send.send(
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
        const result = await sdk.transaction.send.send(
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
      const wallet = sdk.wallet.wallet()
      expect(wallet.mnemonic).toBeDefined()
      expect(wallet.privateKey).toBeDefined()
      expect(wallet.address).toBeDefined()
    })

    it('should generate address from SOL wallet', async () => {
      const wallet = sdk.wallet.wallet()
      expect(wallet.mnemonic).toBeDefined()
      expect(wallet.privateKey).toBeDefined()
      expect(wallet.address).toBeDefined()
      const { address, privateKey } = sdk.wallet.generateAddressFromMnemonic(wallet.mnemonic, 0)
      expect(address).toBe(wallet.address)
      expect(privateKey).toBe(wallet.privateKey)
    })

    it('should generate SOL wallet from private key', async () => {
      const wallet = sdk.wallet.wallet(
        '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
      )
      expect(wallet.mnemonic).not.toBeDefined()
      expect(wallet.privateKey).toBeDefined()
      expect(wallet.address).toBeDefined()
    })
  })
})
