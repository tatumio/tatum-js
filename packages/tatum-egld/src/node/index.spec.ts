import { networkConfig } from '.'

describe('httpDriver', () => {
  process.env.TATUM_API_KEY = 'be8215a0-7504-40b3-9ae2-6667554b56f8'
  it('should call core api network config', async () => {
    expect(await networkConfig()).toEqual({
      code: 'successful',
      data: {
        config: {
          erd_chain_id: 'D',
          erd_denomination: 18,
          erd_gas_per_data_byte: 1500,
          erd_gas_price_modifier: '0.01',
          erd_latest_tag_software_version: 'D1.2.38.0',
          erd_max_gas_per_transaction: 600000000,
          erd_meta_consensus_group_size: 58,
          erd_min_gas_limit: 50000,
          erd_min_gas_price: 1000000000,
          erd_min_transaction_version: 1,
          erd_num_metachain_nodes: 58,
          erd_num_nodes_in_shard: 58,
          erd_num_shards_without_meta: 3,
          erd_rewards_top_up_gradient_point: '2000000000000000000000000',
          erd_round_duration: 6000,
          erd_rounds_per_epoch: 1200,
          erd_shard_consensus_group_size: 21,
          erd_start_time: 1623690000,
          erd_top_up_factor: '0.500000',
        },
      },
      error: '',
    })
  })
})
