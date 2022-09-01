import { TatumSolanaSDK } from '../solana.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { Currency } from '@tatumio/api-client'

jest.setTimeout(99999)

describe('SolanaSDK - tx', () => {
  const sdk = TatumSolanaSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://api.devnet.solana.com',
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it.skip('should send SPL token', async () => {
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

  it.skip('should create SPL token', async () => {
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

  it.skip('should send SOL', async () => {
    const tx = await sdk.transaction.send({
      from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
      fromPrivateKey:
        '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
      to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
      amount: '0.001',
    })
    expect(tx).toBeDefined()
  })

  it('should generate raw data for external signing', async () => {
    const from = '7Ha3XA3EtpJESic7MZhk2WBYFPi8whJJnWknYRj4g1Zh'
    const to = 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU'
    const amount = '0.000001'

    const devnet_fee_payer = '5zPr5331CtBjgVeLedhmJPEpFaUsorLCnb3aCQPsUc9w'
    const mainnet_fee_payer = 'DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF'

    const fromPubkey = new PublicKey(from)

    const transaction = new Transaction({ feePayer: new PublicKey(devnet_fee_payer) })
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

  // it('should send SOL KMS', async () => {
  //   const txData = await send(
  //     {
  //       from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
  //       signatureId: '4ca4c0e6-33a3-4b00-a6dc-859cc1f86419',
  //       to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
  //       amount: '0.001',
  //     },
  //     'https://api.testnet.solana.com',
  //   )
  //
  //   console.log(
  //     await signKMSTransaction(
  //       { hashes: [], id: '', serializedTransaction: JSON.stringify(txData) },
  //       '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
  //       'https://api.testnet.solana.com',
  //     ),
  //   )
  // })

  it.skip('should mint NFT', async () => {
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

  it.skip('should burn NFT', async () => {
    console.log(
      await sdk.transaction.burnNft({
        chain: Currency.SOL,
        from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
        fromPrivateKey:
          '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        contractAddress: 'HKNPzWsmsC8RgoTq9bUpcGK3udwj8rahFXmaLUDFgrxC',
      }),
    )
  })

  it.skip('should mint NFT Collection', async () => {
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

  it.skip('should verify NFT under collection', async () => {
    console.log(
      await sdk.transaction.verifyNftInCollection(
        'E9kA1eXxjKaS39TFtAbR9TzNyAPZCFHwuCiHLGeCLDNK',
        '2jEzQa8krppfkYmeg6zU8JwHUmgM2djqz1wv6gsMurGM',
        'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
        '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
      ),
    )
  })

  it.skip('should mint NFT under collection - not verified', async () => {
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

  it.skip('should mint NFT under collection - verified', async () => {
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

  it.skip('should transfer NFT', async () => {
    console.log(
      await sdk.transaction.transferNft({
        chain: 'SOL',
        from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
        fromPrivateKey:
          '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        contractAddress: 'JCkpeMvK6HbdhkQFhKnTh6fF889y12WaSBg793aA1Zqu',
      }),
    )
  })
})
