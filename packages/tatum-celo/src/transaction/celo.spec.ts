import {
  Currency,
  // CreateRecord,
  // erc721Provenance_abi,
  // SmartContractReadMethodInvocation
} from '@tatumio/tatum-core'
import {
  // TransferCeloOrCeloErc20Token,
  // CeloDeployErc721,
  // CeloMintErc721,
  // CeloMintMultipleErc721,
  // CeloUpdateCashbackErc721,
  // CeloBurnErc721,
  CeloTransferErc721,
  // DeployCeloErc20,
  // MintCeloErc20,
  // BurnCeloErc20,
  // prepareCeloMintMultipleErc721ProvenanceSignedTransaction,
  // prepareCeloMintErc721ProvenanceSignedTransaction,
} from '../'
import {
  // prepareCeloBurnErc20SignedTransaction,
  // prepareCeloBurnErc721SignedTransaction,
  // prepareCeloDeployErc20SignedTransaction,
  // prepareCeloDeployErc721SignedTransaction,
  // prepareCeloMintErc20SignedTransaction,
  // prepareCeloMintErc721SignedTransaction,
  // prepareCeloMintMultipleCashbackErc721SignedTransaction,
  // prepareCeloMintMultipleErc721SignedTransaction,
  // prepareCeloOrCUsdSignedTransaction,
  // prepareCeloStoreDataSignedTransaction,
  // prepareCeloTransferErc20SignedTransaction,
  prepareCeloTransferErc721SignedTransaction,
  // prepareCeloUpdateCashbackForAuthorErc721SignedTransaction,
  // sendCeloSmartContractMethodInvocationTransaction,
  // sendCeloSmartContractReadMethodInvocationTransaction,
  // signCeloKMSTransaction,
} from './celo'

