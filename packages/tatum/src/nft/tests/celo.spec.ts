import {
  Currency,
  getNFTImage,
  getNFTMetadataURI,
  getNFTRoyalty,
  getNFTProvenanceData,
  getNFTTransactionsByToken,
  getNFTTransactionsByAddress,
  getNFTsByAddress,
  getNFTContractAddress,
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

describe('NFT tests - CELO', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy NFT', async () => {
    try {
      const body = {
        symbol: 'ERC_SYMBOL',
        chain: Currency.CELO,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        name: 'TestToken',
        feeCurrency: Currency.CUSD,
        fee: {
          gasLimit: '400000',
          gasPrice: '20',
        },
      }
      const deployToken = await deployNFT(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Deploy nft: ', deployToken)
      expect(deployToken).toBeDefined()
    } catch (e) {
      console.log('Deploy nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT token', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.CELO,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        url: 'test.com',
        authorAdresses: ['0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'],
        cashbackValues: ['0.1'],
        feeCurrency: Currency.CUSD,
      }
      const mintedToken = await mintNFT(body)
      console.log('Mint nft: ', mintedToken)
      expect(mintedToken).toBeDefined()
    } catch (e) {
      console.log('Mint nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should transfer NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.CELO,
        to: '0xe4bdce3fee7cd2d722580b0e701531bae004b85b',
        tokenId: tokenId,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        value: '0.1',
        feeCurrency: Currency.CUSD,
        fee: {
          gasLimit: '6000000',
          gasPrice: '20',
        },
      }
      const sendErc721Token = await transferNFT(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Transfer nft: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Deploy nft error: ', e.reponse.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint multiple NFTs', async () => {
    try {
      const firstTokenId = new Date().getTime()
      const secondTokenId = firstTokenId + 1
      const body = {
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        cashbackValues: [['0.1'], ['0.1']],
        authorAddresses: [
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          ['0xe4bdce3fee7cd2d722580b0e701531bae004b85b', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
        ],
      }
      const mintedTokens = await mintMultipleNFTWithUri(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Mint multiple nfts: ', mintedTokens)
      expect(mintedTokens).toBeDefined()
    } catch (e) {
      console.log('Mint multiple nfts error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT with uri', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
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
        provider: 'https://alfajores-forno.celo-testnet.org',
      })
      console.log('Mint nft with uri: ', mintedToken)
      expect(mintedToken).toBeDefined()
    } catch (e) {
      console.log('Mint nft with uri error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should burn NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        tokenId: tokenId,
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const burnt = await burnNFT(true, body, 'https://alfajores-forno.celo-testnet.org/')
      expect(burnt).toBeDefined()
      console.log('Burn nft: ', burnt)
    } catch (e) {
      console.log('Burn nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should prepare add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await prepareAddNFTMinter(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Prepare add nft minter: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Prepare add nft minter error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await sendAddNFTMinter(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Add nft minter: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Add nft minter error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should get NFT transactions by token', async () => {
    try {
      const tokenId = 1232423
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByToken(Currency.CELO, tokenId, tokenAddress, 1)
      expect(transactions).toBeDefined()
      console.log('Get transactions by token: ', transactions)
    } catch (e) {
      console.log('Get nft transactions by token error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT transactions by address', async () => {
    try {
      const address = '0x8ce4e40889a13971681391aad29e88efaf91f784'
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByAddress(Currency.CELO, address, tokenAddress, 1)
      expect(transactions).toBeDefined()
      console.log('Get transactions by address: ', transactions)
    } catch (e) {
      console.log('Get nft transactions by address error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs contract address', async () => {
    try {
      const txId = '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7'
      const transaction = await getNFTContractAddress(Currency.CELO, txId)
      expect(transaction).toBeDefined()
      console.log('Get nft contract address: ', transaction)
    } catch (e) {
      console.log('Get nft contract address error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs by address', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const address = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const nfts = await getNFTsByAddress(Currency.CELO, contractAddress, address)
      expect(nfts).toBeDefined()
      console.log('Get nfts by address: ', nfts)
    } catch (e) {
      console.log('Get nfts by address error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT provenance data', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const provenanceData = await getNFTProvenanceData(Currency.CELO, contractAddress, tokenId)
      expect(provenanceData).toBeDefined()
      console.log('Get nft provenance data: ', provenanceData)
    } catch (e) {
      console.log('Get nft provenance data error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT metadata uri', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const metadata = await getNFTMetadataURI(Currency.CELO, contractAddress, tokenId)
      expect(metadata).toBeDefined()
      console.log('Get nft metadata uri: ', metadata)
    } catch (e) {
      console.log('Get nft metadata uri error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT image', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const image = await getNFTImage(Currency.CELO, contractAddress, tokenId)
      expect(image).toBeDefined()
      console.log('Get nft image: ', image)
    } catch (e) {
      console.log('Get nft image error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT royalty', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const royalty = await getNFTRoyalty(Currency.CELO, contractAddress, tokenId)
      expect(royalty).toBeDefined()
      console.log('Get nft royalty: ', royalty)
    } catch (e) {
      console.log('Get nft royalty error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should create NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        tokenId: tokenId,
        url: '',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
      }
      const nft = await createNFT(true, body, readFileSync('/Users/marinajakcin/Downloads/pikachu.png'), 'Pokemon', 'Electric type')
      console.log('Create nft: ', nft)
    } catch (e) {
      console.log('Create nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should update cashback for royalty', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        tokenId: tokenId,
        chain: Currency.CELO,
        feeCurrency: Currency.CUSD,
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        cashbackValue: '0.25',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const cashback = await updateCashbackForAuthorNFT(true, body, 'https://alfajores-forno.celo-testnet.org/')
      console.log('Update royalty cashback: ', cashback)
      expect(cashback).toBeDefined()
    } catch (e) {
      console.log('Update royalty cashback error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
