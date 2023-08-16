import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { ApiBalanceRequest } from '../../api/api.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressBalanceDetails,
  AddressBalanceFilters,
  AddressBalanceFiltersTron,
  TokenDetails,
  isDataApiEnabledNetwork,
  isDataApiEvmEnabledNetwork,
  isDataApiUtxoEnabledNetwork,
  isEvmBasedNetwork,
} from '../../dto'
import { CONFIG, Constant, ErrorUtils, ResponseDto, Utils } from '../../util'
import { decodeHexString, decodeUInt256 } from '../../util/decode'
import { EvmRpc, GenericRpc, TronRpc } from '../rpc'
import { Network, TatumConfig } from '../tatum'
import {
  AddressBalance,
  AddressTransaction,
  GetAddressTransactionsQuery,
  GetAddressTransactionsQueryTezos,
} from './address.dto'

@Service({
  factory: (data: { id: string }) => new AddressTezos(data.id),
  transient: true,
})
export class AddressTezos {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get balance of XTZ for a given Tezos address.
   * You can get balance of multiple addresses in one call.
   */
  async getBalance({ addresses }: AddressBalanceFilters): Promise<ResponseDto<AddressBalance[]>> {
    const chain = this.config.network

    return ErrorUtils.tryFail(async () => {
      const data = await this.connector.get<{ result: AddressBalance[] }, ApiBalanceRequest>({
        path: `data/balances`,
        params: {
          pageSize: 50,
          offset: 0,
          chain,
          addresses: addresses.join(','),
        },
      })

      return data.result.map((value) => ({
        address: value.address,
        asset: Constant.CURRENCY_NAMES[chain],
        decimals: Constant.DECIMALS[chain],
        balance: value.balance,
        type: 'native',
      }))
    })
  }

  /**
   * Get all transactions, that are related to the given address. It could be both incoming and outgoing transactions.
   */
  async getTransactions({
    address,
    transactionDirection,
    fromBlock,
    toBlock,
    pageSize = 10,
    page = 0,
    cursor = undefined,
  }: GetAddressTransactionsQueryTezos): Promise<
    ResponseDto<{ result: AddressTransaction[]; prevPage: string; nextPage: string }>
  > {
    const chain = this.config.network

    return ErrorUtils.tryFail(async () => {
      const data = await this.connector.get<{
        result: AddressTransaction[]
        prevPage: string
        nextPage: string
      }>({
        path: `data/transactions`,
        params: {
          chain,
          addresses: address,
          transactionSubtype: transactionDirection,
          blockFrom: fromBlock,
          blockTo: toBlock,
          pageSize,
          offset: page,
          cursor,
        },
      })

      return {
        result: data.result,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
      }
    })
  }
}

@Service({
  factory: (data: { id: string }) => {
    return new AddressTron(data.id)
  },
  transient: true,
})
export class AddressTron {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get balance of all tokens for a given address.
   */
  async getBalance({ address }: AddressBalanceFiltersTron): Promise<ResponseDto<AddressBalance[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(async () => {
      const fullBalances = await this.getFullBalance(address)
      const nativeBalances = [fullBalances.nativeBalance]
      const tokenBalances = fullBalances.tokenBalances

      const result = formatNativeBalances(nativeBalances, [address], chain)

      if (!tokenBalances) {
        return result
      }

      return [...result, ...tokenBalances]
    })
  }

  private async getFullBalance(
    address: string,
  ): Promise<{ nativeBalance: string; tokenBalances: AddressBalance[] }> {
    const data = await this.connector.get<{
      balance: number
      createTime: number
      trc10: [
        {
          key: string
          value: number
        },
      ]
      trc20: [{ [key: string]: string }]
      freeNetLimit: number
      bandwidth: number
    }>({
      path: `tron/account/${address}`,
    })

    let tokenBalances: AddressBalance[] = []

    if (data.trc20.length > 0) {
      tokenBalances = await this.processTRC20TokenBalanceDetails(address, data.trc20)
    }

    return {
      nativeBalance: data.balance.toString(),
      tokenBalances,
    }
  }