describe('CELO transactions', () => {
  jest.setTimeout(99999)
  // it('should test valid transaction CELO', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '1'
  //   body.currency = Currency.CELO
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid store data CELO', async () => {
  //   const body = new CreateRecord()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.data = '1'
  //   body.chain = Currency.CELO
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   const txData = await prepareCeloStoreDataSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should  not test valid store data CELO - missing feeCurrency', async () => {
  //   const body = new CreateRecord()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.data = '1'
  //   body.chain = Currency.CELO
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   await prepareCeloStoreDataSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  // })
  //
  // it('should test valid transaction CELO with custom fee', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '1'
  //   body.currency = Currency.CELO
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   body.fee = { gasLimit: '150000', gasPrice: '1' }
  //   const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid transaction CELO decimal places', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '0.01'
  //   body.currency = Currency.CELO
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid transaction CUSD decimal places', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '0.01'
  //   body.currency = Currency.CUSD
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid transaction CUSD', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.amount = '1'
  //   body.currency = Currency.CUSD
  //   body.feeCurrency = Currency.CUSD
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   const txData = await prepareCeloOrCUsdSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // // ERC-721
  // it('should test valid deploy 721 transaction', async () => {
  //   const body = new CeloDeployErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.name = 'Tatum'
  //   body.symbol = 'TTM'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloDeployErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid mint 721 transaction', async () => {
  //   const body = new CeloMintErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79'
  //   body.tokenId = '3'
  //   body.url = 'https://google.com'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid mint multiple 721 transaction', async () => {
  //   const body = new CeloMintMultipleErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea', '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea']
  //   body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79'
  //   body.tokenId = ['4', '5']
  //   body.url = ['https://google.com', 'https://google.com']
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintMultipleErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid mint multiple 721 transaction with cashback', async () => {
  //   const body = new CeloMintMultipleErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea']
  //   body.contractAddress = '0x8e6e6fc994d18F8A9B1A38f93469E1F9252d605E'
  //   body.tokenId = ['11']
  //   body.url = ['https://google.com']
  //   body.cashbackValues = [['3']]
  //   body.authorAddresses = [['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea']]
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintMultipleCashbackErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid update 721 cashback transaction', async () => {
  //   const body = new CeloUpdateCashbackErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.contractAddress = '0x8e6e6fc994d18F8A9B1A38f93469E1F9252d605E'
  //   body.cashbackValue = '0'
  //   body.tokenId = '11'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloUpdateCashbackForAuthorErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid burn 721 transaction', async () => {
  //   const body = new CeloBurnErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.contractAddress = '0xD0E0eF0C388ef42B4cD17De41431232ACF3b5b79'
  //   body.tokenId = '3'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloBurnErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid deploy 721 transaction KMS', async () => {
  //   const body = new CeloDeployErc721()
  //   body.signatureId = '98efa59a-8f44-49d7-a6df-5d7fcc556c51'
  //   body.name = 'Tatum'
  //   body.symbol = 'TTM'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloDeployErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  // })
  //
  // it('should test valid transfer 721 transaction', async () => {
  //   const body = new CeloTransferErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.contractAddress = '0x8e6e6fc994d18F8A9B1A38f93469E1F9252d605E'
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   body.tokenId = '11'
  //   body.value = '0'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloTransferErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // // ERC-20
  // it('should test valid deploy 20 transaction', async () => {
  //   const body = new DeployCeloErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.name = 'Tatum'
  //   body.symbol = 'TTM'
  //   body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.digits = 10
  //   body.supply = '100'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloDeployErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid mint 20 transaction', async () => {
  //   const body = new MintCeloErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'
  //   body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282'
  //   body.amount = '5'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid burn 20 transaction', async () => {
  //   const body = new BurnCeloErc20()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282'
  //   body.amount = '5'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloBurnErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid transfer 20 transaction', async () => {
  //   const body = new TransferCeloOrCeloErc20Token()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.contractAddress = '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282'
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   body.amount = '5'
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloTransferErc20SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid transfer 20 transaction to sign from KMS', async () => {
  //   const tx = {
  //     chain: Currency.CELO,
  //     serializedTransaction:
  //       '{"chainId":44787,"feeCurrency":"0x874069fa1eb16d44d622f2e0ca25eea172369bc1","to":"0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a","gasLimit":"0","value":"0x13fbe85edc90000"}',
  //     hashes: ['98efa59a-8f44-49d7-a6df-5d7fcc556c51'],
  //     id: '604a1ebc70760dadfdeb7f42',
  //   }
  //   const txData = await signCeloKMSTransaction(
  //     tx,
  //     '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
  //     'https://alfajores-forno.celo-testnet.org'
  //   )
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test read smart contract method invocation', async () => {
  //   const body = {
  //     contractAddress: '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282',
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
  //     params: ['0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'],
  //   }
  //
  //   const txData = await sendCeloSmartContractMethodInvocationTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   console.log(txData)
  //   expect(txData).not.toBeNull()
  // })
  //
  // it('should test write smart contract method invocation', async () => {
  //   const body = {
  //     fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
  //     contractAddress: '0xB7205685AABeB4092EBBa67Ed0443Af807AaC282',
  //     feeCurrency: Currency.CUSD,
  //     fee: { gasLimit: '40000', gasPrice: '200' },
  //     methodName: 'transfer',
  //     methodABI: {
  //       constant: false,
  //       inputs: [
  //         {
  //           name: 'to',
  //           type: 'address',
  //         },
  //         {
  //           name: 'value',
  //           type: 'uint256',
  //         },
  //       ],
  //       name: 'transfer',
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
  //     params: ['0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a', '1'],
  //   }
  //
  //   const txData = await sendCeloSmartContractMethodInvocationTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   console.log(txData)
  //   expect(txData).not.toBeNull()
  // })
  // // ERC-721 Provenance
  // it('should test valid deploy 721 provenance transaction', async () => {
  //   const body = new CeloDeployErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.name = 'Tatum'
  //   body.symbol = 'TTM'
  //   body.feeCurrency = Currency.CUSD
  //   body.provenance = true
  //   const txData = await prepareCeloDeployErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  // it('should test valid mint 721 provenance transaction', async () => {
  //   const body = new CeloMintErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
  //   body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
  //   body.tokenId = '12355'
  //   body.url = 'https://google.com'
  //   body.provenance = true
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintErc721ProvenanceSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  //
  // it('should test valid mint 721 provenance with cashback transaction', async () => {
  //   const body = new CeloMintErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
  //   body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
  //   body.tokenId = '3451'
  //   body.url = 'https://google.com'
  //   body.authorAddresses = ['0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a']
  //   body.cashbackValues = ['1', '1']
  //   body.fixedValues = ['1', '1']
  //   body.provenance = true
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintErc721ProvenanceSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  // it('should test valid mint multiple 721 Provenance transaction with cashback', async () => {
  //   const body = new CeloMintMultipleErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.to = [
  //     '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea',
  //     '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea',
  //     '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea',
  //   ]
  //   body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
  //   body.tokenId = ['11244', '12244', '13244']
  //   body.url = ['https://google.com', 'https://google.com', 'https://google.com']
  //   body.cashbackValues = [['3'], ['4'], ['5']]
  //   body.authorAddresses = [
  //     ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'],
  //     ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'],
  //     ['0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea'],
  //   ]
  //   body.fixedValues = [['10'], ['10'], ['10']]
  //   body.feeCurrency = Currency.CUSD
  //   const txData = await prepareCeloMintMultipleErc721ProvenanceSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  it('should test valid transfer 721 data transaction', async () => {
    const body = new CeloTransferErc721()
    body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
    body.chain = Currency.CELO
    body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
    body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
    body.tokenId = '12355'
    body.feeCurrency = Currency.CUSD
    body.provenance = true
    body.provenanceData = 'send token X'
    body.tokenPrice = '123'
    body.value = '1000'
    const txData = await prepareCeloTransferErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
    expect(txData).toContain('0x')
    // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
    // await provider.ready;
    // console.log(await provider.sendTransaction(txData));
  })

  // it('should test valid transfer with cashback 721 transaction', async () => {
  //   const body = new CeloTransferErc721()
  //   body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
  //   body.chain = Currency.CELO
  //   body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
  //   body.to = '0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a'
  //   body.tokenId = '11223'
  //   body.feeCurrency = Currency.CUSD
  //   body.provenance = true
  //   body.provenanceData = 'send token X'
  //   body.tokenPrice = '123'
  //   body.value = '1000'
  //   const txData = await prepareCeloTransferErc721SignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
  //   expect(txData).toContain('0x')
  //   // const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
  //   // await provider.ready;
  //   // console.log(await provider.sendTransaction(txData));
  // })
  // it('should test valid transfer data 721 transaction', async () => {
  //   const body = new SmartContractReadMethodInvocation()
  //   body.contractAddress = '0x26daf61fc9b8e52970686c0e8b5d66c63d5cab54'
  //   body.params = ['1324']
  //   body.methodName = 'getTokenData'
  //   body.methodABI = erc721Provenance_abi.find((a: any) => a.name === 'getTokenData')
  //   const response = await sendCeloSmartContractReadMethodInvocationTransaction(body, 'https://alfajores-forno.celo-testnet.org')
  //   // @ts-ignore
  //   console.log(JSON.stringify(response))
  // })
})
