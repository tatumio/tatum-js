/* eslint-disable @typescript-eslint/no-explicit-any */

import { CardanoRpcSuite } from './CardanoRpcSuite'

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  PROPOSAL_STATUS_VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
  PROPOSAL_STATUS_PASSED = 'PROPOSAL_STATUS_PASSED',
  PROPOSAL_STATUS_REJECTED = 'PROPOSAL_STATUS_REJECTED',
  PROPOSAL_STATUS_FAILED = 'PROPOSAL_STATUS_FAILED',
}

export interface PaginationRequest {
  'pagination.key'?: string
  'pagination.offset'?: number
  'pagination.limit'?: number
  'pagination.countTotal'?: boolean
  'pagination.reverse'?: boolean
}

interface Proposal {
  proposal_id: string;
  content: {
    "@type": string;
    title: string;
    description: string;
  };
  status: string;
  final_tally_result: {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
  };
  submit_time: string;
  deposit_end_time: string;
  total_deposit: {
    denom: string;
    amount: string;
  }[];
  voting_start_time: string;
  voting_end_time: string;
}

interface PubKey {
  "@type": string;
  key: string;
}

interface Account {
  "@type": string;
  address: string;
  pub_key: PubKey;
  account_number: string;
  sequence: string;
}

interface PaginationResponse {
  next_key: string;
  total: string;
}

export interface GetAllProposalsResponse {
  proposals: Proposal[];
  pagination: PaginationResponse;
}

export interface GetAccountsResponse {
  accounts: Account[];
  pagination: PaginationResponse;
}

export interface GetAccountDetailsRequest {
  address: string;
}

export interface GetAccountDetailsResponse {
  account: Account;
}

interface Params {
  max_memo_characters: string;
  tx_sig_limit: string;
  tx_size_cost_per_byte: string;
  sig_verify_cost_ed25519: string;
  sig_verify_cost_secp256k1: string;
}

export interface GetAllParamsResponse {
  params: Params;
}

export interface GetAllBalancesRequest extends PaginationRequest {
  address: string;
}

interface Balance {
  denom: string;
  amount: string;
}

export interface GetAllBalancesResponse {
  balances: Balance[];
  pagination: PaginationResponse;
}

interface DenomUnit {
  denom: string;
  exponent: number;
  aliases: string[];
}

interface Metadata {
  description: string;
  denom_units: DenomUnit[];
  base: string;
  display: string;
  name: string;
  symbol: string;
}

export interface GetDenomsMetadataResponse {
  metadatas: Metadata[];
  pagination: PaginationResponse;
}

export interface GetDenomMetadataRequest {
  denom: string;
}

interface DenomUnit {
  denom: string;
  exponent: number;
  aliases: string[];
}

interface Metadata {
  description: string;
  denom_units: DenomUnit[];
  base: string;
  display: string;
  name: string;
  symbol: string;
}

export interface GetDenomMetadataResponse {
  metadata: Metadata;
}


interface BankParams {
  send_enabled: any[];
  default_send_enabled: boolean;
}

export interface GetBankParamsResponse {
  params: BankParams;
}

interface CoinSupply {
  denom: string;
  amount: string;
}

export interface GetTotalSupplyResponse {
  supply: CoinSupply[];
  pagination: PaginationResponse;
}

export interface GetSupplyOfCoinRequest {
  denom: string;
}

interface CoinSupplyAmount {
  denom: string;
  amount: string;
}

export interface GetSupplyOfCoinResponse {
  amount: CoinSupplyAmount;
}

interface BlockData {
  txs: string[];
}

interface Block {
  header: BlockHeader;
  data: BlockData;
  evidence: Evidence;
  last_commit: LastCommit;
}

export interface GetLatestBlockResponse {
  block_id: BlockID;
  block: Block;
}

export interface GetBlockByHeightRequest {
  height: number;
}

interface BlockID {
  hash: string;
  part_set_header: {
    total: number;
    hash: string;
  };
}

interface BlockHeader {
  version: {
    block: string;
    app: string;
  };
  chain_id: string;
  height: string;
  time: string;
  last_block_id: BlockID;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}

interface Evidence {
  evidence: any[];
}

interface CommitSignature {
  block_id_flag: string;
  validator_address: string;
  timestamp: string;
  signature: string;
}

interface LastCommit {
  height: string;
  round: number;
  block_id: BlockID;
  signatures: CommitSignature[];
}

