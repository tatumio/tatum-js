/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockchainAccountInspect } from './models/BlockchainAccountInspect';
import type { BlockchainBlock } from './models/BlockchainBlock';
import type { BlockchainBlocks } from './models/BlockchainBlocks';
import type { BlockchainBlockShards } from './models/BlockchainBlockShards';
import type { BlockchainConfig } from './models/BlockchainConfig';
import type { BlockchainRawAccount } from './models/BlockchainRawAccount';
import type { MethodExecutionResult } from './models/MethodExecutionResult';
import type { RawBlockchainConfig } from './models/RawBlockchainConfig';
import type { ReducedBlocks } from './models/ReducedBlocks';
import type { ServiceStatus } from './models/ServiceStatus';
import type { Transaction } from './models/Transaction';
import type { Transactions } from './models/Transactions';
import type { Validators } from './models/Validators';
import type { Account } from './models/Account';
import type { AccountEvents } from './models/AccountEvents';
import type { Accounts } from './models/Accounts';
import type { DnsExpiring } from './models/DnsExpiring';
import type { DomainNames } from './models/DomainNames';
import type { FoundAccounts } from './models/FoundAccounts';
import type { JettonBalance } from './models/JettonBalance';
import type { JettonsBalances } from './models/JettonsBalances';
import type { Multisigs } from './models/Multisigs';
import type { NftItems } from './models/NftItems';
import type { Subscriptions } from './models/Subscriptions';
import type { TraceIDs } from './models/TraceIDs';
import type { AccountInfoByStateInit } from './models/AccountInfoByStateInit';
import type { Auctions } from './models/Auctions';
import type { DnsRecord } from './models/DnsRecord';
import type { DomainBids } from './models/DomainBids';
import type { DomainInfo } from './models/DomainInfo';
import type { AccountEvent } from './models/AccountEvent';
import type { DecodedMessage } from './models/DecodedMessage';
import type { Event } from './models/Event';
import type { MessageConsequences } from './models/MessageConsequences';
import type { Trace } from './models/Trace';
import type { GaslessConfig } from './models/GaslessConfig';
import type { SignRawParams } from './models/SignRawParams';
import type { InscriptionBalances } from './models/InscriptionBalances';
import type { JettonHolders } from './models/JettonHolders';
import type { JettonInfo } from './models/JettonInfo';
import type { Jettons } from './models/Jettons';
import type { BlockRaw } from './models/BlockRaw';
import type { InitStateRaw } from './models/InitStateRaw';
import type { Multisig } from './models/Multisig';
import type { NftCollection } from './models/NftCollection';
import type { NftCollections } from './models/NftCollections';
import type { MarketTonRates } from './models/MarketTonRates';
import type { TokenRates } from './models/TokenRates';
import type { AccountStaking } from './models/AccountStaking';
import type { ApyHistory } from './models/ApyHistory';
import type { PoolImplementation } from './models/PoolImplementation';
import type { PoolInfo } from './models/PoolInfo';
import type { StorageProvider } from './models/StorageProvider';
import type { Seqno } from './models/Seqno';
import { NftItem } from './models/NftItem'
import { TonResponse } from './models/TonResponse'
import { GetTransactions } from './models/GetTransactions'
import { GetShardBlockProof } from './models/GetShardBlockProof'
import { LookupBlock } from './models/LookupBlock'
import { GetBlockTransactions } from './models/GetBlockTransactions'
import { GetBlockTransactionsExt } from './models/GetBlockTransactionsExt'
import { GetBlockHeader } from './models/GetBlockHeader'
import { TryLocateTx } from './models/TryLocateTx'
import { Body_run_get_method_runGetMethod_post } from './models/Body_run_get_method_runGetMethod_post'
import { Body_send_boc_sendBoc_post } from './models/Body_send_boc_sendBoc_post'
import {
  Body_send_boc_return_hash_sendBocReturnHash_post
} from './models/Body_send_boc_return_hash_sendBocReturnHash_post'
import { Body_send_query_sendQuery_post } from './models/Body_send_query_sendQuery_post'
import { Body_estimate_fee_estimateFee_post } from './models/Body_estimate_fee_estimateFee_post'
import { TonRequestJsonRPC } from './models/TonRequestJsonRPC'
import { DeprecatedTonResponseJsonRPC } from './models/DeprecatedTonResponseJsonRPC'

