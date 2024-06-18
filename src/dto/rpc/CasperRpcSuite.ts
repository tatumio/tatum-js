/* eslint-disable @typescript-eslint/no-explicit-any */

import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface AccountPutDeployResponse {
  api_version: string
  deploy_hash: string
}

export type BlockIdentifier = string | number

export interface ApiVersion {
  api_version: string
}

export interface SpeculativeExecRequest {
  deploy: any
  block_identifier?: BlockIdentifier
}

export interface SpeculativeExecResponse extends ApiVersion {
  block_hash: string
  execution_result: any
}

interface Block {
  body: {
    deploy_hashes: string[];
    proposer: string;
    transfer_hashes: string[];
  };
  hash: string;
  header: {
    accumulated_seed: string;
    body_hash: string;
    era_end?: {
      era_report: {
        equivocators: string[];
        inactive_validators: string[];
        rewards: {
          amount: number;
          validator: string;
        }[];
      };
      next_era_validator_weights: {
        validator: string;
        weight: string;
      }[];
    };
    era_id: number;
    height: number;
    parent_hash: string;
    protocol_version: string;
    random_bit: boolean;
    state_root_hash: string;
    timestamp: string;
  };
  proofs: {
    public_key: string;
    signature: string;
  }[];
}

export interface ChainGetBlockResponse {
  api_version: string;
  block?: Block;
}

export interface Transfer {
  amount: string;
  deploy_hash: string;
  from: string;
  gas: string;
  id: string | null;
  source: string;
  target: string;
  to: string | null;
}

export interface ChainGetBlockTransfersResponse {
  api_version: string;
  block_hash?: string;
  transfers?: Transfer[];
}

interface Delegator {
  delegator_public_key: string;
  validator_public_key: string;
  amount: string;
}

interface Validator {
  validator_public_key: string;
  amount: string;
}

interface SeigniorageAllocation {
  Delegator?: Delegator;
  Validator?: Validator;
}

interface EraInfo {
  seigniorage_allocations: SeigniorageAllocation[];
}

interface StoredValue {
  EraInfo: EraInfo;
}

export interface EraSummary {
  block_hash: string;
  era_id: number;
  stored_value: StoredValue;
  state_root_hash: string;
  merkle_proof: string;
}

export interface ChainGetEraSummaryResponse {
  api_version: string;
  era_summary?: EraSummary;
}

export interface ChainGetStateRootHashResponse {
  api_version: string;
  state_root_hash?: string;
}

export interface ChainspecRawBytes {
  chainspec_bytes: string;
  maybe_genesis_accounts_bytes: string | null;
  maybe_global_state_bytes: string | null;
}

export interface InfoGetChainspecResponse {
  api_version: string;
  chainspec_bytes: ChainspecRawBytes;
}

interface Approval {
  signature: string;
  signer: string;
}

interface DeployHeader {
  account: string;
  body_hash: string;
  chain_name: string;
  dependencies: string[];
  gas_price: number;
  timestamp: string;
  ttl: string;
}

interface StoredContractByName {
  args: [string, { bytes: string; cl_type: string; parsed: any }][];
  entry_point: string;
  name: string;
}

interface TransferDeploy {
  args: [string, { bytes: string; cl_type: string; parsed: any }][];
}

interface Payment {
  StoredContractByName: StoredContractByName;
}

interface Session {
  Transfer: TransferDeploy;
}

interface Deploy {
  approvals: Approval[];
  hash: string;
  header: DeployHeader;
  payment: Payment;
  session: Session;
}

interface ExecutionResult {
  block_hash: string;
  result: {
    Success?: {
      cost: string;
      effect: {
        operations: { key: string; kind: string }[];
        transforms: { key: string; transform: { AddUInt64?: number; Identity?: string } }[];
      };
      transfers: string[];
    };
  };
}

export interface InfoGetDeployResponse {
  api_version: string;
  deploy: Deploy;
  execution_results: ExecutionResult[];
}

export interface InfoGetDeployRequest {
  deploy_hash: string
  finalized_approvals?: boolean
}

export interface PurseIdentifier {
  main_purse_under_account_hash: string;
}

export interface StateIdentifier {
  BlockHash: string;
}

export interface QueryBalanceResponse {
  api_version: string;
  balance: string;
}

export interface QueryBalanceRequest {
  purse_identifier: PurseIdentifier,
  state_identifier: StateIdentifier
}

export interface StateIdentifierQueryGlobalState  {
  BlockHash?: string;
  StateRootHash?: string;
}

export interface BlockHeader {
  accumulated_seed: string;
  body_hash: string;
  era_end?: any;
  era_id: number;
  height: number;
  parent_hash: string;
  protocol_version: string;
  random_bit: boolean;
  state_root_hash: string;
  timestamp: string;
}