export interface GetBlockByHeightResponse {
  block_id: BlockID;
  block: Block;
}

interface ProtocolVersion {
  p2p: string;
  block: string;
  app: string;
}

interface DefaultNodeInfo {
  protocol_version: ProtocolVersion;
  default_node_id: string;
  listen_addr: string;
  network: string;
  version: string;
  channels: string;
  moniker: string;
  other: {
    tx_index: string;
    rpc_address: string;
  };
}

interface BuildDependency {
  path: string;
  version: string;
  sum: string;
}

interface ApplicationVersion {
  name: string;
  app_name: string;
  version: string;
  git_commit: string;
  build_tags: string;
  go_version: string;
  build_deps: BuildDependency[];
  cosmos_sdk_version: string;
}

export interface GetNodeInfoResponse {
  default_node_info: DefaultNodeInfo;
  application_version: ApplicationVersion;
}

export interface GetSyncingResponse {
  syncing: boolean;
}

interface ValidatorPubKey {
  "@type": string;
  key: string;
}

interface Validator {
  address: string;
  pub_key: ValidatorPubKey;
  voting_power: string;
  proposer_priority: string;
}


export interface GetLatestValidatorSetResponse {
  block_height: string;
  validators: Validator[];
  pagination: PaginationResponse;
}

export interface GetValidatorSetByHeightRequest extends PaginationRequest {
  height: number;
}

export interface GetValidatorSetByHeightResponse {
  block_height: string;
  validators: Validator[];
  pagination: PaginationResponse;
}

interface CommunityPoolCoin {
  denom: string;
  amount: string;
}

export interface GetCommunityPoolResponse {
  pool: CommunityPoolCoin[];
}

interface Reward {
  denom: string;
  amount: string;
}

interface ValidatorReward {
  validator_address: string;
  reward: Reward[];
}

export interface GetDelegationTotalRewardsResponse {
  rewards: ValidatorReward[];
  total: Reward[];
}

export interface GetDelegationTotalRewardsRequest {
  delegator_address: string;
}

interface Reward {
  denom: string;
  amount: string;
}

export interface GetDelegationRewardsResponse {
  rewards: Reward[];
}

export interface GetDelegationRewardsRequest {
  delegator_address: string;
  validator_address: string;
}

export interface GetDelegatorValidatorsResponse {
  validators: string[];
}
export interface GetDelegatorValidatorsRequest {
  delegator_address: string;
}

export interface GetDelegatorWithdrawAddressResponse {
  withdraw_address: string;
}

export interface GetDelegatorWithdrawAddressRequest {
  delegator_address: string;
}

interface DistributionParams {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}

export interface GetDistributionParamsResponse {
  params: DistributionParams;
}

interface CommissionAmount {
  denom: string;
  amount: string;
}

interface ValidatorCommission {
  commission: CommissionAmount[];
}

export interface GetValidatorCommissionResponse {
  commission: ValidatorCommission;
}

export interface GetValidatorCommissionRequest {
  validator_address: string;
}

interface OutstandingRewardsAmount {
  denom: string;
  amount: string;
}

interface ValidatorOutstandingRewards {
  rewards: OutstandingRewardsAmount[];
}

export interface GetValidatorOutstandingRewardsResponse {
  rewards: ValidatorOutstandingRewards;
}

export interface GetValidatorOutstandingRewardsRequest {
  validator_address: string;
}

interface SlashEvent {
  validator_period: string;
  fraction: string;
}

export interface GetValidatorSlashesResponse {
  slashes: SlashEvent[];
  pagination: PaginationResponse;
}

export interface GetValidatorSlashesRequest extends PaginationRequest {
  validator_address: string;
  starting_height?: number;
  ending_height?: number;
}

export interface GetAllEvidenceResponse {
  evidence: Evidence[];
  pagination: PaginationResponse;
}

export interface GetGovernanceParamsResponse {
  voting_params: {
    voting_period: string;
  };
  deposit_params: {
    min_deposit: any[];
    max_deposit_period: string;
  };
  tally_params: {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  };
}
export interface GetGovernanceParamsRequest {
  params_type: 'voting' | 'tallying' | 'deposit';
}

interface Proposal {
  proposal_id: string;
  content: {
    "@type": string;
    title: string;
    description: string;
  };
  status: string;
  final_tally_result: {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
  };
  submit_time: string;
  deposit_end_time: string;
  total_deposit: {
    denom: string;
    amount: string;
  }[];
  voting_start_time: string;
  voting_end_time: string;
}

