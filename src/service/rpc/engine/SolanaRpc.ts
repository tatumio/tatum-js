/* eslint-disable @typescript-eslint/no-explicit-any */

import { Container, Service } from 'typedi'
import {
  Commitment,
  Encoding,
  JsonRpcResponse,
  SolanaAccountInfo,
  SolanaRpcSuite,
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
  } /*
  getBlockTime: (block: number | 'recent', commitment?: Commitment) => Promise<number | null>
  // Cluster-related methods
  getClusterNodes: () => Promise<Array<{ pubkey: SolanaPublicKey; gossip: string; tpu?: string }>>
  getEpochInfo: (commitment?: Commitment) => Promise<SolanaEpochInfo>
  getEpochSchedule: (
    commitment?: Commitment,
  ) => Promise<Array<{ firstSlot: number; leader: SolanaPublicKey }>>
  getFeeForMessage: (message: any, commitment?: Commitment) => Promise<number>
  getFirstAvailableBlock: () => Promise<number>
  getGenesisHash: () => Promise<string>
  getHealth: () => Promise<boolean>
  getHighestSnapshotSlot: () => Promise<number>
  getIdentity: () => Promise<SolanaPublicKey>
  getInflationGovernor: (commitment?: Commitment) => Promise<{
    foundation: number
    foundationTerm: number
    initial: number
    taper: number
    terminal: number
  }>
  getInflationRate: (commitment?: Commitment) => Promise<number>
  getInflationReward: (epoch: number, commitment?: Commitment) => Promise<number>
  getLargestAccounts: (
    filter?: 'circulating' | 'nonCirculating',
    commitment?: Commitment,
  ) => Promise<Array<{ address: string; lamports: number }>>
  getLatestBlockhash: (commitment?: Commitment) => Promise<[string, string]>
  getLeaderSchedule: (epoch?: number, commitment?: Commitment) => Promise<SolanaLeaderSchedule>
  getMaxRetransmitSlot: () => Promise<number>
  getMaxShredInsertSlot: () => Promise<number>
  getMinimumBalanceForRentExemption: (dataSize: number, commitment?: Commitment) => Promise<number>
  getMultipleAccounts: (
    publicKeys: string[],
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo | null; pubkey: SolanaPublicKey }>>
  getProgramAccounts: (
    programId: string,
    config: {
      commitment?: Commitment
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getRecentPerformanceSamples: (
    limit?: number,
    commitment?: Commitment,
  ) => Promise<Array<{ numSlots: number; numTransactions: number; samplePeriodSecs: number }>>
  getRecentPrioritizationFees: (
    commitment?: Commitment,
  ) => Promise<Array<{ fee: number; lastValidSlot: number; targetSlot: number }>>
  getSignaturesForAddress: (
    address: string,
    options?: {
      before?: SolanaTransactionSignature
      until?: SolanaTransactionSignature
      limit?: number
    },
    commitment?: Commitment,
  ) => Promise<Array<SolanaTransactionSignature>>
  getSignatureStatuses: (
    signatures: SolanaTransactionSignature[],
    commitment?: Commitment,
  ) => Promise<{ [signature: string]: { slot: number; err: any } | null }>
  getSlot: (commitment?: Commitment) => Promise<number>
  getSlotLeader: (commitment?: Commitment) => Promise<SolanaPublicKey>
  getSlotLeaders: (
    startSlot: number,
    limit?: number,
    commitment?: Commitment,
  ) => Promise<Array<{ pubkey: SolanaPublicKey; slot: number }>>
  getStakeActivation: (
    publicKey: string,
    commitment?: Commitment,
  ) => Promise<{ active: number; inactive: number }>
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
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getTokenAccountsByOwner: (
    owner: string,
    options?: {
      mint?: string
      programId?: string
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getTokenLargestAccounts: (
    mintAddress: string,
    commitment?: Commitment,
  ) => Promise<Array<{ address: string; amount: number }>>
  getTokenSupply: (mintAddress: string, commitment?: Commitment) => Promise<number>
  getTransaction: (
    signature: SolanaTransactionSignature,
    commitment?: Commitment,
  ) => Promise<SolanaTransaction>
  getTransactionCount: (commitment?: Commitment) => Promise<number>
  getVersion: () => Promise<number>
  getVoteAccounts: (
    commitment?: Commitment,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (blockhash: string, commitment?: Commitment) => Promise<boolean>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (
    publicKey: string,
    amount: number,
    commitment?: Commitment,
  ) => Promise<SolanaTransactionSignature>
  sendTransaction: (
    transaction: SolanaTransaction,
    config?: {
      skipPreflight?: boolean
      preflightCommitment?: Commitment
      commitment?: Commitment
    },
  ) => Promise<SolanaTransactionSignature>
  simulateTransaction: (
    transaction: SolanaTransaction,
    signers?: Array<string>,
    commitment?: Commitment,
  ) => Promise<{ err: any }>
  */
}
