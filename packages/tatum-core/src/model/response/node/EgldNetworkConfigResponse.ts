export interface EgldNetworkConfigResponse {
  code: string
  data: {
    config: {
      erd_chain_id: string
      erd_denomination: number
      erd_gas_per_data_byte: number
      erd_gas_price_modifier: string
      erd_latest_tag_software_version: string
      erd_max_gas_per_transaction: number
      erd_meta_consensus_group_size: number
      erd_min_gas_limit: number
      erd_min_gas_price: number
      erd_min_transaction_version: number
      erd_num_metachain_nodes: number
      erd_num_nodes_in_shard: number
      erd_num_shards_without_meta: number
      erd_rewards_top_up_gradient_point: string
      erd_round_duration: number
      erd_rounds_per_epoch: number
      erd_shard_consensus_group_size: number
      erd_start_time: number
      erd_top_up_factor: string
    }
  }
  error: ''
}