export interface TonRpcSuite {
  status(): Promise<ServiceStatus | { error: string }>;

  getReducedBlockchainBlocks(
    from: number,
    to: number
  ): Promise<ReducedBlocks | { error: string }>;

  getBlockchainBlock(blockId: string): Promise<BlockchainBlock | { error: string }>;

  getBlockchainMasterchainShards(masterchainSeqno: number): Promise<BlockchainBlockShards | { error: string }>;

  getBlockchainMasterchainBlocks(masterchainSeqno: number): Promise<BlockchainBlocks | { error: string }>;

  getBlockchainMasterchainTransactions(masterchainSeqno: number): Promise<Transactions | { error: string }>;

  getBlockchainConfigFromBlock(masterchainSeqno: number): Promise<BlockchainConfig | { error: string }>;

  getRawBlockchainConfigFromBlock(masterchainSeqno: number): Promise<RawBlockchainConfig | { error: string }>;

  getBlockchainBlockTransactions(blockId: string): Promise<Transactions | { error: string }>;

  getBlockchainTransaction(transactionId: string): Promise<Transaction | { error: string }>;

  getBlockchainTransactionByMessageHash(msgId: string): Promise<Transaction | { error: string }>;

  getBlockchainValidators(): Promise<Validators | { error: string }>;

  getBlockchainMasterchainHead(): Promise<BlockchainBlock | { error: string }>;

  getBlockchainRawAccount(accountId: string): Promise<BlockchainRawAccount | { error: string }>;

  getBlockchainAccountTransactions(
    accountId: string,
    afterLt?: number,
    beforeLt?: number,
    limit?: number,
    sortOrder?: 'desc' | 'asc'
  ): Promise<Transactions | { error: string }>;

  execGetMethodForBlockchainAccount(
    accountId: string,
    methodName: string,
    args?: Array<string>
  ): Promise<MethodExecutionResult | { error: string }>;

  sendBlockchainMessage(requestBody: { boc?: string; batch?: Array<string> }): Promise<any>;

  getBlockchainConfig(): Promise<BlockchainConfig | { error: string }>;

  getRawBlockchainConfig(): Promise<RawBlockchainConfig | { error: string }>;

  blockchainAccountInspect(accountId: string): Promise<BlockchainAccountInspect | { error: string }>;

  addressParse(accountId: string): Promise<{
    raw_form: string;
    bounceable: {
      b64: string;
      b64url: string;
    };
    non_bounceable: {
      b64: string;
      b64url: string;
    };
    given_type: string;
    test_only: boolean;
  }>;

  getAccounts(
    currency?: string,
    requestBody?: {
      account_ids: Array<string>;
    }
  ): Promise<Accounts | { error: string }>;

  getAccount(accountId: string): Promise<Account | { error: string }>;

  accountDnsBackResolve(accountId: string): Promise<DomainNames | { error: string }>;

  getAccountJettonsBalances(
    accountId: string,
    currencies?: Array<string>
  ): Promise<JettonsBalances | { error: string }>;

  getAccountJettonBalance(
    accountId: string,
    jettonId: string,
    currencies?: Array<string>
  ): Promise<JettonBalance | { error: string }>;

  getAccountJettonsHistory(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }>;

  getAccountJettonHistoryById(
    accountId: string,
    jettonId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }>;

  getAccountNftItems(
    accountId: string,
    collection?: string,
    limit?: number,
    indirectOwnership?: boolean,
    offset?: number
  ): Promise<NftItems | { error: string }>;

  getAccountEvents(
    accountId: string,
    limit: number,
    initiator?: boolean,
    subjectOnly?: boolean,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }>;

