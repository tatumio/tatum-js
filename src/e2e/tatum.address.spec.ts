import { Network } from '../dto'
import { BaseTatumSdk, Bitcoin, Dogecoin, Ethereum, Litecoin, Solana, TatumSDK, Xrp } from '../service'
import { Status } from '../util'

describe('Address', () => {
  describe('Address Balance', () => {
    describe('getBalance EVM', () => {
      let client: Ethereum
      beforeAll(async () => {
        client = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['0x514D547c8aC8ccBEc29b5144810454BD7d3625CA'],
        })
        expect(data).toHaveLength(2)
        expect(data[0]).toStrictEqual({
          asset: 'ETH',
          decimals: 18,
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
          balance: expect.any(String),
          type: 'native',
        })
      })

      it('should get balance with native assets only for 2 addresses', async () => {
        const { data } = await client.address.getBalance({
          addresses: [
            '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
            '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
          ],
        })
        expect(data).toHaveLength(3)
        expect(data[0]).toStrictEqual({
          asset: 'ETH',
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
          decimals: 18,
          balance: expect.any(String),
          type: 'native',
        })
        expect(data[1]).toStrictEqual({
          asset: 'ETH',
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
          decimals: 18,
          balance: expect.any(String),
          type: 'native',
        })
      })

      it('should get balance with native, erc20 and erc721 assets', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['0x514D547c8aC8CCBEc29B5144810454BD7D3625cB'],
        })
        expect(data).toHaveLength(3)
        expect(data[0]).toStrictEqual({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
          asset: 'ETH',
          decimals: 18,
          balance: '0',
          type: 'native',
        })
        expect(data[1]).toStrictEqual({
          address: '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          balance: '1',
          tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          tokenId: '31631000000000',
          type: 'nft',
        })
        expect(data[2]).toStrictEqual({
          address: '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          asset: 'TDT',
          balance: '100000000',
          decimals: 2,
          tokenAddress: '0x160bd7fba6f42f3b512bd08c827674fd25f15acc',
          type: 'fungible',
        })
      })
    })

    describe('getBalance SOL', () => {
      let client: Solana
      beforeAll(async () => {
        client = await TatumSDK.init<Solana>({ network: Network.SOLANA_DEVNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['5RMd4Uy6LVyJqMqNPYmerZdzBPCtyq964WBfhPdT2SWi'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          address: '5RMd4Uy6LVyJqMqNPYmerZdzBPCtyq964WBfhPdT2SWi',
          asset: 'SOL',
          decimals: 9,
          balance: '2',
          type: 'native',
        })
      })
    })

    describe('getBalance BTC', () => {
      let client: Bitcoin
      beforeAll(async () => {
        client = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'BTC',
          decimals: 8,
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          balance: '0.001',
          type: 'native',
        })
      })
    })

    describe('getBalance DOGE', () => {
      let client: Dogecoin
      beforeAll(async () => {
        client = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'DOGE',
          decimals: 8,
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          balance: '433.53',
          type: 'native',
        })
      })
    })

    describe('getBalance LTC', () => {
      let client: Litecoin
      beforeAll(async () => {
        client = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await client.address.getBalance({
          addresses: ['n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'LTC',
          decimals: 8,
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          balance: '0.9981',
          type: 'native',
        })
      })
    })

    describe('getBalance CARDANO', () => {
      let tatumSDK: BaseTatumSdk
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init({ network: Network.CARDANO_PREPROD, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['addr_test1vzs4u97282u69c89p740fxnmkz6kyngxhspekkrlnun9udssd5p9l'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'ADA',
          address: 'addr_test1vzs4u97282u69c89p740fxnmkz6kyngxhspekkrlnun9udssd5p9l',
          decimals: 6,
          balance: '44',
          type: 'native',
        })
      })
    })

    describe('getBalance XRP', () => {
      let client: Xrp
      beforeAll(async () => {
        client = await TatumSDK.init({ network: Network.XRP_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const response = await client.address.getBalance({
          addresses: ['rK2MUqCRuodSxyYjfregVuJyMgbVXgeyAG'],
        })
        expect(response.data).toHaveLength(1)
        expect(response.data[0]).toStrictEqual({
          asset: 'XRP',
          address: 'rK2MUqCRuodSxyYjfregVuJyMgbVXgeyAG',
          decimals: 6,
          balance: '1000',
          type: 'native',
        })
      })
    })
  })

  describe('getTransactions', () => {
    describe('getTransactions EVM', () => {
      let client: Ethereum
      beforeAll(async () => {
        client = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      })

      it('should get transactions - native only', async () => {
        const txs = await client.address.getTransactions({
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
          transactionTypes: ['native'],
        })
        expect(txs.status === Status.SUCCESS)
        // at least one transaction
        expect(txs.data).not.toHaveLength(0)
        expect(txs.data[0]).toStrictEqual({
          address: expect.any(String),
          amount: expect.any(String),
          blockNumber: expect.any(Number),
          chain: 'ethereum-sepolia',
          counterAddress: expect.any(String),
          hash: expect.any(String),
          timestamp: expect.any(Number),
          transactionIndex: expect.any(Number),
          transactionSubtype: expect.any(String),
          transactionType: 'native',
        })
      })

      it('should get transactions - tokens only', async () => {
        const txs = await client.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(2)
        expect(txs.data[0]).toStrictEqual({
          address: '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          amount: '100000000',
          blockNumber: 3325316,
          chain: 'ethereum-sepolia',
          counterAddress: '0x0000000000000000000000000000000000000000',
          hash: '0x205d11d61bd00a4f2d079bf62df2d587a5c604a7082a5c17224d566d371a187a',
          timestamp: 1681982568000,
          tokenAddress: '0x160bd7fba6f42f3b512bd08c827674fd25f15acc',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'fungible',
        })
        expect(txs.data[1]).toStrictEqual({
          address: '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          amount: '1',
          blockNumber: 3325305,
          chain: 'ethereum-sepolia',
          counterAddress: '0x0000000000000000000000000000000000000000',
          hash: '0x06f2244b2650da68fd777da39d8cba5c0fb795ddd51d6c31aaca72fa1f76b3bd',
          timestamp: 1681982412000,
          tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          tokenId: '31631000000000',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'nft',
        })
      })
      it('should get transactions - NFT tokens only', async () => {
        const txs = await client.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
          transactionTypes: ['nft'],
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(1)
        expect(txs.data[0]).toStrictEqual({
          address: '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          amount: '1',
          blockNumber: 3325305,
          chain: 'ethereum-sepolia',
          counterAddress: '0x0000000000000000000000000000000000000000',
          hash: '0x06f2244b2650da68fd777da39d8cba5c0fb795ddd51d6c31aaca72fa1f76b3bd',
          timestamp: 1681982412000,
          tokenAddress: '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          tokenId: '31631000000000',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'nft',
        })
      })
      it('should get transactions - pagination', async () => {
        const page1 = await client.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
          pageSize: 1,
        })
        const page2 = await client.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
          pageSize: 1,
          page: 1,
        })
        expect(page1.status === Status.SUCCESS)
        expect(page2.status === Status.SUCCESS)
        expect(page1.data).toHaveLength(1)
        expect(page2.data).toHaveLength(1)
        expect(page2.data[0].hash).not.toBe(page1.data[0].hash)
      })
    })
    describe('getTransactions BITCOIN', () => {
      let client: Bitcoin
      beforeAll(async () => {
        client = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await client.address.getTransactions({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(3)
        expect(txs.data[0]).toStrictEqual({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          amount: '0.001',
          blockNumber: 2427655,
          chain: 'bitcoin-testnet',
          hash: '954b246cdebf7338f561e2fdfb869fedd75302e2b233f339639b36d880e9c983',
          timestamp: 1680779879,
          transactionType: 'incoming',
        })
        expect(txs.data[1]).toStrictEqual({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          amount: '0.01796111',
          blockNumber: 2427335,
          chain: 'bitcoin-testnet',
          hash: 'ea428edd33dbadf1c9fc11320ab8d4cac4a3b52fc5f086ab46c8b02c71b1e53e',
          timestamp: 1680597327,
          transactionType: 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          amount: '0.01796111',
          blockNumber: 2427333,
          chain: 'bitcoin-testnet',
          hash: '74e2696c2009325ed39862d2e262bb2a0966d551ad0f1c37ac5cdfe8da937f2f',
          timestamp: 1680596473,
          transactionType: 'incoming',
        })
      })
    })
    describe('getTransactions DOGECOIN', () => {
      let client: Dogecoin
      beforeAll(async () => {
        client = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await client.address.getTransactions({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          pageSize: 3,
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(3)
        expect(txs.data[0]).toStrictEqual({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          amount: '100',
          blockNumber: 4373218,
          chain: 'doge-testnet',
          hash: 'ad7e5d792ab7e45390d77b83c018ce2b95bd256b3956e76a5e6957a99d6aa7f1',
          timestamp: 1680772129,
          transactionType: 'incoming',
        })
        expect(txs.data[1]).toStrictEqual({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          amount: '2',
          blockNumber: 4334638,
          chain: 'doge-testnet',
          hash: 'b417a1b5ffa6aec9d6f6ba2895876ac9036353efc555bdb660194a5af3b88036',
          timestamp: 1680110455,
          transactionType: 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          amount: '2',
          blockNumber: 4334636,
          chain: 'doge-testnet',
          hash: '7fd8c504d5af06b840fa2a95a256b22bbbc72285d1962daacac097326d4f4450',
          timestamp: 1680110393,
          transactionType: 'outgoing',
        })
      })
    })
    describe('getTransactions LITECOIN', () => {
      let client: Litecoin
      beforeAll(async () => {
        client = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await client.address.getTransactions({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(4)
        expect(txs.data[0]).toStrictEqual({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          amount: '0.0009',
          blockNumber: 2719828,
          chain: 'litecoin-testnet',
          hash: '7643cfd74bfd6cea2fc6f2b80ebbe03d3f1673125d445b63f23a32f83d1438c6',
          timestamp: 1680110627,
          transactionType: 'outgoing',
        })
        expect(txs.data[1]).toStrictEqual({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          amount: '0.0009',
          blockNumber: 2710828,
          chain: 'litecoin-testnet',
          hash: '19dfefa327abb9d26c37d466803527df7d55db53250b4acaf91d5d21681dcea0',
          timestamp: 1679137321,
          transactionType: 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          amount: '0.0001',
          blockNumber: 2710828,
          chain: 'litecoin-testnet',
          hash: '7980700a7df3e48b2ded2515f67c733039d0214315f2d1e3985c7633fe0f8e9c',
          timestamp: 1679137321,
          transactionType: 'outgoing',
        })
        expect(txs.data[3]).toStrictEqual({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          amount: '1',
          blockNumber: 2710828,
          chain: 'litecoin-testnet',
          hash: '472329bfef53408df028c3689ed31767d52aa5cf4469762dff0f494b2e5d854d',
          timestamp: 1679137321,
          transactionType: 'incoming',
        })
      })
    })
  })
})
