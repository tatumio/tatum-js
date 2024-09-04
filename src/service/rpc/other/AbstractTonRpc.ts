/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostI } from '../../../dto/PostI'
import { GetI } from '../../../dto/GetI'
import { QueryParams } from '../../../dto'
import { Utils } from '../../../util'
import { TonRpcSuite } from '../../../dto/rpc/ton/TonRpcSuite'
import { ServiceStatus } from '../../../dto/rpc/ton/models/ServiceStatus'
import { ApiParams, NetworkParams } from '../../../dto/rpc/KadenaRpcSuite'
import { Accounts } from '../../../dto/rpc/ton/models/Accounts'
import { Seqno } from '../../../dto/rpc/ton/models/Seqno'
import { StorageProvider } from '../../../dto/rpc/ton/models/StorageProvider'
import { Trace } from '../../../dto/rpc/ton/models/Trace'
import { Multisig } from '../../../dto/rpc/ton/models/Multisig'
import { AccountEvents } from '../../../dto/rpc/ton/models/AccountEvents'
import { NftCollections } from '../../../dto/rpc/ton/models/NftCollections'
import { NftCollection } from '../../../dto/rpc/ton/models/NftCollection'
import { NftItems } from '../../../dto/rpc/ton/models/NftItems'
import { NftItem } from '../../../dto/rpc/ton/models/NftItem'
import { TokenRates } from '../../../dto/rpc/ton/models/TokenRates'
import { MarketTonRates } from '../../../dto/rpc/ton/models/MarketTonRates'
import { AccountStaking } from '../../../dto/rpc/ton/models/AccountStaking'
import { PoolImplementation } from '../../../dto/rpc/ton/models/PoolImplementation'
import { PoolInfo } from '../../../dto/rpc/ton/models/PoolInfo'
import { ApyHistory } from '../../../dto/rpc/ton/models/ApyHistory'
import { BlockRaw } from '../../../dto/rpc/ton/models/BlockRaw'
import { InitStateRaw } from '../../../dto/rpc/ton/models/InitStateRaw'
import { GaslessConfig } from '../../../dto/rpc/ton/models/GaslessConfig'
import { Jettons } from '../../../dto/rpc/ton/models/Jettons'
import { JettonInfo } from '../../../dto/rpc/ton/models/JettonInfo'
import { JettonHolders } from '../../../dto/rpc/ton/models/JettonHolders'
import { SignRawParams } from '../../../dto/rpc/ton/models/SignRawParams'
import { InscriptionBalances } from '../../../dto/rpc/ton/models/InscriptionBalances'
import { Event } from '../../../dto/rpc/ton/models/Event'
import { Multisigs } from '../../../dto/rpc/ton/models/Multisigs'
import { DnsExpiring } from '../../../dto/rpc/ton/models/DnsExpiring'
import { FoundAccounts } from '../../../dto/rpc/ton/models/FoundAccounts'
import { Subscriptions } from '../../../dto/rpc/ton/models/Subscriptions'
import { TraceIDs } from '../../../dto/rpc/ton/models/TraceIDs'
import { AccountEvent } from '../../../dto/rpc/ton/models/AccountEvent'
import { DecodedMessage } from '../../../dto/rpc/ton/models/DecodedMessage'
import { MessageConsequences } from '../../../dto/rpc/ton/models/MessageConsequences'
import { JettonBalance } from '../../../dto/rpc/ton/models/JettonBalance'
import { AccountInfoByStateInit } from '../../../dto/rpc/ton/models/AccountInfoByStateInit'
import { DomainInfo } from '../../../dto/rpc/ton/models/DomainInfo'
import { DnsRecord } from '../../../dto/rpc/ton/models/DnsRecord'
import { DomainBids } from '../../../dto/rpc/ton/models/DomainBids'
import { Auctions } from '../../../dto/rpc/ton/models/Auctions'
import { ReducedBlocks } from '../../../dto/rpc/ton/models/ReducedBlocks'
import { BlockchainBlock } from '../../../dto/rpc/ton/models/BlockchainBlock'
import { BlockchainBlockShards } from '../../../dto/rpc/ton/models/BlockchainBlockShards'
import { BlockchainBlocks } from '../../../dto/rpc/ton/models/BlockchainBlocks'
import { Transactions } from '../../../dto/rpc/ton/models/Transactions'
import { BlockchainConfig } from '../../../dto/rpc/ton/models/BlockchainConfig'
import { RawBlockchainConfig } from '../../../dto/rpc/ton/models/RawBlockchainConfig'
import { Transaction } from '../../../dto/rpc/ton/models/Transaction'
import { Validators } from '../../../dto/rpc/ton/models/Validators'
import { BlockchainRawAccount } from '../../../dto/rpc/ton/models/BlockchainRawAccount'
import { MethodExecutionResult } from '../../../dto/rpc/ton/models/MethodExecutionResult'
import { BlockchainAccountInspect } from '../../../dto/rpc/ton/models/BlockchainAccountInspect'
import { Account } from '../../../dto/rpc/ton/models/Account'
import { DomainNames } from '../../../dto/rpc/ton/models/DomainNames'
import { JettonsBalances } from '../../../dto/rpc/ton/models/JettonsBalances'
import { TonResponse } from '../../../dto/rpc/ton/models/TonResponse'
import { GetTransactions } from '../../../dto/rpc/ton/models/GetTransactions'
import { GetShardBlockProof } from '../../../dto/rpc/ton/models/GetShardBlockProof'
import { LookupBlock } from '../../../dto/rpc/ton/models/LookupBlock'
import { GetBlockTransactions } from '../../../dto/rpc/ton/models/GetBlockTransactions'
import { GetBlockTransactionsExt } from '../../../dto/rpc/ton/models/GetBlockTransactionsExt'
import { GetBlockHeader } from '../../../dto/rpc/ton/models/GetBlockHeader'
import { TryLocateTx } from '../../../dto/rpc/ton/models/TryLocateTx'
import {
  Body_run_get_method_runGetMethod_post
} from '../../../dto/rpc/ton/models/Body_run_get_method_runGetMethod_post'
import { Body_send_boc_sendBoc_post } from '../../../dto/rpc/ton/models/Body_send_boc_sendBoc_post'
import {
  Body_send_boc_return_hash_sendBocReturnHash_post
} from '../../../dto/rpc/ton/models/Body_send_boc_return_hash_sendBocReturnHash_post'
import { Body_send_query_sendQuery_post } from '../../../dto/rpc/ton/models/Body_send_query_sendQuery_post'
import { Body_estimate_fee_estimateFee_post } from '../../../dto/rpc/ton/models/Body_estimate_fee_estimateFee_post'
import { TonRequestJsonRPC } from '../../../dto/rpc/ton/models/TonRequestJsonRPC'
import { DeprecatedTonResponseJsonRPC } from '../../../dto/rpc/ton/models/DeprecatedTonResponseJsonRPC'