  getAccountEvent(
    accountId: string,
    eventId: string,
    subjectOnly?: boolean
  ): Promise<AccountEvent | { error: string }>;

  getAccountTraces(
    accountId: string,
    beforeLt?: number,
    limit?: number
  ): Promise<TraceIDs | { error: string }>;

  getAccountSubscriptions(accountId: string): Promise<Subscriptions | { error: string }>;

  reindexAccount(accountId: string): Promise<any>;

  searchAccounts(name: string): Promise<FoundAccounts | { error: string }>;

  getAccountDnsExpiring(accountId: string, period?: number): Promise<DnsExpiring | { error: string }>;

  getAccountPublicKey(accountId: string): Promise<{ public_key: string }>;

  getAccountMultisigs(accountId: string): Promise<Multisigs | { error: string }>;

  getAccountDiff(accountId: string, startDate: number, endDate: number): Promise<{ balance_change: number }>;


  // Connect
  getTonConnectPayload(): Promise<{ payload: string }>;

  getAccountInfoByStateInit(requestBody: { state_init: string }): Promise<AccountInfoByStateInit | { error: string }>;

  // DNS
  getDnsInfo(domainName: string): Promise<DomainInfo | { error: string }>;

  dnsResolve(domainName: string): Promise<DnsRecord | { error: string }>;

  getDomainBids(domainName: string): Promise<DomainBids | { error: string }>;

  getAllAuctions(tld?: string): Promise<Auctions | { error: string }>;

  // Emulation
  decodeMessage(requestBody: { boc: string }): Promise<DecodedMessage | { error: string }>;

