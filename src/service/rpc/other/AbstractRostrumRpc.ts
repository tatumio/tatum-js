import { Service } from 'typedi'
import { JsonRpcResponse } from '../../../dto'
import {
  AddressAndFilterParam,
  AddressSubscribeResult,
  AddressUnsubscribeResult,
  BlockAddressDecodeResult,
  BlockHeaderParams,
  BlockHeaderResult,
  BlockHeaderVerboseResult,
  BlockHeadersParams,
  BlockHeadersResult,
  BlockchainAddressToScriptHashResult,
  BlockchainGetBalanceResult,
  BlockchainGetFirstUseResult,
  BlockchainHistoryResult,
  BlockchainMempoolResult,
  BlockchainUnspentOutputResult,
  CashAccountQueryNameParams,
  CashAccountQueryResult,
  HexHeightResult,
  RostrumRpcInterface,
  ScriptHashAndFilterParam,
  ServerVersionParams,
  TokenAddressGetBalanceParams,
  TokenAddressGetHistoryParams,
  TokenGenesisInfoResultBCH,
  TokenGenesisInfoResultNexa,
  TokenGetBalanceResult,
  TokenGetHistoryResult,
  TokenGetMempoolResult,
  TokenListUnspentResult,
  TokenNftListParams,
  TokenNftListResultBCH,
  TokenNftListResultNexa,
  TokenScripthashGetBalanceParams,
  TokenScripthashGetHistoryParams,
  TokenScripthashGetMempoolParams,
  TokenScripthashListUnspentParams,
  TokenTransactionGetHistoryParams,
  TokenTransactionGetHistoryResult,
  TransactionGetConfirmedBlockhashResult,
  TransactionGetMerkleParams,
  TransactionGetMerkleResult,
  TransactionGetParams,
  TransactionGetResult,
  TransactionIdFromPosParams,
  TransactionIdFromPosResult,
  UtxoGetParams,
  UtxoGetResult,
  VerboseTransactionResult,
} from '../../../dto/rpc/RostrumRpcSuite'

