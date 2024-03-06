import { TatumSolanaSDK } from '../solana.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { FEE_PAYER } from '../services/solana.utils'

jest.setTimeout(99999)

describe('SolanaSDK - tx', () => {
  const sdk = TatumSolanaSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  const mintNFT = async () => {
    const response = await sdk.nft.send.mintSignedTransaction({
      from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
      fromPrivateKey:
        '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
      to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
      metadata: {
        name: 'Tatum',
        symbol: 'TTM',
        uri: 'https://tatum.io/images/logo/logo.svg',
        sellerFeeBasisPoints: 0,
        mutable: true,
        creators: [
          {
            address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            verified: true,
            share: 100,
          },
        ],
        collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
      },
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return response
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Private Key signing', () => {
    it('should send SPL token', async () => {
      const tx = await sdk.spl.send.transferSignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
        amount: '0.00001',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.spl.send.deploySignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        supply: '5000',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send.transferSignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        amount: '0.001',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    describe('NFT', function () {
      it('should mint NFT Collection', async () => {
        console.log(
          await sdk.nft.send.mintCollectionSignedTransaction({
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              creators: [
                {
                  address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
                  verified: true,
                  share: 100,
                },
              ],
            },
          }),
        )
      })

      it('should mint NFT', async () => {
        console.log(
          await sdk.nft.send.mintSignedTransaction({
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              creators: [
                {
                  address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
                  verified: true,
                  share: 100,
                },
              ],
            },
          }),
        )
      })

      it('should burn NFT', async () => {
        const minted = await mintNFT()
        console.log(
          await sdk.nft.send.burnSignedTransaction({
            from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            fromPrivateKey:
              '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
            contractAddress: minted['nftAddress'],
          }),
        )
      })

      it('should transfer NFT', async () => {
        const minted = await mintNFT()
        console.log(
          await sdk.nft.send.transferSignedTransaction({
            from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            fromPrivateKey:
              '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
            to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
            contractAddress: minted['nftAddress'],
          }),
        )
      })

      it('should verify NFT under collection', async () => {
        const minted = await mintNFT()
        console.log(
          await sdk.nft.send.verifySignedTransaction({
            nftAddress: minted['nftAddress'],
            collectionAddress: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          }),
        )
      })

      it('should mint NFT under collection - not verified', async () => {
        console.log(
          await sdk.nft.send.mintSignedTransaction({
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            },
          }),
        )
      })

      it('should mint NFT under collection - verified', async () => {
        console.log(
          await sdk.nft.send.mintSignedTransaction({
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            },
            collectionVerifierPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          }),
        )
      })
    })
  })

  describe('Fee payer signing', () => {
    it('should send SPL token with fee payer', async () => {
      const tx = await sdk.spl.send.transferSignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
        amount: '0.00001',
        feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
        feePayerPrivateKey:
          '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.spl.send.deploySignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        supply: '5000',
        feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
        feePayerPrivateKey:
          '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send.transferSignedTransaction({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        amount: '0.001',
        feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
        feePayerPrivateKey:
          '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should mint NFT', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction({
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey:
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          metadata: {
            name: 'Tatum',
            symbol: 'TTM',
            uri: 'https://tatum.io/images/logo/logo.svg',
            sellerFeeBasisPoints: 0,
            mutable: true,
            creators: [
              {
                address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
                verified: true,
                share: 100,
              },
            ],
          },
          feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          feePayerPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        }),
      )
    })

    it('should burn NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.nft.send.burnSignedTransaction({
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          contractAddress: minted['nftAddress'],
          feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          feePayerPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        }),
      )
    })

    it('should transfer NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.nft.send.transferSignedTransaction({
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          contractAddress: minted['nftAddress'],
          feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          feePayerPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        }),
      )
    })

    it('should mint NFT under collection - not verified', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction({
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey:
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          metadata: {
            name: 'Tatum',
            symbol: 'TTM',
            uri: 'https://tatum.io/images/logo/logo.svg',
            sellerFeeBasisPoints: 0,
            mutable: true,
            collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
          },
          feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          feePayerPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        }),
      )
    })

    it('should mint NFT under collection - verified', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction({
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey:
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          metadata: {
            name: 'Tatum',
            symbol: 'TTM',
            uri: 'https://tatum.io/images/logo/logo.svg',
            sellerFeeBasisPoints: 0,
            mutable: true,
            collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
          },
          feePayer: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          feePayerPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        }),
      )
    })
  })

  describe.skip('External signing', () => {
    it('should send SPL token with fee payer', async () => {
      const tx = await sdk.spl.send.transferSignedTransaction(
        {
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
          digits: 6,
          fromPrivateKey:
            '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
          amount: '0.00001',
        },
        undefined,
        true,
      )
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.spl.send.deploySignedTransaction(
        {
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          digits: 6,
          fromPrivateKey:
            '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          supply: '5000',
        },
        undefined,
        true,
      )
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send.transferSignedTransaction(
        {
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey:
            '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          amount: '0.001',
        },
        undefined,
        true,
      )
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should mint NFT', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction(
          {
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              creators: [
                {
                  address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
                  verified: true,
                  share: 100,
                },
              ],
            },
          },
          undefined,
          true,
        ),
      )
    })

    it('should burn NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.nft.send.burnSignedTransaction(
          {
            from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            fromPrivateKey:
              '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
            contractAddress: minted['nftAddress'],
          },
          undefined,
          true,
        ),
      )
    })

    it('should transfer NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.nft.send.transferSignedTransaction(
          {
            from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            fromPrivateKey:
              '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
            to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
            contractAddress: minted['nftAddress'],
          },
          undefined,
          true,
        ),
      )
    })

    it('should mint NFT under collection - not verified', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction(
          {
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            },
          },
          undefined,
          true,
        ),
      )
    })

    it('should mint NFT under collection - verified', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction(
          {
            from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            fromPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
            metadata: {
              name: 'Tatum',
              symbol: 'TTM',
              uri: 'https://tatum.io/images/logo/logo.svg',
              sellerFeeBasisPoints: 0,
              mutable: true,
              collection: '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            },
            collectionVerifierPrivateKey:
              '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          },
          undefined,
          true,
        ),
      )
    })
  })

  describe('KMS raw data', function () {
    it('should generate raw data for external signing', async () => {
      const from = '7Ha3XA3EtpJESic7MZhk2WBYFPi8whJJnWknYRj4g1Zh'
      const to = 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU'
      const amount = '0.000001'

      const fromPubkey = new PublicKey(from)

      const transaction = new Transaction({ feePayer: new PublicKey(FEE_PAYER) })
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: fromPubkey,
          toPubkey: new PublicKey(to),
          lamports: BigInt(new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL).toFixed()),
        }),
      )
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      const txData = transaction.compileMessage().serialize().toString('hex')
      expect(txData).toBeDefined()
      console.log(txData)
    })

    it.skip('should prepare mint NFT tx for KMS / Custodial signing', async () => {
      console.log(
        await sdk.nft.send.mintSignedTransaction({
          from: 'DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF',
          signatureId:
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          metadata: {
            name: 'Tatum',
            symbol: 'TTM',
            uri: 'https://tatum.io/images/logo/logo.svg',
            sellerFeeBasisPoints: 0,
            mutable: true,
          },
        }),
      )
    })
  })
})
