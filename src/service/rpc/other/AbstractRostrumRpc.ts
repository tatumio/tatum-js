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
  HexHeightResult,
  RostrumRpcInterface,
  ScriptHashAndFilterParam,
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

  async blockchainGetFirstUse({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainGetFirstUseResult>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_first_use', params)
  }

  async blockchainGetHistory({
    address,
    filter,
  }: AddressAndFilterParam): Promise<JsonRpcResponse<BlockchainHistoryResult[]>> {
    const params = [address]

    if (filter) {
      params.push(filter)
    }

    return this.rpcCall('blockchain.address.get_history', params)
  }

  async blockchainGetMempool({
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

  async blockchainBlockGet(heightOrHash: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall('blockchain.block.get', [heightOrHash])
  }

  async blockchainBlockHeader({
    height,
    cp_height = 0,
  }: BlockHeaderParams): Promise<JsonRpcResponse<BlockHeaderResult | string>> {
    return this.rpcCall('blockchain.block.header', [height, cp_height])
  }

  async blockchainBlockHeaderVerbose(
    heightOrHash: string,
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
}
