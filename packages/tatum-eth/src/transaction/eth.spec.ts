import {
  // BurnErc20,
  Currency,
  // DeployErc20,
  // erc721Provenance_abi,
  // MintErc20,
  // SmartContractReadMethodInvocation,
  // TransferErc20,
} from '@tatumio/tatum-core'
// import { ethEstimateGas } from '../blockchain'
import {
  // ethGetGasPriceInWei,
  // prepareCustomErc20SignedTransaction,
  // prepareDeployErc20SignedTransaction,
  // prepareEthBurnErc20SignedTransaction,
  // prepareEthBurnErc721SignedTransaction,
  // prepareEthDeployErc721SignedTransaction,
  // prepareEthMintErc20SignedTransaction,
  // prepareEthMintErc721ProvenanceSignedTransaction,
  // prepareEthMintMultipleErc721ProvenanceSignedTransaction,
  // prepareEthOrErc20SignedTransaction,
  // sendBurnErc721Transaction,
  // sendDeployErc721Transaction,
  sendErc721Transaction,
  // sendMintErc721Transaction,
  // sendMintMultipleErc721Transaction,
  // sendSmartContractMethodInvocationTransaction,
  // sendSmartContractReadMethodInvocationTransaction,
} from './eth'
process.env.TATUM_API_KEY = '13320948-488c-4963-8eb4-e4a1d541a559'
describe('ETH transactions', () => {
  // it('should test valid transaction ETH data', async () => {
  //   const body = new TransferErc20()
  //   body.fromPrivateKey = '0x2dedb85f2a87f17e143dbd5e51a589f27b4c6acf6bf29ebff8eb5c32b5e9de05'
  //   body.amount = '0'
  //   body.currency = Currency.ETH
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   const txData = await prepareEthOrErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid transaction ERC20 data', async () => {
  //   const body = new TransferErc20()
  //   body.fromPrivateKey = '0x2dedb85f2a87f17e143dbd5e51a589f27b4c6acf6bf29ebff8eb5c32b5e9de05'
  //   body.amount = '0'
  //   body.currency = Currency.PLTC
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   const txData = await prepareEthOrErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid custom transaction ERC20 data', async () => {
  //   const body = new TransferErc20()
  //   body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
  //   body.amount = '3'
  //   body.contractAddress = '0xa089e2375e315a911816dcf9ad482bd3bfc8ec11'
  //   body.to = '0xfb99F8aE9b70A0C8Cd96aE665BBaf85A7E01a2ef'
  //   body.digits = 18
  //   const txData = await prepareCustomErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid custom deployment ERC20', async () => {
  //   const body = new DeployErc20()
  //   body.fromPrivateKey = '0x2dedb85f2a87f17e143dbd5e51a589f27b4c6acf6bf29ebff8eb5c32b5e9de05'
  //   body.symbol = 'SYMBOL'
  //   body.name = 'Test_ERC20'
  //   body.supply = '100'
  //   body.totalCap = '1000'
  //   body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.digits = 10
  //   const txData = await prepareDeployErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid mint ERC20', async () => {
  //   const body = new MintErc20()
  //   body.fromPrivateKey = '0x2dedb85f2a87f17e143dbd5e51a589f27b4c6acf6bf29ebff8eb5c32b5e9de05'
  //   body.amount = '0'
  //   body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   const txData = await prepareEthMintErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid burn ERC20', async () => {
  //   const body = new BurnErc20()
  //   body.fromPrivateKey = '0x2dedb85f2a87f17e143dbd5e51a589f27b4c6acf6bf29ebff8eb5c32b5e9de05'
  //   body.amount = '0'
  //   body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   const txData = await prepareEthBurnErc20SignedTransaction(body)
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test invalid custom deployment ERC20, missing supply', async () => {
  //   const body = new DeployErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.symbol = 'SYMBOL'
  //   body.name = 'Test_ERC20'
  //   body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.digits = 10
  //   try {
  //     await prepareDeployErc20SignedTransaction(body)
  //     fail('Validation did not pass.')
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })
  //
  // it('should test invalid custom transaction ERC20 data, missing digits', async () => {
  //   const body = new TransferErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '0'
  //   body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   try {
  //     await prepareCustomErc20SignedTransaction(body)
  //     fail('Validation did not pass.')
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })
  //
  // it('should not test valid transaction data, missing currency', async () => {
  //   const body = new TransferErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '0'
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   try {
  //     await prepareEthOrErc20SignedTransaction(body)
  //     fail('Validation did not pass.')
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })
  //
  // it('should test ethGetGasPriceInWei', async () => {
  //   const gasPrice = await ethGetGasPriceInWei()
  //   expect(gasPrice).not.toBeNull()
  // })
  //
  // it('should test ethEstimateGas', async () => {
  //   const ethGas = await ethEstimateGas({
  //     from: '0x11bb089914dd9bfba33b8dc83a95d368afeb1553',
  //     to: '0x9b85c57222826d82dd106e8455d3918846b507d5',
  //     amount: '10',
  //   })
  //   expect(ethGas).not.toBeNull()
  // })
  //
  // it('should test read smart contract method invocation', async () => {
  //   const result = await sendSmartContractMethodInvocationTransaction({
  //     contractAddress: '0x595bad1621784e9b0161d909be0117f17a5d37ca',
  //     methodName: 'balanceOf',
  //     methodABI: {
  //       constant: true,
  //       inputs: [
  //         {
  //           name: 'owner',
  //           type: 'address',
  //         },
  //       ],
  //       name: 'balanceOf',
  //       outputs: [
  //         {
  //           name: '',
  //           type: 'uint256',
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: 'view',
  //       type: 'function',
  //     },
  //     params: ['0x8c76887d2e738371bd750362fb55887343472346'],
  //   })
  //   console.log(result)
  //   expect(result).not.toBeNull()
  // })
  //
  // it('should test write smart contract method invocation', async () => {
  //   const result = await sendSmartContractMethodInvocationTransaction({
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     contractAddress: '0xd7d3e5e2174b530fdfb6d680c07c8b34495e2195',
  //     fee: { gasLimit: '40000', gasPrice: '200' },
  //     methodName: 'transferFrom',
  //     methodABI: {
  //       constant: false,
  //       inputs: [
  //         {
  //           name: 'from',
  //           type: 'address',
  //         },
  //         {
  //           name: 'to',
  //           type: 'address',
  //         },
  //         {
  //           name: 'value',
  //           type: 'uint256',
  //         },
  //       ],
  //       name: 'transferFrom',
  //       outputs: [
  //         {
  //           name: '',
  //           type: 'bool',
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: 'nonpayable',
  //       type: 'function',
  //     },
  //     params: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x8c76887d2e738371bd750362fb55887343472346', '1'],
  //   })
  //   expect(result).not.toBeNull()
  // })
  //
  // it('should test eth 721 mint transaction', async () => {
  //   try {
  //     const tokenId = new Date().getTime().toString()
  //     const mintedToken = await sendMintErc721Transaction({
  //       to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
  //       tokenId,
  //       url: 'https://www.seznam.cz',
  //       fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //       chain: Currency.ETH,
  //       contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  //       fee: {
  //         gasLimit: '50000',
  //         gasPrice: '110',
  //       },
  //     })
  //     console.log(tokenId)
  //     expect(mintedToken).not.toBeNull()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // })
  //
  // it('should test eth 721 mint multiple transaction', async () => {
  //   const firstTokenId = new Date().getTime()
  //   const secondTokenId = firstTokenId + 1
  //   const mintedTokens = await sendMintMultipleErc721Transaction({
  //     to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
  //     tokenId: [firstTokenId.toString(), secondTokenId.toString()],
  //     url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  //     fee: {
  //       gasLimit: '50000',
  //       gasPrice: '100',
  //     },
  //   })
  //   expect(mintedTokens).not.toBeNull()
  // })
  //
  // it('should test eth 721 burn transaction', async () => {
  //   const burnErc721Token = await sendBurnErc721Transaction({
  //     tokenId: '1615552558810',
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
  //     fee: {
  //       gasLimit: '5000000',
  //       gasPrice: '110',
  //     },
  //   })
  //   expect(burnErc721Token).not.toBeNull()
  // })

  it('should test eth 721 send transaction', async () => {
    const sendErc721Token = await sendErc721Transaction({
      to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
      tokenId: '1615546122766',
      fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
      chain: Currency.ETH,
      contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
      fee: {
        gasLimit: '5000000',
        gasPrice: '100',
      },
    })
    expect(sendErc721Token).not.toBeNull()
  })

  // it('should test eth 721 deploy transaction', async () => {
  //   const deployErc721Token = await sendDeployErc721Transaction({
  //     symbol: '1oido3id3',
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     name: '2123kd',
  //   })
  //   expect(deployErc721Token).not.toBeNull()
  // })
  //
  // // ERC-721 Provenance
  //
  // it('should test eth 721 deploy transaction', async () => {
  //   const deployErc721Token = await prepareEthDeployErc721SignedTransaction({
  //     symbol: '1oido3id3',
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     provenance: true,
  //     name: '2123kd',
  //   })
  //   expect(deployErc721Token).not.toBeNull()
  //   console.log(deployErc721Token)
  // })
  // it('should test eth 721 mint multiple transaction', async () => {
  //   const mintedTokens = await prepareEthMintMultipleErc721ProvenanceSignedTransaction({
  //     to: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
  //     tokenId: ['1765', '2231'],
  //     url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0xc788be3b6e035f2f8e56662540f5bb8c8b3e98b7',
  //   })
  //   console.log(mintedTokens)
  //   expect(mintedTokens).not.toBeNull()
  // })
  // it('should test eth 721 mint multiple transaction with cashback', async () => {
  //   const mintedTokens = await prepareEthMintMultipleErc721ProvenanceSignedTransaction({
  //     to: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
  //     tokenId: ['1234', '4321'],
  //     url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
  //     authorAddresses: [['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'], ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be']],
  //     cashbackValues: [['1'], ['2']],
  //     fixedValues: [['10'], ['10']],
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
  //   })
  //   expect(mintedTokens).not.toBeNull()
  // })
  // it('should test eth 721 mint transaction', async () => {
  //   const mintedTokens = await prepareEthMintErc721ProvenanceSignedTransaction({
  //     to: '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF',
  //     tokenId: '12312',
  //     url: 'https://www.seznam.cz',
  //     authorAddresses: ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'],
  //     cashbackValues: ['1'],
  //     fixedValues: ['10'],
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
  //   })
  //   expect(mintedTokens).not.toBeNull()
  // })
  // it('should test eth 721 burn transaction', async () => {
  //   const burnErc721Token = await prepareEthBurnErc721SignedTransaction({
  //     tokenId: '12312',
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     chain: Currency.ETH,
  //     contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
  //     fee: {
  //       gasLimit: '5000000',
  //       gasPrice: '110',
  //     },
  //   })
  //   expect(burnErc721Token).not.toBeNull()
  // })
  // it('should test eth 721 send transaction', async () => {
  //   const sendErc721Token = await sendErc721Transaction({
  //     to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
  //     tokenId: '12312',
  //     provenance: true,
  //     fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
  //     provenanceData: 'send token X',
  //     tokenPrice: '12',
  //     value: '2',
  //     chain: Currency.ETH,
  //     contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
  //   })
  //   expect(sendErc721Token).not.toBeNull()
  // })
  // it('should test valid transfer data 721 transaction', async () => {
  //   const body = new SmartContractReadMethodInvocation()
  //   body.contractAddress = '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a'
  //   body.params = ['10']
  //   body.methodName = 'getTokenData'
  //   body.methodABI = erc721Provenance_abi.find((a: any) => a.name === 'getTokenData')
  //   const response = await sendSmartContractReadMethodInvocationTransaction(body)
  //   // @ts-ignore
  //   console.log(JSON.stringify(response))
  // })
})