interface RequestI {
  path: string
  body?: any
  notConvertCamelToSnake?: boolean
  queryParams?: QueryParams
  network?: NetworkParams | ApiParams
}

export abstract class AbstractTonRpc implements TonRpcSuite {

  private prepareRequest({ path, body, queryParams }: RequestI): PostI {
    return {
      path: Utils.addQueryParams({
        basePath: path,
        strategy: Utils.camelToDashCase,
        queryParams: queryParams,
      }),
      body,
    }
  }

  protected abstract post<T>(post: PostI): Promise<T>

  protected abstract get<T>(get: GetI): Promise<T>

  protected abstract put<T>(post: PostI): Promise<T>

  private sendPost<T>(request: RequestI): Promise<T> {
    return this.post(this.prepareRequest(request))
  }

  private sendPut<T>(request: RequestI): Promise<T> {
    return this.put(this.prepareRequest(request))
  }

  private async sendGet<T>({ path, queryParams }: { path: string; queryParams?: QueryParams }): Promise<T> {
    return this.get({ path: Utils.addQueryParams({ basePath: path, queryParams: queryParams }) })
  }

  // Multisig
  getMultisigAccount(accountId: string): Promise<Multisig | { error: string }> {
    return this.sendGet({ path: `/v2/multisig/${accountId}` })
  }