export interface GetAllProposalsResponse {
  proposals: Proposal[];
  pagination: PaginationResponse;
}

export interface GetAllProposalsRequest extends PaginationRequest {
  proposal_status?: ProposalStatus;
  voter?: string;
  depositor?: string;
}

export interface GetProposalDetailsResponse {
  proposal: Proposal;
}

export interface GetProposalDetailsRequest {
  proposal_id: number;
}

export interface GetDepositsResponse {
  deposits: {
    depositor: string;
    amount: Reward[];
  }[];
  pagination: PaginationResponse;
}

export interface GetDepositsRequest {
  proposal_id: number;
}

export interface GetTallyResultResponse {
  tally: {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
  };
}

export interface GetTallyResultRequest {
  proposal_id: number;
}

interface VoteOption {
  option: string;
  weight: string;
}

interface Vote {
  proposal_id: string;
  voter: string;
  option: string;
  options: VoteOption[];
}

interface SlashEvent {
  validator_period: string;
  fraction: string;
}

export interface GetVotesResponse {
  votes: Vote[];
  pagination: PaginationResponse;
}

export interface GetVotesRequest extends PaginationRequest {
  proposal_id: number;
}

interface Proposal {
  proposal_id: string;
  content: {
    "@type": string;
    title: string;
    description: string;
  };
  status: string;
  final_tally_result: {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
  };
  submit_time: string;
  deposit_end_time: string;
  total_deposit: {
    denom: string;
    amount: string;
  }[];
  voting_start_time: string;
  voting_end_time: string;
}

export interface GetTallyResultResponse {
  tally: {
    yes: string;
    abstain: string;
    no: string;
    no_with_veto: string;
  };
}

export interface GetTallyResultRequest {
  proposal_id: number;
}

export interface GetVotesResponse {
  votes: Vote[];
  pagination: PaginationResponse;
}

export interface GetVotesRequest extends PaginationRequest {
  proposal_id: number;
}

export interface GetVoteResponse {
  vote: Vote;
}

export interface GetVoteRequest {
  proposal_id: number;
  voter: string;
}

export interface GetAnnualProvisionsResponse {
  annual_provisions: string;
}

export interface GetInflationResponse {
  inflation: string;
}

interface MintingParams {
  mint_denom: string;
  inflation_rate_change: string;
  inflation_max: string;
  inflation_min: string;
  goal_bonded: string;
  blocks_per_year: string;
}

export interface GetMintingParamsResponse {
  params: MintingParams;
}

export interface GetSpecificParamResponse {
  param: {
    subspace: string;
    key: string;
    value: string;
  };
}

export interface GetSpecificParamRequest {
  subspace: string;
  key: string;
}

interface SlashingParams {
  signed_blocks_window: string;
  min_signed_per_window: string;
  downtime_jail_duration: string;
  slash_fraction_double_sign: string;
  slash_fraction_downtime: string;
}

export interface GetSlashingParamsResponse {
  params: SlashingParams;
}

interface SigningInfo {
  address: string;
  start_height: string;
  index_offset: string;
  jailed_until: string;
  tombstoned: boolean;
  missed_blocks_counter: string;
}

export interface GetSigningInfosResponse {
  info: SigningInfo[];
  pagination: PaginationResponse;
}

interface SigningInfo {
  address: string;
  start_height: string;
  index_offset: string;
  jailed_until: string;
  tombstoned: boolean;
  missed_blocks_counter: string;
}

export interface GetSigningInfoByConsAddressResponse {
  val_signing_info: SigningInfo;
}

export interface GetSigningInfoByConsAddressRequest {
  cons_address: string;
}

interface Coin {
  denom: string;
  amount: string;
}

interface Delegation {
  delegator_address: string;
  validator_address: string;
  shares: string;
}

interface DelegationResponse {
  delegation: Delegation;
  balance: Coin;
}

export interface GetDelegationsResponse {
  delegation_responses: DelegationResponse[];
  pagination: PaginationResponse;
}

export interface GetDelegationsRequest extends PaginationRequest {
  delegator_address: string;
}

interface RedelegationEntry {
  creation_height: string;
  completion_time: string;
  initial_balance: string;
  shares_dst: string;
}

interface Redelegation {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
  entries: RedelegationEntry[];
}

interface RedelegationResponse {
  redelegation: Redelegation;
}

