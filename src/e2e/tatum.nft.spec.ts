// import { TatumSdk } from '../service/tatum/tatum'
// import { Chain, Network } from '../service/tatum/tatum.dto'
//
// describe('nft', () => {
//   let tatum: TatumSdk
//   beforeAll(async () => {
//     tatum = await TatumSdk.init({
//       apiKey: process.env.TESTNET_API_KEY,
//       network: Network.Testnet,
//     })
//   })
//
//   it('getBalance', async () => {
//     const address1 = '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F'
//     const address2 = '0x57e4444ea560a9b2a516144bd9b6581cb17a4289'
//
//     const balances = await tatum.nft.getBalance([
//       {
//         chain: Chain.ethereum,
//         addresses: [address1, address2],
//       },
//     ])
//
//     expect(balances.ethereum).toBeDefined()
//     expect(balances.ethereum![address1]).toStrictEqual([
//       {
//         contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
//         tokenId: '1',
//         metadataUri: 'https://my_token_data.com',
//         metadata: null,
//       },
//     ])
//
//     expect(balances.ethereum![address2]).toStrictEqual([
//       {
//         contractAddress: '0xbc51613c51d4dc816aa238fb0ff3d4b5c07b9ca6',
//         tokenId: '11',
//         metadataUri: 'https://google.com',
//         metadata: null,
//       },
//       {
//         contractAddress: '0xbc51613c51d4dc816aa238fb0ff3d4b5c07b9ca6',
//         tokenId: '12',
//         metadataUri: 'https://google.com',
//         metadata: null,
//       },
//       {
//         contractAddress: '0xf423a1d30984f42f3c4de8dab3c896f075aef5eb',
//         tokenId: '1',
//         metadataUri: 'https://test1.com',
//         metadata: null,
//       },
//       {
//         contractAddress: '0xf423a1d30984f42f3c4de8dab3c896f075aef5eb',
//         tokenId: '3',
//         metadataUri: 'https://test3.com',
//         metadata: null,
//       },
//     ])
//   })
//
//   it('getNftTransactions', async () => {
//     const transactions = await tatum.nft.getAllNftTransactions({
//       offset: 0,
//       pageSize: 20,
//       nftTransactionsDetails: [
//         {
//           tokenId: '1',
//           contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
//           chain: Chain.ethereum,
//           fromBlock: 1,
//           toBlock: 1931233,
//         },
//       ],
//     })
//
//     expect(transactions).toStrictEqual({
//       ethereum: [
//         {
//           blockNumber: 1931233,
//           contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
//           from: '0x0000000000000000000000000000000000000000',
//           to: '0x51abc4c9e7bffaa99bbe4ddc33d75067ebd0384f',
//           tokenId: '1',
//           txId: '0x33e8e6a4e4eaefb4c22b18df4ec68afc72ba9f3c65edd344ae9ed50861d8c22d',
//         },
//       ],
//     })
//   })
//
//   it('getNftMetadata', async () => {
//     const metadata = await tatum.nft.getNftMetadata({
//       chain: Chain.ethereum,
//       contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
//       tokenId: '1',
//     })
//     expect(metadata).toBeDefined()
//   })
//
//   it('getCollection', async () => {
//     const collection = await tatum.nft.getCollection({
//       chain: Chain.ethereum,
//       contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
//     })
//     expect(collection).toHaveLength(1)
//   })
// })
