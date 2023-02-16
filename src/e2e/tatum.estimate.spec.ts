// import { TatumSdk } from '../service/tatum/tatum'
// import { Chain, Network } from '../service/tatum/tatum.dto'
// import { TestConst } from './e2e.constant'
//
// describe('estimate', () => {
//   let tatum: TatumSdk
//   beforeAll(async () => {
//     tatum = await TatumSdk.init({
//       apiKey: process.env.TESTNET_API_KEY,
//       network: Network.Testnet,
//     })
//   })
//
//   describe('getCurrentFee', () => {
//     it('ethereum', async () => {
//       const fee = await tatum.fees.getCurrentFee([Chain.ethereum])
//       expect(fee.ethereum).toBeDefined()
//       expect(fee.ethereum.gasPrice).toBeDefined()
//       expect(fee.ethereum.gasPrice.slow).toBeDefined()
//       expect(fee.ethereum.gasPrice.medium).toBeDefined()
//       expect(fee.ethereum.gasPrice.fast).toBeDefined()
//       expect(fee.ethereum.gasPrice.baseFee).toBeDefined()
//       expect(fee.ethereum.gasPrice.unit).toBeDefined()
//       expect(fee.ethereum.lastRecalculated).toBeDefined()
//       expect(fee.ethereum.basedOnBlockNumber).toBeDefined()
//     })
//
//     it('empty', async () => {
//       const fee = await tatum.fees.getCurrentFee([])
//       expect(fee).toEqual({})
//     })
//   })
//
//
//   describe('estimate', () => {
//     it('ethereum', async () => {
//       const estimation = await tatum.fees.estimate([{
//         chain: Chain.ethereum,
//         from: TestConst.ETH_ADDRESS,
//         to: TestConst.ETH_ADDRESS,
//         amount: '0.1',
//       }])
//       expect(estimation).toBeDefined()
//       expect(estimation.ethereum).toBeDefined()
//       expect(estimation.ethereum[0].gasLimit).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice.slow).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice.medium).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice.fast).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice.unit).toBeDefined()
//       expect(estimation.ethereum[0].gasPrice.baseFee).toBeDefined()
//     })
//
//     it('empty', async () => {
//       const estimation = await tatum.fees.estimate([])
//       expect(estimation).toEqual({})
//     })
//   })
//
// })
