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
  SolanaAddressSignature,
  SolanaBlock,
  SolanaBlockProduction,
  SolanaClusterNode,
  SolanaEpochInfo,
  SolanaEpochSchedule,
  SolanaInflationGovernor,
  SolanaInflationRate,
  SolanaInflationReward,
  SolanaLargestAccount,
  SolanaLatestBlockhash,
  SolanaLeaderSchedule,
  SolanaMint,
  SolanaPerformanceSample,
  SolanaProgramId,
  SolanaRpcInterface,
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

@Service()
export abstract class AbstractSolanaRpc implements SolanaRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  getAccountInfo(
    pubkey: string,
    options?: GetAccountInfoOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaAccountInfo | null>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaAccountInfo | null>>>('getAccountInfo', [
      pubkey,
      options,
    ])
  }

  getBalance(address: string): Promise<JsonRpcResponse<SolanaTypeWithContext<number>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<number>>>('getBalance', [address])
  }

  getBlockHeight(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getBlockHeight', [options])
  }

  getBlock(block: number, options?: GetBlockOptions): Promise<JsonRpcResponse<SolanaBlock>> {
    return this.rpcCall<JsonRpcResponse<SolanaBlock>>('getBlock', [block, options])
  }

  getBlockProduction(
    options?: GetBlockProductionOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaBlockProduction>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaBlockProduction>>>('getBlockProduction', [
      options,
    ])
  }

  getBlockCommitment(
    block: number,
  ): Promise<JsonRpcResponse<{ commitment: Array<number>; totalStake: number }>> {
    return this.rpcCall<JsonRpcResponse<{ commitment: Array<number>; totalStake: number }>>(
      'getBlockCommitment',
      [block],
    )
  }

  getBlocks(
    startSlot: number,
    endSlot?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<Array<number>>> {
    const params: any = [startSlot]

    if (endSlot) {
      params.push(endSlot)
    }

    if (options && options.commitment) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<Array<number>>>('getBlocks', params)
  }

  getBlocksWithLimit(
    startSlot: number,
    limit?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<Array<number>>> {
    const params: any = [startSlot]

    if (limit) {
      params.push(limit)
    }
    if (options && options.commitment) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<Array<number>>>('getBlocksWithLimit', params)
  }

  getBlockTime(block: number): Promise<JsonRpcResponse<number | null>> {
    return this.rpcCall<JsonRpcResponse<number | null>>('getBlockTime', [block])
  }

  getClusterNodes(): Promise<JsonRpcResponse<Array<SolanaClusterNode>>> {
    return this.rpcCall<JsonRpcResponse<Array<SolanaClusterNode>>>('getClusterNodes')
  }

  getEpochInfo(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<SolanaEpochInfo>> {
    return this.rpcCall<JsonRpcResponse<SolanaEpochInfo>>('getEpochInfo', [options])
  }

  getEpochSchedule(): Promise<JsonRpcResponse<SolanaEpochSchedule>> {
    return this.rpcCall<JsonRpcResponse<SolanaEpochSchedule>>('getEpochSchedule')
  }

  getFeeForMessage(
    message: any,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<number | null>> {
    return this.rpcCall<JsonRpcResponse<number | null>>('getFeeForMessage', [message, options])
  }

  getFirstAvailableBlock(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getFirstAvailableBlock')
  }

  getGenesisHash(): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('getGenesisHash')
  }

  getHealth(): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('getHealth')
  }

  getHighestSnapshotSlot(): Promise<JsonRpcResponse<{ full: number; incremental: number }>> {
    return this.rpcCall<JsonRpcResponse<{ full: number; incremental: number }>>('getHighestSnapshotSlot')
  }

  getIdentity(): Promise<JsonRpcResponse<{ identity: string }>> {
    return this.rpcCall<JsonRpcResponse<{ identity: string }>>('getIdentity')
  }

  getInflationGovernor(options?: GetCommitmentOptions): Promise<JsonRpcResponse<SolanaInflationGovernor>> {
    return this.rpcCall<JsonRpcResponse<SolanaInflationGovernor>>('getInflationGovernor', [options])
  }

  getInflationRate(): Promise<JsonRpcResponse<SolanaInflationRate>> {
    return this.rpcCall<JsonRpcResponse<SolanaInflationRate>>('getInflationRate')
  }

  getInflationReward(
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ): Promise<JsonRpcResponse<Array<SolanaInflationReward>>> {
    const params: any = []

    if (addresses) {
      params.push(addresses)
    }

    if (options) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<Array<SolanaInflationReward>>>('getInflationReward', params)
  }

  getLargestAccounts(
    options?: GetLargestAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaLargestAccount[]>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaLargestAccount[]>>>(
      'getLargestAccounts',
      [options],
    )
  }

  getLatestBlockhash(
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaLatestBlockhash>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaLatestBlockhash>>>('getLatestBlockhash', [
      options,
    ])
  }

  getLeaderSchedule(
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ): Promise<JsonRpcResponse<SolanaLeaderSchedule | null>> {
    const params: any = []
    if (slot) {
      params.push(slot)
    }

    if (options) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<SolanaLeaderSchedule | null>>('getLeaderSchedule', params)
  }

  getMaxRetransmitSlot(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getMaxRetransmitSlot')
  }

  getMaxShredInsertSlot(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getMaxShredInsertSlot')
  }

  getMinimumBalanceForRentExemption(
    dataSize?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getMinimumBalanceForRentExemption', [dataSize, options])
  }

  getMultipleAccounts(
    pubKeys?: string[],
    options?: GetMultipleAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>>(
      'getMultipleAccounts',
      [pubKeys, options],
    )
  }

  getProgramAccounts(
    programId: string,
    options?: GetProgramAccountsOptions,
  ): Promise<JsonRpcResponse<Array<{ account: SolanaAccountInfo; pubkey: string }>>> {
    return this.rpcCall<JsonRpcResponse<Array<{ account: SolanaAccountInfo; pubkey: string }>>>(
      'getProgramAccounts',
      [programId, options],
    )
  }

  getRecentPerformanceSamples(limit?: number): Promise<JsonRpcResponse<Array<SolanaPerformanceSample>>> {
    return this.rpcCall<JsonRpcResponse<Array<SolanaPerformanceSample>>>('getRecentPerformanceSamples', [
      limit,
    ])
  }

  getRecentPrioritizationFees(
    addresses?: string[],
  ): Promise<JsonRpcResponse<Array<{ slot: number; prioritizationFee: number }>>> {
    return this.rpcCall<JsonRpcResponse<Array<{ slot: number; prioritizationFee: number }>>>(
      'getRecentPrioritizationFees',
      [addresses],
    )
  }

  getSignaturesForAddress(
    address: string,
    options?: GetSignaturesForAddressOptions,
  ): Promise<JsonRpcResponse<Array<SolanaAddressSignature>>> {
    return this.rpcCall<JsonRpcResponse<Array<SolanaAddressSignature>>>('getSignaturesForAddress', [
      address,
      options,
    ])
  }

  getSignatureStatuses(
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaSignatureStatus>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaSignatureStatus>>>(
      'getSignatureStatuses',
      [signatures, options],
    )
  }

  getSlot(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getSlot', [options])
  }

  getSlotLeader(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('getSlotLeader', [options])
  }

  getSlotLeaders(startSlot?: number, limit?: number): Promise<JsonRpcResponse<Array<string>>> {
    return this.rpcCall<JsonRpcResponse<Array<string>>>('getSlotLeaders', [startSlot, limit])
  }

  getStakeActivation(
    pubkey: string,
    options?: GetStakeActivationOptions,
  ): Promise<JsonRpcResponse<{ state: string; active: number; inactive: number }>> {
    return this.rpcCall<JsonRpcResponse<{ state: string; active: number; inactive: number }>>(
      'getStakeActivation',
      [pubkey, options],
    )
  }

  getStakeMinimumDelegation(
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<number>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<number>>>('getStakeMinimumDelegation', [
      options,
    ])
  }

  getSupply(options?: GetSupplyOptions): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaSupply>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaSupply>>>('getSupply', [options])
  }

  getTokenAccountBalance(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccountBalance>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccountBalance>>>(
      'getTokenAccountBalance',
      [pubkey, options],
    )
  }

  getTokenAccountsByDelegate(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]

    if (config) {
      params.push(config)
    }

    if (options) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>>(
      'getTokenAccountsByDelegate',
      params,
    )
  }

  getTokenAccountsByOwner(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]

    if (config) {
      params.push(config)
    }
    if (options) {
      params.push(options)
    }

    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>>(
      'getTokenAccountsByOwner',
      params,
    )
  }

  getTokenLargestAccounts(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaAccount[]>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaAccount[]>>>('getTokenLargestAccounts', [
      pubkey,
      options,
    ])
  }

  getTokenSupply(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenSupply>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenSupply>>>('getTokenSupply', [
      pubkey,
      options,
    ])
  }

  getTransaction(
    signature: string,
    options?: GetTransactionOptions,
  ): Promise<JsonRpcResponse<SolanaTransaction | null>> {
    return this.rpcCall<JsonRpcResponse<SolanaTransaction | null>>('getTransaction', [signature, options])
  }

  getTransactionCount(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getTransactionCount', [options])
  }

  getVersion(): Promise<JsonRpcResponse<SolanaVersion>> {
    return this.rpcCall<JsonRpcResponse<SolanaVersion>>('getVersion')
  }

  getVoteAccounts(
    options?: GetVoteAccountOptions,
  ): Promise<JsonRpcResponse<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>> {
    return this.rpcCall<
      JsonRpcResponse<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
    >('getVoteAccounts', [options])
  }

  isBlockhashValid(
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<boolean>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<boolean>>>('isBlockhashValid', [
      blockhash,
      options,
    ])
  }

  minimumLedgerSlot(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('minimumLedgerSlot')
  }

  requestAirdrop(
    pubkey: string,
    amount: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('requestAirdrop', [pubkey, amount, options])
  }

  sendTransaction(transaction: string, options?: SendTransactionOptions): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('sendTransaction', [transaction, options])
  }

  simulateTransaction(
    transaction: string,
    options?: SimulateTransactionOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTransactionSimulation>>> {
    return this.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTransactionSimulation>>>(
      'simulateTransaction',
      [transaction, options],
    )
  }
}
