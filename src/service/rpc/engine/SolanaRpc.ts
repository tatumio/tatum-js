/* eslint-disable @typescript-eslint/no-explicit-any */

import { Container, Service } from 'typedi'
import {
  GetAccountInfoOptions,
  GetBlockOptions,
  GetBlockProductionOptions,
  GetCommitmentMinContextSlotOptions,
  GetCommitmentOptions,
  GetInflationRewardOptions,
  GetLargestAccountsOptions,
  GetLeaderScheduleOptions,
  GetMultipleAccountsOptions,
  GetProgramAccountsOptions,
  GetSignaturesForAddressOptions,
  GetSignatureStatusesOptions,
  GetStakeActivationOptions,
  GetSupplyOptions,
  GetTokenAccountsOptions,
  GetTransactionOptions,
  GetVoteAccountOptions,
  JsonRpcResponse,
  SendTransactionOptions,
  SimulateTransactionOptions,
  SolanaAccount,
  SolanaAccountInfo,
  SolanaBlockProduction,
  SolanaEpochInfo,
  SolanaEpochSchedule,
  SolanaLargestAccount,
  SolanaLatestBlockhash,
  SolanaLeaderSchedule,
  SolanaMint,
  SolanaProgramId,
  SolanaRpcSuite,
  SolanaSignatureStatus,
  SolanaSupply,
  SolanaTokenAccount,
  SolanaTokenAccountBalance,
  SolanaTokenSupply,
  SolanaTransaction,
  SolanaTransactionSimulation,
  SolanaTypeWithContext,
  SolanaVersion,
  SolanaVoteAccount,
} from '../../../dto'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