export interface GetRedelegationsResponse {
  redelegation_responses: RedelegationResponse[];
  pagination: PaginationResponse;
}

export interface GetRedelegationsRequest extends PaginationRequest {
  delegator_addr: string;
  src_validator_addr?: string;
  dst_validator_addr?: string;
}

interface UnbondingDelegationEntry {
  creation_height: string;
  completion_time: string;
  initial_balance: string;
  balance: string;
}

interface UnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  entries: UnbondingDelegationEntry[];
}

export interface UnbondingDelegationResponse {
  unbonding_responses: UnbondingDelegation[];
  pagination: PaginationResponse;
}

export interface GetUnbondingDelegationsRequest extends PaginationRequest {
  delegator_addr: string;
}

interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface ConsensusPubkey {
  "@type": string;
  key: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: ValidatorDescription;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
}

export interface GetValidatorsResponse {
  validators: Validator[];
  pagination: PaginationResponse;
}

export interface GetValidatorsRequest extends PaginationRequest {
  delegator_addr: string;
}

interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface ConsensusPubkey {
  "@type": string;
  key: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: ValidatorDescription;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
}

export interface GetValidatorInfoResponse {
  validator: Validator;
}

export interface GetValidatorInfoRequest {
  delegator_addr: string;
  validator_addr: string;
}

interface BlockVersion {
  block: string;
  app: string;
}

interface PartSetHeader {
  total: number;
  hash: string;
}

interface BlockID {
  hash: string;
  part_set_header: PartSetHeader;
}

interface BlockHeader {
  version: BlockVersion;
  chain_id: string;
  height: string;
  time: string;
  last_block_id: BlockID;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}

interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface ConsensusPubkey {
  "@type": string;
  key: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: ValidatorDescription;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
}

interface HistoricalInfo {
  header: BlockHeader;
  valset: Validator[];
}

export interface GetHistoricalInfoResponse {
  hist: HistoricalInfo;
}

export interface GetHistoricalInfoRequest {
  height: number;
}

interface StakingParams {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
}

export interface GetStakingParamsResponse {
  params: StakingParams;
}

interface PoolInfo {
  not_bonded_tokens: string;
  bonded_tokens: string;
}

export interface GetPoolInfoResponse {
  pool: PoolInfo;
}

interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface ConsensusPubkey {
  '@type': string;
  key: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: ValidatorDescription;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
}

export interface GetValidatorsResponse {
  validators: Validator[];
  pagination: PaginationResponse;
}

export interface GetValidatorsRequest extends PaginationRequest {
  status?: string;
}

interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface ConsensusPubkey {
  '@type': string;
  key: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: ValidatorDescription;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
}

export interface GetValidatorInfoResponse {
  validator: Validator;
}

export interface GetValidatorInfoRequest {
  validator_addr: string;
}

interface Balance {
  denom: string;
  amount: string;
}

interface Delegation {
  delegator_address: string;
  validator_address: string;
  shares: string;
}

interface DelegationResponse {
  delegation: Delegation;
  balance: Balance;
}

export interface GetDelegationsResponse {
  delegation_responses: DelegationResponse[];
  pagination: PaginationResponse;
}

export interface GetDelegationsRequest extends PaginationRequest {
  validator_addr: string;
}

interface UnbondingDelegationEntry {
  creation_height: string;
  completion_time: string;
  initial_balance: string;
  balance: string;
}

interface UnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  entries: UnbondingDelegationEntry[];
}

export interface GetUnbondingDelegationResponse {
  unbond: UnbondingDelegation;
}

export interface GetUnbondingDelegationRequest {
  validator_addr: string;
  delegator_addr: string;
}

export interface GetAppliedPlanResponse {
  height: string;
}

export interface GetAppliedPlanRequest {
  name: string;
}

export interface UpgradePlan {
  name: string;
  time: string;
  height: string;
  info: string;
  upgraded_client_state: any | null;
}

export interface GetCurrentPlanResponse {
  plan: UpgradePlan;
}

export interface ModuleVersion {
  name: string;
  version: string;
}

export interface GetModuleVersionsResponse {
  module_versions: ModuleVersion[];
}

export interface GetUpgradedConsensusStateResponse {
  upgraded_consensus_state: any;
}

export interface Authorization {
  '@type': string;
  msg: string;
}

export interface Grant {
  authorization: Authorization;
  expiration: string;
}

