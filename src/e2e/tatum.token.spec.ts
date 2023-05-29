import { Ethereum } from '../dto'
import { Network, TatumSDK } from '../service'

describe('Tatum token', () => {
  let tatum: TatumSDK<Ethereum>
  beforeAll(async () => {
    tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM_SEPOLIA,
      verbose: true,
      retryDelay: 1000,
      retryCount: 2,
    })
  })

  describe('token balances', () => {
    it('should get token balances', async () => {
      const { data: balance } = await tatum.token.getBalance({
        addresses: ['0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab'],
      })
      expect(balance).toBeDefined()
      expect(balance.length).toBe(2)
      expect(balance[0]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        balance: '100',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3582255,
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
        type: 'fungible',
      })
      expect(balance[1]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        balance: '200',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3582262,
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
        type: 'fungible',
      })
    })

    it('should get token balances - few addresses', async () => {
      const { data: balance } = await tatum.token.getBalance({
        addresses: [
          '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          '0xe7438d25519dcf7301238cb3ef8a824e805aa7f0',
        ],
      })
      expect(balance).toBeDefined()
      expect(balance.length).toBe(3)
      expect(balance[0]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        balance: '100',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3582255,
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
        type: 'fungible',
      })
      expect(balance[1]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        balance: '200',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3582262,
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
        type: 'fungible',
      })
      expect(balance[2]).toStrictEqual({
        address: '0xe7438d25519dcf7301238cb3ef8a824e805aa7f0',
        balance: '50',
        chain: 'ethereum-sepolia',
        lastUpdatedBlockNumber: 3582850,
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
        type: 'fungible',
      })
    })
  })

  describe('token transactions', () => {
    it('should get ERC20 transactions for address for all tokens', async () => {
      const { data: txs } = await tatum.token.getAllFungibleTransactions({
        addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
      })
      expect(txs).toHaveLength(2)
      expect(txs[0]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        amount: '200',
        blockNumber: 3582262,
        chain: 'ethereum-sepolia',
        counterAddress: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
        hash: '0xb6a77841bc1061a9fe19c529cbe1ae39e0031c7a772e4b0cdc8d4711f78c2e42',
        timestamp: 1685358648000,
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
        transactionIndex: 0,
        transactionSubtype: 'incoming',
        transactionType: 'fungible',
      })
      expect(txs[1]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        amount: '100',
        blockNumber: 3582255,
        chain: 'ethereum-sepolia',
        counterAddress: '0xabfdc940d6983bafe7634dcba7db02b0d00f9d63',
        hash: '0x9cf21dc47807067b55af950bc5d18637618961d0490ddc7d95a75154dcf9d37e',
        timestamp: 1685358564000,
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
        transactionIndex: 2,
        transactionSubtype: 'incoming',
        transactionType: 'fungible',
      })
    })

    it('should get ERC20 transactions for address for specific token', async () => {
      const { data: txs } = await tatum.token.getAllFungibleTransactions({
        addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
      })
      expect(txs).toHaveLength(1)
      expect(txs[0]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        amount: '200',
        blockNumber: 3582262,
        chain: 'ethereum-sepolia',
        counterAddress: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
        hash: '0xb6a77841bc1061a9fe19c529cbe1ae39e0031c7a772e4b0cdc8d4711f78c2e42',
        timestamp: 1685358648000,
        tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
        transactionIndex: 0,
        transactionSubtype: 'incoming',
        transactionType: 'fungible',
      })

      const { data: txs2 } = await tatum.token.getAllFungibleTransactions({
        addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
      })
      expect(txs).toHaveLength(1)
      expect(txs2[0]).toStrictEqual({
        address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        amount: '100',
        blockNumber: 3582255,
        chain: 'ethereum-sepolia',
        counterAddress: '0xabfdc940d6983bafe7634dcba7db02b0d00f9d63',
        hash: '0x9cf21dc47807067b55af950bc5d18637618961d0490ddc7d95a75154dcf9d37e',
        timestamp: 1685358564000,
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
        transactionIndex: 2,
        transactionSubtype: 'incoming',
        transactionType: 'fungible',
      })

      const { data: wrongSC } = await tatum.token.getAllFungibleTransactions({
        addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
        tokenAddress: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
      })
      expect(wrongSC).toHaveLength(0)
    })

    describe('should filter ERC20 transactions for address for all tokens', () => {
      it('blockFrom', async () => {
        const { data: txs } = await tatum.token.getAllFungibleTransactions({
          addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          blockFrom: 3582256,
        })
        expect(txs).toHaveLength(1)
        expect(txs[0]).toStrictEqual({
          address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          amount: '200',
          blockNumber: 3582262,
          chain: 'ethereum-sepolia',
          counterAddress: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
          hash: '0xb6a77841bc1061a9fe19c529cbe1ae39e0031c7a772e4b0cdc8d4711f78c2e42',
          timestamp: 1685358648000,
          tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'fungible',
        })
      })

      it('blockTo', async () => {
        const { data: txs } = await tatum.token.getAllFungibleTransactions({
          addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          blockTo: 3582261,
        })
        expect(txs).toHaveLength(1)
        expect(txs[0]).toStrictEqual({
          address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          amount: '100',
          blockNumber: 3582255,
          chain: 'ethereum-sepolia',
          counterAddress: '0xabfdc940d6983bafe7634dcba7db02b0d00f9d63',
          hash: '0x9cf21dc47807067b55af950bc5d18637618961d0490ddc7d95a75154dcf9d37e',
          timestamp: 1685358564000,
          tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
          transactionIndex: 2,
          transactionSubtype: 'incoming',
          transactionType: 'fungible',
        })
      })

      it('no txs by filter', async () => {
        const { data: txs } = await tatum.token.getAllFungibleTransactions({
          addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          blockFrom: 3582256,
          blockTo: 3582261,
        })
        expect(txs).toHaveLength(0)
      })

      it('both txs by filter', async () => {
        const { data: txs } = await tatum.token.getAllFungibleTransactions({
          addresses: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          blockFrom: 3582250,
          blockTo: 3582269,
        })
        expect(txs).toHaveLength(2)
        expect(txs[0]).toStrictEqual({
          address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          amount: '200',
          blockNumber: 3582262,
          chain: 'ethereum-sepolia',
          counterAddress: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
          hash: '0xb6a77841bc1061a9fe19c529cbe1ae39e0031c7a772e4b0cdc8d4711f78c2e42',
          timestamp: 1685358648000,
          tokenAddress: '0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'fungible',
        })
        expect(txs[1]).toStrictEqual({
          address: '0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab',
          amount: '100',
          blockNumber: 3582255,
          chain: 'ethereum-sepolia',
          counterAddress: '0xabfdc940d6983bafe7634dcba7db02b0d00f9d63',
          hash: '0x9cf21dc47807067b55af950bc5d18637618961d0490ddc7d95a75154dcf9d37e',
          timestamp: 1685358564000,
          tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
          transactionIndex: 2,
          transactionSubtype: 'incoming',
          transactionType: 'fungible',
        })
      })
    })
  })

  describe('Token metadata', () => {
    it('should get ERC20 token metadata', async function () {
      const { data: metadata } = await tatum.token.getTokenMetadata({
        tokenAddress: '0x5169fe503d6dacb7ac0495faa342ee9731892490',
      })
      expect(metadata).toStrictEqual({
        // chain: 'ethereum-sepolia', //TODO bug?
        cap: '10000000000000',
        decimals: 6,
        name: 'ERC_TEST_TEST_2',
        supply: '10000000000000',
        symbol: 'ERC_TEST_TEST_2',
        tokenType: 'fungible',
      })
    })
  })

  describe('Create token', () => {
    it.skip('should create ERC20 token', async () => {
      const result = await tatum.token.createNewFungibleToken({
        name: 'Test Token',
        symbol: 'TSTERC20_2',
        initialHolder: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
        initialSupply: '1000000',
        owner: '0x48fa1676cfd0dfa23a71829c4c6d56874a88fa48',
      })
      expect(result.data).toStrictEqual({ txId: expect.any(String) })
    })

    it('should get deployed sc address', async function () {
      const address = await tatum.rpc.getContractAddress(
        '0x2b04f0d7ffbd3380c4deb4cb428f8562ebbc38ae4a377ad420ce9bf1508ea47d',
      )
      expect(address).toStrictEqual('0x9b7d44c8d1f1f1bf42f596600c28431b567fcd40')
    })
  })
})
