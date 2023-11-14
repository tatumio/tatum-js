/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostI } from '../../../dto/PostI'
import {
  AccountBalanceRequest,
  AccountBalanceResponse,
  AccountCoinsRequest,
  AccountCoinsResponse,
  BlockRequest,
  BlockResponse,
  BlockTransactionRequest,
  BlockTransactionResponse,
  CallRequest,
  CallResponse,
  CardanoRpcSuite,
  ConstructionCombineRequest,
  ConstructionCombineResponse,
  ConstructionDeriveRequest,
  ConstructionDeriveResponse,
  ConstructionHashRequest,
  ConstructionMetadataRequest,
  ConstructionMetadataResponse,
  ConstructionParseRequest,
  ConstructionParseResponse,
  ConstructionPayloadsRequest,
  ConstructionPreprocessRequest,
  ConstructionPreprocessResponse,
  ConstructionTransactionResponse,
  EventsBlocksRequest,
  EventsBlocksResponse,
  MempoolResponse,
  MempoolTransactionRequest,
  MempoolTransactionResponse,
  MetadataRequest,
  NetworkListResponse,
  NetworkOptionsResponse,
  NetworkRequest,
  NetworkStatusResponse,
  SearchTransactionsRequest,
  SearchTransactionsResponse,
  TransactionIdentifierResponse,
  TransactionSubmissionRequest,
} from '../../../dto/rpc/CardanoRpcSuite'
import { Utils } from '../../../util'

export abstract class AbstractCardanoRpc implements CardanoRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>

  private sendPost<T>({ path, body }: { path: string; body?: any }): Promise<T> {
    const post: PostI = {
      path,
    }

    if (body) {
      post.body = Utils.convertObjCamelToSnake(body)
    }

    return this.post(post)
  }

  getNetworkList(body: MetadataRequest): Promise<NetworkListResponse> {
    return this.sendPost({ path: '/network/list', body })
  }

  getNetworkStatus(body: NetworkRequest): Promise<NetworkStatusResponse> {
    return this.sendPost({ path: '/network/status', body: body })
  }

  getNetworkOptions(body: NetworkRequest): Promise<NetworkOptionsResponse> {
    return this.sendPost({ path: '/network/options', body: body })
  }

  getBlock(body: BlockRequest): Promise<BlockResponse> {
    return this.sendPost({ path: '/block', body })
  }

  getBlockTransaction(body: BlockTransactionRequest): Promise<BlockTransactionResponse> {
    return this.sendPost({ path: '/block/transaction', body })
  }

  getMempool(body: NetworkRequest): Promise<MempoolResponse> {
    return this.sendPost({ path: '/mempool', body })
  }

  getMempoolTransaction(body: MempoolTransactionRequest): Promise<MempoolTransactionResponse> {
    return this.sendPost({ path: '/mempool/transaction', body })
  }

  getAccountBalance(body: AccountBalanceRequest): Promise<AccountBalanceResponse> {
    return this.sendPost({ path: '/account/balance', body })
  }

  getAccountCoins(body: AccountCoinsRequest): Promise<AccountCoinsResponse> {
    return this.sendPost({ path: '/account/coins', body })
  }

  deriveAccount(body: ConstructionDeriveRequest): Promise<ConstructionDeriveResponse> {
    return this.sendPost({ path: '/construction/derive', body })
  }

  constructionPreprocess(body: ConstructionPreprocessRequest): Promise<ConstructionPreprocessResponse> {
    return this.sendPost({ path: '/construction/preprocess', body })
  }

  getTransactionConstructionMetadata(
    body: ConstructionMetadataRequest,
  ): Promise<ConstructionMetadataResponse> {
    return this.sendPost({ path: '/construction/metadata', body })
  }

  generateUnsignedTransactionAndSigningPayloads(
    body: ConstructionPayloadsRequest,
  ): Promise<ConstructionTransactionResponse> {
    return this.sendPost({ path: '/construction/payloads', body })
  }

  createNetworkTransaction(body: ConstructionCombineRequest): Promise<ConstructionCombineResponse> {
    return this.sendPost({ path: '/construction/combine', body })
  }

  parseTransaction(body: ConstructionParseRequest): Promise<ConstructionParseResponse> {
    return this.sendPost({
      path: '/construction/parse',
      body,
    })
  }

  getHashOfTransaction(body: ConstructionHashRequest): Promise<TransactionIdentifierResponse> {
    return this.sendPost({ path: '/construction/hash', body })
  }

  submitTransaction(body: TransactionSubmissionRequest): Promise<TransactionIdentifierResponse> {
    return this.sendPost({ path: '/construction/submit', body })
  }

  call(body: CallRequest): Promise<CallResponse> {
    return this.sendPost({ path: '/call', body })
  }

  getEventsBlocks(body: EventsBlocksRequest): Promise<EventsBlocksResponse> {
    return this.sendPost({ path: '/events/blocks', body })
  }

  searchTransactions(body: SearchTransactionsRequest): Promise<SearchTransactionsResponse> {
    return this.sendPost({ path: '/search/transactions', body })
  }
}