export interface StoredValueQueryGlobalState {
  Account?: any;
}

export interface QueryGlobalStateResponse {
  api_version: string;
  block_header?: BlockHeader;
  stored_value: StoredValueQueryGlobalState;
  merkle_proof: string;
}

export interface QueryGlobalStateRequest {
  key: string
  path: string[]
  state_identifier: StateIdentifierQueryGlobalState
}

interface ActionThresholds {
  deployment: number;
  key_management: number;
}

interface AssociatedKey {
  account_hash: string;
  weight: number;
}

export interface Account {
  account_hash: string;
  action_thresholds: ActionThresholds;
  associated_keys: AssociatedKey[];
  main_purse: string;
  named_keys: any[];
}

export interface StateGetAccountInfoResponse {
  api_version: string;
  account: Account;
  merkle_proof: string;
}

export interface StateGetAccountInfoRequest {
  block_identifier: BlockIdentifier
  public_key: string
}

export interface DictionaryIdentifier {
  URef?: {
    dictionary_item_key: string;
    seed_uref: string;
  };
  AccountNamedKey?: {
    dictionary_item_key: string;
    key: string;
    dictionary_name: string;
  };
  ContractNamedKey?: {
    dictionary_item_key: string;
    key: string;
    dictionary_name: string;
  };
  Dictionary?: {
    seed: string;
    dictionary_item_key: string;
  };
}

export interface StoredValeStateGetDictionary {
  CLValue?: {
    bytes: string;
    cl_type: string;
    parsed: any;
  };
}

export interface StateGetDictionaryItemResponse {
  api_version: string;
  dictionary_key: string;
  stored_value: StoredValeStateGetDictionary;
  merkle_proof: string;
}

export interface StateGetDictionaryItemRequest {
  state_root_hash: string,
  dictionary_identifier: DictionaryIdentifier
}

interface AvailableBlockRange {
  low: number;
  high: number;
}

interface BlockSynchronizerStatus {
  historical: {
    block_hash: string;
    block_height: number;
    acquisition_state: string;
  };
  forward: {
    block_hash: string;
    block_height: number;
    acquisition_state: string;
  };
}

interface MinimalBlockInfo {
  hash: string;
  timestamp: string;
  era_id: number;
  height: number;
  state_root_hash: string;
  creator: string;
}

interface NextUpgrade {
  activation_point: number;
  protocol_version: string;
}

interface Peer {
  node_id: string;
  address: string;
}

export interface InfoGetStatusResponse {
  api_version: string;
  available_block_range: AvailableBlockRange;
  block_sync: BlockSynchronizerStatus;
  build_version: string;
  chainspec_name: string;
  last_added_block_info: MinimalBlockInfo;
  last_progress: string;
  next_upgrade: NextUpgrade;
  our_public_signing_key: string;
  peers: Peer[];
  reactor_state: string;
  round_length: string;
  starting_state_root_hash: string | null;
  uptime: string;
}

export interface CasperRpcSuite {
  accountPutDeploy(deploy: any): Promise<JsonRpcResponse<AccountPutDeployResponse>>

  speculativeExec(request: SpeculativeExecRequest): Promise<JsonRpcResponse<SpeculativeExecResponse>>

  chainGetBlock(block_identifier: BlockIdentifier): Promise<JsonRpcResponse<ChainGetBlockResponse>>

  chainGetBlockTransfers(block_identifier: BlockIdentifier): Promise<JsonRpcResponse<ChainGetBlockTransfersResponse>>

  chainGetEraSummary(block_identifier?: BlockIdentifier): Promise<JsonRpcResponse<ChainGetEraSummaryResponse>>

  chainGetStateRootHash(block_identifier?: BlockIdentifier): Promise<JsonRpcResponse<ChainGetStateRootHashResponse>>

  infoGetChainspec(): Promise<JsonRpcResponse<InfoGetChainspecResponse>>

  infoGetDeploy(params: InfoGetDeployRequest): Promise<JsonRpcResponse<InfoGetDeployResponse>>

  queryBalance(params: QueryBalanceRequest): Promise<JsonRpcResponse<QueryBalanceResponse>>

  queryGlobalState(params: QueryGlobalStateRequest): Promise<JsonRpcResponse<QueryGlobalStateResponse>>

  stateGetAccountInfo(params: StateGetAccountInfoRequest): Promise<JsonRpcResponse<StateGetAccountInfoResponse>>

  stateGetDictionaryItem(params: StateGetDictionaryItemRequest): Promise<JsonRpcResponse<StateGetDictionaryItemResponse>>

  infoGetStatus(): Promise<JsonRpcResponse<InfoGetStatusResponse>>
}
