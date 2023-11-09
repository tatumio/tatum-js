/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js'
export enum OpKind {
  ORIGINATION = 'origination',
  DELEGATION = 'delegation',
  REVEAL = 'reveal',
  TRANSACTION = 'transaction',
  ACTIVATION = 'activate_account',
  ENDORSEMENT = 'endorsement',
  PREENDORSEMENT = 'preendorsement',
  SET_DEPOSITS_LIMIT = 'set_deposits_limit',
  DOUBLE_PREENDORSEMENT_EVIDENCE = 'double_preendorsement_evidence',
  ENDORSEMENT_WITH_SLOT = 'endorsement_with_slot',
  SEED_NONCE_REVELATION = 'seed_nonce_revelation',
  DOUBLE_ENDORSEMENT_EVIDENCE = 'double_endorsement_evidence',
  DOUBLE_BAKING_EVIDENCE = 'double_baking_evidence',
  PROPOSALS = 'proposals',
  BALLOT = 'ballot',
  FAILING_NOOP = 'failing_noop',
  REGISTER_GLOBAL_CONSTANT = 'register_global_constant',
  TX_ROLLUP_ORIGINATION = 'tx_rollup_origination',
  TX_ROLLUP_SUBMIT_BATCH = 'tx_rollup_submit_batch',
  TX_ROLLUP_COMMIT = 'tx_rollup_commit',
  TX_ROLLUP_RETURN_BOND = 'tx_rollup_return_bond',
  TX_ROLLUP_FINALIZE_COMMITMENT = 'tx_rollup_finalize_commitment',
  TX_ROLLUP_REMOVE_COMMITMENT = 'tx_rollup_remove_commitment',
  TX_ROLLUP_REJECTION = 'tx_rollup_rejection',
  TX_ROLLUP_DISPATCH_TICKETS = 'tx_rollup_dispatch_tickets',
  TRANSFER_TICKET = 'transfer_ticket',
  INCREASE_PAID_STORAGE = 'increase_paid_storage',
  UPDATE_CONSENSUS_KEY = 'update_consensus_key',
  DRAIN_DELEGATE = 'drain_delegate',
  VDF_REVELATION = 'vdf_revelation',
  EVENT = 'event',
  TICKET_UPDATES = 'ticket_updates',
  SMART_ROLLUP_ORIGINATE = 'smart_rollup_originate',
  SMART_ROLLUP_ADD_MESSAGES = 'smart_rollup_add_messages',
  SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE = 'smart_rollup_execute_outbox_message',
  SMART_ROLLUP_PUBLISH = 'smart_rollup_publish',
  SMART_ROLLUP_CEMENT = 'smart_rollup_cement',
  SMART_ROLLUP_RECOVER_BOND = 'smart_rollup_recover_bond',
  SMART_ROLLUP_REFUTE = 'smart_rollup_refute',
  SMART_ROLLUP_TIMEOUT = 'smart_rollup_timeout',
}

export type BalanceResponse = BigNumber
export type StorageResponse = ScriptedContracts['storage']
export type ScriptResponse = ScriptedContracts
export type BigMapGetResponse = MichelsonV1Expression
export type ManagerResponse = { manager: string }
export type ManagerKeyResponse = string | { key: string }
export type DelegateResponse = string | null

export type OperationHash = string

interface INodeExtender {
  length: string
  segment: string
  proof: string
}

type OtherEltsInner =
  | {
      value: any
    }
  | {
      inode_extender: INodeExtender
    }

export type OtherElts =
  | {
      node: [string, { value: string } | { node: string }][]
    }
  | {
      other_elts: OtherEltsInner
    }

type State =
  | {
      inode: Inode
    }
  | {
      other_elts: OtherElts
    }

export interface Inode {
  length: string
  proofs: [string | null, string | null]
}

type TxRollupProofContextHash =
  | {
      value: string
    }
  | {
      node: string
    }

export interface TxRollupProof {
  version: number
  before: TxRollupProofContextHash
  after: TxRollupProofContextHash
  state: State[]
}

export interface TxRollupCommitment {
  level: number
  messages: string[]
  predecessor?: string
  inbox_merkle_root: string
}

export interface TxRollupDeposit {
  sender: string
  destination: string
  ticket_hash: string
  amount: string
}

export interface TxRollupMessage {
  batch?: string
  deposit?: TxRollupDeposit
}

export interface TxRollupPreviousMessageResult {
  context_hash: string
  withdraw_list_hash: string
}

export interface TxRollupTicketsInfo {
  contents: MichelsonV1Expression
  ty: MichelsonV1Expression
  ticketer: string
  amount: string
  claimer: string
}
export interface DelegatesResponse {
  balance?: BigNumber
  full_balance?: BigNumber
  current_frozen_deposits?: BigNumber
  frozen_deposits?: BigNumber
  frozen_balance?: BigNumber
  frozen_balance_by_cycle?: Frozenbalancebycycle[]
  frozen_deposits_limit?: BigNumber
  staking_balance: BigNumber
  delegated_contracts: string[]
  delegated_balance: BigNumber
  deactivated: boolean
  grace_period: number
  voting_power?: BigNumber
  current_ballot?: BallotVote
  current_proposals?: string[]
  remaining_proposals?: number
  active_consensus_key?: string
  pending_consensus_keys?: PendingConsensusKey[]
}

export type PendingConsensusKey = {
  cycle: number
  pkh: string
}

export type VotingInfoResponse = {
  voting_power?: string
  current_ballot?: BallotListResponseEnum
  current_proposals?: string[]
  remaining_proposals?: number
}

interface Frozenbalancebycycle {
  cycle: number
  deposit?: BigNumber
  deposits?: BigNumber // Since Granada, "deposit" is replaced by "deposits"
  fees: BigNumber
  rewards: BigNumber
}

export type BigMapKey = {
  key: { [key: string]: string | object[] }
  type: { prim: string; args?: object[] }
}

export type LiquidityBakingToggleVotes = 'on' | 'off' | 'pass'

export interface BlockFullHeader {
  level: number
  proto: number
  predecessor: string
  timestamp: TimeStampMixed
  validation_pass: number
  operations_hash: string
  fitness: string[]
  context: string
  payload_hash?: string
  payload_round?: number
  priority?: number
  proof_of_work_nonce: string
  seed_nonce_hash?: string
  liquidity_baking_escape_vote?: boolean | LiquidityBakingToggleVotes
  liquidity_baking_toggle_vote?: LiquidityBakingToggleVotes
  signature: string
}

export type InlinedEndorsementKindEnum = OpKind.ENDORSEMENT

export interface InlinedEndorsementContents {
  kind: InlinedEndorsementKindEnum
  slot?: number
  round?: number
  block_payload_hash?: string
  level: number
}

export interface InlinedPreEndorsementContents {
  kind: OpKind.PREENDORSEMENT
  slot: number
  level: number
  round: number
  block_payload_hash: string
}

export interface InlinedEndorsement {
  branch: string
  operations: InlinedEndorsementContents
  signature?: string
}

export interface InlinedPreEndorsement {
  branch: string
  operations: InlinedPreEndorsementContents
  signature?: string
}

export type BallotVote = 'nay' | 'yay' | 'pass'

export interface OperationContentsEndorsement {
  kind: OpKind.ENDORSEMENT
  level: number
  slot?: number
  round?: number
  block_payload_hash?: string
}

export interface OperationContentsPreEndorsement {
  kind: OpKind.PREENDORSEMENT
  slot: number
  level: number
  round: number
  block_payload_hash: string
}

export interface OperationContentsDoublePreEndorsement {
  kind: OpKind.DOUBLE_PREENDORSEMENT_EVIDENCE
  op1: InlinedPreEndorsement
  op2: InlinedPreEndorsement
}

export interface OperationContentsSetDepositsLimit {
  kind: OpKind.SET_DEPOSITS_LIMIT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  limit?: string
}

export interface OperationContentsEndorsementWithSlot {
  kind: OpKind.ENDORSEMENT_WITH_SLOT
  endorsement: InlinedEndorsement
  slot: number
}

