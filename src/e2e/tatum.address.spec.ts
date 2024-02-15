import { Network } from '../dto'
import {
  ApiVersion,
  Bitcoin,
  Dogecoin,
  Ethereum,
  FullSdk,
  HorizenEon,
  Litecoin,
  Solana,
  TatumSDK,
  Tezos,
  Tron,
  Xrp,
} from '../service'
import { Status } from '../util'

describe.skip('Address', () => {
  describe('Address Balance', () => {
    describe('getBalance EVM', () => {
      let tatum: Ethereum

      beforeEach(async () => {
        tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM_SEPOLIA,
          apiKey: { v4: process.env.V2_API_KEY },
        })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
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
        const { data } = await tatum.address.getBalance({
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
        const { data } = await tatum.address.getBalance({
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
      let tatum: Solana
      beforeEach(async () => {
        tatum = await TatumSDK.init<Solana>({ network: Network.SOLANA_DEVNET })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
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
      let tatum: Bitcoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
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
      let tatum: Dogecoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
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
      let tatum: Litecoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
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
      let tatum: FullSdk

      beforeAll(async () => {
        tatum = await TatumSDK.init({ network: Network.CARDANO_ROSETTA_PREPROD })
      })

      it('should get balance with native assets only', async () => {
        const { data } = await tatum.address.getBalance({
          addresses: ['addr_test1vzs4u97282u69c89p740fxnmkz6kyngxhspekkrlnun9udssd5p9l'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'ADA',
          address: 'addr_test1vzs4u97282u69c89p740fxnmkz6kyngxhspekkrlnun9udssd5p9l',
          decimals: 6,
          balance: expect.any(String),
          type: 'native',
        })
      })
    })

    describe('getBalance XRP', () => {
      let tatum: Xrp

      beforeEach(async () => {
        tatum = await TatumSDK.init({ network: Network.XRP_TESTNET })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native assets only', async () => {
        const response = await tatum.address.getBalance({
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

    describe('getBalance Tezos', () => {
      let tatum: Tezos

      beforeEach(async () => {
        tatum = await TatumSDK.init<Tezos>({
          network: Network.TEZOS,
        })
      })

      it('should get all balances for address', async () => {
        const { data } = await tatum.address.getBalance({ address: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk' })
        expect(data.length).toBeGreaterThan(1)
        expect(data[0]).toStrictEqual({
          asset: 'XTZ',
          address: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk',
          balance: expect.any(String),
          type: 'native',
        })
      })

      it('should get balance for nft tokens only', async () => {
        const { data } = await tatum.address.getBalance({
          address: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk',
          tokenTypes: ['nft'],
        })
        expect(data.length).toBeGreaterThan(1)
        data.every((token) => expect(token.type).toBe('nft'))
      })
    })

    describe('getBalance Tron', () => {
      let tatum: Tron

      beforeEach(async () => {
        tatum = await TatumSDK.init<Tron>({
          network: Network.TRON_SHASTA,
          version: ApiVersion.V3,
        })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance with native and erc20 assets', async () => {
        const { data } = await tatum.address.getBalance({
          address: 'TBhC4DefkF79z1B8MBbXRjAhMsWk5r3VLf',
        })
        expect(data.length).toBeGreaterThan(1)
        expect(data[0]).toStrictEqual({
          asset: 'TRX',
          decimals: 6,
          address: 'TBhC4DefkF79z1B8MBbXRjAhMsWk5r3VLf',
          balance: expect.any(String),
          type: 'native',
        })
        expect(data[1]).toStrictEqual({
          asset: expect.any(String),
          decimals: 6,
          address: 'TBhC4DefkF79z1B8MBbXRjAhMsWk5r3VLf',
          balance: expect.any(String),
          type: 'fungible',
          tokenAddress: expect.any(String),
        })
      })
    })

    describe('getBalance EON', () => {
      let tatum: HorizenEon

      beforeEach(async () => {
        tatum = await TatumSDK.init({
          network: Network.HORIZEN_EON,
          version: ApiVersion.V4,
          apiKey: { v4: process.env.V2_API_KEY },
        })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get balance from eon network', async () => {
        const { data } = await tatum.address.getBalance({
          addresses: ['0xb056B90572e6d840409210d13b2742a0F6739337'],
        })
        expect(data.length).toBeGreaterThan(0)
      })
    })
  })

  describe('getTransactions', () => {
    describe('getTransactions EVM', () => {
      let tatum: Ethereum

      beforeEach(async () => {
        tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get transactions - native only', async () => {
        const txs = await tatum.address.getTransactions({
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
        const txs = await tatum.address.getTransactions({
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
        const txs = await tatum.address.getTransactions({
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
        const page1 = await tatum.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
          pageSize: 1,
        })
        const page2 = await tatum.address.getTransactions({
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

      it('should get transactions for specific contract', async () => {
        const tokenAddress = '0xdcF5D3E08c5007deCECDb34808C49331bD82a247'
        const txs = await tatum.address.getTransactions({
          tokenAddress,
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
        })
        expect(txs.status === Status.SUCCESS)
        // at least one transaction
        expect(txs.data).not.toHaveLength(0)
        expect(
          txs.data.forEach((tx) => expect(tx.tokenAddress?.toLowerCase()).toBe(tokenAddress.toLowerCase())),
        )
      })
    })
    describe('getTransactions BITCOIN', () => {
      let tatum: Bitcoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET })
      })

      afterEach(async () => {
        await tatum.destroy()
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
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

      it('should get transactions by block with cursor pagination', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          fromBlock: 2427335,
          toBlock: 2427654,
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(1)
        expect(txs.data[0]).toStrictEqual({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          amount: '0.01796111',
          blockNumber: 2427335,
          chain: 'bitcoin-testnet',
          hash: 'ea428edd33dbadf1c9fc11320ab8d4cac4a3b52fc5f086ab46c8b02c71b1e53e',
          timestamp: 1680597327,
          transactionType: 'outgoing',
        })
      })
    })
    describe('getTransactions DOGECOIN', () => {
      let tatum: Dogecoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET })
      })

      afterEach(async () => {
        await tatum.destroy()
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
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

      it('should get transactions by block with cursor pagination', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          fromBlock: 4334638,
          toBlock: 4373217,
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(1)
        expect(txs.data[0]).toStrictEqual({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          amount: '2',
          blockNumber: 4334638,
          chain: 'doge-testnet',
          hash: 'b417a1b5ffa6aec9d6f6ba2895876ac9036353efc555bdb660194a5af3b88036',
          timestamp: 1680110455,
          transactionType: 'outgoing',
        })
      })
    })
    describe('getTransactions LITECOIN', () => {
      let tatum: Litecoin

      beforeEach(async () => {
        tatum = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET })
      })

      afterEach(async () => {
        await tatum.destroy()
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
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

      it('should get transactions by block with cursor pagination', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          fromBlock: 2719828,
          toBlock: 2719829,
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(1)
        expect(txs.data[0]).toStrictEqual({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          amount: '0.0009',
          blockNumber: 2719828,
          chain: 'litecoin-testnet',
          hash: '7643cfd74bfd6cea2fc6f2b80ebbe03d3f1673125d445b63f23a32f83d1438c6',
          timestamp: 1680110627,
          transactionType: 'outgoing',
        })
      })
    })

    describe('getTransactions Tezos', () => {
      let tatum: Tezos

      beforeEach(async () => {
        tatum = await TatumSDK.init<Tezos>({ network: Network.TEZOS })
      })

      it('should get transactions - native only', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk',
        })
        expect(txs.status === Status.SUCCESS)
        // at least one transaction
        expect(txs.data.result).not.toHaveLength(0)
        expect(txs.data.result[0]).toStrictEqual({
          address: expect.any(String),
          amount: expect.any(String),
          blockNumber: expect.any(Number),
          chain: 'tezos-mainnet',
          counterAddress: expect.any(String),
          hash: expect.any(String),
          timestamp: expect.any(Number),
          transactionIndex: expect.any(Number),
          transactionSubtype: expect.any(String),
          transactionType: 'native',
        })
      })

      it('should get transactions by block with cursor pagination', async () => {
        const txs = await tatum.address.getTransactions({
          fromBlock: 3615470,
        })
        expect(txs.status === Status.SUCCESS)
        // at least one transaction
        expect(txs.data.result).not.toHaveLength(0)
        expect(txs.data.nextPage).not.toBe('')
        expect(txs.data.prevPage).not.toBe('')
        expect(txs.data.result[0]).toStrictEqual({
          address: expect.any(String),
          amount: expect.any(String),
          blockNumber: expect.any(Number),
          chain: 'tezos-mainnet',
          counterAddress: expect.any(String),
          hash: expect.any(String),
          timestamp: expect.any(Number),
          transactionIndex: expect.any(Number),
          transactionSubtype: expect.any(String),
          transactionType: 'native',
        })
      })
    })

    describe('getTransactions EON', () => {
      let tatum: HorizenEon

      beforeEach(async () => {
        tatum = await TatumSDK.init({
          network: Network.HORIZEN_EON,
          version: ApiVersion.V4,
          apiKey: { v4: process.env.V2_API_KEY },
        })
      })

      afterEach(() => {
        tatum.destroy()
      })

      it('should get transactions - native only', async () => {
        const txs = await tatum.address.getTransactions({
          address: '0xE9c542ceCD8c8aD86A3E53d4f695F4eaCE156515',
          transactionTypes: ['native'],
        })
        expect(txs.status === Status.SUCCESS)
        // at least one transaction
        expect(txs.data).not.toHaveLength(0)
        expect(txs.data[0]).toStrictEqual({
          address: expect.any(String),
          amount: expect.any(String),
          blockNumber: expect.any(Number),
          chain: 'eon-mainnet',
          counterAddress: expect.any(String),
          hash: expect.any(String),
          timestamp: expect.any(Number),
          transactionIndex: expect.any(Number),
          transactionSubtype: expect.any(String),
          transactionType: 'native',
        })
      })

      it('should get transactions - tokens only', async () => {
        const txs = await tatum.address.getTransactions({
          address: '0xE9c542ceCD8c8aD86A3E53d4f695F4eaCE156515',
          transactionTypes: ['nft'],
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).not.toHaveLength(0)
        expect(txs.data[0]).toStrictEqual({
          address: '0xe9c542cecd8c8ad86a3e53d4f695f4eace156515',
          amount: '1',
          blockNumber: 149413,
          chain: 'eon-mainnet',
          counterAddress: '0x0000000000000000000000000000000000000000',
          hash: '0x519b18c25965524b8d6a687c18818131450d2c812e90761cff4ff93e8984d4fc',
          timestamp: 1690923199000,
          tokenAddress: '0x6ea7d015342b7eb7344f7ebf0150234f41f524d6',
          tokenId: '38',
          transactionIndex: 0,
          transactionSubtype: 'incoming',
          transactionType: 'nft',
        })
      })
    })
  })
})
