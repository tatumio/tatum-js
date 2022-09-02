import { TatumSolanaSDK } from '../solana.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { Currency } from '@tatumio/api-client'
import { FEE_PAYER } from '../services/solana.tx'

jest.setTimeout(99999)

describe.skip('SolanaSDK - tx', () => {
  const sdk = TatumSolanaSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://api.devnet.solana.com',
  })

  const mintNFT = async () => {
    const response = await sdk.transaction.mintNft({
      chain: 'SOL',
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
      const tx = await sdk.transaction.transferSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
        digits: 6,
        chain: Currency.SOL,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
        amount: '0.00001',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.transaction.createSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        chain: 'SOL',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        supply: '5000',
      })
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send({
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
          await sdk.transaction.createCollection({
            chain: 'SOL',
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
          await sdk.transaction.mintNft({
            chain: 'SOL',
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
          await sdk.transaction.burnNft({
            chain: Currency.SOL,
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
          await sdk.transaction.transferNft({
            chain: 'SOL',
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
          await sdk.transaction.verifyNftInCollection(
            minted['nftAddress'],
            '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
            'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          ),
        )
      })

      it('should mint NFT under collection - not verified', async () => {
        console.log(
          await sdk.transaction.mintNft({
            chain: 'SOL',
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
          await sdk.transaction.mintNft(
            {
              chain: 'SOL',
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
            undefined,
            undefined,
            '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          ),
        )
      })
    });
  })

  describe('Fee payer signing', () => {
    it('should send SPL token with fee payer', async () => {
      const tx = await sdk.transaction.transferSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
        digits: 6,
        chain: Currency.SOL,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
        amount: '0.00001',
      }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct')
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.transaction.createSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        chain: 'SOL',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        supply: '5000',
      }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct')
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        amount: '0.001',
      }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct')
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should mint NFT', async () => {
      console.log(
        await sdk.transaction.mintNft({
          chain: 'SOL',
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
        }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct'),
      )
    })

    it('should burn NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.transaction.burnNft({
          chain: Currency.SOL,
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          contractAddress: minted['nftAddress'],
        }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct'),
      )
    })

    it('should transfer NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.transaction.transferNft({
          chain: 'SOL',
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          contractAddress: minted['nftAddress'],
        }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct'),
      )
    })

    it('should mint NFT under collection - not verified', async () => {
      console.log(
        await sdk.transaction.mintNft({
          chain: 'SOL',
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
        }, undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct'),
      )
    })

    it('should mint NFT under collection - verified', async () => {
      console.log(
        await sdk.transaction.mintNft(
          {
            chain: 'SOL',
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
          undefined, 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU', '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
        ),
      )
    })
  })

  describe('External signing', () => {
    it('should send SPL token with fee payer', async () => {
      const tx = await sdk.transaction.transferSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        contractAddress: 'FUfCgCej9dZoWvYDXSHsVBFwHAfKzQhpkgPDsUHLhHKb',
        digits: 6,
        chain: Currency.SOL,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'BiqJwFY1sEPmcLP89Sq9qBjifxCKnt1ibqQgvYNkPMQj',
        amount: '0.00001',
      }, undefined, undefined, undefined, true)
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should create SPL token', async () => {
      const tx = await sdk.transaction.createSplToken({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        address: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        chain: 'SOL',
        digits: 6,
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        supply: '5000',
      }, undefined, undefined, undefined, true)
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should send SOL', async () => {
      const tx = await sdk.transaction.send({
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        fromPrivateKey:
          '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        amount: '0.001',
      }, undefined, undefined, undefined, true)
      console.log(tx)
      expect(tx).toBeDefined()
    })

    it('should mint NFT', async () => {
      console.log(
        await sdk.transaction.mintNft({
          chain: 'SOL',
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
        }, undefined, undefined, undefined, undefined, true),
      )
    })

    it('should burn NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.transaction.burnNft({
          chain: Currency.SOL,
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          contractAddress: minted['nftAddress'],
        }, undefined, undefined, undefined, true),
      )
    })

    it('should transfer NFT', async () => {
      const minted = await mintNFT()
      console.log(
        await sdk.transaction.transferNft({
          chain: 'SOL',
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey:
            '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          contractAddress: minted['nftAddress'],
        }, undefined, undefined, undefined, true),
      )
    })

    it('should mint NFT under collection - not verified', async () => {
      console.log(
        await sdk.transaction.mintNft({
          chain: 'SOL',
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
        }, undefined, undefined, undefined, undefined, true),
      )
    })

    it('should mint NFT under collection - verified', async () => {
      console.log(
        await sdk.transaction.mintNft(
          {
            chain: 'SOL',
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
          undefined, undefined, undefined, '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep', true,
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
          lamports: new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
        }),
      )
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      const txData = transaction.compileMessage().serialize().toString('hex')
      expect(txData).toBeDefined()
      console.log(txData)
    })

    it.skip('should prepare mint NFT tx for KMS / Custodial signing', async () => {
      console.log(
        await sdk.transaction.mintNft({
          chain: 'SOL',
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
  });
})
