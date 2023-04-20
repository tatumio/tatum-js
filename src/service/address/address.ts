import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, Constant, ErrorUtils, ResponseDto, Utils } from '../../util'
import { Network, TatumConfig } from '../tatum'
import { AddressBalance, AddressTransaction, GetAddressTransactionsQuery } from './address.dto'
import {
  AddressBalanceDetails,
  isDataApiEvmEnabledNetwork,
  isDataApiUtxoEnabledNetwork,
  isEvmBasedNetwork,
  TokenDetails,
} from '../../dto'
import { EvmBasedRpc, GenericRpc } from '../rpc'
import BigNumber from 'bignumber.js'

@Service({
  factory: (data: { id: string }) => {
    return new Address(data.id)
  },
  transient: true,
})
export class Address {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get balance of all tokens for a given address.
   * You can get balance of multiple addresses in one call.
   */
  async getBalance({
                     page = 0,
                     pageSize = 10,
                     addresses,
                   }: AddressBalanceDetails): Promise<ResponseDto<AddressBalance[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(async () => {
        const [nativeBalances, tokenBalances] = await Promise.all([
          this.getNativeBalance(addresses),
          isDataApiEvmEnabledNetwork(chain) && this.connector
            .get<{ result: AddressBalance[] }>({
              path: `data/balances`,
              params: {
                pageSize,
                offset: page,
                excludeMetadata: true,
                chain,
                addresses: addresses.join(','),
              },
            }).then((r) => r.result)])
        const result: AddressBalance[] = []
        for (const nativeBalance of nativeBalances) {
          result.push({
            asset: Constant.CURRENCY_NAMES[chain],
            decimals: Constant.DECIMALS[chain],
            balance: nativeBalance,
            type: 'native',
          })
        }
        if (!tokenBalances) {
          return result
        }
        return [...result, ...await this.processTokenBalanceDetails(tokenBalances, chain)]
      },
    )
  }

  /**
   * Get all transactions, that are related to the given address. It could be both incoming and outgoing transactions.
   */
  async getTransactions({
                          address,
                          transactionDirection,
                          transactionTypes,
                          fromBlock,
                          toBlock,
                          pageSize = 10,
                          page = 0,
                        }: GetAddressTransactionsQuery): Promise<ResponseDto<AddressTransaction[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(async () => {
      if (isDataApiEvmEnabledNetwork(chain)) {
        return this.connector.get<{ result: AddressTransaction[] }>({
          path: `data/transactions`,
          params: {
            chain,
            addresses: address,
            transactionTypes: transactionTypes?.join(),
            transactionSubtype: transactionDirection,
            fromBlock,
            toBlock,
            pageSize,
            offset: page,
          },
        }).then((r) => r.result)
      }
      let path
      if ([Network.BITCOIN, Network.BITCOIN_TESTNET].includes(chain)) {
        path = `bitcoin/transaction/address/${address}`
      } else if ([Network.LITECOIN, Network.LITECOIN_TESTNET].includes(chain)) {
        path = `litecoin/transaction/address/${address}`
      } else if ([Network.DOGECOIN, Network.DOGECOIN_TESTNET].includes(chain)) {
        path = `dogecoin/transaction/address/${address}`
      }
      if (!path) {
        // TODO: implement for other networks - TRON, XRP, CARDANO, SOL, XLM etc etc
        throw new Error(`Not supported for ${chain} network.`)
      }
      return this.processUtxoBasedTxs(path, pageSize, page, transactionDirection, chain, address)
    })
  }

  private async processTokenBalanceDetails(tokenBalances: AddressBalance[], chain: Network) {
    const result: AddressBalance[] = []
    // Processing token details
    const details = await Promise.all(tokenBalances.map((details) => this.connector.get<TokenDetails>({
      path: 'data/tokens',
      params: {
        chain,
        tokenAddress: details.tokenAddress,
      },
    })))
    for (let i = 0; i < tokenBalances.length; i++) {
      const tokenBalance = tokenBalances[i]
      const item: AddressBalance = {
        tokenAddress: tokenBalance.tokenAddress,
        balance: tokenBalance.balance,
        type: tokenBalance.type,
      }
      if (tokenBalance.lastUpdatedBlock) {
        item.lastUpdatedBlock = tokenBalance.lastUpdatedBlock
      }
      if (details[i].symbol) {
        item.asset = details[i].symbol
      }
      if (details[i].decimals) {
        item.decimals = details[i].decimals
      }
      if (tokenBalance.tokenId) {
        item.tokenId = tokenBalance.tokenId
      }
      result.push(item)
    }
    return result
  }

