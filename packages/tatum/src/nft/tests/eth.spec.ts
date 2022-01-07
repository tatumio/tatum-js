import {
  Currency,
  getNFTImage,
  getNFTMetadataURI,
  getNFTRoyalty,
  getNFTProvenanceData,
  getNFTTransactionsByToken,
  getNFTTransactionsByAddress,
  getNFTsByAddress,
  getNFTTransaction,
  deployNFT,
  mintNFT,
  createNFT,
  burnNFT,
  transferNFT,
  prepareAddNFTMinter,
  sendAddNFTMinter,
  mintNFTWithUri,
  mintMultipleNFTWithUri,
  updateCashbackForAuthorNFT,
} from '@tatumio/tatum-defi'
import { readFileSync } from 'fs'

describe('NFT tests - ETHERIUM', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy NFT', async () => {
    try {
      const body = {
        symbol: 'ERC_SYMBOL',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        name: 'TestToken',
      }
      const deployToken = await deployNFT(true, body)
      console.log(deployToken)
      expect(deployToken).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT token', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.ETH,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        url: 'test.com',
        authorAdresses: ['0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'],
        cashbackValues: ['0.1'],
      }
      const mintedToken = await mintNFT(body)
      console.log('mintedToken', mintedToken)
      expect(mintedToken).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should transfer NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.ETH,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xf74ff0da670D30d020638323e3C0EA9d3bE41A4C',
        value: '0.1',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const sendErc721Token = await transferNFT(true, body)
      console.log('response: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    } catch (e) {
      console.log(e)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint multiple NFTs', async () => {
    try {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const body = {
        chain: Currency.ETH,
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xf74ff0da670D30d020638323e3C0EA9d3bE41A4C',
        cashbackValues: [['0.1'], ['0.1']],
        authorAddresses: [
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
      }
      const mintedTokens = await mintMultipleNFTWithUri(true, body)
      console.log(mintedTokens)
      expect(mintedTokens).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT with uri', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.ETH,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        url: 'ipfs://bafkreicq2uidgocra7z64ix5cx5zwn2sixatpn7hdvzk36hnsgwatrfuc4',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        tokenId: tokenId,
        authorAddresses: ['0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'],
        cashbackValues: ['0.30'],
      }
      const mintedToken = await mintNFTWithUri(body, {
        testnet: true,
      })
      console.log('mintedToken', mintedToken)
      expect(mintedToken).not.toBeNull()
    } catch (e) {
      console.log(e)
      expect(e).not.toBeDefined()
    }
  })
  it('should burn NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        tokenId: tokenId,
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const burnt = await burnNFT(true, body)
      expect(burnt).not.toBeNull()
      console.log(burnt)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should prepare add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await prepareAddNFTMinter(true, body)
      console.log('response: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await sendAddNFTMinter(true, body)
      console.log('response: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT transactions by token', async () => {
    try {
      const tokenId = 1232423
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByToken(Currency.ETH, tokenId, tokenAddress, 1)
      expect(transactions).not.toBeNull()
      console.log('transactions data: ', transactions)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT transactions by address', async () => {
    try {
      const address = '0x8ce4e40889a13971681391aad29e88efaf91f784'
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByAddress(Currency.ETH, address, tokenAddress, 1)
      expect(transactions).not.toBeNull()
      console.log('transactions data: ', transactions)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs contract address', async () => {
    try {
      const txId = '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7'
      const transaction = await getNFTTransaction(Currency.ETH, txId)
      expect(transaction).not.toBeNull()
      console.log('provenance data: ', transaction)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs by address', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const address = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const provenanceData = await getNFTsByAddress(Currency.ETH, contractAddress, address)
      expect(provenanceData).not.toBeNull()
      console.log('provenance data: ', provenanceData)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT provenance data', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const provenanceData = await getNFTProvenanceData(Currency.ETH, contractAddress, tokenId)
      expect(provenanceData).not.toBeNull()
      console.log('provenance data: ', provenanceData)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT metadata uri', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const metadata = await getNFTMetadataURI(Currency.ETH, contractAddress, tokenId)
      expect(metadata).not.toBeNull()
      console.log('NFT metadata: ', metadata)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT image', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const image = await getNFTImage(Currency.ETH, contractAddress, tokenId)
      expect(image).not.toBeNull()
      console.log('NFT image: ', image)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT royalty', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const royalty = await getNFTRoyalty(Currency.ETH, contractAddress, tokenId)
      expect(royalty).not.toBeNull()
      console.log('NFT royalty: ', royalty)
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should create NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
        chain: Currency.ETH,
        tokenId: tokenId,
        url: '',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
      }
      console.log(await createNFT(true, body, readFileSync('/Users/marinajakcin/Downloads/pikachu.png'), 'Pokemon', 'Electric type'))
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should update cashback for royalty', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        tokenId: tokenId,
        chain: Currency.ETH,
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        cashbackValue: '0.3',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const cashback = await updateCashbackForAuthorNFT(true, body)
      console.log('response: ', cashback)
      expect(cashback).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