  emulateMessageToEvent(
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<Event | { error: string }>;

  emulateMessageToTrace(
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<Trace | { error: string }>;

  emulateMessageToWallet(
    requestBody: {
      boc: string;
      params?: Array<{
        address: string;
        balance?: number;
      }>;
    },
    acceptLanguage?: string
  ): Promise<MessageConsequences | { error: string }>;

  emulateMessageToAccountEvent(
    accountId: string,
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<AccountEvent | { error: string }>;

  // Events
  getEvent(
    eventId: string,
    acceptLanguage?: string
  ): Promise<Event | { error: string }>;

  // GasLess
  gaslessConfig(): Promise<GaslessConfig | { error: string }>;

  gaslessEstimate(
    masterId: string,
    requestBody: {
      wallet_address: string;
      wallet_public_key: string;
      messages: Array<{ boc: string }>;
    }
  ): Promise<SignRawParams | { error: string }>;

  gaslessSend(
    requestBody: {
      wallet_public_key: string;
      boc: string;
    }
  ): Promise<any>;

  // Inscriptions
  getAccountInscriptions(
    accountId: string,
    limit?: number,
    offset?: number
  ): Promise<InscriptionBalances | { error: string }>;

  getAccountInscriptionsHistory(
    accountId: string,
    beforeLt?: number,
    limit?: number
  ): Promise<AccountEvents | { error: string }>;

  getAccountInscriptionsHistoryByTicker(
    accountId: string,
    ticker: string,
    beforeLt?: number,
    limit?: number
  ): Promise<AccountEvents | { error: string }>;

  getInscriptionOpTemplate(
    type: 'ton20' | 'gram20',
    operation: 'transfer',
    amount: string,
    ticker: string,
    who: string,
    destination?: string,
    comment?: string
  ): Promise<{ comment: string; destination: string }>;

  // Jettons
  getJettons(limit?: number, offset?: number): Promise<Jettons | { error: string }>;

  getJettonInfo(accountId: string): Promise<JettonInfo | { error: string }>;

  getJettonHolders(accountId: string, limit?: number, offset?: number): Promise<JettonHolders | { error: string }>;

  getJettonsEvents(eventId: string, acceptLanguage?: string): Promise<Event | { error: string }>;

  // LiteServer

  getRawMasterchainInfo(): Promise<{
    last: BlockRaw;
    state_root_hash: string;
    init: InitStateRaw;
  }>;

  getRawMasterchainInfoExt(mode: number): Promise<{
    mode: number;
    version: number;
    capabilities: number;
    last: BlockRaw;
    last_utime: number;
    now: number;
    state_root_hash: string;
    init: InitStateRaw;
  }>;

  getRawTime(): Promise<{ time: number }>;

  getRawBlockchainBlock(blockId: string): Promise<{
    id: BlockRaw;
    data: string;
  }>;

  getRawBlockchainBlockState(blockId: string): Promise<{
    id: BlockRaw;
    root_hash: string;
    file_hash: string;
    data: string;
  }>;

  getRawBlockchainBlockHeader(blockId: string, mode: number): Promise<{
    id: BlockRaw;
    mode: number;
    header_proof: string;
  }>;

  sendRawMessage(requestBody: { body: string }): Promise<{ code: number }>;

  getRawAccountState(accountId: string, targetBlock?: string): Promise<{
    id: BlockRaw;
    shardblk: BlockRaw;
    shard_proof: string;
    proof: string;
    state: string;
  }>;

  getRawShardInfo(blockId: string, workchain: number, shard: number, exact: boolean): Promise<{
    id: BlockRaw;
    shardblk: BlockRaw;
    shard_proof: string;
    shard_descr: string;
  }>;

  getAllRawShardsInfo(blockId: string): Promise<{
    id: BlockRaw;
    proof: string;
    data: string;
  }>;

  getRawTransactions(accountId: string, count: number, lt: number, hash: string): Promise<{
    ids: Array<BlockRaw>;
    transactions: string;
  }>;

  getRawListBlockTransactions(
    blockId: string,
    mode: number,
    count: number,
    accountId?: string,
    lt?: number
  ): Promise<{
    id: BlockRaw;
    req_count: number;
    incomplete: boolean;
    ids: Array<{
      mode: number;
      account?: string;
      lt?: number;
      hash?: string;
    }>;
    proof: string;
  }>;

  getRawBlockProof(knownBlock: string, mode: number, targetBlock?: string): Promise<{
    complete: boolean;
    from: BlockRaw;
    to: BlockRaw;
    steps: Array<{
      lite_server_block_link_back: {
        to_key_block: boolean;
        from: BlockRaw;
        to: BlockRaw;
        dest_proof: string;
        proof: string;
        state_proof: string;
      };
      lite_server_block_link_forward: {
        to_key_block: boolean;
        from: BlockRaw;
        to: BlockRaw;
        dest_proof: string;
        config_proof: string;
        signatures: {
          validator_set_hash: number;
          catchain_seqno: number;
          signatures: Array<{
            node_id_short: string;
            signature: string;
          }>;
        };
      };
    }>;
  }>;

  getRawConfig(blockId: string, mode: number): Promise<{
    mode: number;
    id: BlockRaw;
    state_proof: string;
    config_proof: string;
  }>;

  getRawShardBlockProof(blockId: string): Promise<{
    masterchain_id: BlockRaw;
    links: Array<{
      id: BlockRaw;
      proof: string;
    }>;
  }>;

  getOutMsgQueueSizes(): Promise<{
    ext_msg_queue_size_limit: number;
    shards: Array<{
      id: BlockRaw;
      size: number;
    }>;
  }>;

  // Multisig
  getMultisigAccount(accountId: string): Promise<Multisig | { error: string }>;

  // NFT
  getAccountNftHistory(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }>;

  getNftCollections(limit?: number, offset?: number): Promise<NftCollections | { error: string }>;

  getNftCollection(accountId: string): Promise<NftCollection | { error: string }>;

  getItemsFromCollection(accountId: string, limit?: number, offset?: number): Promise<NftItems | { error: string }>;

  getNftItemsByAddresses(requestBody?: { account_ids: Array<string> }): Promise<NftItems | { error: string }>;

  getNftItemByAddress(accountId: string): Promise<NftItem | { error: string }>;

  getNftHistoryById(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }>;

  // Rates
  getRates(tokens: Array<string>, currencies: Array<string>): Promise<{ rates: Record<string, TokenRates> }>;

  getChartRates(
    token: string,
    currency?: string,
    startDate?: number,
    endDate?: number,
    pointsCount?: number
  ): Promise<{ points: any }>;

  getMarketsRates(): Promise<{ markets: Array<MarketTonRates> }>;

  // Staking
  getAccountNominatorsPools(accountId: string): Promise<AccountStaking | { error: string }>;

  getStakingPoolInfo(accountId: string): Promise<{ implementation: PoolImplementation; pool: PoolInfo }>;

  getStakingPoolHistory(accountId: string): Promise<{ apy: Array<ApyHistory> }>;

  getStakingPools(
    availableFor?: string,
    includeUnverified?: boolean
  ): Promise<{ pools: Array<PoolInfo>; implementations: Record<string, PoolImplementation> }>;


  // Storage
  getStorageProviders(): Promise<{ providers: Array<StorageProvider> }>;

  // Trace
  getTrace(traceId: string): Promise<Trace | { error: string }>;

  // Wallet
  getWalletBackup(xTonConnectAuth: string): Promise<{ dump: string }>;

  setWalletBackup(xTonConnectAuth: string, requestBody: Blob): Promise<any>;

  tonConnectProof(requestBody: {
    address: string;
    proof: {
      timestamp: number;
      domain: {
        length_bytes?: number;
        value: string;
      };
      signature: string;
      payload: string;
      state_init?: string;
    };
  }): Promise<{ token: string }>;

  getWalletsByPublicKey(publicKey: string): Promise<Accounts | { error: string }>;

  getAccountSeqno(accountId: string): Promise<Seqno | { error: string }>;

  // Ton Http API

  // Accounts
  getAddressInformation(address: string): Promise<TonResponse>;

  getExtendedAddressInformation(address: string): Promise<TonResponse>;

  getWalletInformation(address: string): Promise<TonResponse>;

  getTransactions(params: GetTransactions): Promise<TonResponse>;

  getAddressBalance(address: string): Promise<TonResponse>;

  getAddressState(address: string): Promise<TonResponse>;

  packAddress(address: string): Promise<TonResponse>;

  unpackAddress(address: string): Promise<TonResponse>;

  getTokenMetadata(token: string): Promise<TonResponse>;

  detectAddress(address: string): Promise<TonResponse>;

  // Blocks
  getMasterchainInfo(): Promise<TonResponse>;

  getMasterchainBlockSignatures(seqno: number): Promise<TonResponse>;

  getShardBlockProof(params: GetShardBlockProof): Promise<TonResponse>;

  getConsensusBlock(): Promise<TonResponse>

  lookupBlock(params: LookupBlock): Promise<TonResponse>;

  shards(seqno: number): Promise<TonResponse>;

  getBlockTransactions(params: GetBlockTransactions): Promise<TonResponse>;

  getBlockTransactionsExt(params: GetBlockTransactionsExt): Promise<TonResponse>;

  getBlockHeader(params: GetBlockHeader): Promise<TonResponse>;

  getOutMsqQueueSizes(): Promise<TonResponse>;

  // Transactions
  tryLocateTx(params: TryLocateTx): Promise<TonResponse>;

  tryLocateResultTx(params: TryLocateTx): Promise<TonResponse>;

  tryLocateSourceTx(params: TryLocateTx): Promise<TonResponse>;

  // Run method
  runGetMethod(params: Body_run_get_method_runGetMethod_post): Promise<TonResponse>;

  // Send
  sendBoc(params: Body_send_boc_sendBoc_post): Promise<TonResponse>;

  sendBocReturnHash(params: Body_send_boc_return_hash_sendBocReturnHash_post): Promise<TonResponse>;

  sendQuery(params: Body_send_query_sendQuery_post): Promise<TonResponse>;

  estimateFee(params: Body_estimate_fee_estimateFee_post): Promise<TonResponse>;

  // Json Rpc
  jsonRPC(params: TonRequestJsonRPC): Promise<DeprecatedTonResponseJsonRPC>
}
