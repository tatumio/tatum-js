import { ApiVersion, Eos, Network, TatumSDK } from '../../../service'
import { ApiKey, ApiKeyV3 } from '../../e2e.constant'
import { e2eUtil } from '../../e2e.util'

const getEosRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Eos>({
    network: testnet ? Network.EOS_TESTNET : Network.EOS,
    apiKey: {
      v4: testnet ? ApiKeyV3.testnet : ApiKey.mainnet,
    },
    version: ApiVersion.V3,
    retryCount: 1,
    retryDelay: 2000,
    verbose: e2eUtil.isVerbose,
  })

// Too unstable
describe.skip('eos', () => {
  describe('mainnet', () => {
    it('getInfo', async () => {
      const tatum = await getEosRpc()
      const result = await tatum.rpc.getInfo()
      expect(result).toBeDefined()
      expect(result).toHaveProperty('server_version')
      expect(result).toHaveProperty('chain_id')
      expect(result).toHaveProperty('head_block_num')
      expect(result).toHaveProperty('last_irreversible_block_num')
      expect(result).toHaveProperty('last_irreversible_block_id')
    })

    it('getAccount', async () => {
      const tatum = await getEosRpc()
      const result = await tatum.rpc.getAccount({ accountName: 'eosasia11111' })
      expect(result).toBeDefined()
      expect(result).toHaveProperty('account_name')
      expect(result).toHaveProperty('head_block_num')
      expect(result).toHaveProperty('head_block_time')
      expect(result).toHaveProperty('cpu_limit.used')
      expect(result).toHaveProperty('permissions')
      expect(result).toHaveProperty('total_resources.net_weight')
      expect(result).toHaveProperty('voter_info.owner')
    })

    it('getCurrencyStats', async () => {
      const tatum = await getEosRpc()
      const result = await tatum.rpc.getCurrencyStats({ code: 'eosio.token', symbol: 'EOS' })
      expect(result).toBeDefined()
      expect(result).toHaveProperty('EOS.max_supply')
      expect(result).toHaveProperty('EOS.issuer')
    })

    it('getCurrencyBalance', async () => {
      const tatum = await getEosRpc()
      const result = await tatum.rpc.getCurrencyBalance({
        code: 'eosio.token',
        symbol: 'EOS',
        account: 'eosio',
      })
      expect(result).toBeDefined()
      expect(result).toHaveLength(1)
    })

    it('getTableRows', async () => {
      const tatum = await getEosRpc()
      const result = await tatum.rpc.getTableRows({
        code: 'eosio',
        table: 'voters',
        scope: 'eosio',
        keyType: 'name',
        limit: 100,
        reverse: false,
        showPayer: false,
      })
      expect(result).toBeDefined()
    })
  })

  describe('testnet', () => {
    it('getNowBlock', async () => {
      const tatum = await getEosRpc(true)
      const result = await tatum.rpc.getInfo()
      expect(result).toBeDefined()
      expect(result).toHaveProperty('server_version')
      expect(result).toHaveProperty('chain_id')
      expect(result).toHaveProperty('head_block_num')
      expect(result).toHaveProperty('last_irreversible_block_num')
      expect(result).toHaveProperty('last_irreversible_block_id')
    })

    it('getCurrencyStats', async () => {
      const tatum = await getEosRpc(true)
      const result = await tatum.rpc.getCurrencyStats({ code: 'eosio.token', symbol: 'EOS' })
      expect(result).toBeDefined()
      expect(result).toHaveProperty('EOS.max_supply')
      expect(result).toHaveProperty('EOS.issuer')
    })

    it('getCurrencyBalance', async () => {
      const tatum = await getEosRpc(true)
      const result = await tatum.rpc.getCurrencyBalance({
        code: 'eosio.token',
        symbol: 'EOS',
        account: 'eosio',
      })
      expect(result).toBeDefined()
      expect(result).toHaveLength(1)
    })

    it('getTableRows', async () => {
      const tatum = await getEosRpc(true)
      const result = await tatum.rpc.getTableRows({
        code: 'eosio',
        table: 'voters',
        scope: 'eosio',
        keyType: 'name',
        limit: 100,
        reverse: false,
        showPayer: false,
      })
      expect(result).toBeDefined()
    })
  })
})
