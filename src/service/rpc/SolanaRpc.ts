/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi'
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
} from '../../dto'
import { ResponseDto, ResponseUtils, Utils } from '../../util'
import { AbstractBatchRpc } from './generic'

@Service({
  factory: (data: { id: string }) => {
    return new SolanaRpc(data.id)
  },
  transient: true,
})
export class SolanaRpc extends AbstractBatchRpc implements SolanaRpcSuite {
  constructor(id: string) {
    super(id)
  }

  getAccountInfo(
    pubkey: string,
    options?: GetAccountInfoOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaAccountInfo | null>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getAccountInfo', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getBalance(address: string): Promise<ResponseDto<SolanaTypeWithContext<number>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBalance', [address]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getBlockHeight(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockHeight', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getBlock(
    block: number,
    options?: GetBlockOptions,
  ): Promise<
    ResponseDto<{
      blockhash: string
      previousBlockhash: string
      parentSlot: number
      transactions: Array<any>
      signatures: Array<any>
      rewards: Array<any> | undefined
      blockTime: number | null
      blockHeight: number | null
    } | null>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlock', [block, options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getBlockProduction(
    options?: GetBlockProductionOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaBlockProduction>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockProduction', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getBlockCommitment(block: number): Promise<ResponseDto<{ commitment: Array<number>; totalStake: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockCommitment', [block]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getBlocks(
    endSlot: number,
    startSlot?: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<Array<number>>> {
    let params: any = [endSlot]
    if (startSlot) params = [startSlot, endSlot]

    if (options && options.commitment) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlocks', params))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getBlockTime(block: number): Promise<ResponseDto<number | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getBlockTime', [block]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getClusterNodes(): Promise<
    ResponseDto<
      Array<{
        pubkey: string
        gossip?: string
        tpu?: string
        rpc?: string
        version?: string
        featureSet?: number
        shredVersion?: number
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getClusterNodes'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getEpochInfo(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<SolanaEpochInfo>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getEpochInfo', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getEpochSchedule(): Promise<ResponseDto<SolanaEpochSchedule>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getEpochSchedule'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getFeeForMessage(
    message: any,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<number | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getFeeForMessage', [message, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }

  getFirstAvailableBlock(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getFirstAvailableBlock'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getGenesisHash(): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getGenesisHash'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getHealth(): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getHealth'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getHighestSnapshotSlot(): Promise<ResponseDto<{ full: number; incremental: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getHighestSnapshotSlot'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getIdentity(): Promise<ResponseDto<{ identity: string }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getIdentity'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getInflationGovernor(options?: GetCommitmentOptions): Promise<
    ResponseDto<{
      initial: number
      terminal: number
      taper: number
      foundation: number
      foundationTerm: number
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationGovernor', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getInflationRate(): Promise<
    ResponseDto<{ total: number; validator: number; foundation: number; epoch: number }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationRate'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getInflationReward(
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ): Promise<
    ResponseDto<
      Array<{
        epoch: number
        effectiveSlot: number
        amount: number
        postBalance: number
        commission: number
      }>
    >
  > {
    let params: any = []
    if (addresses) params = [addresses]
    if (options) params.push(options)

    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getInflationReward', params))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getLargestAccounts(
    options?: GetLargestAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaLargestAccount[]>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getLargestAccounts', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getLatestBlockhash(
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaLatestBlockhash>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getLatestBlockhash', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getLeaderSchedule(
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ): Promise<ResponseDto<SolanaLeaderSchedule | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getLeaderSchedule', [slot, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getMaxRetransmitSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getMaxRetransmitSlot'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getMaxShredInsertSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getMaxShredInsertSlot'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getMinimumBalanceForRentExemption(
    dataSize?: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getMinimumBalanceForRentExemption', [dataSize, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getMultipleAccounts(
    pubKeys?: string[],
    options?: GetMultipleAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getMultipleAccounts', [pubKeys, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getProgramAccounts(
    programId: string,
    options?: GetProgramAccountsOptions,
  ): Promise<ResponseDto<Array<{ account: SolanaAccountInfo; pubkey: string }>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getProgramAccounts', [programId, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getRecentPerformanceSamples(limit?: number): Promise<
    ResponseDto<
      Array<{
        slot: number
        numTransactions: number
        numSlots: number
        samplePeriodSecs: number
        numNonVoteTransaction: number
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getRecentPerformanceSamples', [limit]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getRecentPrioritizationFees(
    addresses?: string[],
  ): Promise<ResponseDto<Array<{ slot: number; prioritizationFee: number }>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getRecentPrioritizationFees', [addresses]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSignaturesForAddress(
    address: string,
    options?: GetSignaturesForAddressOptions,
  ): Promise<
    ResponseDto<
      Array<{
        signature: string
        slot: number
        err: any | null
        memo: string | null
        blockTime: number | null
        confirmationStatus: string | null
      }>
    >
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSignaturesForAddress', [address, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSignatureStatuses(
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaSignatureStatus>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSignatureStatuses', [signatures, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSlot(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSlot', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSlotLeader(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSlotLeader', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSlotLeaders(startSlot?: number, limit?: number): Promise<ResponseDto<Array<string>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getSlotLeaders', [startSlot, limit]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getStakeActivation(
    pubkey: string,
    options?: GetStakeActivationOptions,
  ): Promise<ResponseDto<{ state: string; active: number; inactive: number }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getStakeActivation', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getStakeMinimumDelegation(
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<number>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getStakeMinimumDelegation', [options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getSupply(options?: GetSupplyOptions): Promise<ResponseDto<SolanaTypeWithContext<SolanaSupply>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getSupply', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTokenAccountBalance(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccountBalance>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenAccountBalance', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTokenAccountsByDelegate(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenAccountsByDelegate', params),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTokenAccountsByOwner(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getTokenAccountsByOwner', params))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTokenLargestAccounts(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaAccount[]>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenLargestAccounts', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTokenSupply(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTokenSupply>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTokenSupply', [pubkey, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTransaction(
    signature: string,
    options?: GetTransactionOptions,
  ): Promise<ResponseDto<SolanaTransaction | null>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('getTransaction', [signature, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getTransactionCount(options?: GetCommitmentMinContextSlotOptions): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getTransactionCount', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getVersion(): Promise<ResponseDto<SolanaVersion>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getVersion'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  getVoteAccounts(
    options?: GetVoteAccountOptions,
  ): Promise<ResponseDto<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('getVoteAccounts', [options]))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  isBlockhashValid(
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<boolean>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('isBlockhashValid', [blockhash, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  minimumLedgerSlot(): Promise<ResponseDto<number>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), Utils.prepareRpcCall('minimumLedgerSlot'))
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  requestAirdrop(
    pubkey: string,
    amount: number,
    options?: GetCommitmentOptions,
  ): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('requestAirdrop', [pubkey, amount, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  sendTransaction(transaction: string, options?: SendTransactionOptions): Promise<ResponseDto<string>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('sendTransaction', [transaction, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
  simulateTransaction(
    transaction: string,
    options?: SimulateTransactionOptions,
  ): Promise<ResponseDto<SolanaTypeWithContext<SolanaTransactionSimulation>>> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        Utils.prepareRpcCall('simulateTransaction', [transaction, options]),
      )
      .then((r) => ResponseUtils.fromRpcResult(r))
  }
}
