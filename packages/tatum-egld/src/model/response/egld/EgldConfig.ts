/**
 *
 * @export
 * @interface EgldConfig
 */

export interface EgldConfig {
  erd_chain_id: string
  erd_denomination: number
  erd_gas_per_data_byte: number
  erd_gas_price_modifier: string
  erd_latest_tag_software_version: string
  erd_meta_consensus_group_size: number
  erd_min_gas_limit: number
  erd_min_gas_price: number
  erd_min_transaction_version: number
}
