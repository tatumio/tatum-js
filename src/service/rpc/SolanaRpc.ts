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
import { Utils } from '../../util'
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
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaAccountInfo | null>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaAccountInfo | null>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getAccountInfo', [pubkey, options]),
    )
  }

  getBalance(address: string): Promise<JsonRpcResponse<SolanaTypeWithContext<number>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<number>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBalance', [address]),
    )
  }

  getBlockHeight(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlockHeight', [options]),
    )
  }

  getBlock(block: number, options?: GetBlockOptions): Promise<JsonRpcResponse<SolanaBlock>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaBlock>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlock', [block, options]),
    )
  }

  getBlockProduction(
    options?: GetBlockProductionOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaBlockProduction>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaBlockProduction>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlockProduction', [options]),
    )
  }

  getBlockCommitment(
    block: number,
  ): Promise<JsonRpcResponse<{ commitment: Array<number>; totalStake: number }>> {
    return this.connector.rpcCall<JsonRpcResponse<{ commitment: Array<number>; totalStake: number }>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlockCommitment', [block]),
    )
  }
  getBlocks(
    startSlot: number,
    endSlot?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<Array<number>>> {
    let params: any = [startSlot]
    if (endSlot) params = [startSlot, endSlot]

    if (options && options.commitment) params.push(options)

    return this.connector.rpcCall<JsonRpcResponse<Array<number>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlocks', params),
    )
  }
  getBlocksWithLimit(
    startSlot: number,
    limit?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<Array<number>>> {
    let params: any = [startSlot]
    if (limit) params = [startSlot, limit]

    if (options && options.commitment) params.push(options)

    return this.connector.rpcCall<JsonRpcResponse<Array<number>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlocksWithLimit', params),
    )
  }

  getBlockTime(block: number): Promise<JsonRpcResponse<number | null>> {
    return this.connector.rpcCall<JsonRpcResponse<number | null>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getBlockTime', [block]),
    )
  }

  getClusterNodes(): Promise<JsonRpcResponse<Array<SolanaClusterNode>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<SolanaClusterNode>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getClusterNodes'),
    )
  }

  getEpochInfo(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<SolanaEpochInfo>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaEpochInfo>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getEpochInfo', [options]),
    )
  }

  getEpochSchedule(): Promise<JsonRpcResponse<SolanaEpochSchedule>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaEpochSchedule>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getEpochSchedule'),
    )
  }

  getFeeForMessage(
    message: any,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<number | null>> {
    return this.connector.rpcCall<JsonRpcResponse<number | null>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getFeeForMessage', [message, options]),
    )
  }

  getFirstAvailableBlock(): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getFirstAvailableBlock'),
    )
  }
  getGenesisHash(): Promise<JsonRpcResponse<string>> {
    return this.connector.rpcCall<JsonRpcResponse<string>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getGenesisHash'),
    )
  }
  getHealth(): Promise<JsonRpcResponse<string>> {
    return this.connector.rpcCall<JsonRpcResponse<string>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getHealth'),
    )
  }
  getHighestSnapshotSlot(): Promise<JsonRpcResponse<{ full: number; incremental: number }>> {
    return this.connector.rpcCall<JsonRpcResponse<{ full: number; incremental: number }>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getHighestSnapshotSlot'),
    )
  }

  getIdentity(): Promise<JsonRpcResponse<{ identity: string }>> {
    return this.connector.rpcCall<JsonRpcResponse<{ identity: string }>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getIdentity'),
    )
  }
  getInflationGovernor(options?: GetCommitmentOptions): Promise<JsonRpcResponse<SolanaInflationGovernor>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaInflationGovernor>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getInflationGovernor', [options]),
    )
  }
  getInflationRate(): Promise<JsonRpcResponse<SolanaInflationRate>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaInflationRate>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getInflationRate'),
    )
  }
  getInflationReward(
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ): Promise<JsonRpcResponse<Array<SolanaInflationReward>>> {
    let params: any = []
    if (addresses) params = [addresses]
    if (options) params = [addresses, options]

    return this.connector.rpcCall<JsonRpcResponse<Array<SolanaInflationReward>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getInflationReward', params),
    )
  }
  getLargestAccounts(
    options?: GetLargestAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaLargestAccount[]>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaLargestAccount[]>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getLargestAccounts', [options]),
    )
  }
  getLatestBlockhash(
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaLatestBlockhash>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaLatestBlockhash>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getLatestBlockhash', [options]),
    )
  }
  getLeaderSchedule(
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ): Promise<JsonRpcResponse<SolanaLeaderSchedule | null>> {
    let params: any = []
    if (slot) params = [slot]
    if (options) params = [slot, options]
    return this.connector.rpcCall<JsonRpcResponse<SolanaLeaderSchedule | null>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getLeaderSchedule', params),
    )
  }
  getMaxRetransmitSlot(): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getMaxRetransmitSlot'),
    )
  }
  getMaxShredInsertSlot(): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getMaxShredInsertSlot'),
    )
  }
  getMinimumBalanceForRentExemption(
    dataSize?: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getMinimumBalanceForRentExemption', [dataSize, options]),
    )
  }
  getMultipleAccounts(
    pubKeys?: string[],
    options?: GetMultipleAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getMultipleAccounts', [pubKeys, options]),
    )
  }
  getProgramAccounts(
    programId: string,
    options?: GetProgramAccountsOptions,
  ): Promise<JsonRpcResponse<Array<{ account: SolanaAccountInfo; pubkey: string }>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<{ account: SolanaAccountInfo; pubkey: string }>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getProgramAccounts', [programId, options]),
    )
  }
  getRecentPerformanceSamples(limit?: number): Promise<JsonRpcResponse<Array<SolanaPerformanceSample>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<SolanaPerformanceSample>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getRecentPerformanceSamples', [limit]),
    )
  }
  getRecentPrioritizationFees(
    addresses?: string[],
  ): Promise<JsonRpcResponse<Array<{ slot: number; prioritizationFee: number }>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<{ slot: number; prioritizationFee: number }>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getRecentPrioritizationFees', [addresses]),
    )
  }

  getSignaturesForAddress(
    address: string,
    options?: GetSignaturesForAddressOptions,
  ): Promise<JsonRpcResponse<Array<SolanaAddressSignature>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<SolanaAddressSignature>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSignaturesForAddress', [address, options]),
    )
  }
  getSignatureStatuses(
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaSignatureStatus>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaSignatureStatus>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSignatureStatuses', [signatures, options]),
    )
  }
  getSlot(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSlot', [options]),
    )
  }
  getSlotLeader(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<string>> {
    return this.connector.rpcCall<JsonRpcResponse<string>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSlotLeader', [options]),
    )
  }
  getSlotLeaders(startSlot?: number, limit?: number): Promise<JsonRpcResponse<Array<string>>> {
    return this.connector.rpcCall<JsonRpcResponse<Array<string>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSlotLeaders', [startSlot, limit]),
    )
  }
  getStakeActivation(
    pubkey: string,
    options?: GetStakeActivationOptions,
  ): Promise<JsonRpcResponse<{ state: string; active: number; inactive: number }>> {
    return this.connector.rpcCall<JsonRpcResponse<{ state: string; active: number; inactive: number }>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getStakeActivation', [pubkey, options]),
    )
  }
  getStakeMinimumDelegation(
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<number>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<number>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getStakeMinimumDelegation', [options]),
    )
  }
  getSupply(options?: GetSupplyOptions): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaSupply>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaSupply>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getSupply', [options]),
    )
  }
  getTokenAccountBalance(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccountBalance>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccountBalance>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTokenAccountBalance', [pubkey, options]),
    )
  }
  getTokenAccountsByDelegate(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTokenAccountsByDelegate', params),
    )
  }
  getTokenAccountsByOwner(
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>> {
    const params: any[] = [pubkey]
    if (config) params.push(config)
    if (options) params.push(options)
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenAccount[]>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTokenAccountsByOwner', params),
    )
  }
  getTokenLargestAccounts(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaAccount[]>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaAccount[]>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTokenLargestAccounts', [pubkey, options]),
    )
  }
  getTokenSupply(
    pubkey: string,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenSupply>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTokenSupply>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTokenSupply', [pubkey, options]),
    )
  }
  getTransaction(
    signature: string,
    options?: GetTransactionOptions,
  ): Promise<JsonRpcResponse<SolanaTransaction | null>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTransaction | null>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTransaction', [signature, options]),
    )
  }
  getTransactionCount(options?: GetCommitmentMinContextSlotOptions): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getTransactionCount', [options]),
    )
  }
  getVersion(): Promise<JsonRpcResponse<SolanaVersion>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaVersion>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('getVersion'),
    )
  }
  getVoteAccounts(
    options?: GetVoteAccountOptions,
  ): Promise<JsonRpcResponse<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>> {
    return this.connector.rpcCall<
      JsonRpcResponse<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
    >(this.getRpcNodeUrl(), Utils.prepareRpcCall('getVoteAccounts', [options]))
  }
  isBlockhashValid(
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<boolean>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<boolean>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('isBlockhashValid', [blockhash, options]),
    )
  }
  minimumLedgerSlot(): Promise<JsonRpcResponse<number>> {
    return this.connector.rpcCall<JsonRpcResponse<number>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('minimumLedgerSlot'),
    )
  }
  requestAirdrop(
    pubkey: string,
    amount: number,
    options?: GetCommitmentOptions,
  ): Promise<JsonRpcResponse<string>> {
    return this.connector.rpcCall<JsonRpcResponse<string>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('requestAirdrop', [pubkey, amount, options]),
    )
  }
  sendTransaction(transaction: string, options?: SendTransactionOptions): Promise<JsonRpcResponse<string>> {
    return this.connector.rpcCall<JsonRpcResponse<string>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('sendTransaction', [transaction, options]),
    )
  }
  simulateTransaction(
    transaction: string,
    options?: SimulateTransactionOptions,
  ): Promise<JsonRpcResponse<SolanaTypeWithContext<SolanaTransactionSimulation>>> {
    return this.connector.rpcCall<JsonRpcResponse<SolanaTypeWithContext<SolanaTransactionSimulation>>>(
      this.getRpcNodeUrl(),
      Utils.prepareRpcCall('simulateTransaction', [transaction, options]),
    )
  }
}
