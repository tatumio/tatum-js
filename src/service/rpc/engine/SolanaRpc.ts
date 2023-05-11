/* eslint-disable @typescript-eslint/no-explicit-any */

import { Container, Service } from 'typedi'
import {
  Commitment,
  Encoding,
  JsonRpcResponse,
  SolanaAccountInfo,
  SolanaEpochInfo,
  SolanaEpochSchedule,
  SolanaLeaderSchedule,
  SolanaRpcSuite,
  SolanaTransaction,
  SolanaVoteAccount,
  TransactionDetails,
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
    publicKey: string,
    commitment?: Commitment,
    encoding?: Encoding,
  ): Promise<SolanaAccountInfo | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getAccountInfo', [publicKey, { commitment, encoding }]),
      )
      .then((r) => r.result)
  }

  getBalance(address: string): Promise<{ context: { slot: number }; value: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBalance', [address]))
      .then((r) => r.result)
  }

  getBlockHeight(commitment?: string, minContextSlot?: string): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getBlockHeight', [{ commitment, minContextSlot }]),
      )
      .then((r) => r.result)
  }

  getBlock(
    block: number,
    options?: {
      commitment?: Commitment
      encoding?: Encoding
      transactionDetails?: TransactionDetails
      maxSupportedTransactionVersion?: number
      rewards?: boolean
    },
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
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getBlock', [block, { ...options }]),
      )
      .then((r) => r.result)
  }

  getBlockProduction(options?: {
    commitment?: Commitment
    identity?: string
    range?: {
      firstSlot: number
      lastSlot: number
    }
  }): Promise<{
    context: { slot: number }
    value: {
      byIdentity: {
        [key: string]: Array<number>
      }
      range: { firstSlot: number; lastSlot: number }
    }
  }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getBlockProduction', [{ ...options }]),
      )
      .then((r) => r.result)
  }

  getBlockCommitment(block: number): Promise<{ commitment: Array<number>; totalStake: number }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getBlockCommitment', [block]))
      .then((r) => r.result)
  }
  getBlocks(endSlot: number, startSlot?: number, commitment?: Commitment): Promise<Array<number>> {
    let params: any = [endSlot]
    if (startSlot) params = [startSlot, endSlot]

    if (commitment) params.push({ commitment })

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
  //todo test
  getEpochInfo(
    pubkey: string,
    options?: { commitment?: Commitment; minContextSlot?: number },
  ): Promise<SolanaEpochInfo> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getEpochInfo', [pubkey, { ...options }]),
      )
      .then((r) => r.result)
  }

  getEpochSchedule(): Promise<SolanaEpochSchedule> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getEpochSchedule'))
      .then((r) => r.result)
  }

  getFeeForMessage(
    message: any,
    options?: { commitment?: Commitment; minContextSlot?: number },
  ): Promise<number | null> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getFeeForMessage', [message, { ...options }]),
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
  getInflationGovernor(options?: { commitment?: Commitment }): Promise<{
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
    options?: {
      commitment?: Commitment
      epoch?: number
      minContextSlot?: number
    },
  ): Promise<
    Array<{
      epoch: number
      effectiveSlot: number
      amount: number
      postBalance: number
      commission: number
    }>
  > {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getInflationReward', [addresses, options]),
      )
      .then((r) => r.result)
  }
  getLargestAccounts(options?: {
    commitment?: Commitment
    filter?: 'circulating' | 'nonCirculating'
  }): Promise<{ context: { slot: number }; value: Array<{ address: string; lamports: number }> }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getLargestAccounts', [options]))
      .then((r) => r.result)
  }
  getLatestBlockhash(options?: { commitment?: Commitment; minContextSlot?: number }): Promise<{
    context: { slot: number }
    value: {
      blockhash: string
      lastValidBlockHeight: number
    }
  }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getLatestBlockhash', [options]))
      .then((r) => r.result)
  }
  getLeaderSchedule(
    slot?: number,
    options?: {
      commitment?: Commitment
      identity?: string
    },
  ): Promise<SolanaLeaderSchedule | null> {
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
  getMinimumBalanceForRentExemption(
    dataSize?: number,
    options?: { commitment?: Commitment },
  ): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getMinimumBalanceForRentExemption', [dataSize, options]),
      )
      .then((r) => r.result)
  }
  getMultipleAccounts(
    pubKeys?: string[],
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      dataSlice?: { offset: number; length: number }
      encoding?: Encoding
    },
  ): Promise<{ context: { slot: number }; value: Array<SolanaAccountInfo | null> }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getMultipleAccounts', [pubKeys, options]),
      )
      .then((r) => r.result)
  }
  getProgramAccounts(
    programId: string,
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      withContext?: boolean
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
      filters?: Array<{ memcmp: { offset: number; bytes: string } | { dataSize: number } }>
    },
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
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      limit?: number
      before?: string
      until?: string
    },
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
    options?: {
      searchTransactionHistory?: boolean
    },
  ): Promise<{
    context: { slot: number }
    value: {
      slot: number
      confirmations: number | null
      err: any | null
      confirmationStatus: string | null
    }
  }> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getSignatureStatuses', [signatures, options]),
      )
      .then((r) => r.result)
  }
  getSlot(options?: { commitment?: Commitment; minContextSlot?: number }): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getSlot', [options]))
      .then((r) => r.result)
  }
  getSlotLeader(options?: { commitment?: Commitment; minContextSlot?: number }): Promise<string> {
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
  getStakeActivation: (
    publicKey: string,
    options?: { commitment?: Commitment; minContextSlot?: number; epoch?: number },
  ) => Promise<{ state: string; active: number; inactive: number }>
  getStakeMinimumDelegation: (commitment?: Commitment) => Promise<number>
  getSupply: (
    commitment?: Commitment,
  ) => Promise<{ circulating: number; nonCirculating: number; total: number }>
  getTokenAccountBalance: (
    publicKey: string,
    commitment?: Commitment,
  ) => Promise<{ value: number; decimals: number }>
  getTokenAccountsByDelegate: (
    delegate: string,
    options?: {
      mint?: string
      programId?: string
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: string; data: any }>>
  getTokenAccountsByOwner: (
    owner: string,
    options?: {
      mint?: string
      programId?: string
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: string; data: any }>>
  getTokenLargestAccounts: (
    mintAddress: string,
    commitment?: Commitment,
  ) => Promise<Array<{ address: string; amount: number }>>
  getTokenSupply: (mintAddress: string, commitment?: Commitment) => Promise<number>
  getTransaction: (signature: string, commitment?: Commitment) => Promise<SolanaTransaction>
  getTransactionCount: (commitment?: Commitment) => Promise<number>
  getVersion: () => Promise<number>
  getVoteAccounts: (
    commitment?: Commitment,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (blockhash: string, commitment?: Commitment) => Promise<boolean>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (publicKey: string, amount: number, commitment?: Commitment) => Promise<string>
  sendTransaction: (
    transaction: SolanaTransaction,
    config?: {
      skipPreflight?: boolean
      preflightCommitment?: Commitment
      commitment?: Commitment
    },
  ) => Promise<string>
  simulateTransaction: (
    transaction: SolanaTransaction,
    signers?: Array<string>,
    commitment?: Commitment,
  ) => Promise<{ err: any }>
}