export interface GetGrantsResponse extends PaginationResponse {
  grants: Grant[];
}

export interface GetGrantsRequest extends PaginationRequest {
  granter: string;
  grantee: string;
  msg_type_url?: string;
}

export interface SpendLimit {
  denom: string;
  amount: string;
}

export interface BasicAllowance {
  '@type': string;
  spend_limit: SpendLimit[];
  expiration: string | null;
}

export interface Allowance {
  granter: string;
  grantee: string;
  allowance: BasicAllowance;
}

export interface GetAllowanceResponse {
  allowance: Allowance;
}

export interface GetAllowanceRequest {
  granter: string;
  grantee: string;
}

export interface GetGrantsForAddressRequest extends PaginationRequest {
  grantee: string
}

export interface GetGrantsForAddressResponse extends PaginationRequest {
  allowances: Allowance[]
}

export interface Message {
  '@type': string;
  [key: string]: any;
}

export interface Amount {
  denom: string;
  amount: string;
}

export interface Fee {
  amount: Amount[];
  gas_limit: string;
  payer: string;
  granter: string;
}

export interface PublicKey {
  '@type': string;
  key: string;
}

export interface ModeInfo {
  single: {
    mode: string;
  };
}

export interface SignerInfo {
  public_key: PublicKey;
  mode_info: ModeInfo;
  sequence: string;
}

export interface AuthInfo {
  signer_infos: SignerInfo[];
  fee: Fee;
}

export interface TxBody {
  messages: Message[];
  memo: string;
  timeout_height: string;
  extension_options: any[];
  non_critical_extension_options: any[];
}

export interface Tx {
  body: TxBody;
  auth_info: AuthInfo;
  signatures: string[];
}

export interface SimulateRequest {
  tx: Tx;
}

export interface GasInfo {
  gas_wanted: string;
  gas_used: string;
}

export interface Attribute {
  key: string;
  value: string;
  index: boolean;
}

export interface Event {
  type: string;
  attributes: Attribute[];
}

export interface Result {
  data: string;
  log: string;
  events: Event[];
}

export interface SimulateResponse {
  gas_info: GasInfo;
  result: Result;
}

export interface TxsByEventRequest extends PaginationRequest {
  events?: string[];
  order_by?: 'ORDER_BY_UNSPECIFIED' | 'ORDER_BY_ASC' | 'ORDER_BY_DESC';
}

export interface TxsByEventResponse extends PaginationResponse {
  txs: Tx[];
  tx_responses: Tx[];
}

export interface BroadcastTxRequest {
  tx_bytes: string;
  mode: 'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';
}

export interface TxResponse {
  height: string;
  txhash: string;
  codespace: string;
  code: number;
  data: string;
  raw_log: string;
  logs: any[];
  info: string;
  gas_wanted: string;
  gas_used: string;
  tx: any;
  timestamp: string;
}

export interface BroadcastTxResponse {
  tx_response: TxResponse;
}

export interface CosmosRpcSuite extends CardanoRpcSuite {
  getAccounts(params?: PaginationRequest): Promise<GetAccountsResponse>

  getAccountDetails(params: GetAccountDetailsRequest): Promise<GetAccountDetailsResponse>

  getAllParams(): Promise<GetAllParamsResponse>

  getAllBalances(params: GetAllBalancesRequest): Promise<GetAllBalancesResponse>

  getDenomsMetadata(params?: PaginationRequest): Promise<GetDenomsMetadataResponse>

  getDenomMetadata(params: GetDenomMetadataRequest): Promise<GetDenomMetadataResponse>

  getBankParams(): Promise<GetBankParamsResponse>

  getTotalSupply(params?: PaginationRequest): Promise<GetTotalSupplyResponse>

  getSupplyOfCoin(params: GetSupplyOfCoinRequest): Promise<GetSupplyOfCoinResponse>

  getLatestBlock(): Promise<GetLatestBlockResponse>