  private async processTRC20TokenBalanceDetails(
    address: string,
    tokenBalances: [{ [key: string]: string }],
  ): Promise<AddressBalance[]> {
    const serializedTokenBalance: AddressBalance[] = []
    for (const token of tokenBalances) {
      const tokenAddress = Object.keys(token)[0]
      const asset = await Utils.getRpc<TronRpc>(this.id, this.config)
        .triggerConstantContract(tokenAddress, tokenAddress, 'symbol()', '', {
          visible: true,
        })
        .then((r) => decodeHexString(r.constant_result[0]))
      const decimals = await Utils.getRpc<TronRpc>(this.id, this.config)
        .triggerConstantContract(tokenAddress, tokenAddress, 'decimals()', '', {
          visible: true,
        })
        .then((r) => decodeUInt256(r.constant_result[0]))
      const balance = Object.values(token)[0]
      serializedTokenBalance.push({
        asset,
        decimals,
        balance,
        type: 'fungible',
        address,
        tokenAddress,
      })
    }
    return serializedTokenBalance
  }
}

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
      const nativeBalances = await this.getNativeBalance(addresses)
      const tokenBalances =
        isDataApiEvmEnabledNetwork(chain) &&
        (await this.connector
          .get<{ result: AddressBalance[] }, ApiBalanceRequest>({
            path: `data/balances`,
            params: {
              pageSize,
              offset: page,
              excludeMetadata: true,
              chain,
              addresses: addresses.join(','),
            },
          })
          .then((r) => r.result))

      const result = formatNativeBalances(nativeBalances, addresses, chain)

      if (!tokenBalances) {
        return result
      }
      const serializedTokenBalances = await this.processTokenBalanceDetails(tokenBalances, chain)
      return [...result, ...serializedTokenBalances]
    })
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
      if (isDataApiEnabledNetwork(chain)) {
        return this.connector
          .get<{ result: AddressTransaction[] }>({
            path: `data/transactions`,
            params: {
              chain,
              addresses: address,
              transactionTypes: transactionTypes?.join(),
              transactionSubtype: transactionDirection,
              blockFrom: fromBlock,
              blockTo: toBlock,
              pageSize,
              offset: page,
            },
          })
          .then((r) => r.result)
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
    const details = await Promise.all(
      tokenBalances.map((details) =>
        this.connector.get<TokenDetails>({
          path: 'data/tokens',
          params: {
            chain,
            tokenAddress: details.tokenAddress,
          },
        }),
      ),
    )
    for (let i = 0; i < tokenBalances.length; i++) {
      const tokenBalance = tokenBalances[i]
      const item: AddressBalance = {
        address: tokenBalance.address,
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

  private processUtxoBasedTxs(
    path: string,
    pageSize: number,
    page: number,
    transactionDirection: 'incoming' | 'outgoing' | undefined,
    chain: Network,
    address: string,
  ) {
    return this.connector
      .get<
        Array<{
          blockNumber: number
          time: number
          hash: string
          inputs: Array<{ coin: { address: string; value: number | string } }>
          outputs: Array<{ address: string; value: string | number }>
        }>
      >({
        path,
        basePath: Constant.TATUM_API_URL.V1,
        params: {
          pageSize,
          offset: page * pageSize,
          txType: transactionDirection,
        },
      })
      .then((r) => {
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
          tx.inputs
            .filter((i) => i.coin.address === address)
            .forEach((i) => {
              item.amount = new BigNumber(item.amount)
                .minus(
                  new BigNumber(i.coin.value).dividedBy(
                    typeof i.coin.value === 'number' ? 10 ** Constant.DECIMALS[chain] : 1,
                  ),
                )
                .toString()
            })
          tx.outputs
            .filter((i) => i.address === address)
            .forEach((i) => {
              item.amount = new BigNumber(item.amount)
                .plus(
                  new BigNumber(i.value).dividedBy(
                    typeof i.value === 'number' ? 10 ** Constant.DECIMALS[chain] : 1,
                  ),
                )
                .toString()
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

  private async getNativeBalance(addresses: string[]): Promise<string[]> {
    const network = this.config.network
    if (isEvmBasedNetwork(network)) {
      const rpc = Utils.getRpc<EvmRpc>(this.id, this.config)
      const result = await Promise.all(
        addresses.map((a, i) => rpc.rawRpcCall(Utils.prepareRpcCall('eth_getBalance', [a, 'pending'], i))),
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return result.map((e) => new BigNumber(e.result).dividedBy(10 ** Constant.DECIMALS[network]).toString())
    }
    if ([Network.SOLANA, Network.SOLANA_DEVNET].includes(network)) {
      const rpc = Utils.getRpc<GenericRpc>(this.id, this.config)
      return rpc
        .rawBatchRpcCall(
          addresses.map((a, i) => Utils.prepareRpcCall('getBalance', [a, { commitment: 'processed' }], i)),
        )
        .then((r) =>
          r.map((e) => new BigNumber(e.result.value).dividedBy(10 ** Constant.DECIMALS[network]).toString()),
        )
    } else if ([Network.XRP, Network.XRP_TESTNET].includes(network)) {
      if (addresses.length !== 1) {
        throw new Error(`UTXO based networks like ${network} support only one address per call.`)
      }
      const rpc = Utils.getRpc<GenericRpc>(this.id, this.config)
      return rpc
        .rawRpcCall(
          Utils.prepareRpcCall('account_info', [
            {
              account: addresses[0],
              ledger_index: 'current',
            },
          ]),
        )
        .then((r) => [
          new BigNumber(r.result.account_data?.Balance || 0)
            .dividedBy(10 ** Constant.DECIMALS[network])
            .toString(),
        ])
    } else if (isDataApiUtxoEnabledNetwork(network)) {
      if (addresses.length !== 1) {
        throw new Error(`UTXO based networks like ${network} support only one address per call.`)
      }
      return this.connector
        .get<Array<{ value: number }>>({
          path: 'data/utxos',
          params: {
            chain: network,
            address: addresses[0],
            totalValue: 200000000000,
          },
        })
        .then((r) => [r.reduce((acc, val) => acc + val.value, 0).toString()])
    }
    // TODO: implement for other networks - TRON, XLM etc etc
    throw new Error(`Unsupported network ${network} for now.`)
  }
}

function formatNativeBalances(nativeBalances: string[], addresses: string[], chain: Network) {
  const result: AddressBalance[] = []
  for (const [i, nativeBalance] of nativeBalances.entries()) {
    result.push({
      address: addresses[i],
      asset: Constant.CURRENCY_NAMES[chain],
      decimals: Constant.DECIMALS[chain],
      balance: nativeBalance,
      type: 'native',
    })
  }

  return result
}
