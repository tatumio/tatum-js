import { mintNft, send, signKMSTransaction, transferNft } from './solana'
import { SolanaNftMetadata } from '../model'

jest.setTimeout(99999)

describe('Solana tests', () => {
  it('should send SOL', async () => {
    console.log(
      await send(
        {
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey:
            '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          amount: '0.001',
        },
        'https://api.testnet.solana.com'
      )
    )
  })

  it('should send SOL KMS', async () => {
    const txData = await send(
      {
        from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
        signatureId: '4ca4c0e6-33a3-4b00-a6dc-859cc1f86419',
        to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
        amount: '0.001',
      },
      'https://api.testnet.solana.com'
    )

    console.log(
      await signKMSTransaction(
        { hashes: [], id: '', serializedTransaction: JSON.stringify(txData) },
        '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
        'https://api.testnet.solana.com'
      )
    )
  })

  // it('should send SLP fungible token', async () => {
  //   console.log(
  //     await transferSolanaSlpToken(
  //       {
  //         from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
  //         fromPrivateKey:
  //           '3abc79a31093e4cfa4a724e94a44906cbbc3a32e2f75f985a28616676a5dbaf1de8d82a7e1d0561bb0e1b729c7a9b9b1708cf2803ad0ca928a332587ace391ad',
  //         to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
  //         amount: '0.001',
  //         currency: Currency.SOL,
  //         decimals: 0,
  //         contractAddress: 'BrjriMAczbgn3BeE1FqoNpdTCBYQckKrzdckg7f2BMQf{chain',
  //       },
  //       'https://api.testnet.solana.com'
  //     )
  //   )
  // })

  it('should mint NFT', async () => {
    console.log(
      await mintNft(
        {
          from: 'FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ',
          fromPrivateKey: '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep',
          to: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          metadata: new SolanaNftMetadata('Tatum', 'TTM', 'https://tatum.io/images/logo/logo.svg', 0),
        },
        'https://api.testnet.solana.com'
      )
    )
  })

  it('should transfer NFT', async () => {
    console.log(
      await transferNft(
        {
          from: 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU',
          fromPrivateKey: '54uMYxWikks34Vb7ckU5pW13KMDoc5EjJLV7DDzexFZddf1CCR9dfztBvgLbbK7jZj2iaJwfV6X9GZznSBx6Lnct',
          to: 'ET7gwtm6QZfjRQboBLjxZ4PSHDAH7y6AAiAJE8sPaWvv',
          contractAddress: 'WMaZPrkhotMQSnnscKXXBgWLLjCTEMvyx7FbCyp2F5m',
        },
        'https://api.testnet.solana.com'
      )
    )
  })
})