  getBlockByHeight(params: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse>

  getNodeInfo(): Promise<GetNodeInfoResponse>

  getSyncing(): Promise<GetSyncingResponse>

  getLatestValidatorSet(params?: PaginationRequest): Promise<GetLatestValidatorSetResponse>

  getValidatorSetByHeight(params: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse>

  getCommunityPool(): Promise<GetCommunityPoolResponse>

  getDelegationTotalRewards(params: GetDelegationTotalRewardsRequest): Promise<GetDelegationTotalRewardsResponse>

  getDelegationRewards(params: GetDelegationRewardsRequest): Promise<GetDelegationRewardsResponse>

  getDelegatorValidators(params: GetDelegatorValidatorsRequest): Promise<GetDelegatorValidatorsResponse>

  getDelegatorWithdrawAddress(params: GetDelegatorWithdrawAddressRequest): Promise<GetDelegatorWithdrawAddressResponse>

  getDistributionParams(): Promise<GetDistributionParamsResponse>

  getValidatorCommission(params: GetValidatorCommissionRequest): Promise<GetValidatorCommissionResponse>

  getValidatorOutstandingRewards(params: GetValidatorOutstandingRewardsRequest): Promise<GetValidatorOutstandingRewardsResponse>

  getValidatorSlashes(params: GetValidatorSlashesRequest): Promise<GetValidatorSlashesResponse>

  getAllEvidence(params?: PaginationRequest): Promise<GetAllEvidenceResponse>

  getGovernanceParams(params: GetGovernanceParamsRequest): Promise<GetGovernanceParamsResponse>

  getAllProposals(params: GetAllProposalsRequest): Promise<GetAllProposalsResponse>

  getProposalDetails(params: GetProposalDetailsRequest): Promise<GetProposalDetailsResponse>

  getDeposits(params: GetDepositsRequest): Promise<GetDepositsResponse>

  getTallyResult(params: GetTallyResultRequest): Promise<GetTallyResultResponse>

  getVotes(params: GetVotesRequest): Promise<GetVotesResponse>

  getVote(params: GetVoteRequest): Promise<GetVoteResponse>

  getAnnualProvisions(): Promise<GetAnnualProvisionsResponse>

  getInflation(): Promise<GetInflationResponse>

  getMintingParams(): Promise<GetMintingParamsResponse>

  getSpecificParam(params: GetSpecificParamRequest): Promise<GetSpecificParamResponse>

  getSlashingParams(): Promise<GetSlashingParamsResponse>

  getSigningInfos(params?: PaginationRequest): Promise<GetSigningInfosResponse>

  getSingingInfoByConsAddress(params: GetSigningInfoByConsAddressRequest): Promise<GetSigningInfoByConsAddressResponse>

  getDelegations(params: GetDelegationsRequest): Promise<GetDelegationsResponse>

  getRedelegations(params: GetRedelegationsRequest): Promise<GetRedelegationsResponse>

  getUnbondingDelegations(params: GetUnbondingDelegationsRequest): Promise<UnbondingDelegationResponse>

  getValidators(params: GetValidatorsRequest): Promise<GetValidatorsResponse>

  getValidatorInfo(params: GetValidatorInfoRequest): Promise<GetValidatorInfoResponse>

  getHistoricalInfo(params: GetHistoricalInfoRequest): Promise<GetHistoricalInfoResponse>

  getStakingParams(): Promise<GetStakingParamsResponse>

  getPoolInfo(): Promise<GetPoolInfoResponse>

  getValidatorsForGivenStatus(params: GetValidatorsRequest): Promise<GetValidatorsResponse>

  getValidatorInfoForAddress(params: GetValidatorInfoRequest): Promise<GetValidatorInfoResponse>

  getDelegationsForValidator(params: GetDelegationsRequest): Promise<GetDelegationsResponse>

  getUnbondingDelegation(params: GetUnbondingDelegationRequest): Promise<GetUnbondingDelegationResponse>

  getAppliedPlan(params: GetAppliedPlanRequest): Promise<GetAppliedPlanResponse>

  getCurrentPlan(): Promise<GetCurrentPlanResponse>

  getModuleVersions(): Promise<GetModuleVersionsResponse>

  getUpgradedConsensusState(lastHeight: number): Promise<GetUpgradedConsensusStateResponse>

  getGrants(params: GetGrantsRequest): Promise<GetGrantsResponse>

  getAllowance(params: GetAllowanceRequest): Promise<GetAllowanceResponse>

  getAllowanceForAddress(params: GetGrantsForAddressRequest): Promise<GetGrantsForAddressResponse>

  simulate(params: SimulateRequest): Promise<SimulateResponse>

  getTxsByEvent(params: TxsByEventRequest): Promise<TxsByEventResponse>

  broadcastTx(params: BroadcastTxRequest): Promise<BroadcastTxResponse>

  getTxByHash(hash: string): Promise<TxResponse>
}