@Service({
  factory: (data: { id: string }) => {
    return new SolanaRpc(data.id)
  },
  transient: true,
})
export class SolanaRpc extends AbstractJsonRpc implements SolanaRpcSuite {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }

  getAccountInfo(
    pubkey: string,
    options?: GetAccountInfoOptions,
  ): Promise<SolanaTypeWithContext<SolanaAccountInfo | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getAccountInfo', [pubkey, options]),
      )
      .then((r) => r.result)
  }

  getBalance(address: string): Promise<SolanaTypeWithContext<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBalance', [address]))
      .then((r) => r.result)
  }

  getBlockHeight(options?: GetCommitmentMinContextSlotOptions): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlockHeight', [options]))
      .then((r) => r.result)
  }

  getBlock(
    block: number,
    options?: GetBlockOptions,
  ): Promise<{
    blockhash: string
    previousBlockhash: string
    parentSlot: number
    transactions: Array<any>
    signatures: Array<any>
    rewards: Array<any> | undefined
    blockTime: number | null
    blockHeight: number | null
  } | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlock', [block, options]))
      .then((r) => r.result)
  }

  getBlockProduction(
    options?: GetBlockProductionOptions,
  ): Promise<SolanaTypeWithContext<SolanaBlockProduction>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlockProduction', [options]))
      .then((r) => r.result)
  }

  getBlockCommitment(block: number): Promise<{ commitment: Array<number>; totalStake: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlockCommitment', [block]))
      .then((r) => r.result)
  }
  getBlocks(endSlot: number, startSlot?: number, options?: GetCommitmentOptions): Promise<Array<number>> {
    let params: any = [endSlot]
    if (startSlot) params = [startSlot, endSlot]

    if (options && options.commitment) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlocks', params))
      .then((r) => r.result)
  }
  getBlockTime(block: number): Promise<number | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlockTime', [block]))
      .then((r) => r.result)
  }

  getClusterNodes(): Promise<
    Array<{
      pubkey: string
      gossip?: string
      tpu?: string
      rpc?: string
      version?: string
      featureSet?: number
      shredVersion?: number
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getClusterNodes'))
      .then((r) => r.result)
  }

  getEpochInfo(options?: GetCommitmentMinContextSlotOptions): Promise<SolanaEpochInfo> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getEpochInfo', [options]))
      .then((r) => r.result)
  }

  getEpochSchedule(): Promise<SolanaEpochSchedule> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getEpochSchedule'))
      .then((r) => r.result)
  }

  getFeeForMessage(message: any, options?: GetCommitmentMinContextSlotOptions): Promise<number | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getFeeForMessage', [message, options]),
      )
      .then((r) => r.result)
  }

  getFirstAvailableBlock(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getFirstAvailableBlock'))
      .then((r) => r.result)
  }
  getGenesisHash(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getGenesisHash'))
      .then((r) => r.result)
  }
  getHealth(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getHealth'))
      .then((r) => r.result)
  }
  getHighestSnapshotSlot(): Promise<{ full: number; incremental: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getHighestSnapshotSlot'))
      .then((r) => r.result)
  }
  getIdentity(): Promise<{ identity: string }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getIdentity'))
      .then((r) => r.result)
  }
  getInflationGovernor(options?: GetCommitmentOptions): Promise<{
    initial: number
    terminal: number
    taper: number
    foundation: number
    foundationTerm: number
  }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getInflationGovernor', [options]))
      .then((r) => r.result)
  }
  getInflationRate(): Promise<{ total: number; validator: number; foundation: number; epoch: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getInflationRate'))
      .then((r) => r.result)
  }
  getInflationReward(
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ): Promise<
    Array<{
      epoch: number
      effectiveSlot: number
      amount: number
      postBalance: number
      commission: number
    }>
  > {
    let params: any = []
    if (addresses) params = [addresses]
    if (options) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getInflationReward', params))
      .then((r) => r.result)
  }
  getLargestAccounts(
    options?: GetLargestAccountsOptions,
  ): Promise<SolanaTypeWithContext<SolanaLargestAccount[]>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getLargestAccounts', [options]))
      .then((r) => r.result)
  }
  getLatestBlockhash(
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<SolanaTypeWithContext<SolanaLatestBlockhash>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getLatestBlockhash', [options]))
      .then((r) => r.result)
  }
  getLeaderSchedule(slot?: number, options?: GetLeaderScheduleOptions): Promise<SolanaLeaderSchedule | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getLeaderSchedule', [slot, options]),
      )
      .then((r) => r.result)
  }
  getMaxRetransmitSlot(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getMaxRetransmitSlot'))
      .then((r) => r.result)
  }
  getMaxShredInsertSlot(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getMaxShredInsertSlot'))
      .then((r) => r.result)
  }
  getMinimumBalanceForRentExemption(dataSize?: number, options?: GetCommitmentOptions): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getMinimumBalanceForRentExemption', [dataSize, options]),
      )
      .then((r) => r.result)
  }
  getMultipleAccounts(
    pubKeys?: string[],
    options?: GetMultipleAccountsOptions,
  ): Promise<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getMultipleAccounts', [pubKeys, options]),
      )
      .then((r) => r.result)
  }
  getProgramAccounts(
    programId: string,
    options?: GetProgramAccountsOptions,
  ): Promise<Array<{ account: SolanaAccountInfo; pubkey: string }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getProgramAccounts', [programId, options]),
      )
      .then((r) => r.result)
  }
  getRecentPerformanceSamples(limit?: number): Promise<
    Array<{
      slot: number
      numTransactions: number
      numSlots: number
      samplePeriodSecs: number
      numNonVoteTransaction: number
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getRecentPerformanceSamples', [limit]),
      )
      .then((r) => r.result)
  }
  getRecentPrioritizationFees(
    addresses?: string[],
  ): Promise<Array<{ slot: number; prioritizationFee: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getRecentPrioritizationFees', [addresses]),
      )
      .then((r) => r.result)
  }
  getSignaturesForAddress(
    address: string,
    options?: GetSignaturesForAddressOptions,
  ): Promise<
    Array<{
      signature: string
      slot: number
      err: any | null
      memo: string | null
      blockTime: number | null
      confirmationStatus: string | null
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getSignaturesForAddress', [address, options]),
      )
      .then((r) => r.result)
  }
  getSignatureStatuses(
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ): Promise<SolanaTypeWithContext<SolanaSignatureStatus>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getSignatureStatuses', [signatures, options]),
      )
      .then((r) => r.result)
  }
  getSlot(options?: GetCommitmentMinContextSlotOptions): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getSlot', [options]))
      .then((r) => r.result)
  }
  getSlotLeader(options?: GetCommitmentMinContextSlotOptions): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getSlotLeader', [options]))
      .then((r) => r.result)
  }
  getSlotLeaders(startSlot?: number, limit?: number): Promise<Array<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getSlotLeaders', [startSlot, limit]),
      )
      .then((r) => r.result)
  }
  getStakeActivation(
    pubkey: string,
    options?: GetStakeActivationOptions,
  ): Promise<{ state: string; active: number; inactive: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getStakeActivation', [pubkey, options]),
      )
      .then((r) => r.result)
  }
  getStakeMinimumDelegation(options?: GetCommitmentOptions): Promise<SolanaTypeWithContext<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getStakeMinimumDelegation', [options]),
      )
      .then((r) => r.result)
  }
  getSupply(options?: GetSupplyOptions): Promise<SolanaTypeWithContext<SolanaSupply>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getSupply', [options]))
      .then((r) => r.result)
  }
  getTokenAccountBalance(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<SolanaTypeWithContext<SolanaTokenAccountBalance>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getTokenAccountBalance', [pubkey, options]),
      )
      .then((r) => r.result)
  }
  getTokenAccountsByDelegate(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<SolanaTypeWithContext<SolanaTokenAccount[]>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getTokenAccountsByDelegate', params),
      )
      .then((r) => r.result)
  }
  getTokenAccountsByOwner(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<SolanaTypeWithContext<SolanaTokenAccount[]>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getTokenAccountsByOwner', params))
      .then((r) => r.result)
  }
  getTokenLargestAccounts(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<SolanaTypeWithContext<SolanaAccount[]>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getTokenLargestAccounts', [pubkey, options]),
      )
      .then((r) => r.result)
  }
  getTokenSupply(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<SolanaTypeWithContext<SolanaTokenSupply>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getTokenSupply', [pubkey, options]),
      )
      .then((r) => r.result)
  }
  getTransaction(signature: string, options?: GetTransactionOptions): Promise<SolanaTransaction | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getTransaction', [signature, options]),
      )
      .then((r) => r.result)
  }
  getTransactionCount(options?: GetCommitmentMinContextSlotOptions): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getTransactionCount', [options]))
      .then((r) => r.result)
  }
  getVersion(): Promise<SolanaVersion> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getVersion'))
      .then((r) => r.result)
  }
  getVoteAccounts(
    options?: GetVoteAccountOptions,
  ): Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getVoteAccounts', [options]))
      .then((r) => r.result)
  }
  isBlockhashValid(
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<SolanaTypeWithContext<boolean>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('isBlockhashValid', [blockhash, options]),
      )
      .then((r) => r.result)
  }
  minimumLedgerSlot(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('minimumLedgerSlot'))
      .then((r) => r.result)
  }
  requestAirdrop(pubkey: string, amount: number, options?: GetCommitmentOptions): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('requestAirdrop', [pubkey, amount, options]),
      )
      .then((r) => r.result)
  }
  sendTransaction(transaction: string, options?: SendTransactionOptions): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('sendTransaction', [transaction, options]),
      )
      .then((r) => r.result)
  }
  simulateTransaction(
    transaction: string,
    options?: SimulateTransactionOptions,
  ): Promise<SolanaTypeWithContext<SolanaTransactionSimulation>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('simulateTransaction', [transaction, options]),
      )
      .then((r) => r.result)
  }
}
