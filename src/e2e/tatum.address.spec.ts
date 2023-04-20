import { Bitcoin, Dogecoin, Ethereum, Litecoin, Network } from '../dto'
import { TatumSDK } from '../service'
import { Status } from '../util'

describe('Address', () => {
  describe('Address Balance', () => {
    describe('getBalance EVM', () => {
      let tatumSDK: TatumSDK<Ethereum>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['0x514D547c8aC8ccBEc29b5144810454BD7d3625CA'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'ETH',
          decimals: 18,
          balance: '1',
          type: 'native',
        })
      })

      it('should get balance with native, erc20 and erc721 assets', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['0x514D547c8aC8CCBEc29B5144810454BD7D3625cB'],
        })
        expect(data).toHaveLength(3)
        expect(data[0]).toStrictEqual({
          asset: 'ETH',
          decimals: 18,
          balance: '0',
          type: 'native',
        })
        expect(data[1]).toStrictEqual({
          'balance': '1',
          'tokenAddress': '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          'tokenId': '31631000000000',
          'type': 'nft',
        })
        expect(data[2]).toStrictEqual({
          'asset': 'TDT',
          'balance': '100000000',
          'decimals': 2,
          'tokenAddress': '0x160bd7fba6f42f3b512bd08c827674fd25f15acc',
          'type': 'fungible',
        })
      })
    })

    describe('getBalance SOL', () => {
      let tatumSDK: TatumSDK<unknown>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init({ network: Network.SOLANA_DEVNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['5RMd4Uy6LVyJqMqNPYmerZdzBPCtyq964WBfhPdT2SWi'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'SOL',
          decimals: 9,
          balance: '2',
          type: 'native',
        })
      })
    })

    describe('getBalance BTC', () => {
      let tatumSDK: TatumSDK<Bitcoin>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'BTC',
          decimals: 8,
          balance: '0.001',
          type: 'native',
        })
      })
    })

    describe('getBalance DOGE', () => {
      let tatumSDK: TatumSDK<Dogecoin>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'DOGE',
          decimals: 8,
          balance: '433.53',
          type: 'native',
        })
      })
    })

    describe('getBalance LTC', () => {
      let tatumSDK: TatumSDK<Litecoin>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const { data } = await tatumSDK.address.getBalance({
          addresses: ['n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3'],
        })
        expect(data).toHaveLength(1)
        expect(data[0]).toStrictEqual({
          asset: 'LTC',
          decimals: 8,
          balance: '0.9981',
          type: 'native',
        })
      })
    })

    describe('getBalance CARDANO', () => {
      let tatumSDK: TatumSDK<unknown>
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
          decimals: 6,
          balance: '1053',
          type: 'native',
        })
      })
    })

    describe('getBalance XRP', () => {
      let tatumSDK: TatumSDK<unknown>
      beforeAll(async () => {
        tatumSDK = await TatumSDK.init({ network: Network.XRP_TESTNET, verbose: true })
      })
      it('should get balance with native assets only', async () => {
        const response = await tatumSDK.address.getBalance({
          addresses: ['rK2MUqCRuodSxyYjfregVuJyMgbVXgeyAG'],
        })
        expect(response.data).toHaveLength(1)
        expect(response.data[0]).toStrictEqual({
          asset: 'XRP',
          decimals: 6,
          balance: '1000',
          type: 'native',
        })
      })
    })
  })

  describe('getTransactions', () => {
    describe('getTransactions EVM', () => {
      let tatum: TatumSDK<Ethereum>
      beforeAll(async () => {
        tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA, verbose: true })
      })

      it('should get transactions - native only', async () => {
        const txs = await tatum.address.getTransactions({
          address: '0x514D547c8aC8ccBEc29b5144810454BD7d3625CA',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(1)
        expect(txs.data[0]).toStrictEqual({
          'address': '0x514d547c8ac8ccbec29b5144810454bd7d3625ca',
          'amount': '1',
          'blockNumber': 3325299,
          'chain': 'ethereum-sepolia',
          'counterAddress': '0x39d2ba91296029afbe725436b4824ca803e27391',
          'hash': '0xf4ef4715f9ba61f1fb606a32775a7bf281ddf7858092aeb3e0e0484d01957058',
          'timestamp': 1681982316000,
          'transactionIndex': 1,
          'transactionSubtype': 'incoming',
          'transactionType': 'native',
        })
      })

      it('should get transactions - tokens only', async () => {
        const txs = await tatum.address.getTransactions({
          address: '0x514D547c8aC8CCBEc29B5144810454BD7D3625cB',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(2)
        expect(txs.data[0]).toStrictEqual({
          'address': '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          'amount': '100000000',
          'blockNumber': 3325316,
          'chain': 'ethereum-sepolia',
          'counterAddress': '0x0000000000000000000000000000000000000000',
          'hash': '0x205d11d61bd00a4f2d079bf62df2d587a5c604a7082a5c17224d566d371a187a',
          'timestamp': 1681982568000,
          'tokenAddress': '0x160bd7fba6f42f3b512bd08c827674fd25f15acc',
          'transactionIndex': 0,
          'transactionSubtype': 'incoming',
          'transactionType': 'fungible',
        })
        expect(txs.data[1]).toStrictEqual({
          'address': '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          'amount': '1',
          'blockNumber': 3325305,
          'chain': 'ethereum-sepolia',
          'counterAddress': '0x0000000000000000000000000000000000000000',
          'hash': '0x06f2244b2650da68fd777da39d8cba5c0fb795ddd51d6c31aaca72fa1f76b3bd',
          'timestamp': 1681982412000,
          'tokenAddress': '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          'tokenId': '31631000000000',
          'transactionIndex': 0,
          'transactionSubtype': 'incoming',
          'transactionType': 'nft',
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
          'address': '0x514d547c8ac8ccbec29b5144810454bd7d3625cb',
          'amount': '1',
          'blockNumber': 3325305,
          'chain': 'ethereum-sepolia',
          'counterAddress': '0x0000000000000000000000000000000000000000',
          'hash': '0x06f2244b2650da68fd777da39d8cba5c0fb795ddd51d6c31aaca72fa1f76b3bd',
          'timestamp': 1681982412000,
          'tokenAddress': '0x211500d1960bdb7ba3390347ffd8ad486b897a18',
          'tokenId': '31631000000000',
          'transactionIndex': 0,
          'transactionSubtype': 'incoming',
          'transactionType': 'nft',
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
    })
    describe('getTransactions BITCOIN', () => {
      let tatum: TatumSDK<Bitcoin>
      beforeAll(async () => {
        tatum = await TatumSDK.init<Bitcoin>({ network: Network.BITCOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(3)
        expect(txs.data[0]).toStrictEqual({
          'address': 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          'amount': '0.001',
          'blockNumber': 2427655,
          'chain': 'bitcoin-testnet',
          'hash': '954b246cdebf7338f561e2fdfb869fedd75302e2b233f339639b36d880e9c983',
          'timestamp': 1680779879,
          'transactionType': 'incoming',
        })
        expect(txs.data[1]).toStrictEqual({
          'address': 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          'amount': '0.01796111',
          'blockNumber': 2427335,
          'chain': 'bitcoin-testnet',
          'hash': 'ea428edd33dbadf1c9fc11320ab8d4cac4a3b52fc5f086ab46c8b02c71b1e53e',
          'timestamp': 1680597327,
          'transactionType': 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          'address': 'tb1qrd9jz8ksy3qqm400vt296udlvk89z96p443mv0',
          'amount': '0.01796111',
          'blockNumber': 2427333,
          'chain': 'bitcoin-testnet',
          'hash': '74e2696c2009325ed39862d2e262bb2a0966d551ad0f1c37ac5cdfe8da937f2f',
          'timestamp': 1680596473,
          'transactionType': 'incoming',
        })
      })
    })
    describe('getTransactions DOGECOIN', () => {
      let tatum: TatumSDK<Dogecoin>
      beforeAll(async () => {
        tatum = await TatumSDK.init<Dogecoin>({ network: Network.DOGECOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          pageSize: 3,
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(3)
        expect(txs.data[0]).toStrictEqual({
          'address': 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          'amount': '100',
          'blockNumber': 4373218,
          'chain': 'doge-testnet',
          'hash': 'ad7e5d792ab7e45390d77b83c018ce2b95bd256b3956e76a5e6957a99d6aa7f1',
          'timestamp': 1680772129,
          'transactionType': 'incoming',
        })
        expect(txs.data[1]).toStrictEqual({
          'address': 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          'amount': '2',
          'blockNumber': 4334638,
          'chain': 'doge-testnet',
          'hash': 'b417a1b5ffa6aec9d6f6ba2895876ac9036353efc555bdb660194a5af3b88036',
          'timestamp': 1680110455,
          'transactionType': 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          'address': 'nqNmVv1PCPFbNQLBMbeKhW4YrswqEgpVsr',
          'amount': '2',
          'blockNumber': 4334636,
          'chain': 'doge-testnet',
          'hash': '7fd8c504d5af06b840fa2a95a256b22bbbc72285d1962daacac097326d4f4450',
          'timestamp': 1680110393,
          'transactionType': 'outgoing',
        })
      })
    })
    describe('getTransactions LITECOIN', () => {
      let tatum: TatumSDK<Litecoin>
      beforeAll(async () => {
        tatum = await TatumSDK.init<Litecoin>({ network: Network.LITECOIN_TESTNET, verbose: true })
      })

      it('should get transactions', async () => {
        const txs = await tatum.address.getTransactions({
          address: 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
        })
        expect(txs.status === Status.SUCCESS)
        expect(txs.data).toHaveLength(4)
        expect(txs.data[0]).toStrictEqual({
          'address': 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          'amount': '0.0009',
          'blockNumber': 2719828,
          'chain': 'litecoin-testnet',
          'hash': '7643cfd74bfd6cea2fc6f2b80ebbe03d3f1673125d445b63f23a32f83d1438c6',
          'timestamp': 1680110627,
          'transactionType': 'outgoing',
        })
        expect(txs.data[1]).toStrictEqual({
          'address': 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          'amount': '0.0009',
          'blockNumber': 2710828,
          'chain': 'litecoin-testnet',
          'hash': '19dfefa327abb9d26c37d466803527df7d55db53250b4acaf91d5d21681dcea0',
          'timestamp': 1679137321,
          'transactionType': 'outgoing',
        })
        expect(txs.data[2]).toStrictEqual({
          'address': 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          'amount': '0.0001',
          'blockNumber': 2710828,
          'chain': 'litecoin-testnet',
          'hash': '7980700a7df3e48b2ded2515f67c733039d0214315f2d1e3985c7633fe0f8e9c',
          'timestamp': 1679137321,
          'transactionType': 'outgoing',
        })
        expect(txs.data[3]).toStrictEqual({
          'address': 'n22dLZeTMRCUpaLMdgDcQzUXJJnfKcsnS3',
          'amount': '1',
          'blockNumber': 2710828,
          'chain': 'litecoin-testnet',
          'hash': '472329bfef53408df028c3689ed31767d52aa5cf4469762dff0f494b2e5d854d',
          'timestamp': 1679137321,
          'transactionType': 'incoming',
        })
      })
    })
  })
})
