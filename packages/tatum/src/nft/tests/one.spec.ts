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

describe('NFT tests - HARMONY', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy NFT', async () => {
    try {
      const body = {
        chain: Currency.ONE,
        symbol: 'ERC_SYMBOL',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        name: 'TestToken',
      }
      const deployToken = await deployNFT(true, body)
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
        chain: Currency.ONE,
        to: 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499',
        tokenId: tokenId,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        url: 'test.com',
        authorAdresses: ['one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499'],
        cashbackValues: ['0.3'],
      }
      const mintedToken = await mintNFT(body)
      console.log('Mint nft', mintedToken)
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
        chain: Currency.ONE,
        to: 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499',
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
      console.log('Transfer nft: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Transfer nft error:', e.esponse.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint multiple NFTs', async () => {
    try {
      const firstTokenId = new Date().getTime() + 12
      const secondTokenId = firstTokenId + 9
      const body = {
        chain: Currency.ONE,
        to: ['one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499', 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xf74ff0da670D30d020638323e3C0EA9d3bE41A4C',
        cashbackValues: [['0.3'], ['0.3']],
        authorAddresses: [
          ['one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499', 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499'],
          ['one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499', 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499'],
        ],
      }
      const mintedTokens = await mintMultipleNFTWithUri(true, body)
      console.log('Mint multiple nfts: ', mintedTokens)
      expect(mintedTokens).toBeDefined()
    } catch (e) {
      console.log('Mint multiple nfts error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT with uri', async () => {
    try {
      const tokenId = new Date().getTime().toString() + 11
      const body = {
        chain: Currency.ONE,
        to: 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499',
        url: 'ipfs://bafkreicq2uidgocra7z64ix5cx5zwn2sixatpn7hdvzk36hnsgwatrfuc4',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        tokenId: tokenId,
        authorAddresses: ['one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499'],
        cashbackValues: ['0.30'],
      }
      const mintedToken = await mintNFTWithUri(body, {
        testnet: true,
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
        chain: Currency.ONE,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const burnt = await burnNFT(true, body)
      expect(burnt).toBeDefined()
      console.log('Burn nft: ', burnt)
    } catch (e) {
      console.log('Burn nft error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should prepare add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.ONE,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await prepareAddNFTMinter(true, body)
      console.log('Prepare nft minter: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Prepare nft minter error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should add NFT minter', async () => {
    try {
      const body = {
        minter: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        chain: Currency.ONE,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
      }
      const sendErc721Token = await sendAddNFTMinter(true, body)
      console.log('Add nft minter: ', sendErc721Token)
      expect(sendErc721Token).toBeDefined()
    } catch (e) {
      console.log('Add nft minter error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT transactions by token', async () => {
    try {
      const tokenId = 1232423
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByToken(Currency.ONE, tokenId, tokenAddress, 1)
      expect(transactions).toBeDefined()
      console.log('Get nft transactions by token: ', transactions)
    } catch (e) {
      console.log('Get nft transactions by token error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT transactions by address', async () => {
    try {
      const address = 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499		'
      const tokenAddress = '0x1ce4e40889a13971681391aad29e88efaf91f784'
      const transactions = await getNFTTransactionsByAddress(Currency.ONE, address, tokenAddress, 1)
      expect(transactions).toBeDefined()
      console.log('Get nft transactions by address: ', transactions)
    } catch (e) {
      console.log('Get nft transactions by address error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs contract address', async () => {
    try {
      const txId = '0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7'
      const transaction = await getNFTTransaction(Currency.ONE, txId)
      expect(transaction).toBeDefined()
      console.log('Get nft contract address: ', transaction)
    } catch (e) {
      console.log('Get nft contract address error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFTs by address', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const address = 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499		'
      const nftsByAddress = await getNFTsByAddress(Currency.ONE, contractAddress, address)
      expect(nftsByAddress).toBeDefined()
      console.log('Get nfts by address: ', nftsByAddress)
    } catch (e) {
      console.log('Get nfts by address error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT provenance data', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const provenanceData = await getNFTProvenanceData(Currency.ONE, contractAddress, tokenId)
      expect(provenanceData).toBeDefined()
      console.log('Get nft provenance data: ', provenanceData)
    } catch (e) {
      console.log('Get nft provenance data error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT metadata uri', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const metadata = await getNFTMetadataURI(Currency.ONE, contractAddress, tokenId)
      expect(metadata).toBeDefined()
      console.log('Get nft metadata uri: ', metadata)
    } catch (e) {
      console.log('Get nft metadata uri error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT image', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const image = await getNFTImage(Currency.ONE, contractAddress, tokenId)
      expect(image).toBeDefined()
      console.log('Get nft image: ', image)
    } catch (e) {
      console.log('Get nft image error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT royalty', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const royalty = await getNFTRoyalty(Currency.ONE, contractAddress, tokenId)
      expect(royalty).toBeDefined()
      console.log('Get nft royalty: ', royalty)
    } catch (e) {
      console.log('Get nft royalty error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should create NFT', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        to: 'one1l7egc0r6rvvnszm7ned8h032lud20f00sdz499',
        chain: Currency.ONE,
        tokenId: tokenId,
        url: '',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
      }
      const nft = await createNFT(true, body, readFileSync('/Users/marinajakcin/Downloads/pikachu.png'), 'Pokemon', 'Electric type')
      console.log('Create nft: ', nft)
    } catch (e) {
      console.log('Create nft error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should update cashback for royalty', async () => {
    try {
      const tokenId = new Date().getTime().toString()
      const body = {
        tokenId: tokenId,
        chain: Currency.ONE,
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        cashbackValue: '0.3',
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
      }
      const cashback = await updateCashbackForAuthorNFT(true, body)
      console.log('Update royalty cashback: ', cashback)
      expect(cashback).toBeDefined()
    } catch (e) {
      console.log('Update royalty cashback error:', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
