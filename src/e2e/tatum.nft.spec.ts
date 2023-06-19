import { Ethereum, Network, TatumSDK } from '../service'

describe('Tatum NFT', () => {
  let client: Ethereum
  beforeAll(async () => {
    client = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      verbose: true,
      retryDelay: 1000,
      retryCount: 2,
    })
  })
  describe('NFT balances', () => {
    it('should get NFT balances', async () => {
      const { data: balance } = await client.nft.getBalance({
        addresses: ['0x53e8577c4347c365e4e0da5b57a589cb6f2ab849'],
      })
      expect(balance).toBeDefined()
      expect(balance.length).toBe(2)
      expect(balance[0]).toStrictEqual({
        address: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        balance: '1',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3306734,
        metadata: {
          description: 'I said there was no time to explain, and I stand by that.',
          image: 'ipfs://bafybeidfjqmasnpu6z7gvn7l6wthdcyzxh5uystkky3xvutddbapchbopi/no-time-to-explain.jpeg',
          name: 'No time to explain!',
        },
        metadataURI: 'ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json',
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
        tokenId: '1395688000000000',
        type: 'nft',
      })
      expect(balance[1]).toStrictEqual({
        address: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        balance: '10',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3306757,
        metadata: {},
        metadataURI: 'https://tatum.io/1.json',
        tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        tokenId: '1',
        type: 'multitoken',
      })
    })
  })

  describe('NFT transactions', () => {
    it('should get NFT transactions for a specific NFT token', async () => {
      const { data: txs } = await client.nft.getAllNftTransactions({
        tokenId: '1395688000000000',
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
      })
      expect(txs).toHaveLength(2)
      expect(txs[0]).toStrictEqual({
        address: '0x0000000000000000000000000000000000000000',
        amount: '-1',
        blockNumber: 3306734,
        chain: 'ethereum-sepolia',
        counterAddress: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        hash: '0x541344714046757387c2c807e0f9afb9105822f214a75bd88139418d7d0494f9',
        timestamp: 1681724700000,
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
        tokenId: '1395688000000000',
        transactionIndex: 0,
        transactionSubtype: 'outgoing',
        transactionType: 'nft',
      })
      expect(txs[1]).toStrictEqual({
        address: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        amount: '1',
        blockNumber: 3306734,
        chain: 'ethereum-sepolia',
        counterAddress: '0x0000000000000000000000000000000000000000',
        hash: '0x541344714046757387c2c807e0f9afb9105822f214a75bd88139418d7d0494f9',
        timestamp: 1681724700000,
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
        tokenId: '1395688000000000',
        transactionIndex: 0,
        transactionSubtype: 'incoming',
        transactionType: 'nft',
      })
    })
    it('should get NFT transactions for a specific NFT token on the address', async () => {
      const { data: txs } = await client.nft.getAllNftTransactionsByAddress({
        addresses: ['0x53e8577c4347c365e4e0da5b57a589cb6f2ab849'],
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
      })
      expect(txs).toHaveLength(1)
      expect(txs[0]).toStrictEqual({
        address: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        amount: '1',
        blockNumber: 3306734,
        chain: 'ethereum-sepolia',
        counterAddress: '0x0000000000000000000000000000000000000000',
        hash: '0x541344714046757387c2c807e0f9afb9105822f214a75bd88139418d7d0494f9',
        timestamp: 1681724700000,
        tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
        tokenId: '1395688000000000',
        transactionIndex: 0,
        transactionSubtype: 'incoming',
        transactionType: 'nft',
      })
    })
  })

  describe('NFT owners', () => {
    it('should get NFT owners for a specific NFT token', async () => {
      const { data: owner } = await client.nft.getNftOwner({
        tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        tokenId: '1',
      })
      expect(owner).toHaveLength(1)
      expect(owner[0]).toBe('0x53e8577c4347c365e4e0da5b57a589cb6f2ab849')
    })

    it('should not get NFT owners for a specific NFT token - no such token', async () => {
      const { data: owner } = await client.nft.getNftOwner({
        tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        tokenId: '10',
      })
      expect(owner).toHaveLength(0)
    })

    it('check if NFT is owned by a specific address', async () => {
      expect(
        await client.nft.checkNftOwner({
          tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
          tokenId: '1',
          owner: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        }),
      ).toBeTruthy()
    })

    it('check if NFT is owned by a specific address - not the owner', async () => {
      expect(
        await client.nft.checkNftOwner({
          tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
          tokenId: '10',
          owner: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
        }),
      ).toBeFalsy()
    })
  })

  describe('NFT collections', () => {
    it('should get small collection', async function () {
      const { data: collection } = await client.nft.getNftsInCollection({
        collectionAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
      })
      expect(collection).toHaveLength(1)
      expect(collection[0]).toStrictEqual({
        chain: 'ethereum-sepolia',
        metadata: {},
        metadataURI: 'https://tatum.io/1.json',
        tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        tokenId: '1',
        tokenType: 'multitoken',
      })
    })

    it('should get small collection without metadata', async function () {
      const { data: collection } = await client.nft.getNftsInCollection({
        collectionAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        excludeMetadata: true,
      })
      expect(collection).toHaveLength(1)
      expect(collection[0]).toStrictEqual({
        chain: 'ethereum-sepolia',
        metadataURI: 'https://tatum.io/1.json',
        tokenAddress: '0xf31a94466dd524a9e711d5599c470b1f65b3b4d8',
        tokenId: '1',
        tokenType: 'multitoken',
      })
    })

    it('should get big collection with pagination', async function () {
      const { data: collectionPage1 } = await client.nft.getNftsInCollection({
        collectionAddress: '0x55d5f0a37488d6734c33c6c3c6a2234a75f2e521',
        excludeMetadata: true,
        pageSize: 10,
      })
      expect(collectionPage1).toHaveLength(10)
      const { data: collectionPage2 } = await client.nft.getNftsInCollection({
        collectionAddress: '0x55d5f0a37488d6734c33c6c3c6a2234a75f2e521',
        excludeMetadata: true,
        pageSize: 10,
        page: 1,
      })
      expect(collectionPage2).toHaveLength(10)
      expect(collectionPage2[0]).not.toStrictEqual(collectionPage1[0])
    })
  })

  describe('NFT metadata', () => {
    it('should get NFT Metadata for NFT', async function () {
      const { data: metadata } = await client.nft.getNftMetadata({
        tokenAddress: '0x55d5f0a37488d6734c33c6c3c6a2234a75f2e521',
        tokenId: '1',
      })
      expect(metadata).toStrictEqual({
        chain: 'ethereum-sepolia',
        metadata: {},
        metadataURI: 'https://ipfs.io/ipfs/Qmd2nfNC5eA285BPTBd9R2ijK96UQM3DWPaqLopVHZ6doW',
        tokenAddress: '0x55d5f0a37488d6734c33c6c3c6a2234a75f2e521',
        tokenId: '1',
        tokenType: 'nft',
      })
    })
  })

  describe.skip('Create collections', () => {
    it('should create NFT ERC721 collection', async () => {
      const result = await client.nft.createNftCollection({
        name: 'Test Collection',
        symbol: 'TST',
        owner: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
      })
      expect(result.data).toStrictEqual({ txId: expect.any(String) })
    })

    it('should create NFT ERC1155 collection', async () => {
      const result = await client.nft.createMultiTokenNftCollection({
        owner: '0x53e8577c4347c365e4e0da5b57a589cb6f2ab849',
      })
      expect(result.data).toStrictEqual({ txId: expect.any(String) })
    })
  })
})