  // NftE2eClient
  getAccountNftHistory(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/nfts/history`,
      queryParams: { limit, before_lt: beforeLt, start_date: startDate, end_date: endDate }
    })
  }

  getNftCollections(limit: number, offset?: number): Promise<NftCollections | { error: string }> {
    return this.sendGet({
      path: `/v2/nfts/collections`,
      queryParams: { limit, offset }
    })
  }

  getNftCollection(accountId: string): Promise<NftCollection | { error: string }> {
    return this.sendGet({ path: `/v2/nfts/collections/${accountId}` })
  }

  getItemsFromCollection(accountId: string, limit: number, offset?: number): Promise<NftItems | { error: string }> {
    return this.sendGet({
      path: `/v2/nfts/collections/${accountId}/items`,
      queryParams: { limit, offset }
    })
  }

  getNftItemsByAddresses(requestBody?: { account_ids: Array<string> }): Promise<NftItems | { error: string }> {
    return this.sendPost({
      path: `/v2/nfts/_bulk`,
      body: requestBody
    })
  }

  getNftItemByAddress(accountId: string): Promise<NftItem | { error: string }> {
    return this.sendGet({ path: `/v2/nfts/${accountId}` })
  }

  getNftHistoryById(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/nfts/${accountId}/history`,
      queryParams: { limit, before_lt: beforeLt, start_date: startDate, end_date: endDate }
    })
  }

  // RatesE2eClient
  getRates(tokens: Array<string>, currencies: Array<string>): Promise<{ rates: Record<string, TokenRates> }> {
    return this.sendGet({
      path: `/v2/rates`,
      queryParams: { tokens: tokens.join(','), currencies: currencies.join(',') }
    })
  }

  getChartRates(
    token: string,
    currency?: string,
    startDate?: number,
    endDate?: number,
    pointsCount?: number
  ): Promise<{ points: any }> {
    return this.sendGet({
      path: `/v2/rates/chart`,
      queryParams: { token, currency, start_date: startDate, end_date: endDate, points_count: pointsCount }
    })
  }

  getMarketsRates(): Promise<{ markets: Array<MarketTonRates> }> {
    return this.sendGet({ path: `/v2/rates/markets` })
  }

  // StakingE2eClient
  getAccountNominatorsPools(accountId: string): Promise<AccountStaking | { error: string }> {
    return this.sendGet({ path: `/v2/staking/nominator/${accountId}/pools` })
  }

  getStakingPoolInfo(accountId: string): Promise<{ implementation: PoolImplementation; pool: PoolInfo }> {
    return this.sendGet({
      path: `/v2/staking/pool/${accountId}`,
    })
  }

  getStakingPoolHistory(accountId: string): Promise<{ apy: Array<ApyHistory> }> {
    return this.sendGet({ path: `/v2/staking/pool/${accountId}/history` })
  }

  getStakingPools(
    availableFor?: string,
    includeUnverified?: boolean,
  ): Promise<{ pools: Array<PoolInfo>; implementations: Record<string, PoolImplementation> }> {
    return this.sendGet({
      path: `/v2/staking/pools`,
      queryParams: { available_for: availableFor, include_unverified: includeUnverified}
    })
  }

  // StorageE2eClient
  getStorageProviders(): Promise<{ providers: Array<StorageProvider> }> {
    return this.sendGet({ path: `/v2/storage/providers` })
  }

  // TracesE2eClient
  getTrace(traceId: string): Promise<Trace | { error: string }> {
    return this.sendGet({ path: `/v2/traces/${traceId}` })
  }

  // WalletE2eClient
  getWalletBackup(xTonConnectAuth: string): Promise<{ dump: string }> {
    return this.sendGet({
      path: `/v2/wallet/backup`,
      queryParams: { 'X-TonConnect-Auth': xTonConnectAuth }
    })
  }

  setWalletBackup(xTonConnectAuth: string, requestBody: Blob): Promise<any> {
    return this.sendPut({
      path: `/v2/wallet/backup`,
      body: requestBody,
      queryParams: { 'X-TonConnect-Auth': xTonConnectAuth }
    })
  }

  tonConnectProof(requestBody: {
    address: string
    proof: {
      timestamp: number
      domain: {
        length_bytes?: number
        value: string
      }
      signature: string
      payload: string
      state_init?: string
    }
  }): Promise<{ token: string }> {
    return this.sendPost({
      path: `/v2/wallet/auth/proof`,
      body: requestBody
    })
  }

  getWalletsByPublicKey(publicKey: string): Promise<Accounts | { error: string }> {
    return this.sendGet({ path: `/v2/pubkeys/${publicKey}/wallets` })
  }

  getAccountSeqno(accountId: string): Promise<Seqno | { error: string }> {
    return this.sendGet({ path: `/v2/wallet/${accountId}/seqno` })
  }

  // Lite Server
  getRawMasterchainInfo(): Promise<{
    last: BlockRaw;
    state_root_hash: string;
    init: InitStateRaw;
  }> {
    return this.sendGet({ path: '/v2/liteserver/get_masterchain_info' });
  }

  getRawMasterchainInfoExt(mode: number): Promise<{
    mode: number;
    version: number;
    capabilities: number;
    last: BlockRaw;
    last_utime: number;
    now: number;
    state_root_hash: string;
    init: InitStateRaw;
  }> {
    return this.sendGet({
      path: '/v2/liteserver/get_masterchain_info_ext',
      queryParams: { mode },
    });
  }

  getRawTime(): Promise<{ time: number }> {
    return this.sendGet({ path: '/v2/liteserver/get_time' });
  }

  getRawBlockchainBlock(blockId: string): Promise<{
    id: BlockRaw;
    data: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_block/${blockId}`,
    });
  }

  getRawBlockchainBlockState(blockId: string): Promise<{
    id: BlockRaw;
    root_hash: string;
    file_hash: string;
    data: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_state/${blockId}`,
    });
  }

  getRawBlockchainBlockHeader(blockId: string, mode: number): Promise<{
    id: BlockRaw;
    mode: number;
    header_proof: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_block_header/${blockId}`,
      queryParams: { mode },
    });
  }

  sendRawMessage(requestBody: { body: string }): Promise<{ code: number }> {
    return this.sendPost({
      path: '/v2/liteserver/send_message',
      body: requestBody,
    });
  }

  getRawAccountState(accountId: string, targetBlock?: string): Promise<{
    id: BlockRaw;
    shardblk: BlockRaw;
    shard_proof: string;
    proof: string;
    state: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_account_state/${accountId}`,
      queryParams: { target_block: targetBlock },
    });
  }

  getRawShardInfo(blockId: string, workchain: number, shard: number, exact: boolean): Promise<{
    id: BlockRaw;
    shardblk: BlockRaw;
    shard_proof: string;
    shard_descr: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_shard_info/${blockId}`,
      queryParams: { workchain, shard, exact },
    });
  }

  getAllRawShardsInfo(blockId: string): Promise<{
    id: BlockRaw;
    proof: string;
    data: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_all_shards_info/${blockId}`,
    });
  }

  getRawTransactions(accountId: string, count: number, lt: number, hash: string): Promise<{
    ids: Array<BlockRaw>;
    transactions: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_transactions/${accountId}`,
      queryParams: { count, lt, hash },
    });
  }

  getRawListBlockTransactions(
    blockId: string,
    mode: number,
    count: number,
    accountId?: string,
    lt?: number,
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
  }> {
    return this.sendGet({
      path: `/v2/liteserver/list_block_transactions/${blockId}`,
      queryParams: { mode, count, account_id: accountId, lt },
    });
  }

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
  }> {
    return this.sendGet({
      path: '/v2/liteserver/get_block_proof',
      queryParams: { known_block: knownBlock, target_block: targetBlock, mode },
    });
  }

  getRawConfig(blockId: string, mode: number): Promise<{
    mode: number;
    id: BlockRaw;
    state_proof: string;
    config_proof: string;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_config_all/${blockId}`,
      queryParams: { mode },
    });
  }

  getRawShardBlockProof(blockId: string): Promise<{
    masterchain_id: BlockRaw;
    links: Array<{
      id: BlockRaw;
      proof: string;
    }>;
  }> {
    return this.sendGet({
      path: `/v2/liteserver/get_shard_block_proof/${blockId}`,
    });
  }

  getOutMsgQueueSizes(): Promise<{
    ext_msg_queue_size_limit: number;
    shards: Array<{
      id: BlockRaw;
      size: number;
    }>;
  }> {
    return this.sendGet({ path: '/v2/liteserver/get_out_msg_queue_sizes' });
  }

  // GasLess
  gaslessConfig(): Promise<GaslessConfig | { error: string }> {
    return this.sendGet({ path: '/v2/gasless/config' });
  }

  gaslessEstimate(masterId: string, requestBody: { wallet_address: string; wallet_public_key: string; messages: Array<{ boc: string }> }): Promise<SignRawParams | { error: string }> {
    return this.sendPost({
      path: `/v2/gasless/estimate/${masterId}`,
      body: requestBody,
    });
  }

  gaslessSend(requestBody: { wallet_public_key: string; boc: string }): Promise<any> {
    return this.sendPost({
      path: '/v2/gasless/send',
      body: requestBody,
    });
  }

  // Inscriptions
  getAccountInscriptions(accountId: string, limit?: number, offset?: number): Promise<InscriptionBalances | { error: string }> {
    return this.sendGet({
      path: `/v2/experimental/accounts/${accountId}/inscriptions`,
      queryParams: { limit, offset },
    });
  }

  getAccountInscriptionsHistory(accountId: string, beforeLt?: number, limit?: number): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/experimental/accounts/${accountId}/inscriptions/history`,
      queryParams: { before_lt: beforeLt, limit },
    });
  }

  getAccountInscriptionsHistoryByTicker(
    accountId: string,
    ticker: string,
    beforeLt?: number,
    limit?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/experimental/accounts/${accountId}/inscriptions/${ticker}/history`,
      queryParams: { before_lt: beforeLt, limit },
    });
  }

  getInscriptionOpTemplate(
    type: 'ton20' | 'gram20',
    operation: 'transfer',
    amount: string,
    ticker: string,
    who: string,
    destination?: string,
    comment?: string
  ): Promise<{ comment: string; destination: string }> {
    return this.sendGet({
      path: '/v2/experimental/inscriptions/op-template',
      queryParams: { type, destination, comment, operation, amount, ticker, who },
    });
  }

  // Jettons
  getJettons(limit?: number, offset?: number): Promise<Jettons | { error: string }> {
    return this.sendGet({
      path: '/v2/jettons',
      queryParams: { limit, offset },
    });
  }

  getJettonInfo(accountId: string): Promise<JettonInfo | { error: string }> {
    return this.sendGet({
      path: `/v2/jettons/${accountId}`,
    });
  }

  getJettonHolders(accountId: string, limit?: number, offset?: number): Promise<JettonHolders | { error: string }> {
    return this.sendGet({
      path: `/v2/jettons/${accountId}/holders`,
      queryParams: { limit, offset },
    });
  }

  getJettonsEvents(eventId: string): Promise<Event | { error: string }> {
    return this.sendGet({
      path: `/v2/events/${eventId}/jettons`,
    });
  }

  getEvent(eventId: string): Promise<Event | { error: string }> {
    return this.sendGet({
      path: `/v2/events/${eventId}`,
    });
  }

  // emulation
  public decodeMessage(
    requestBody: { boc: string }
  ): Promise<DecodedMessage | { error: string }> {
    return this.sendPost({
      path: '/v2/message/decode',
      body: requestBody,
    });
  }

  public emulateMessageToEvent(
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<Event | { error: string }> {
    return this.sendPost({
      path: '/v2/events/emulate',
      body: requestBody,
      queryParams: { ignore_signature_check: ignoreSignatureCheck },
    });
  }

  public emulateMessageToTrace(
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<Trace | { error: string }> {
    return this.sendPost({
      path: '/v2/traces/emulate',
      body: requestBody,
      queryParams: { ignore_signature_check: ignoreSignatureCheck },
    });
  }

  public emulateMessageToWallet(
    requestBody: {
      boc: string;
      params?: Array<{ address: string; balance?: number }>;
    },
  ): Promise<MessageConsequences | { error: string }> {
    return this.sendPost({
      path: '/v2/wallet/emulate',
      body: requestBody,
    });
  }

  public emulateMessageToAccountEvent(
    accountId: string,
    requestBody: { boc: string },
    ignoreSignatureCheck?: boolean
  ): Promise<AccountEvent | { error: string }> {
    return this.sendPost({
      path: `/v2/accounts/${accountId}/events/emulate`,
      body: requestBody,
      queryParams: { ignore_signature_check: ignoreSignatureCheck },
    });
  }

  // Connect
  public getTonConnectPayload(): Promise<{ payload: string }> {
    return this.sendGet({
      path: '/v2/tonconnect/payload',
    });
  }

  public getAccountInfoByStateInit(
    requestBody: { state_init: string }
  ): Promise<AccountInfoByStateInit | { error: string }> {
    return this.sendPost({
      path: '/v2/tonconnect/stateinit',
      body: requestBody,
    });
  }

  // DNS
  public getDnsInfo(
    domainName: string
  ): Promise<DomainInfo | { error: string }> {
    return this.sendGet({
      path: `/v2/dns/${domainName}`,
    });
  }

  public dnsResolve(
    domainName: string
  ): Promise<DnsRecord | { error: string }> {
    return this.sendGet({
      path: `/v2/dns/${domainName}/resolve`,
    });
  }

  public getDomainBids(
    domainName: string
  ): Promise<DomainBids | { error: string }> {
    return this.sendGet({
      path: `/v2/dns/${domainName}/bids`,
    });
  }

  public getAllAuctions(tld?: string): Promise<Auctions | { error: string }> {
    return this.sendGet({
      path: '/v2/dns/auctions',
      queryParams: { tld },
    });
  }

  // blockchain
  public status(): Promise<ServiceStatus | { error: string }> {
    return this.sendGet({
      path: '/v2/status',
    });
  }

  public getReducedBlockchainBlocks(
    from: number,
    to: number
  ): Promise<ReducedBlocks | { error: string }> {
    return this.sendGet({
      path: '/v2/blockchain/reduced/blocks',
      queryParams: { from, to },
    });
  }

  public getBlockchainBlock(
    blockId: string
  ): Promise<BlockchainBlock | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/blocks/${blockId}`,
    });
  }

  public getBlockchainMasterchainShards(
    masterchainSeqno: number
  ): Promise<BlockchainBlockShards | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/masterchain/${masterchainSeqno}/shards`,
    });
  }

  public getBlockchainMasterchainBlocks(
    masterchainSeqno: number
  ): Promise<BlockchainBlocks | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/masterchain/${masterchainSeqno}/blocks`,
    });
  }

  public getBlockchainMasterchainTransactions(
    masterchainSeqno: number
  ): Promise<Transactions | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/masterchain/${masterchainSeqno}/transactions`,
    });
  }

  public getBlockchainConfigFromBlock(
    masterchainSeqno: number
  ): Promise<BlockchainConfig | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/masterchain/${masterchainSeqno}/config`,
    });
  }

  public getRawBlockchainConfigFromBlock(
    masterchainSeqno: number
  ): Promise<RawBlockchainConfig | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/masterchain/${masterchainSeqno}/config/raw`,
    });
  }

  public getBlockchainBlockTransactions(
    blockId: string
  ): Promise<Transactions | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/blocks/${blockId}/transactions`,
    });
  }

  public getBlockchainTransaction(
    transactionId: string
  ): Promise<Transaction | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/transactions/${transactionId}`,
    });
  }

  public getBlockchainTransactionByMessageHash(
    msgId: string
  ): Promise<Transaction | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/messages/${msgId}/transaction`,
    });
  }

  public getBlockchainValidators(): Promise<Validators | { error: string }> {
    return this.sendGet({
      path: '/v2/blockchain/validators',
    });
  }

  public getBlockchainMasterchainHead(): Promise<BlockchainBlock | { error: string }> {
    return this.sendGet({
      path: '/v2/blockchain/masterchain-head',
    });
  }

  public getBlockchainRawAccount(
    accountId: string
  ): Promise<BlockchainRawAccount | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/accounts/${accountId}`,
    });
  }

  public getBlockchainAccountTransactions(
    accountId: string,
    afterLt?: number,
    beforeLt?: number,
    limit?: number,
    sortOrder: 'desc' | 'asc' = 'desc'
  ): Promise<Transactions | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/accounts/${accountId}/transactions`,
      queryParams: {
        after_lt: afterLt,
        before_lt: beforeLt,
        limit,
        sort_order: sortOrder,
      },
    });
  }

  public execGetMethodForBlockchainAccount(
    accountId: string,
    methodName: string,
    args?: Array<string>
  ): Promise<MethodExecutionResult | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/accounts/${accountId}/methods/${methodName}`,
      queryParams: { args },
    });
  }

  public sendBlockchainMessage(
    requestBody: { boc?: string; batch?: Array<string> }
  ): Promise<any> {
    return this.sendPost({
      path: '/v2/blockchain/message',
      body: requestBody,
    });
  }

  public getBlockchainConfig(): Promise<BlockchainConfig | { error: string }> {
    return this.sendGet({
      path: '/v2/blockchain/config',
    });
  }

  public getRawBlockchainConfig(): Promise<RawBlockchainConfig | { error: string }> {
    return this.sendGet({
      path: '/v2/blockchain/config/raw',
    });
  }

  public blockchainAccountInspect(
    accountId: string
  ): Promise<BlockchainAccountInspect | { error: string }> {
    return this.sendGet({
      path: `/v2/blockchain/accounts/${accountId}/inspect`,
    });
  }

  public addressParse(
    accountId: string
  ): Promise<{
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
  }> {
    return this.sendGet({
      path: `/v2/address/${accountId}/parse`,
    });
  }

  public getAccounts(
    currency?: string,
    requestBody?: { account_ids: Array<string> }
  ): Promise<Accounts | { error: string }> {
    return this.sendPost({
      path: '/v2/accounts/_bulk',
      body: requestBody,
      queryParams: { currency },
    });
  }

  public getAccount(
    accountId: string
  ): Promise<Account | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}`,
    });
  }

  public accountDnsBackResolve(
    accountId: string
  ): Promise<DomainNames | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/dns/backresolve`,
    });
  }

  public getAccountJettonsBalances(
    accountId: string,
    currencies?: Array<string>
  ): Promise<JettonsBalances | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/jettons`,
      queryParams: { currencies },
    });
  }

  public getAccountJettonBalance(
    accountId: string,
    jettonId: string,
    currencies?: Array<string>
  ): Promise<JettonBalance | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/jettons/${jettonId}`,
      queryParams: { currencies },
    });
  }

  public getAccountJettonsHistory(
    accountId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/jettons/history`,
      queryParams: { before_lt: beforeLt, limit, start_date: startDate, end_date: endDate },
    });
  }

  public getAccountJettonHistoryById(
    accountId: string,
    jettonId: string,
    limit: number,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/jettons/${jettonId}/history`,
      queryParams: { before_lt: beforeLt, limit, start_date: startDate, end_date: endDate },
    });
  }

  public getAccountNftItems(
    accountId: string,
    collection?: string,
    limit?: number,
    indirectOwnership?: boolean,
    offset?: number,
  ): Promise<NftItems | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/nfts`,
      queryParams: { collection, limit, offset, indirect_ownership: indirectOwnership },
    });
  }

  public getAccountEvents(
    accountId: string,
    limit: number,
    initiator?: boolean,
    subjectOnly?: boolean,
    beforeLt?: number,
    startDate?: number,
    endDate?: number
  ): Promise<AccountEvents | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/events`,
      queryParams: { initiator, subject_only: subjectOnly, before_lt: beforeLt, limit, start_date: startDate, end_date: endDate },
    });
  }

  public getAccountEvent(
    accountId: string,
    eventId: string,
    subjectOnly: boolean
  ): Promise<AccountEvent | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/events/${eventId}`,
      queryParams: { subject_only: subjectOnly },
    });
  }

  public getAccountTraces(
    accountId: string,
    beforeLt?: number,
    limit?: number
  ): Promise<TraceIDs | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/traces`,
      queryParams: { before_lt: beforeLt, limit },
    });
  }

  public getAccountSubscriptions(
    accountId: string
  ): Promise<Subscriptions | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/subscriptions`,
    });
  }

  public reindexAccount(
    accountId: string
  ): Promise<any> {
    return this.sendPost({
      path: `/v2/accounts/${accountId}/reindex`,
    });
  }

  public searchAccounts(
    name: string
  ): Promise<FoundAccounts | { error: string }> {
    return this.sendGet({
      path: '/v2/accounts/search',
      queryParams: { name },
    });
  }

  public getAccountDnsExpiring(
    accountId: string,
    period?: number
  ): Promise<DnsExpiring | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/dns/expiring`,
      queryParams: { period },
    });
  }

  public getAccountPublicKey(
    accountId: string
  ): Promise<{ public_key: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/publickey`,
    });
  }

  public getAccountMultisigs(
    accountId: string
  ): Promise<Multisigs | { error: string }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/multisigs`,
    });
  }

  public getAccountDiff(
    accountId: string,
    startDate: number,
    endDate: number
  ): Promise<{ balance_change: number }> {
    return this.sendGet({
      path: `/v2/accounts/${accountId}/diff`,
      queryParams: { start_date: startDate, end_date: endDate },
    });
  }

  // Ton Http API

  getAddressInformation(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getAddressInformation`,
      queryParams: { address },
    })
  }

  getExtendedAddressInformation(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getExtendedAddressInformation`,
      queryParams: { address },
    })
  }

  getWalletInformation(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getWalletInformation`,
      queryParams: { address },
    })
  }

  getTransactions(params: GetTransactions): Promise<TonResponse> {
    return this.sendGet({
      path: `/getTransactions`,
      queryParams: params as unknown as QueryParams,
    })
  }

  getAddressBalance(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getAddressBalance`,
      queryParams: { address },
    })
  }

  getAddressState(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getAddressState`,
      queryParams: { address },
    })
  }

  packAddress(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/packAddress`,
      queryParams: { address },
    })
  }

  unpackAddress(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/unpackAddress`,
      queryParams: { address },
    })
  }

  getTokenData(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/getTokenData`,
      queryParams: { address },
    })
  }

  detectAddress(address: string): Promise<TonResponse> {
    return this.sendGet({
      path: `/detectAddress`,
      queryParams: { address },
    })
  }

  getMasterchainInfo(): Promise<TonResponse> {
    return this.sendGet({
      path: `/getMasterchainInfo`,
    })
  }

  getMasterchainBlockSignatures(seqno: number): Promise<TonResponse> {
    return this.sendGet({
      path: `/getMasterchainBlockSignatures`,
      queryParams: { seqno },
    })
  }

  getShardBlockProof(params: GetShardBlockProof): Promise<TonResponse> {
    return this.sendGet({
      path: `/getShardBlockProof`,
      queryParams: params as unknown as QueryParams,
    })
  }

  getConsensusBlock(): Promise<TonResponse> {
    return this.sendGet({
      path: `/getConsensusBlock`,
    })
  }

  lookupBlock(params: LookupBlock): Promise<TonResponse> {
    return this.sendGet({
      path: `/lookupBlock`,
      queryParams: params as unknown as QueryParams,
    })
  }

  shards(seqno: number): Promise<TonResponse> {
    return this.sendGet({
      path: `/shards`,
      queryParams: { seqno },
    })
  }

  getBlockTransactions(params: GetBlockTransactions): Promise<TonResponse> {
    return this.sendGet({
      path: `/getBlockTransactions`,
      queryParams: params as unknown as QueryParams,
    })
  }

  getBlockTransactionsExt(params: GetBlockTransactionsExt): Promise<TonResponse> {
    return this.sendGet({
      path: `/getBlockTransactionsExt`,
      queryParams: params as unknown as QueryParams,
    })
  }

  getBlockHeader(params: GetBlockHeader): Promise<TonResponse> {
    return this.sendGet({
      path: `/getBlockHeader`,
      queryParams: params as unknown as QueryParams,
    })
  }

  getOutMsqQueueSizes(): Promise<TonResponse> {
    return this.sendGet({
      path: `/getOutMsqQueueSizes`,
    })
  }

  tryLocateTx(params: TryLocateTx): Promise<TonResponse> {
    return this.sendGet({
      path: `/tryLocateTx`,
      queryParams: params as unknown as QueryParams,
    })
  }

  tryLocateResultTx(params: TryLocateTx): Promise<TonResponse> {
    return this.sendGet({
      path: `/tryLocateResultTx`,
      queryParams: params as unknown as QueryParams,
    })
  }

  tryLocateSourceTx(params: TryLocateTx): Promise<TonResponse> {
    return this.sendGet({
      path: `/tryLocateSourceTx`,
      queryParams: params as unknown as QueryParams,
    })
  }

  runGetMethod(params: Body_run_get_method_runGetMethod_post): Promise<TonResponse> {
    return this.sendPost({
      path: `/runGetMethod`,
      body: params,
    })
  }

  sendBoc(params: Body_send_boc_sendBoc_post): Promise<TonResponse> {
    return this.sendPost({
      path: `/sendBoc`,
      body: params,
    })
  }

  sendBocReturnHash(params: Body_send_boc_return_hash_sendBocReturnHash_post): Promise<TonResponse> {
    return this.sendPost({
      path: `/sendBocReturnHash`,
      body: params,
    })
  }

  sendQuery(params: Body_send_query_sendQuery_post): Promise<TonResponse> {
    return this.sendPost({
      path: `/sendQuery`,
      body: params,
    })
  }

  estimateFee(params: Body_estimate_fee_estimateFee_post): Promise<TonResponse> {
    return this.sendPost({
      path: `/estimateFee`,
      body: params,
    })
  }

  jsonRPC(params: TonRequestJsonRPC): Promise<DeprecatedTonResponseJsonRPC> {
    return this.sendPost({
      path: `/jsonRPC`,
      body: params,
    })
  }
}