export interface OperationContentsRevelation {
  kind: OpKind.SEED_NONCE_REVELATION
  level: number
  nonce: string
}

export interface OperationContentsVdfRevelation {
  kind: OpKind.VDF_REVELATION
  solution: string[]
}

export interface OperationContentsDoubleEndorsement {
  kind: OpKind.DOUBLE_ENDORSEMENT_EVIDENCE
  op1: InlinedEndorsement
  op2: InlinedEndorsement
  slot?: number
}

export interface OperationContentsDoubleBaking {
  kind: OpKind.DOUBLE_BAKING_EVIDENCE
  bh1: BlockFullHeader
  bh2: BlockFullHeader
}

export interface OperationContentsActivateAccount {
  kind: OpKind.ACTIVATION
  pkh: string
  secret: string
}

export interface OperationContentsFailingNoop {
  kind: OpKind.FAILING_NOOP
  arbitrary: string
}

export interface OperationContentsProposals {
  kind: OpKind.PROPOSALS
  source: string
  period: number
  proposals: string[]
}

export interface OperationContentsBallot {
  kind: OpKind.BALLOT
  source: string
  period: number
  proposal: string
  ballot: BallotVote
}

export interface OperationContentsReveal {
  kind: OpKind.REVEAL
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  public_key: string
}

export interface OperationContentsTransaction {
  kind: OpKind.TRANSACTION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
  parameters?: TransactionOperationParameter
}

export interface OperationContentsOrigination {
  kind: OpKind.ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  balance: string
  delegate?: string
  script?: ScriptedContracts
}

export interface OperationContentsDelegation {
  kind: OpKind.DELEGATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  delegate?: string
}

export interface OperationContentsRegisterGlobalConstant {
  kind: OpKind.REGISTER_GLOBAL_CONSTANT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  value: MichelsonV1Expression
}

export interface OperationContentsTxRollupOrigination {
  kind: OpKind.TX_ROLLUP_ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  tx_rollup_origination: any
}

export interface OperationContentsTxRollupSubmitBatch {
  kind: OpKind.TX_ROLLUP_SUBMIT_BATCH
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  content: string
  burn_limit?: string
}

export interface OperationContentsTxRollupCommit {
  kind: OpKind.TX_ROLLUP_COMMIT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: TxRollupCommitment
}

export interface OperationContentsTxRollupReturnBond {
  kind: OpKind.TX_ROLLUP_RETURN_BOND
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
}

export interface OperationContentsTxRollupFinalizeCommitment {
  kind: OpKind.TX_ROLLUP_FINALIZE_COMMITMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
}

export interface OperationContentsTxRollupRemoveCommitment {
  kind: OpKind.TX_ROLLUP_REMOVE_COMMITMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
}

export interface OperationContentsTxRollupRejection {
  kind: OpKind.TX_ROLLUP_REJECTION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  level: number
  message: TxRollupMessage
  message_position: string
  message_path: string[]
  message_result_hash: string
  message_result_path: string[]
  previous_message_result: TxRollupPreviousMessageResult
  previous_message_result_path: string[]
  proof: TxRollupProof | string
}

export interface OperationContentsTxRollupDispatchTickets {
  kind: OpKind.TX_ROLLUP_DISPATCH_TICKETS
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  tx_rollup: string
  level: number
  context_hash: string
  message_index: number
  message_result_path: string[]
  tickets_info: TxRollupTicketsInfo[]
}

export interface OperationContentsTransferTicket {
  kind: OpKind.TRANSFER_TICKET
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  ticket_contents: MichelsonV1Expression
  ticket_ty: MichelsonV1Expression
  ticket_ticketer: string
  ticket_amount: string
  destination: string
  entrypoint: string
}

export interface OperationContentsUpdateConsensusKey {
  kind: OpKind.UPDATE_CONSENSUS_KEY
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  pk: string
}

export interface OperationContentsDrainDelegate {
  kind: OpKind.DRAIN_DELEGATE
  consensus_key: string
  delegate: string
  destination: string
}

export interface OperationContentsIncreasePaidStorage {
  kind: OpKind.INCREASE_PAID_STORAGE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
}

export interface OperationContentsSmartRollupOriginate {
  kind: OpKind.SMART_ROLLUP_ORIGINATE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  pvm_kind: PvmKind
  kernel: string
  origination_proof: string
  parameters_ty: MichelsonV1Expression
}

export interface OperationContentsSmartRollupAddMessages {
  kind: OpKind.SMART_ROLLUP_ADD_MESSAGES
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  message: string[]
}

export interface OperationContentsSmartRollupExecuteOutboxMessage {
  kind: OpKind.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  cemented_commitment: string
  output_proof: string
}

export interface OperationContentsSmartRollupPublish {
  kind: OpKind.SMART_ROLLUP_PUBLISH
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: SmartRollupPublishCommitment
}

export interface OperationContentsSmartRollupCement {
  kind: OpKind.SMART_ROLLUP_CEMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: string
}

export interface OperationContentsSmartRollupRefute {
  kind: OpKind.SMART_ROLLUP_REFUTE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  opponent: string
  refutation: SmartRollupRefutation
}

export interface OperationContentsSmartRollupRecoverBond {
  kind: OpKind.SMART_ROLLUP_RECOVER_BOND
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  staker: string
}

export interface OperationContentsSmartRollupTimeout {
  kind: OpKind.SMART_ROLLUP_TIMEOUT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  stakers: SmartRollupTimeoutStakers
}

export type OperationContents =
  | OperationContentsEndorsement
  | OperationContentsPreEndorsement
  | OperationContentsDoublePreEndorsement
  | OperationContentsRevelation
  | OperationContentsVdfRevelation
  | OperationContentsDoubleEndorsement
  | OperationContentsDoubleBaking
  | OperationContentsActivateAccount
  | OperationContentsProposals
  | OperationContentsBallot
  | OperationContentsReveal
  | OperationContentsTransaction
  | OperationContentsOrigination
  | OperationContentsDelegation
  | OperationContentsEndorsementWithSlot
  | OperationContentsFailingNoop
  | OperationContentsRegisterGlobalConstant
  | OperationContentsSetDepositsLimit
  | OperationContentsTxRollupOrigination
  | OperationContentsTxRollupSubmitBatch
  | OperationContentsTxRollupCommit
  | OperationContentsTxRollupReturnBond
  | OperationContentsTxRollupFinalizeCommitment
  | OperationContentsTxRollupRemoveCommitment
  | OperationContentsTxRollupRejection
  | OperationContentsTransferTicket
  | OperationContentsUpdateConsensusKey
  | OperationContentsDrainDelegate
  | OperationContentsIncreasePaidStorage
  | OperationContentsSmartRollupOriginate
  | OperationContentsSmartRollupAddMessages
  | OperationContentsSmartRollupExecuteOutboxMessage
  | OperationContentsSmartRollupPublish
  | OperationContentsSmartRollupCement
  | OperationContentsSmartRollupRefute
  | OperationContentsSmartRollupRecoverBond
  | OperationContentsSmartRollupTimeout

export interface OperationContentsAndResultMetadataExtended {
  balance_updates?: OperationMetadataBalanceUpdates[]
  delegate: string
  slots?: number[]
  endorsement_power?: number
  consensus_key?: string
}

export interface OperationContentsAndResultMetadataPreEndorsement {
  balance_updates?: OperationMetadataBalanceUpdates[]
  delegate: string
  preendorsement_power: number
  consensus_key?: string
}