  private processUtxoBasedTxs(path: string, pageSize: number, page: number, transactionDirection: 'incoming' | 'outgoing' | undefined, chain: Network, address: string) {
    return this.connector.get<Array<{
      blockNumber: number,
      time: number,
      hash: string,
      inputs: Array<{ coin: { address: string, value: number | string } }>,
      outputs: Array<{ address: string, value: string | number }>
    }>>({
      path,
      basePath: Constant.TATUM_API_URL.V1,
      params: {
        pageSize,
        offset: page * pageSize,
        txType: transactionDirection,
      },
    }).then((r) => {
      const result: AddressTransaction[] = []
      for (const tx of r) {
        const item: AddressTransaction = {
          chain,
          blockNumber: tx.blockNumber,
          timestamp: tx.time,
          transactionType: transactionDirection || 'incoming',
          hash: tx.hash,
          address,
          amount: '0',
        }
        tx.inputs.filter((i) => i.coin.address === address).forEach((i) => {
          item.amount = new BigNumber(item.amount).minus(new BigNumber(i.coin.value).dividedBy(typeof i.coin.value === 'number' ? 10 ** Constant.DECIMALS[chain] : 1)).toString()
        })
        tx.outputs.filter((i) => i.address === address).forEach((i) => {
          item.amount = new BigNumber(item.amount).plus(new BigNumber(i.value).dividedBy(typeof i.value === 'number' ? 10 ** Constant.DECIMALS[chain] : 1)).toString()
        })
        if (new BigNumber(item.amount).isGreaterThan(0)) {
          item.transactionType = 'incoming'
          result.push(item)
        } else {
          item.transactionType = 'outgoing'
          item.amount = new BigNumber(item.amount).multipliedBy(-1).toString()
          result.push(item)
        }
      }
      return result
    })
  }

  private getNativeBalance(addresses: string[]): Promise<string[]> {
    const network = this.config.network
    if (isEvmBasedNetwork(network)) {
      const rpc = Utils.getRpc<EvmBasedRpc>(this.id, network)
      return rpc.rawBatchRpcCall(addresses.map((a, i) => rpc.prepareRpcCall('eth_getBalance', [a, 'pending'], i)))
        .then((r) => r.map((e) => new BigNumber(e.result).dividedBy(10 ** Constant.DECIMALS[network]).toString()))
    }
    if ([Network.SOLANA, Network.SOLANA_DEVNET].includes(network)) {
      const rpc = Utils.getRpc<GenericRpc>(this.id, network)
      return rpc.rawBatchRpcCall(addresses.map((a, i) => rpc.prepareRpcCall('getBalance', [a, { commitment: 'processed' }], i)))
        .then((r) => r.map((e) => new BigNumber(e.result.value).dividedBy(10 ** Constant.DECIMALS[network]).toString()))
    } else if ([Network.XRP, Network.XRP_TESTNET].includes(network)) {
      if (addresses.length !== 1) {
        throw new Error(`UTXO based networks like ${network} support only one address per call.`)
      }
      const rpc = Utils.getRpc<GenericRpc>(this.id, network)
      return rpc.rawRpcCall(rpc.prepareRpcCall('account_info', [{
        account: addresses[0],
        ledger_index: 'current',
      }]))
        .then((r) => [new BigNumber(r.result?.account_data?.Balance || 0).dividedBy(10 ** Constant.DECIMALS[network]).toString()])
    } else if (isDataApiUtxoEnabledNetwork(network)) {
      if (addresses.length !== 1) {
        throw new Error(`UTXO based networks like ${network} support only one address per call.`)
      }
      return this.connector.get<Array<{ value: number }>>({
        path: 'data/utxos',
        params: {
          chain: network,
          address: addresses[0],
          totalValue: 200000000000,
        },
      }).then((r) => [r.reduce((acc, val) => acc + val.value, 0).toString()])
    }
    // TODO: implement for other networks - TRON, XLM etc etc
    throw new Error(`Unsupported network ${network} for now.`)
  }
}