@Service()
export abstract class AbstractRostrumRpc implements RostrumRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async blockchainAddressDecode(address: string): Promise<JsonRpcResponse<BlockAddressDecodeResult>> {
    return this.rpcCall('blockchain.address.decode', [address])
  }

  async blockchainAddressGetBalance({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainGetBalanceResult>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_balance', params)
  }

  async blockchainAddressGetFirstUse({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainGetFirstUseResult>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_first_use', params)
  }

  async blockchainAddressGetHistory({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainHistoryResult[]>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_history', params)
  }

  async blockchainAddressGetMempool({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainMempoolResult[]>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_mempool', params)
  }

  async blockchainAddressToScriptHash(
    address: string,
  ): Promise<JsonRpcResponse<BlockchainAddressToScriptHashResult>> {
    return this.rpcCall('blockchain.address.get_scripthash', [address])
  }

  async blockchainListUnspent({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainUnspentOutputResult[]>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.listunspent', params)
  }

  async blockchainAddressSubscribe(address: string): Promise<JsonRpcResponse<AddressSubscribeResult>> {
    return this.rpcCall('blockchain.address.subscribe', [address])
  }

  async blockchainAddressUnsubscribe(address: string): Promise<JsonRpcResponse<AddressUnsubscribeResult>> {
    return this.rpcCall('blockchain.address.unsubscribe', [address])
  }

  async blockchainBlockGet(heightOrHash: string | number): Promise<JsonRpcResponse<string>> {
    return this.rpcCall('blockchain.block.get', [heightOrHash])
  }

  async blockchainBlockHeader({
    height,
    cp_height = 0,
  }: BlockHeaderParams): Promise<JsonRpcResponse<BlockHeaderResult | string>> {
    return this.rpcCall('blockchain.block.header', [height, cp_height])
  }

  async blockchainBlockHeaderVerbose(
    heightOrHash: string | number,
  ): Promise<JsonRpcResponse<BlockHeaderVerboseResult>> {
    return this.rpcCall('blockchain.block.header_verbose', [heightOrHash])
  }

  async blockchainBlockHeaders({
    start_height,
    count,
    cp_height = 0,
  }: BlockHeadersParams): Promise<JsonRpcResponse<BlockHeadersResult>> {
    return this.rpcCall('blockchain.block.headers', [start_height, count, cp_height])
  }

  async blockchainEstimateFee(blocks: number): Promise<JsonRpcResponse<number>> {
    return this.rpcCall('blockchain.estimatefee', [blocks])
  }

  async blockchainHeadersSubscribe(): Promise<JsonRpcResponse<HexHeightResult>> {
    return this.rpcCall('blockchain.headers.subscribe')
  }

  async blockchainHeadersTip(): Promise<JsonRpcResponse<HexHeightResult>> {
    return this.rpcCall('blockchain.headers.tip')
  }

  async blockchainRelayFee(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall('blockchain.relayfee')
  }

  async blockchainScriptHashGetBalance({
    scripthash,
    filter,
  }: ScriptHashAndFilterParam): Promise<JsonRpcResponse<BlockchainGetBalanceResult>> {
    const params = [scripthash]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.scripthash.get_balance', params)
  }

  async blockchainScriptHashGetFirstUse({
    scripthash,
    filter,
  }: ScriptHashAndFilterParam): Promise<JsonRpcResponse<BlockchainGetFirstUseResult>> {
    const params = [scripthash]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.scripthash.get_first_use', params)
  }

  async blockchainScriptHashGetHistory({
    scripthash,
    filter,
  }: ScriptHashAndFilterParam): Promise<JsonRpcResponse<BlockchainHistoryResult[]>> {
    const params = [scripthash]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.scripthash.get_history', params)
  }

  async blockchainScriptHashGetMempool({
    scripthash,
    filter,
  }: ScriptHashAndFilterParam): Promise<JsonRpcResponse<BlockchainMempoolResult[]>> {
    const params = [scripthash]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.scripthash.get_mempool', params)
  }

  async blockchainScriptHashListUnspent({
    scripthash,
    filter,
  }: ScriptHashAndFilterParam): Promise<JsonRpcResponse<BlockchainUnspentOutputResult[]>> {
    const params = [scripthash]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.scripthash.listunspent', params)
  }

  async blockchainScriptHashSubscribe(scripthash: string): Promise<JsonRpcResponse<AddressSubscribeResult>> {
    return this.rpcCall('blockchain.scripthash.subscribe', [scripthash])
  }

  async blockchainScriptHashUnsubscribe(
    scripthash: string,
  ): Promise<JsonRpcResponse<AddressUnsubscribeResult>> {
    return this.rpcCall('blockchain.scripthash.unsubscribe', [scripthash])
  }

  async blockchainTransactionBroadcast(raw_tx: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall('blockchain.transaction.broadcast', [raw_tx])
  }

  async blockchainTransactionGet({
    tx_hash,
    verbose,
  }: TransactionGetParams): Promise<JsonRpcResponse<TransactionGetResult | VerboseTransactionResult>> {
    const params: (string | boolean)[] = [tx_hash]

    if (verbose) {
      params.push(verbose)
    }

    return this.rpcCall('blockchain.transaction.get', params)
  }

  async blockchainTransactionGetConfirmedBlockhash(
    tx_hash: string,
  ): Promise<JsonRpcResponse<TransactionGetConfirmedBlockhashResult>> {
    return this.rpcCall('blockchain.transaction.get_confirmed_blockhash', [tx_hash])
  }

  async blockchainTransactionGetMerkle({
    tx_hash,
    height,
  }: TransactionGetMerkleParams): Promise<JsonRpcResponse<TransactionGetMerkleResult>> {
    const params: (string | number)[] = [tx_hash]

    if (height) {
      params.push(height)
    }

    return this.rpcCall('blockchain.transaction.get_merkle', params)
  }

  async blockchainTransactionIdFromPos({
    height,
    tx_pos,
    merkle = false,
  }: TransactionIdFromPosParams): Promise<JsonRpcResponse<TransactionIdFromPosResult>> {
    const params = [height, tx_pos, merkle]

    return this.rpcCall('blockchain.transaction.id_from_pos', params)
  }

  async blockchainUtxoGet(params: UtxoGetParams): Promise<JsonRpcResponse<UtxoGetResult>> {
    const rpcParams =
      params.output_index !== undefined ? [params.tx_hash, params.output_index] : [params.outpoint_hash]

    return this.rpcCall('blockchain.utxo.get', rpcParams)
  }

  async tokenScripthashGetBalance({
    scripthash,
    cursor,
    token,
  }: TokenScripthashGetBalanceParams): Promise<JsonRpcResponse<TokenGetBalanceResult>> {
    const params = [scripthash]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.scripthash.get_balance', params)
  }

  async tokenScripthashGetHistory({
    scripthash,
    cursor,
    token,
  }: TokenScripthashGetHistoryParams): Promise<JsonRpcResponse<TokenGetHistoryResult>> {
    const params = [scripthash]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.scripthash.get_history', params)
  }

  async tokenScripthashGetMempool({
    scripthash,
    cursor,
    token,
  }: TokenScripthashGetMempoolParams): Promise<JsonRpcResponse<TokenGetMempoolResult>> {
    const params = [scripthash]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.scripthash.get_mempool', params)
  }

  async tokenScripthashListUnspent({
    scripthash,
    cursor,
    token,
  }: TokenScripthashListUnspentParams): Promise<JsonRpcResponse<TokenListUnspentResult>> {
    const params = [scripthash]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.scripthash.listunspent', params)
  }

  async tokenTransactionGetHistory({
    token,
    cursor,
    commitment,
  }: TokenTransactionGetHistoryParams): Promise<JsonRpcResponse<TokenTransactionGetHistoryResult>> {
    const params = [token]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (commitment !== undefined) {
      params.push(commitment)
    }

    return this.rpcCall('token.transaction.get_history', params)
  }

  async tokenAddressGetBalance({
    address,
    cursor,
    token,
  }: TokenAddressGetBalanceParams): Promise<JsonRpcResponse<TokenGetBalanceResult>> {
    const params = [address]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.address.get_balance', params)
  }

  async tokenAddressGetHistory({
    address,
    cursor,
    token,
  }: TokenAddressGetHistoryParams): Promise<JsonRpcResponse<TokenGetHistoryResult>> {
    const params = [address]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.address.get_history', params)
  }

  async tokenAddressGetMempool({
    address,
    cursor,
    token,
  }: TokenAddressGetBalanceParams): Promise<JsonRpcResponse<TokenGetMempoolResult>> {
    const params = [address]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.address.get_mempool', params)
  }

  async tokenAddressListUnspent({
    address,
    cursor,
    token,
  }: TokenAddressGetBalanceParams): Promise<JsonRpcResponse<TokenListUnspentResult>> {
    const params = [address]

    if (cursor !== undefined) {
      params.push(cursor)
    }
    if (token !== undefined) {
      params.push(token)
    }

    return this.rpcCall('token.address.listunspent', params)
  }

  async tokenGenesisInfo(
    tokenId: string,
  ): Promise<JsonRpcResponse<TokenGenesisInfoResultBCH | TokenGenesisInfoResultNexa>> {
    return this.rpcCall('token.genesis.info', [tokenId])
  }

  async tokenNftList(
    params: TokenNftListParams,
  ): Promise<JsonRpcResponse<TokenNftListResultBCH | TokenNftListResultNexa>> {
    return this.rpcCall('token.nft.list', [params.token, params.cursor])
  }

  async serverVersion(params: ServerVersionParams): Promise<JsonRpcResponse<[string, string]>> {
    return this.rpcCall('server.version', [params.client_name, params.protocol_version])
  }

  async cashAccountQueryName({
    name,
    height,
  }: CashAccountQueryNameParams): Promise<JsonRpcResponse<CashAccountQueryResult>> {
    return this.rpcCall('cashaccount.query.name', [name, height])
  }
}