export interface OperationContentsAndResultMetadataReveal {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultReveal
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTransaction {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTransaction
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataDelegation {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultDelegation
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataRegisterGlobalConstant {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultRegisterGlobalConstant
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSetDepositsLimit {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSetDepositsLimit
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadata {
  balance_updates?: OperationMetadataBalanceUpdates[]
}

export interface OperationContentsAndResultMetadataTxRollupOrigination {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupOrigination
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupSubmitBatch {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupSubmitBatch
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupCommit {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupCommit
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupReturnBond {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupReturnBond
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupFinalizeCommitment {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupFinalizeCommitment
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupRemoveCommitment {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupRemoveCommitment
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupRejection {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupRejection
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTransferTicket {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTransferTicket
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataTxRollupDispatchTickets {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultTxRollupDispatchTickets
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataIncreasePaidStorage {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultIncreasePaidStorage
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataUpdateConsensusKey {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultUpdateConsensusKey
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataDrainDelegate {
  balance_updates?: OperationMetadataBalanceUpdates[]
  allocated_destination_contract?: boolean
}

export interface OperationContentsAndResultMetadataSmartRollupOriginate {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupOriginate
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupAddMessages {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupAddMessages
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupExecuteOutboxMessage {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupExecuteOutboxMessage
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupPublish {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupPublish
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupCement {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupCement
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupRefute {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupRefute
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupRecoverBond {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupRecoverBond
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultMetadataSmartRollupTimeout {
  balance_updates?: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultSmartRollupTimeout
  internal_operation_results?: InternalOperationResult[]
}

export interface OperationContentsAndResultEndorsement {
  kind: OpKind.ENDORSEMENT
  block_payload_hash?: string
  level: number
  round?: number
  slot?: number
  metadata: OperationContentsAndResultMetadataExtended
}

export interface OperationContentsAndResultPreEndorsement {
  kind: OpKind.PREENDORSEMENT
  slot: number
  level: number
  round: number
  block_payload_hash: string
  metadata: OperationContentsAndResultMetadataPreEndorsement
}

export interface OperationContentsAndResultDoublePreEndorsement {
  kind: OpKind.DOUBLE_PREENDORSEMENT_EVIDENCE
  op1: InlinedPreEndorsement
  op2: InlinedPreEndorsement
  metadata: OperationContentsAndResultMetadata
}
export interface OperationContentsAndResultEndorsementWithSlot {
  kind: OpKind.ENDORSEMENT_WITH_SLOT
  endorsement: InlinedEndorsement
  slot: number
  metadata: OperationContentsAndResultMetadataExtended
}

export interface OperationContentsAndResultRevelation {
  kind: OpKind.SEED_NONCE_REVELATION
  level: number
  nonce: string
  metadata: OperationContentsAndResultMetadata
}

export interface OperationContentsAndResultDoubleEndorsement {
  kind: OpKind.DOUBLE_ENDORSEMENT_EVIDENCE
  op1: InlinedEndorsement
  op2: InlinedEndorsement
  slot?: number
  metadata: OperationContentsAndResultMetadata
}

export interface OperationContentsAndResultDoubleBaking {
  kind: OpKind.DOUBLE_BAKING_EVIDENCE
  bh1: BlockFullHeader
  bh2: BlockFullHeader
  metadata: OperationContentsAndResultMetadata
}

export interface OperationContentsAndResultActivateAccount {
  kind: OpKind.ACTIVATION
  pkh: string
  secret: string
  metadata: OperationContentsAndResultMetadata
}

export interface OperationContentsAndResultProposals {
  kind: OpKind.PROPOSALS
  source: string
  period: number
  proposals: string[]
}

export interface OperationContentsAndResultBallot {
  kind: OpKind.BALLOT
  source: string
  period: number
  proposal: string
  ballot: BallotVote
}

export interface OperationContentsAndResultReveal {
  kind: OpKind.REVEAL
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  public_key: string
  metadata: OperationContentsAndResultMetadataReveal
}

export interface OperationContentsAndResultTransaction {
  kind: OpKind.TRANSACTION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
  parameters?: TransactionOperationParameter
  metadata: OperationContentsAndResultMetadataTransaction
}

export interface OperationContentsAndResultDelegation {
  kind: OpKind.DELEGATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  delegate?: string
  metadata: OperationContentsAndResultMetadataDelegation
}

export interface OperationContentsAndResultRegisterGlobalConstant {
  kind: OpKind.REGISTER_GLOBAL_CONSTANT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  value: MichelsonV1Expression
  metadata: OperationContentsAndResultMetadataRegisterGlobalConstant
}

export interface OperationContentsAndResultSetDepositsLimit {
  kind: OpKind.SET_DEPOSITS_LIMIT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  limit?: string
  metadata: OperationContentsAndResultMetadataSetDepositsLimit
}

export interface OperationContentsAndResultTxRollupOrigination {
  kind: OpKind.TX_ROLLUP_ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  tx_rollup_origination: any
  metadata: OperationContentsAndResultMetadataTxRollupOrigination
}

export interface OperationContentsAndResultTxRollupSubmitBatch {
  kind: OpKind.TX_ROLLUP_SUBMIT_BATCH
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  content: string
  burn_limit?: string
  metadata: OperationContentsAndResultMetadataTxRollupSubmitBatch
}

export interface OperationContentsAndResultTxRollupCommit {
  kind: OpKind.TX_ROLLUP_COMMIT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: TxRollupCommitment
  metadata: OperationContentsAndResultMetadataTxRollupCommit
}

export interface OperationContentsAndResultTxRollupReturnBond {
  kind: OpKind.TX_ROLLUP_RETURN_BOND
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  metadata: OperationContentsAndResultMetadataTxRollupReturnBond
}

export interface OperationContentsAndResultTxRollupFinalizeCommitment {
  kind: OpKind.TX_ROLLUP_FINALIZE_COMMITMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  metadata: OperationContentsAndResultMetadataTxRollupFinalizeCommitment
}

export interface OperationContentsAndResultTxRollupRemoveCommitment {
  kind: OpKind.TX_ROLLUP_REMOVE_COMMITMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  metadata: OperationContentsAndResultMetadataTxRollupRemoveCommitment
}

export interface OperationContentsAndResultTxRollupRejection {
  kind: OpKind.TX_ROLLUP_REJECTION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  level: number
  message: TxRollupMessage
  message_position: string
  message_path: string[]
  message_result_hash: string
  message_result_path: string[]
  previous_message_result: TxRollupPreviousMessageResult
  previous_message_result_path: string[]
  proof: TxRollupProof | string
  metadata: OperationContentsAndResultMetadataTxRollupRejection
}

export interface OperationContentsAndResultTransferTicket {
  kind: OpKind.TRANSFER_TICKET
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  ticket_contents: MichelsonV1Expression
  ticket_ty: MichelsonV1Expression
  ticket_ticketer: string
  ticket_amount: string
  destination: string
  entrypoint: string
  metadata: OperationContentsAndResultMetadataTransferTicket
}

export interface OperationContentsAndResultTxRollupDispatchTickets {
  kind: OpKind.TX_ROLLUP_DISPATCH_TICKETS
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  tx_rollup: string
  level: number
  context_hash: string
  message_index: number
  message_result_path: string[]
  tickets_info: TxRollupTicketsInfo[]
  metadata: OperationContentsAndResultMetadataTxRollupDispatchTickets
}

export interface OperationContentsAndResultUpdateConsensusKey {
  kind: OpKind.UPDATE_CONSENSUS_KEY
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  pk: string
  metadata: OperationContentsAndResultMetadataUpdateConsensusKey
}

export interface OperationContentsAndResultDrainDelegate {
  kind: OpKind.DRAIN_DELEGATE
  consensus_key: string
  delegate: string
  destination: string
  metadata: OperationContentsAndResultMetadataDrainDelegate
}

export interface OperationContentsAndResultIncreasePaidStorage {
  kind: OpKind.INCREASE_PAID_STORAGE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
  metadata: OperationContentsAndResultMetadataIncreasePaidStorage
}

export interface OperationContentsAndResultVdfRevelation {
  kind: OpKind.VDF_REVELATION
  solution: string[]
  metadata: OperationContentsAndResultMetadata
}

export interface OperationContentsAndResultSmartRollupOriginate {
  kind: OpKind.SMART_ROLLUP_ORIGINATE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  pvm_kind: PvmKind
  kernel: string
  origination_proof: string
  parameters_ty: MichelsonV1Expression
  metadata: OperationContentsAndResultMetadataSmartRollupOriginate
}

export interface OperationContentsAndResultSmartRollupAddMessages {
  kind: OpKind.SMART_ROLLUP_ADD_MESSAGES
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  message: string[]
  metadata: OperationContentsAndResultMetadataSmartRollupAddMessages
}

export interface OperationContentsAndResultSmartRollupExecuteOutboxMessage {
  kind: OpKind.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  cemented_commitment: string
  output_proof: string
  metadata: OperationContentsAndResultMetadataSmartRollupExecuteOutboxMessage
}

export interface OperationContentsAndResultSmartRollupPublish {
  kind: OpKind.SMART_ROLLUP_PUBLISH
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: SmartRollupPublishCommitment
  metadata: OperationContentsAndResultMetadataSmartRollupPublish
}

export interface OperationContentsAndResultSmartRollupCement {
  kind: OpKind.SMART_ROLLUP_CEMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: string
  metadata: OperationContentsAndResultMetadataSmartRollupCement
}

export interface OperationContentsAndResultSmartRollupRefute {
  kind: OpKind.SMART_ROLLUP_REFUTE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  opponent: string
  refutation: SmartRollupRefutation
  metadata: OperationContentsAndResultMetadataSmartRollupRefute
}

export interface OperationContentsAndResultSmartRollupRecoverBond {
  kind: OpKind.SMART_ROLLUP_RECOVER_BOND
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  staker: string
  metadata: OperationContentsAndResultMetadataSmartRollupRecoverBond
}

export interface OperationContentsAndResultSmartRollupTimeout {
  kind: OpKind.SMART_ROLLUP_TIMEOUT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  stakers: SmartRollupTimeoutStakers
  metadata: OperationContentsAndResultMetadataSmartRollupTimeout
}

export type OperationContentsAndResult =
  | OperationContentsAndResultEndorsement
  | OperationContentsAndResultPreEndorsement
  | OperationContentsAndResultDoublePreEndorsement
  | OperationContentsAndResultRevelation
  | OperationContentsAndResultDoubleEndorsement
  | OperationContentsAndResultDoubleBaking
  | OperationContentsAndResultActivateAccount
  | OperationContentsAndResultProposals
  | OperationContentsAndResultBallot
  | OperationContentsAndResultReveal
  | OperationContentsAndResultTransaction
  | OperationContentsAndResultOrigination
  | OperationContentsAndResultDelegation
  | OperationContentsAndResultEndorsementWithSlot
  | OperationContentsAndResultRegisterGlobalConstant
  | OperationContentsAndResultSetDepositsLimit
  | OperationContentsAndResultTxRollupOrigination
  | OperationContentsAndResultTxRollupSubmitBatch
  | OperationContentsAndResultTxRollupCommit
  | OperationContentsAndResultTxRollupDispatchTickets
  | OperationContentsAndResultTxRollupReturnBond
  | OperationContentsAndResultTxRollupFinalizeCommitment
  | OperationContentsAndResultTxRollupRemoveCommitment
  | OperationContentsAndResultTxRollupRejection
  | OperationContentsAndResultTransferTicket
  | OperationContentsAndResultIncreasePaidStorage
  | OperationContentsAndResultUpdateConsensusKey
  | OperationContentsAndResultDrainDelegate
  | OperationContentsAndResultVdfRevelation
  | OperationContentsAndResultSmartRollupOriginate
  | OperationContentsAndResultSmartRollupAddMessages
  | OperationContentsAndResultSmartRollupExecuteOutboxMessage
  | OperationContentsAndResultSmartRollupPublish
  | OperationContentsAndResultSmartRollupCement
  | OperationContentsAndResultSmartRollupRefute
  | OperationContentsAndResultSmartRollupRecoverBond
  | OperationContentsAndResultSmartRollupTimeout

export type OperationContentsAndResultWithFee =
  | OperationContentsAndResultTransaction
  | OperationContentsAndResultOrigination
  | OperationContentsAndResultDelegation
  | OperationContentsAndResultReveal
  | OperationContentsAndResultRegisterGlobalConstant
  | OperationContentsAndResultSetDepositsLimit
  | OperationContentsAndResultUpdateConsensusKey
  | OperationContentsAndResultIncreasePaidStorage
  | OperationContentsAndResultSmartRollupAddMessages
  | OperationContentsAndResultSmartRollupOriginate

export enum OPERATION_METADATA {
  TOO_LARGE = 'too large',
}

export interface OperationEntry {
  protocol: string
  chain_id: string
  hash: string
  branch: string
  contents: (OperationContents | OperationContentsAndResult)[]
  signature?: string
  metadata?: OPERATION_METADATA
}

export interface BlockResponse {
  protocol: string
  chain_id: string
  hash: string
  header: BlockFullHeader
  metadata: BlockMetadata
  operations: OperationEntry[][]
}

export type BakingRightsArgumentsDelegate = string | string[]
export type BakingRightsArgumentsCycle = number | number[]
export type BakingRightsArgumentsLevel = number | number[]

export type BakingRightsQueryArguments = BakingRightsQueryArgumentsBase

export interface BakingRightsQueryArgumentsBase {
  level?: BakingRightsArgumentsLevel
  cycle?: BakingRightsArgumentsCycle
  delegate?: BakingRightsArgumentsDelegate
  consensus_key?: string
  max_priority?: number
  max_round?: string
  all?: null
}

export interface BakingRightsResponseItem {
  level: number
  delegate: string
  priority?: number
  round?: number
  estimated_time?: Date
  consensus_key?: string
}

export type BakingRightsResponse = BakingRightsResponseItem[]

export type EndorsingRightsArgumentsDelegate = string | string[]
export type EndorsingRightsArgumentsCycle = number | number[]
export type EndorsingRightsArgumentsLevel = number | number[]

export interface EndorsingRightsQueryArguments {
  level?: EndorsingRightsArgumentsLevel
  cycle?: EndorsingRightsArgumentsCycle
  delegate?: EndorsingRightsArgumentsDelegate
  consensus_key?: string
}

export interface EndorsingRightsResponseItemDelegates {
  delegate: string
  first_slot: number
  endorsing_power: number
  consensus_key?: string
}
export interface EndorsingRightsResponseItem {
  level: number
  delegate?: string
  delegates?: EndorsingRightsResponseItemDelegates[]
  slots?: number[]
  estimated_time?: Date
}

export type EndorsingRightsResponse = EndorsingRightsResponseItem[]

export type BallotListResponseEnum = 'nay' | 'yay' | 'pass'

export interface BallotListResponseItem {
  pkh: string
  ballot: BallotListResponseEnum
}

export type BallotListResponse = BallotListResponseItem[]

export interface BallotsResponse {
  yay: BigNumber
  nay: BigNumber
  pass: BigNumber
}

export type PeriodKindResponse = 'proposal' | 'exploration' | 'cooldown' | 'promotion' | 'adoption'

export type CurrentProposalResponse = string | null

export type CurrentQuorumResponse = number

export interface VotesListingsResponseItem {
  pkh: string
  rolls?: number
  voting_power?: BigNumber
}

export type VotesListingsResponse = VotesListingsResponseItem[]

export type ProposalsResponseItem = [string, BigNumber]

export type ProposalsResponse = ProposalsResponseItem[]

export interface BlockHeaderResponse {
  protocol: string
  chain_id: string
  hash: string
  level: number
  proto: number
  predecessor: string
  timestamp: string
  validation_pass: number
  operations_hash: string
  fitness: string[]
  context: string
  payload_hash?: string
  payload_round?: number
  priority?: number
  proof_of_work_nonce: string
  liquidity_baking_escape_vote?: boolean | LiquidityBakingToggleVotes
  signature: string
}

export interface PackDataParams {
  data: MichelsonV1Expression
  type: MichelsonV1Expression
  gas?: BigNumber
}

export interface TicketTokenParams {
  ticketer: string
  content_type: MichelsonV1Expression
  content: MichelsonV1Expression
}

export interface TicketBalance {
  ticketer: string
  content_type: MichelsonV1Expression
  content: MichelsonV1Expression
  amount: string
}

export type AllTicketBalances = TicketBalance[]

export type HexString = string

export interface PackDataResponse {
  packed: HexString
  gas?: BigNumber | 'unaccounted'
}

export type BigMapResponse = MichelsonV1Expression | MichelsonV1Expression[]

export type SaplingDiffResponse = {
  root: SaplingTransactionCommitmentHash
  commitments_and_ciphertexts: CommitmentsAndCiphertexts[]
  nullifiers: string[]
}

export type SaplingTransactionCommitmentHash = string

export type PreapplyParams = OperationObject[]
export type PreapplyResponse = {
  contents: OperationContentsAndResult[]
}

export type ForgeOperationsParams = Pick<OperationObject, 'branch' | 'contents'>

export type TimeStampMixed = Date | string

export type BalanceUpdateKindEnum = MetadataBalanceUpdatesKindEnum
export type BalanceUpdateCategoryEnum = MetadataBalanceUpdatesCategoryEnum

export interface MichelsonV1ExpressionBase {
  int?: string
  string?: string
  bytes?: string
}

export interface MichelsonV1ExpressionExtended {
  prim: string
  args?: MichelsonV1Expression[]
  annots?: string[]
}

export type MichelsonV1Expression =
  | MichelsonV1ExpressionBase
  | MichelsonV1ExpressionExtended
  | MichelsonV1Expression[]

export interface ScriptedContracts {
  code: MichelsonV1Expression[]
  storage: MichelsonV1Expression
}

export type BondId =
  | {
      smart_rollup?: never
      tx_rollup: string
    }
  | {
      smart_rollup: string
      tx_rollup?: never
    }

export interface OperationBalanceUpdatesItem {
  kind: BalanceUpdateKindEnum
  category?: BalanceUpdateCategoryEnum
  delegate?: string
  cycle?: number
  contract?: string
  change: string
  origin?: MetadataBalanceUpdatesOriginEnum
  participation?: boolean
  revelation?: boolean
  committer?: string
  bond_id?: BondId
}

export type OperationBalanceUpdates = OperationBalanceUpdatesItem[]

export interface OperationObject {
  branch?: string
  contents?: OperationContents[]
  protocol?: string
  signature?: string
}

export type InternalOperationResultKindEnum =
  | OpKind.REVEAL
  | OpKind.TRANSACTION
  | OpKind.ORIGINATION
  | OpKind.DELEGATION
  | OpKind.EVENT

export type SuccessfulManagerOperationResultKindEnum =
  | OpKind.REVEAL
  | OpKind.TRANSACTION
  | OpKind.ORIGINATION
  | OpKind.DELEGATION

export type InternalOperationResultEnum =
  | OperationResultReveal
  | OperationResultTransaction
  | OperationResultDelegation
  | OperationResultOrigination
  | OperationResultEvent

export interface OperationResultTxRollupOrigination {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  originated_rollup?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupSubmitBatch {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  paid_storage_size_diff?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupDispatchTickets {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  paid_storage_size_diff?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupCommit {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupReturnBond {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupFinalizeCommitment {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  level?: number
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupRemoveCommitment {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  level?: number
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTxRollupRejection {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultTransferTicket {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  ticket_updates?: TicketUpdates[]
  consumed_milligas?: string
  paid_storage_size_diff?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultIncreasePaidStorage {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultUpdateConsensusKey {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultDelegation {
  status: OperationResultStatusEnum
  consumed_gas?: string
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
}

export interface OperationResultSetDepositsLimit {
  status: OperationResultStatusEnum
  consumed_gas?: string
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
}

export interface OperationResultRegisterGlobalConstant {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_gas?: string
  storage_size?: string
  global_address?: string
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
}

export interface OperationResultSmartRollupOriginate {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  address?: string
  genesis_commitment_hash?: string
  consumed_milligas?: string
  size: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupAddMessages {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupExecuteOutboxMessage {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  ticket_updates?: TicketUpdates[]
  consumed_milligas?: string
  paid_storage_size_diff?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupPublish {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  staked_hash?: string
  published_at_level?: number
  balance_updates?: OperationBalanceUpdates
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupCement {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  inbox_level?: number
  commitment_hash?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupRefute {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  game_status?: SmartRollupGameStatus
  balance_updates?: OperationBalanceUpdates
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupRecoverBond {
  status: OperationResultStatusEnum
  balance_updates?: OperationBalanceUpdates
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationResultSmartRollupTimeout {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  game_status?: SmartRollupGameStatus
  balance_updates?: OperationBalanceUpdates
  errors?: TezosGenericOperationError[]
}

export interface ContractBigMapDiffItem {
  key_hash?: string
  key?: MichelsonV1Expression
  value?: MichelsonV1Expression
  action?: DiffActionEnum
  big_map?: string
  source_big_map?: string
  destination_big_map?: string
  key_type?: MichelsonV1Expression
  value_type?: MichelsonV1Expression
}

export type ContractBigMapDiff = ContractBigMapDiffItem[]

export interface TezosGenericOperationError {
  kind: string
  id: string
  delegate?: string
}

export interface TicketUpdates {
  ticket_token: {
    ticketer: string
    content_type: MichelsonV1Expression
    content: MichelsonV1Expression
  }
  updates: {
    account: string
    amount: string
  }[]
}
export type TicketReceipt = TicketUpdates

export type BatchOperationResult =
  | OperationResultTransaction
  | OperationResultReveal
  | OperationResultDelegation
  | OperationResultOrigination
  | OperationResultIncreasePaidStorage
  | OperationResultRegisterGlobalConstant
  | OperationResultTransferTicket
  | OperationResultSmartRollupAddMessages
  | OperationResultSmartRollupOriginate
  | OperationResultUpdateConsensusKey

export type OperationResult =
  | OperationResultOrigination
  | OperationResultTransaction
  | OperationResultReveal
  | OperationResultDelegation
  | OperationResultIncreasePaidStorage
  | OperationResultRegisterGlobalConstant
  | OperationResultTransferTicket
  | OperationResultUpdateConsensusKey
  | OperationResultSmartRollupOriginate
  | OperationResultSmartRollupAddMessages
  | OperationResultSetDepositsLimit
  | OperationResultSmartRollupPublish
  | OperationResultSmartRollupCement
  | OperationResultSmartRollupRefute
  | OperationResultSmartRollupRecoverBond
  | OperationResultSmartRollupTimeout
  | OperationResultSmartRollupExecuteOutboxMessage
  | OperationResultTxRollupOrigination
  | OperationResultTxRollupSubmitBatch
  | OperationResultTxRollupDispatchTickets
  | OperationResultTxRollupCommit
  | OperationResultTxRollupReturnBond
  | OperationResultTxRollupFinalizeCommitment
  | OperationResultTxRollupRemoveCommitment
  | OperationResultTxRollupRejection

export interface OperationResultTransaction {
  status: OperationResultStatusEnum
  storage?: MichelsonV1Expression
  big_map_diff?: ContractBigMapDiff
  balance_updates?: OperationBalanceUpdates
  ticket_updates?: TicketUpdates[]
  ticket_receipt?: TicketReceipt[]
  originated_contracts?: string[]
  consumed_gas?: string
  storage_size?: string
  paid_storage_size_diff?: string
  allocated_destination_contract?: boolean
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
  lazy_storage_diff?: LazyStorageDiff[]
  ticket_hash?: string
}

export interface OperationResultReveal {
  status: OperationResultStatusEnum
  consumed_gas?: string
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
}

export interface TransactionOperationParameter {
  entrypoint: string
  value: MichelsonV1Expression
}

export interface InternalOperationResult {
  kind: InternalOperationResultKindEnum
  source: string
  nonce: number
  amount?: string
  destination?: string
  parameters?: TransactionOperationParameter
  public_key?: string
  balance?: string
  delegate?: string
  script?: ScriptedContracts
  value?: MichelsonV1Expression
  limit?: string
  result: InternalOperationResultEnum
  type?: MichelsonV1Expression
  tag?: string
  payload?: MichelsonV1Expression
}

export interface SuccessfulManagerOperationResult {
  kind: SuccessfulManagerOperationResultKindEnum
  consumed_gas?: string
  consumed_milligas?: string
  storage?: MichelsonV1Expression
  big_map_diff?: ContractBigMapDiff
  balance_updates?: OperationBalanceUpdates
  originated_contracts?: string[]
  storage_size?: string
  paid_storage_size_diff?: string
  lazy_storage_diff?: LazyStorageDiff[]
}

export type MetadataBalanceUpdatesKindEnum =
  | 'contract'
  | 'freezer'
  | 'accumulator'
  | 'burned'
  | 'commitment'
  | 'minted'

export enum METADATA_BALANCE_UPDATES_CATEGORY {
  BAKING_REWARDS = 'baking rewards',
  REWARDS = 'rewards',
  FEES = 'fees',
  DEPOSITS = 'deposits',
  LEGACY_REWARDS = 'legacy_rewards',
  LEGACY_FEES = 'legacy_fees',
  LEGACY_DEPOSITS = 'legacy_deposits',
  BLOCK_FEES = 'block fees',
  NONCE_REVELATION_REWARDS = 'nonce revelation rewards',
  DOUBLE_SIGNING_EVIDENCE_REWARDS = 'double signing evidence rewards',
  ENDORSING_REWARDS = 'endorsing rewards',
  BAKING_BONUSES = 'baking bonuses',
  STORAGE_FEES = 'storage fees',
  PUNISHMENTS = 'punishments',
  LOST_ENDORSING_REWARDS = 'lost endorsing rewards',
  SUBSIDY = 'subsidy',
  BURNED = 'burned',
  COMMITMENT = 'commitment',
  BOOTSTRAP = 'bootstrap',
  INVOICE = 'invoice',
  MINTED = 'minted',
  TX_ROLLUP_REJECTION_REWARDS = 'tx_rollup_rejection_rewards',
  TX_ROLLUP_REJECTION_PUNISHMENTS = 'tx_rollup_rejection_punishments',
  BONDS = 'bonds',
}
export type MetadataBalanceUpdatesCategoryEnum = METADATA_BALANCE_UPDATES_CATEGORY

export type MetadataBalanceUpdatesOriginEnum = 'block' | 'migration' | 'subsidy' | 'simulation'

export interface OperationMetadataBalanceUpdates {
  kind: MetadataBalanceUpdatesKindEnum
  category?: MetadataBalanceUpdatesCategoryEnum
  contract?: string
  delegate?: string
  participation?: boolean
  revelation?: boolean
  committer?: string
  cycle?: number
  change: string
  origin?: MetadataBalanceUpdatesOriginEnum
}

export type OperationResultStatusEnum = 'applied' | 'failed' | 'skipped' | 'backtracked'

export type DiffActionEnum = 'update' | 'remove' | 'copy' | 'alloc'

export type LazyStorageDiff = LazyStorageDiffBigMap | LazyStorageDiffSaplingState

export interface LazyStorageDiffBigMap {
  kind: 'big_map'
  id: string
  diff: LazyStorageDiffBigMapItems
}

export interface LazyStorageDiffSaplingState {
  kind: 'sapling_state'
  id: string
  diff: LazyStorageDiffSaplingStateItems
}

export interface LazyStorageDiffBigMapItems {
  action: DiffActionEnum
  updates?: LazyStorageDiffUpdatesBigMap[]
  source?: string
  key_type?: MichelsonV1Expression
  value_type?: MichelsonV1Expression
}

export interface LazyStorageDiffSaplingStateItems {
  action: DiffActionEnum
  updates?: LazyStorageDiffUpdatesSaplingState
  source?: string
  memo_size?: number
}

export interface LazyStorageDiffUpdatesBigMap {
  key_hash: string
  key: MichelsonV1Expression
  value?: MichelsonV1Expression
}

export type CommitmentsAndCiphertexts = [SaplingTransactionCommitment, SaplingTransactionCiphertext]

export type SaplingTransactionCommitment = string

export interface LazyStorageDiffUpdatesSaplingState {
  commitments_and_ciphertexts: CommitmentsAndCiphertexts[]
  nullifiers: string[]
}

export interface SaplingTransactionCiphertext {
  cv: string
  epk: string
  payload_enc: string
  nonce_enc: string
  payload_out: string
  nonce_out: string
}

export interface OperationResultOrigination {
  status: OperationResultStatusEnum
  big_map_diff?: ContractBigMapDiff
  balance_updates?: OperationBalanceUpdates
  originated_contracts?: string[]
  consumed_gas?: string
  storage_size?: string
  paid_storage_size_diff?: string
  errors?: TezosGenericOperationError[]
  consumed_milligas?: string
  lazy_storage_diff?: LazyStorageDiff[]
}

export interface OperationResultEvent {
  status: OperationResultStatusEnum
  consumed_milligas?: string
  errors?: TezosGenericOperationError[]
}

export interface OperationContentsAndResultMetadataOrigination {
  balance_updates: OperationMetadataBalanceUpdates[]
  operation_result: OperationResultOrigination
  internal_operation_results?: InternalOperationResult[]
}

export type ConstantsResponse = ConstantsResponseCommon &
  ConstantsResponseProto017 &
  ConstantsResponseProto016 &
  ConstantsResponseProto015 &
  ConstantsResponseProto014 &
  ConstantsResponseProto013 &
  ConstantsResponseProto012 &
  ConstantsResponseProto011 &
  ConstantsResponseProto010 &
  ConstantsResponseProto009 &
  ConstantsResponseProto008 &
  ConstantsResponseProto007 &
  ConstantsResponseProto006 &
  ConstantsResponseProto005 &
  ConstantsResponseProto004 &
  ConstantsResponseProto003 &
  ConstantsResponseProto001And002

export interface ConstantsResponseCommon {
  proof_of_work_nonce_size: number
  nonce_length: number
  max_operation_data_length: number
  preserved_cycles: number
  blocks_per_cycle: number
  blocks_per_commitment: number
  blocks_per_roll_snapshot: number
  blocks_per_voting_period: number
  time_between_blocks: BigNumber[]
  endorsers_per_block: number
  hard_gas_limit_per_operation: BigNumber
  hard_gas_limit_per_block: BigNumber
  proof_of_work_threshold: BigNumber
  tokens_per_roll: BigNumber
  michelson_maximum_type_size: number
  seed_nonce_revelation_tip: BigNumber
  block_security_deposit: BigNumber
  endorsement_security_deposit: BigNumber
  endorsement_reward: BigNumber | BigNumber[] // BigNumber[] since proto 006, BigNumber before
  cost_per_byte: BigNumber
  hard_storage_limit_per_operation: BigNumber
}

export type Ratio = { numerator: number; denominator: number }

export type ConstantsResponseProto017 = ConstantsResponseProto016

export interface ConstantsResponseProto016
  extends Omit<
    ConstantsResponseProto015,
    | 'sc_max_wrapped_proof_binary_size'
    | 'sc_rollup_challenge_window_in_blocks'
    | 'sc_rollup_commitment_period_in_blocks'
    | 'sc_rollup_enable'
    | 'sc_rollup_max_active_outbox_levels'
    | 'sc_rollup_max_lookahead_in_blocks'
    | 'sc_rollup_max_number_of_cemented_commitments'
    | 'sc_rollup_max_number_of_messages_per_commitment_period'
    | 'sc_rollup_max_outbox_messages_per_level'
    | 'sc_rollup_message_size_limit'
    | 'sc_rollup_number_of_sections_in_dissection'
    | 'sc_rollup_origination_size'
    | 'sc_rollup_stake_amount'
    | 'sc_rollup_timeout_period_in_blocks'
  > {
  smart_rollup_arith_pvm_enable: boolean
  smart_rollup_challenge_window_in_blocks: number
  smart_rollup_commitment_period_in_blocks: number
  smart_rollup_enable: boolean
  smart_rollup_max_active_outbox_levels: number
  smart_rollup_max_lookahead_in_blocks: number
  smart_rollup_max_number_of_cemented_commitments: number
  smart_rollup_max_number_of_messages_per_level: string
  smart_rollup_max_number_of_parallel_games: number
  smart_rollup_max_outbox_messages_per_level: number
  smart_rollup_max_wrapped_proof_binary_size: number
  smart_rollup_message_size_limit: number
  smart_rollup_number_of_sections_in_dissection: number
  smart_rollup_origination_size: number
  smart_rollup_stake_amount: string
  smart_rollup_timeout_period_in_blocks: number
}

export interface ConstantsResponseProto015
  extends Omit<
    ConstantsResponseProto014,
    | 'max_wrapped_proof_binary_size'
    | 'tokens_per_roll'
    | 'liquidity_baking_sunset_level'
    | 'sc_rollup_max_available_messages'
  > {
  minimal_stake: BigNumber
  sc_max_wrapped_proof_binary_size: number
  sc_rollup_message_size_limit: number
  sc_rollup_max_number_of_messages_per_commitment_period: number
  sc_rollup_number_of_sections_in_dissection: number
  sc_rollup_timeout_period_in_blocks: number
  sc_rollup_max_number_of_cemented_commitments: number
  zk_rollup_enable: number
  zk_rollup_origination_size: number
  zk_rollup_min_pending_to_process: number
}

export interface DalParametric {
  feature_enable: boolean
  number_of_slots: number
  number_of_shards: number
  endorsement_lag?: number
  availability_threshold: number
  slot_size?: number
  redundancy_factor?: number
  page_size?: number
  attestation_threshold?: number
  blocks_per_epoch?: number
}

export interface ConstantsResponseProto014 extends ConstantsResponseProto013 {
  max_wrapped_proof_binary_size?: number
  nonce_revelation_threshold?: number
  vdf_difficulty?: BigNumber
  testnet_dictator?: string
  dal_parametric?: DalParametric
  sc_rollup_stake_amount?: BigNumber
  sc_rollup_commitment_period_in_blocks?: number
  sc_rollup_max_lookahead_in_blocks?: number
  sc_rollup_max_active_outbox_levels?: number
  sc_rollup_max_outbox_messages_per_level?: number
}

export interface ConstantsResponseProto013
  extends Omit<
    ConstantsResponseProto012,
    | 'blocks_per_voting_period'
    | 'cache_layout'
    | 'delegate_selection'
    | 'liquidity_baking_escape_ema_threshold'
  > {
  cache_layout_size?: number
  cache_sampler_state_cycles?: number
  cache_script_size?: number
  cache_stake_distribution_cycles?: number
  cycles_per_voting_period?: number
  liquidity_baking_toggle_ema_threshold?: number
  initial_seed?: string
  tx_rollup_enable?: boolean
  tx_rollup_origination_size?: number
  tx_rollup_hard_size_limit_per_inbox?: number
  tx_rollup_hard_size_limit_per_message?: number
  tx_rollup_max_withdrawals_per_batch?: number
  tx_rollup_commitment_bond?: BigNumber
  tx_rollup_finality_period?: number
  tx_rollup_withdraw_period?: number
  tx_rollup_max_inboxes_count?: number
  tx_rollup_max_messages_per_inbox?: number
  tx_rollup_max_commitments_count?: number
  tx_rollup_cost_per_byte_ema_factor?: number
  tx_rollup_max_ticket_payload_size?: number
  tx_rollup_rejection_max_proof_size?: number
  tx_rollup_sunset_level?: number
  sc_rollup_enable?: boolean
  sc_rollup_origination_size?: number
  sc_rollup_challenge_window_in_blocks?: number
  sc_rollup_max_available_messages?: number
}

export interface ConstantsResponseProto012
  extends Omit<
    ConstantsResponseProto011,
    | 'baking_reward_per_endorsement'
    | 'initial_endorsers'
    | 'delay_per_missing_endorsement'
    | 'test_chain_duration'
    | 'blocks_per_roll_snapshot'
    | 'time_between_blocks'
    | 'endorsers_per_block'
    | 'block_security_deposit'
    | 'endorsement_security_deposit'
    | 'endorsement_reward'
  > {
  blocks_per_stake_snapshot?: number
  baking_reward_fixed_portion?: BigNumber
  baking_reward_bonus_per_slot?: BigNumber
  endorsing_reward_per_slot?: BigNumber
  max_operations_time_to_live?: number
  consensus_committee_size?: number
  consensus_threshold?: number
  minimal_participation_ratio?: Ratio
  max_slashing_period?: number
  frozen_deposits_percentage?: number
  double_baking_punishment?: BigNumber
  ratio_of_frozen_deposits_slashed_per_double_endorsement?: Ratio
  delegate_selection?: 'random' | string[][]
  delay_increment_per_round?: BigNumber
}

export interface ConstantsResponseProto011 extends ConstantsResponseProto010 {
  max_micheline_node_count?: number
  max_allowed_global_constants_depth?: number
  max_micheline_bytes_limit?: number
  cache_layout?: BigNumber[]
}
export interface ConstantsResponseProto010 extends ConstantsResponseProto009 {
  minimal_block_delay?: BigNumber
  liquidity_baking_subsidy?: BigNumber
  liquidity_baking_sunset_level?: number
  liquidity_baking_escape_ema_threshold?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConstantsResponseProto009 extends ConstantsResponseProto008 {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConstantsResponseProto008 extends ConstantsResponseProto007 {}

export interface ConstantsResponseProto007
  extends Omit<ConstantsResponseProto006, 'max_revelations_per_block'> {
  max_anon_ops_per_block?: number
}

export interface ConstantsResponseProto006 extends Omit<ConstantsResponseProto005, 'block_reward'> {
  baking_reward_per_endorsement?: BigNumber[]
}

export interface ConstantsResponseProto005 extends ConstantsResponseProto004 {
  quorum_min?: number
  quorum_max?: number
  min_proposal_quorum?: number
  initial_endorsers?: number
  delay_per_missing_endorsement?: BigNumber
}

export interface ConstantsResponseProto004 extends ConstantsResponseProto003 {
  test_chain_duration?: BigNumber
}

export interface ConstantsResponseProto003 extends Omit<ConstantsResponseProto001And002, 'origination_burn'> {
  origination_size?: number
  max_proposals_per_delegate?: number
}

export interface ConstantsResponseProto001And002 extends ConstantsResponseCommon {
  max_revelations_per_block?: number
  origination_burn?: string
  block_reward?: BigNumber
}

export interface ContractResponse {
  balance: BigNumber
  script: ScriptedContracts
  counter?: string
  delegate?: string
}

export interface TestChainStatus {
  status: 'not_running' | 'forking' | 'running'
  protocol?: string
  expiration?: TimeStampMixed
  chain_id?: string
  genesis?: string
}

export interface MaxOperationListLength {
  max_size: number
  max_op?: number
}

export interface Level {
  level: number
  level_position: number
  cycle: number
  cycle_position: number
  voting_period: number
  voting_period_position: number
  expected_commitment: boolean
}

export interface LevelInfo {
  level: number
  level_position: number
  cycle: number
  cycle_position: number
  expected_commitment: boolean
}

export interface BlockMetadata {
  protocol: string
  next_protocol: string
  test_chain_status: TestChainStatus
  max_operations_ttl: number
  max_operation_data_length: number
  max_block_header_length: number
  max_operation_list_length: MaxOperationListLength[]
  proposer?: string
  baker: string
  level?: Level
  level_info?: LevelInfo
  voting_period_kind?: string
  voting_period_info?: VotingPeriodBlockResult
  nonce_hash?: string
  consumed_gas: string
  deactivated: string[]
  balance_updates: OperationBalanceUpdates
  liquidity_baking_escape_ema?: number
  liquidity_baking_toggle_ema?: number
  implicit_operations_results?: SuccessfulManagerOperationResult[]
  consumed_milligas?: string
  proposer_consensus_key?: string
  baker_consensus_key?: string
}

export type RPCRunOperationParam = {
  operation: OperationObject
  chainId: string
}

export interface RPCSimulateOperationParam extends RPCRunOperationParam {
  blocksBeforeActivation?: number
  latency?: number
}

export type RPCRunCodeParam = {
  script: MichelsonV1ExpressionExtended[]
  storage: MichelsonV1Expression
  input: MichelsonV1Expression
  amount: string
  chain_id: string
  source?: string
  payer?: string
  gas?: string
  self?: string
  entrypoint?: string
  balance?: string
  unparsing_mode?: UnparsingMode
  now?: string
  level?: string
}

export type RunCodeResult = {
  storage: MichelsonV1Expression
  operations: InternalOperationResult[]
  big_map_diff?: ContractBigMapDiff
  lazy_storage_diff?: LazyStorageDiff
}

export type RPCRunScriptViewParam = {
  contract: string
  view: string
  input: MichelsonV1Expression
  unlimited_gas?: boolean
  chain_id: string
  source?: string
  payer?: string
  gas?: string
  unparsing_mode?: UnparsingModeEnum
  now?: string
  level?: string
}

export type RunScriptViewResult = {
  data: MichelsonV1Expression
}

export type RPCRunViewParam = {
  contract: string
  entrypoint: string
  input: MichelsonV1Expression
  chain_id: string
  source?: string
  payer?: string
  gas?: BigNumber
  unparsing_mode?: UnparsingModeEnum
}

export type RunViewResult = {
  data: MichelsonV1Expression
}

export type EntrypointsResponse = {
  entrypoints: { [key: string]: MichelsonV1ExpressionExtended }
  unreachable?: { path: ('Left' | 'Right')[] }
}

export interface OperationContentsAndResultOrigination {
  kind: OpKind.ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  balance: string
  delegate?: string
  script?: ScriptedContracts
  metadata: OperationContentsAndResultMetadataOrigination
}

export interface VotingPeriodResult {
  index: number
  kind: PeriodKindResponse
  start_position: number
}

export interface VotingPeriodBlockResult {
  voting_period: VotingPeriodResult
  position: number
  remaining: number
}

export type UnparsingModeEnum = 'Readable' | 'Optimized' | 'Optimized_legacy'
export type UnparsingMode = {
  unparsing_mode: UnparsingModeEnum
}

export type ProtocolsResponse = {
  protocol: string
  next_protocol: string
}

export type Next =
  | {
      next: number
    }
  | {
      newest: number
      oldest: number
    }

export type LastRemovedCommitmentHashes = {
  last_message_hash: string
  commitment_hash: string
}
export interface TxRollupStateResponse {
  last_removed_commitment_hashes?: LastRemovedCommitmentHashes
  finalized_commitments: Next
  unfinalized_commitments: Next
  uncommitted_inboxes: Next
  commitment_newest_hash?: string
  tezos_head_level?: number
  burn_per_byte: string
  allocated_storage: string
  occupied_storage: string
  inbox_ema: number
  commitments_watermark?: number
}

export interface TxRollupInboxResponse {
  inbox_length: number
  cumulated_size: number
  merkle_root: string
}

export interface PendingOperationsQueryArguments {
  version?: '1'
  applied?: boolean
  refused?: boolean
  outdated?: boolean
  branchRefused?: boolean
  branchDelayed?: boolean
  validationPass?: '0' | '1' | '2' | '3'
}

type FailedProcessedOperation = Pick<
  OperationEntry,
  'hash' | 'protocol' | 'branch' | 'contents' | 'signature'
> & {
  error: TezosGenericOperationError[]
}

export interface PendingOperations {
  applied: Pick<OperationEntry, 'hash' | 'branch' | 'contents' | 'signature'>[]
  refused: FailedProcessedOperation[]
  outdated: FailedProcessedOperation[]
  branch_refused: FailedProcessedOperation[]
  branch_delayed: FailedProcessedOperation[]
  unprocessed: Pick<OperationEntry, 'hash' | 'protocol' | 'branch' | 'contents' | 'signature'>[]
}

export enum PvmKind {
  WASM2 = 'wasm_2_0_0',
  ARITH = 'arith',
}

export interface OriginationProofParams {
  kind: PvmKind
  kernel: string
}

export interface SmartRollupPublishCommitment {
  compressed_state: string
  inbox_level: number
  predecessor: string
  number_of_ticks: string
}

export enum SmartRollupRefutationOptions {
  START = 'start',
  MOVE = 'move',
}

export type SmartRollupRefutation = SmartRollupRefutationStart | SmartRollupRefutationMove

export interface SmartRollupRefutationStart {
  refutation_kind: SmartRollupRefutationOptions.START
  player_commitment_hash: string
  opponent_commitment_hash: string
}

export interface SmartRollupRefutationMove {
  refutation_kind: SmartRollupRefutationOptions.MOVE
  choice: string
  step: SmartRollupRefutationMoveStep
}

export type SmartRollupRefutationMoveStep =
  | SmartRollupRefutationMoveStepDissection[]
  | SmartRollupRefutationMoveStepProof

export interface SmartRollupRefutationMoveStepDissection {
  state?: string
  tick: number
}

export interface SmartRollupRefutationMoveStepProof {
  pvm_step: string
  input_proof?: SmartRollupRefutationMoveInputProof
}

export enum SmartRollupInputProofKind {
  INBOX_PROOF = 'inbox_proof',
  REVEAL_PROOF = 'reveal_proof',
  FIRST_INPUT = 'first_input',
}

export interface SmartRollupRefutationMoveInputProofInbox {
  input_proof_kind: SmartRollupInputProofKind.INBOX_PROOF
  level: number
  message_counter: string
  serialized_proof: string
}

export interface SmartRollupRefutationMoveInputProofReveal {
  input_proof_kind: SmartRollupInputProofKind.REVEAL_PROOF
  reveal_proof: SmartRollupRefuteRevealProofOptions
}

export interface SmartRollupRefutationMoveInputProofFirstInput {
  input_proof_kind: SmartRollupInputProofKind.FIRST_INPUT
}

export type SmartRollupRefutationMoveInputProof =
  | SmartRollupRefutationMoveInputProofInbox
  | SmartRollupRefutationMoveInputProofReveal
  | SmartRollupRefutationMoveInputProofFirstInput

export enum SmartRollupRefuteRevealProofKind {
  RAW_DATA_PROOF = 'raw_data_proof',
  METADATA_PROOF = 'metadata_proof',
  DAL_PAGE_PROOF = 'dal_page_proof',
}

export interface SmartRollupRefuteRevealProofRaw {
  reveal_proof_kind: SmartRollupRefuteRevealProofKind.RAW_DATA_PROOF
  raw_data: string
}
export interface SmartRollupRefuteRevealProofMetadata {
  reveal_proof_kind: SmartRollupRefuteRevealProofKind.METADATA_PROOF
}
export interface SmartRollupRefuteRevealProofDalPage {
  reveal_proof_kind: SmartRollupRefuteRevealProofKind.DAL_PAGE_PROOF
  dal_page_id: {
    published_level: number
    slot_index: number
    page_index: number
  }
  dal_proof: string
}

export type SmartRollupRefuteRevealProofOptions =
  | SmartRollupRefuteRevealProofRaw
  | SmartRollupRefuteRevealProofMetadata
  | SmartRollupRefuteRevealProofDalPage

export type SmartRollupGameStatus =
  | SmartRollupRefuteGameStatusOptions.ONGOING
  | SmartRollupRefuteGameStatusEnded

export enum SmartRollupRefuteGameStatusOptions {
  ONGOING = 'ongoing',
  ENDED = 'ended',
}

export interface SmartRollupRefuteGameStatusEnded {
  result: SmartRollupRefuteGameStatusResult
}

export type SmartRollupRefuteGameStatusResult =
  | SmartRollupRefuteGameEndedResultLoser
  | SmartRollupRefuteGameEndedResultDraw

export interface SmartRollupRefuteGameEndedResultLoser {
  kind: SmartRollupRefuteGameEndedPlayerOutcomes.LOSER
  reason: SmartRollupRefuteGameEndedReason
  player: string
}

export interface SmartRollupRefuteGameEndedResultDraw {
  kind: SmartRollupRefuteGameEndedPlayerOutcomes.DRAW
}

export enum SmartRollupRefuteGameEndedPlayerOutcomes {
  LOSER = 'loser',
  DRAW = 'draw',
}

export enum SmartRollupRefuteGameEndedReason {
  CONFLICT_RESOLVED = 'conflict_resolved',
  TIMEOUT = 'timeout',
}

export interface SmartRollupTimeoutStakers {
  alice: string
  bob: string
}
