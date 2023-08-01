import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { ApiBalanceRequest } from '../../api/api.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressBalanceDetails,
  TokenDetails,
  isDataApiEvmEnabledNetwork,
  isDataApiUtxoEnabledNetwork,
  isEvmBasedNetwork, isTronNetwork
} from '../../dto'
import { CONFIG, Constant, ErrorUtils, ResponseDto, Utils } from '../../util'
import { EvmRpc, GenericRpc, TronRpc } from '../rpc'
import { Network, TatumConfig } from '../tatum'
import { AddressBalance, AddressTransaction, GetAddressTransactionsQuery } from './address.dto'
import { decodeHexString, decodeUInt256 } from '../../util/decode';

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

      const fullBalances = isTronNetwork(chain) ? await this.getFullBalance(addresses) : { nativeBalance: '0', tokenBalances: [] }
      const nativeBalances = isTronNetwork(chain) ? [fullBalances.nativeBalance] : await this.getNativeBalance(addresses)
      const tokenBalances =  isTronNetwork(chain) ? fullBalances.tokenBalances : isDataApiEvmEnabledNetwork(chain) &&
        await this.connector
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
          .then((r) => r.result)

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
      if (!tokenBalances) {
        return result
      }
      const serializedTokenBalances = isTronNetwork(chain) ? tokenBalances : await this.processTokenBalanceDetails(tokenBalances, chain)
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
    let path
    return ErrorUtils.tryFail(async () => {
      switch (true) {
        case isDataApiEvmEnabledNetwork(chain):
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
        case [Network.BITCOIN, Network.BITCOIN_TESTNET].includes(chain):
          path = `bitcoin/transaction/address/${address}`
          break
        case [Network.LITECOIN, Network.LITECOIN_TESTNET].includes(chain):
          path = `litecoin/transaction/address/${address}`
          break
        case [Network.DOGECOIN, Network.DOGECOIN_TESTNET].includes(chain):
          path = `dogecoin/transaction/address/${address}`
          break
        default:
          throw new Error(`Not supported for ${chain} network.`)
      }
      return this.processUtxoBasedTxs(path, pageSize, page, transactionDirection, chain, address)
    })
  }

  private async processTRC20TokenBalanceDetails(tokenBalances: [{[key: string]: string}]) {
    const serializedTokenBalance = [];
    for (let i = 0; i < tokenBalances.length; i++) {
      const asset = await Utils.getRpc<TronRpc>(this.id, this.config).triggerConstantContract(Object.keys(tokenBalances[i])[0], Object.keys(tokenBalances[i])[0], 'symbol()', '', { visible: true }).then(r => decodeHexString(r.constant_result[0]));
      const decimals = await Utils.getRpc<TronRpc>(this.id, this.config).triggerConstantContract(Object.keys(tokenBalances[i])[0], Object.keys(tokenBalances[i])[0], 'decimals()', '', { visible: true }).then(r => decodeUInt256(r.constant_result[0]));
      const balance = Object.values(tokenBalances[i])[0];
      serializedTokenBalance.push({
        asset,
        decimals,
        balance
      })
    }
    return serializedTokenBalance
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
          inputs: Array<{ coin: { address: string, value: number | string } }>
          outputs: Array<{ address: string, value: string | number }>
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

  private async getFullBalance(addresses: string[]): Promise<{nativeBalance: string, tokenBalances: []}> {
    const network = this.config.network
    switch (true) {
      case [Network.TRON, Network.TRON_SHASTA].includes(network):
        if (addresses.length !== 1) {
          throw new Error(`UTXO based networks like ${network} support only one address per call.`)
        }
        return this.connector
          .get<{
            balance: number,
            createTime: number
            trc10: [{
              key: string,
              value: number,
            }]
            trc20: [{[key: string]: string}]
            freeNetLimit: number,
            bandwidth: number,
          }>({
            path: `tron/account/${addresses[0]}`,
          })
          .then(async (r) =>
          {
            return Object.create({
              nativeBalance: r.balance.toString(),
              tokenBalances: r.trc20.length > 0 ? await this.processTRC20TokenBalanceDetails(r.trc20) : [],
            })
          })
    }
    throw new Error(`Unsupported network ${network} for now.`)
  }

  private async getNativeBalance(addresses: string[]): Promise<string[]> {
    const network = this.config.network
    switch (true) {
      case isEvmBasedNetwork(network):
        return Promise.all(
          addresses.map((a, i) => Utils.getRpc<EvmRpc>(this.id, this.config).rawRpcCall(Utils.prepareRpcCall('eth_getBalance', [a, 'pending'], i))),
        ).then(r => r.map((e) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          new BigNumber(e.result).dividedBy(10 ** Constant.DECIMALS[network]).toString()))
      case [Network.SOLANA, Network.SOLANA_DEVNET].includes(network):
        return Utils.getRpc<GenericRpc>(this.id, this.config)
          .rawBatchRpcCall(
            addresses.map((a, i) => Utils.prepareRpcCall('getBalance', [a, { commitment: 'processed' }], i)),
          )
          .then((r) =>
            r.map((e) => new BigNumber(e.result.value).dividedBy(10 ** Constant.DECIMALS[network]).toString()),
          )
      case [Network.XRP, Network.XRP_TESTNET].includes(network):
        if (addresses.length !== 1) {
          throw new Error(`UTXO based networks like ${network} support only one address per call.`)
        }
        return Utils.getRpc<GenericRpc>(this.id, this.config).rawRpcCall(
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
      case isDataApiUtxoEnabledNetwork(network):
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
      case [Network.TRON, Network.TRON_SHASTA].includes(network):
        throw new Error(`Use 'getFullBalance' method for network ${network}.`)
    }
    // TODO: implement for other networks - XLM etc etc
    throw new Error(`Unsupported network ${network} for now.`)
  }
}
