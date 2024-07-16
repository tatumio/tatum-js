/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockLimits } from './BlockLimits';
import type { ConfigProposalSetup } from './ConfigProposalSetup';
import type { GasLimitPrices } from './GasLimitPrices';
import type { JettonBridgeParams } from './JettonBridgeParams';
import type { MisbehaviourPunishmentConfig } from './MisbehaviourPunishmentConfig';
import type { MsgForwardPrices } from './MsgForwardPrices';
import type { OracleBridgeParams } from './OracleBridgeParams';
import type { SizeLimitsConfig } from './SizeLimitsConfig';
import type { ValidatorsSet } from './ValidatorsSet';
import type { WorkchainDescr } from './WorkchainDescr';

export type BlockchainConfig = {
    /**
     * config address
     */
    '0': string;
    /**
     * elector address
     */
    '1': string;
    /**
     * minter address
     */
    '2': string;
    /**
     * The address of the transaction fee collector.
     */
    '3'?: string;
    /**
     * dns root address
     */
    '4': string;
    '5'?: {
        blackhole_addr?: string;
        fee_burn_nom: number;
        fee_burn_denom: number;
    };
    /**
     * Minting fees of new currencies.
     */
    '6'?: {
        mint_new_price: number;
        mint_add_price: number;
    };
    /**
     * The volume of each of the additional currencies in circulation.
     */
    '7'?: {
        currencies: Array<{
            currency_id: number;
            amount: string;
        }>;
    };
    /**
     * The network version and additional capabilities supported by the validators.
     */
    '8'?: {
        version: number;
        capabilities: number;
    };
    /**
     * List of mandatory parameters of the blockchain config.
     */
    '9'?: {
        mandatory_params: Array<number>;
    };
    /**
     * List of critical TON parameters, the change of which significantly affects the network, so more voting rounds are held.
     */
    '10'?: {
        critical_params: Array<number>;
    };
    /**
     * This parameter indicates under what conditions proposals to change the TON configuration are accepted.
     */
    '11'?: {
        normal_params: ConfigProposalSetup;
        critical_params: ConfigProposalSetup;
    };
    /**
     * Workchains in the TON Blockchain
     */
    '12'?: {
        workchains: Array<WorkchainDescr>;
    };
    /**
     * The cost of filing complaints about incorrect operation of validators.
     */
    '13'?: {
        deposit: number;
        bit_price: number;
        cell_price: number;
    };
    /**
     * The reward in nanoTons for block creation in the TON blockchain.
     */
    '14'?: {
        masterchain_block_fee: number;
        basechain_block_fee: number;
    };
    /**
     * The reward in nanoTons for block creation in the TON blockchain.
     */
    '15'?: {
        validators_elected_for: number;
        elections_start_before: number;
        elections_end_before: number;
        stake_held_for: number;
    };
    /**
     * The limits on the number of validators in the TON blockchain.
     */
    '16'?: {
        max_validators: number;
        max_main_validators: number;
        min_validators: number;
    };
    /**
     * The stake parameters configuration in the TON blockchain.
     */
    '17'?: {
        min_stake: string;
        max_stake: string;
        min_total_stake: string;
        max_stake_factor: number;
    };
    /**
     * The prices for data storage.
     */
    '18'?: {
        storage_prices: Array<{
            utime_since: number;
            bit_price_ps: number;
            cell_price_ps: number;
            mc_bit_price_ps: number;
            mc_cell_price_ps: number;
        }>;
    };
    /**
     * The cost of computations in the masterchain. The complexity of any computation is estimated in gas units.
     */
    '20'?: {
        gas_limits_prices: GasLimitPrices;
    };
    /**
     * The cost of computations in the basechains. The complexity of any computation is estimated in gas units.
     */
    '21'?: {
        gas_limits_prices: GasLimitPrices;
    };
    /**
     * The limits on the block in the masterchain, upon reaching which the block is finalized and the callback of the remaining messages (if any) is carried over to the next block.
     */
    '22'?: {
        block_limits: BlockLimits;
    };
    /**
     * The limits on the block in the basechains, upon reaching which the block is finalized and the callback of the remaining messages (if any) is carried over to the next block.
     */
    '23'?: {
        block_limits: BlockLimits;
    };
    /**
     * The cost of sending messages in the masterchain of the TON blockchain.
     */
    '24'?: {
        msg_forward_prices: MsgForwardPrices;
    };
    /**
     * The cost of sending messages in the basechains of the TON blockchain.
     */
    '25'?: {
        msg_forward_prices: MsgForwardPrices;
    };
    /**
     * The configuration for the Catchain protocol.
     */
    '28'?: {
        mc_catchain_lifetime: number;
        shard_catchain_lifetime: number;
        shard_validators_lifetime: number;
        shard_validators_num: number;
        flags?: number;
        shuffle_mc_validators?: boolean;
    };
    /**
     * The configuration for the consensus protocol above catchain.
     */
    '29'?: {
        flags?: number;
        new_catchain_ids?: boolean;
        round_candidates: number;
        next_candidate_delay_ms: number;
        consensus_timeout_ms: number;
        fast_attempts: number;
        attempt_duration: number;
        catchain_max_deps: number;
        max_block_bytes: number;
        max_collated_bytes: number;
        proto_version?: number;
        catchain_max_blocks_coeff?: number;
    };
    /**
     * The configuration for the consensus protocol above catchain.
     */
    '31'?: {
        fundamental_smc_addr: Array<string>;
    };
    '32'?: ValidatorsSet;
    '33'?: ValidatorsSet;
    '34'?: ValidatorsSet;
    '35'?: ValidatorsSet;
    '36'?: ValidatorsSet;
    '37'?: ValidatorsSet;
    /**
     * The configuration for punishment for improper behavior (non-validation). In the absence of the parameter, the default fine size is 101 TON
     */
    '40'?: {
        misbehaviour_punishment_config: MisbehaviourPunishmentConfig;
    };
    /**
     * The size limits and some other characteristics of accounts and messages.
     */
    '43'?: {
        size_limits_config: SizeLimitsConfig;
    };
    /**
     * suspended accounts
     */
    '44': {
        accounts: Array<string>;
        suspended_until: number;
    };
    /**
     * Bridge parameters for wrapping TON in other networks.
     */
    '71'?: {
        oracle_bridge_params: OracleBridgeParams;
    };
    /**
     * Bridge parameters for wrapping TON in other networks.
     */
    '72'?: {
        oracle_bridge_params: OracleBridgeParams;
    };
    /**
     * Bridge parameters for wrapping TON in other networks.
     */
    '73'?: {
        oracle_bridge_params: OracleBridgeParams;
    };
    /**
     * Bridge parameters for wrapping tokens from other networks into tokens on the TON network.
     */
    '79'?: {
        jetton_bridge_params: JettonBridgeParams;
    };
    /**
     * Bridge parameters for wrapping tokens from other networks into tokens on the TON network.
     */
    '81'?: {
        jetton_bridge_params: JettonBridgeParams;
    };
    /**
     * Bridge parameters for wrapping tokens from other networks into tokens on the TON network.
     */
    '82'?: {
        jetton_bridge_params: JettonBridgeParams;
    };
    /**
     * config boc in hex format
     */
    raw: string;
};
