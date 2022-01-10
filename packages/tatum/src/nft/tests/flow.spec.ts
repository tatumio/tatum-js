import {
  Currency,
  getNFTImage,
  getNFTMetadataURI,
  getNFTRoyalty,
  getNFTsByAddress,
  deployNFT,
  mintNFT,
  createNFT,
  burnNFT,
  transferNFT,
  mintNFTWithUri,
  mintMultipleNFTWithUri,
} from '@tatumio/tatum-defi'
import { FlowBurnNft, FlowMintMultipleNft, FlowDeployNft, FlowMintNft, FlowTransferNft } from '../../../../tatum-flow/src/model/request'
import { readFileSync } from 'fs'

describe('NFT tests - FLOW', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy NFT', async () => {
    try {
      const body: FlowDeployNft = {
        chain: Currency.FLOW,
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        account: '0xbb560ab889b51461',
      }
      const deployToken = await deployNFT(true, body, 'http://access.devnet.nodes.onflow.org:9000')
      console.log('Deploy nft: ', deployToken)
      expect(deployToken).not.toBeNull()
    } catch (e) {
      console.log('Deploy nft errror: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint NFT token', async () => {
    try {
      const body: FlowMintNft = {
        chain: Currency.FLOW,
        to: '0xbb560ab889b51461',
        account: '0xbb560ab889b51461',
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        contractAddress: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
        url: 'test.com',
      }
      const mintedToken = await mintNFT(body)
      console.log('Mint nft: ', mintedToken)
      expect(mintedToken).not.toBeNull()
    } catch (e) {
      console.log('Mint nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should transfer NFT', async () => {
    try {
      const tokenId = new Date().getTime() + 2
      const body: FlowTransferNft = {
        chain: Currency.FLOW,
        to: '0xbb560ab889b51461',
        tokenId: tokenId.toString(),
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        contractAddress: '0xf74ff0da670D30d020638323e3C0EA9d3bE41A4C',
        account: '0xbb560ab889b51461',
      }
      const sendErc721Token = await transferNFT(true, body, 'http://access.devnet.nodes.onflow.org:9000')
      console.log('Transfer nft: ', sendErc721Token)
      expect(sendErc721Token).not.toBeNull()
    } catch (e) {
      console.log('Transfer nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should mint multiple NFTs', async () => {
    try {
      const body: FlowMintMultipleNft = {
        to: ['0xbb560ab889b51461', '0xbb560ab889b51461'],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        contractAddress: '0xf74ff0da670D30d020638323e3C0EA9d3bE41A4C',
        chain: Currency.FLOW,
        account: '0xbb560ab889b51461',
      }
      const mintedTokens = await mintMultipleNFTWithUri(true, body, 'http://access.devnet.nodes.onflow.org:9000')
      console.log('Mint multiple nfts: ', mintedTokens)
      expect(mintedTokens).not.toBeNull()
    } catch (e) {
      console.log('Mint multiple nfts error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should mint NFT with uri', async () => {
    try {
      const body: FlowMintNft = {
        chain: Currency.FLOW,
        to: '0xbb560ab889b51461',
        url: 'ipfs://bafkreicq2uidgocra7z64ix5cx5zwn2sixatpn7hdvzk36hnsgwatrfuc4',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        account: '0xbb560ab889b51461',
      }
      const mintedToken = await mintNFTWithUri(body, {
        provider: 'http://access.devnet.nodes.onflow.org:9000',
      })
      console.log('Mint nft with uri error: ', mintedToken)
      expect(mintedToken).not.toBeNull()
    } catch (e) {
      console.log('Mint nft with uri error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should burn NFT', async () => {
    try {
      const tokenId = new Date().getTime() + 5
      const body: FlowBurnNft = {
        tokenId: tokenId.toString(),
        contractAddress: '0x4de1444b31da20D863fC2CeDDD47557CE19bd284',
        chain: Currency.FLOW,
        privateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        account: '0xbb560ab889b51461',
      }
      const burnt = await burnNFT(true, body, 'http://access.devnet.nodes.onflow.org:9000')
      expect(burnt).not.toBeNull()
      console.log('Burn nft: ', burnt)
    } catch (e) {
      console.log('Burn nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should get NFTs by address', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const address = '0xbb560ab889b51461'
      const nftsByAddress = await getNFTsByAddress(Currency.FLOW, contractAddress, address)
      expect(nftsByAddress).not.toBeNull()
      console.log('Get nfts by address: ', nftsByAddress)
    } catch (e) {
      console.log('Get nfts by address error ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT metadata uri', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const metadata = await getNFTMetadataURI(Currency.FLOW, contractAddress, tokenId)
      expect(metadata).not.toBeNull()
      console.log('Get nfts metadata uri: ', metadata)
    } catch (e) {
      console.log('Get nfts metadata uri error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get NFT image', async () => {
    try {
      const contractAddress = '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc'
      const tokenId = '1641548895528'
      const image = await getNFTImage(Currency.FLOW, contractAddress, tokenId)
      expect(image).not.toBeNull()
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
      const royalty = await getNFTRoyalty(Currency.FLOW, contractAddress, tokenId)
      expect(royalty).not.toBeNull()
      console.log('Get nft royalty: ', royalty)
    } catch (e) {
      console.log('Get nft royalty error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should create NFT', async () => {
    try {
      const tokenId = new Date().getTime() + 6
      const body = {
        to: '0xbb560ab889b51461',
        chain: Currency.FLOW,
        tokenId: tokenId.toString(),
        url: '',
        fromPrivateKey: '93164602cae1c7cec1339e3ada423db2ffbeac0c007eee4e282066c0b6aef914',
        contractAddress: '0x2A42ae2a6346eEbC7FE2b2b7f02158634d5390dc',
      }
      const nft = await createNFT(
        true,
        body,
        readFileSync('/Users/marinajakcin/Downloads/pikachu.png'),
        'Pokemon',
        'Electric type',
        undefined,
        'http://access.devnet.nodes.onflow.org:9000'
      )

      console.log('Create nft: ', nft)
    } catch (e) {
      console.log('create nft error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
