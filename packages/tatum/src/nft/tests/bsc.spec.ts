import {
  Currency,
  getNFTImage,
  getNFTMetadataURI,
  getNFTRoyalty,
  getNFTProvenanceData,
  mintNFT,
  deployNFT,
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

describe('NFT tests - BSC', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy NFT', async () => {
    try {
      const body = {
        symbol: 'ERC_SYMBOL',
        chain: Currency.BSC,
        fromPrivateKey: '0xb871225d8ea84598c4d6fa2933bcc81bc2ede86bebf9960b06c137b695ec6c5a',
        name: 'TestToken',
        provenance: true,
        fee: {
          gasLimit: '400000',
          gasPrice: '20',
        },
      }
      const deployToken = await deployNFT(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
      console.log(deployToken)
      expect(deployToken).not.toBeNull()
    } catch (e) {
      console.log(e)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT token', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.BSC,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        provenance: true,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        url: 'test.com',
        authorAdresses: ['0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'],
        cashbackValues: ['0.1'],
        erc20: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
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
        chain: Currency.BSC,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        fromPrivateKey: '0xb871225d8ea84598c4d6fa2933bcc81bc2ede86bebf9960b06c137b695ec6c5a',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        value: '0.1',
        fee: {
          gasLimit: '400000',
          gasPrice: '20',
        },
      }
      const sendErc721Token = await transferNFT(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
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
        chain: Currency.BSC,
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        authorAddresses: [
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
        cashbackValues: [
          ['0.1', '0.1'],
          ['0.1', '0.1'],
        ],
      }
      const mintedTokens = await mintMultipleNFTWithUri(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
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
        chain: Currency.BSC,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        url: 'test.url',
        fromPrivateKey: '0xb871225d8ea84598c4d6fa2933bcc81bc2ede86bebf9960b06c137b695ec6c5a',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        authorAddresses: ['0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'],
        cashbackValues: ['0.25'],
      }
      const mintedToken = await mintNFTWithUri(body)
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
        chain: Currency.BSC,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const burnt = await burnNFT(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
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
        chain: Currency.BSC,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await prepareAddNFTMinter(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
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
        chain: Currency.BSC,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await sendAddNFTMinter(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
      console.log('response: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT provenance data', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const provenanceData = await getNFTProvenanceData(Currency.BSC, contractAddress, tokenId)
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
      const metadata = await getNFTMetadataURI(Currency.BSC, contractAddress, tokenId)
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
      const image = await getNFTImage(Currency.BSC, contractAddress, tokenId)
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
      const royalty = await getNFTRoyalty(Currency.BSC, contractAddress, tokenId)
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
        chain: Currency.BSC,
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
        chain: Currency.BSC,
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        cashbackValue: '0.25',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const cashback = await updateCashbackForAuthorNFT(true, body, 'https://data-seed-prebsc-1-s1.binance.org:8545')
      console.log('response: ', cashback)
      expect(cashback).not.toBeNull()
    } catch (e) {
      console.log(e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
