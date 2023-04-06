import { Container, Inject, Service } from 'typedi'
import { CONFIG, Constant, Utils } from '../../util'
import { TatumConnector } from '../../connector/tatum.connector'
import { Blockchain, JsonRpcCall, JsonRpcResponse } from '../../dto'

interface RpcInvocation {
  callRpc(request: JsonRpcCall): Promise<JsonRpcResponse>
  getFastestUrl(): Promise<string>
}

interface RpcStatus {
  node: {
    url: string
  }
  lastBlock: number
  lastResponseTime: number
  failed: boolean
}

@Service({
  factory: (data: { id: string }) => {
    return new Rpc(data.id)
  }, transient: true,
})
export class Rpc {
  private readonly rpcUrlMap = new Map<Blockchain, RpcStatus[]>()
  private readonly activeUrl = new Map<Blockchain, { url: string, index: number }>()
  private timeout: unknown

  public readonly bitcoin: RpcInvocation
  public readonly litecoin: RpcInvocation
  public readonly ethereum: RpcInvocation
  public readonly polygon: RpcInvocation
  public readonly monero: RpcInvocation
  @Inject()
  readonly connector: TatumConnector

  constructor(private readonly id: string) {
    this.bitcoin = this.create(Blockchain.BITCOIN)
    this.litecoin = this.create(Blockchain.LITECOIN)
    this.polygon = this.create(Blockchain.POLYGON)
    this.ethereum = this.create(Blockchain.ETHEREUM)
    this.monero = this.create(Blockchain.MONERO)
  }

  /**
   * Initialize RPC module.
   * Based on the configuration, it will either use static URLs provided by the user or it will use remote hosts.
   * If remote hosts are used, it will perform load balancing and will use the fastest available node.
   */
  async init() {
    const config = Container.of(this.id).get(CONFIG)
    if (config.rpc?.useStaticUrls) {
      if (config.verbose) {
        console.debug(new Date().toISOString(), 'Initializing RPC module from static URLs')
      }
      // we are ignoring load balancing, getting static URLs from the chains they provided configuration for
      for (const blockchain of Object.values(Blockchain)) {
        const urls = config.rpc[blockchain]?.url
        if (urls?.length) {
          for (const url of urls) {
            this.rpcUrlMap.set(blockchain, [{ node: { url }, lastBlock: 0, lastResponseTime: 0, failed: false }])
          }
          if (config.rpc?.ignoreLoadBalancing) {
            this.activeUrl.set(blockchain, { url: urls[0], index: -1 })
            if (config.verbose) {
              console.debug(new Date().toISOString(), `Using static URL ${urls[0]} for ${blockchain}`)
            }
          } else {
            if (config.rpc?.waitForFastestNode) {
              await this.checkStatus()
            }
            if (!config.rpc?.oneTimeLoadBalancing) {
              this.timeout = setTimeout(() => this.checkStatus(), Constant.OPEN_RPC.LB_INTERVAL)
              process.on('exit', () => clearInterval(this.timeout as number))
            }
          }
        }
      }
    } else {
      if (config.verbose) {
        console.debug(new Date().toISOString(), 'Initializing RPC module from remote hosts')
      }
      if (config.rpc?.oneTimeLoadBalancing && config.rpc?.waitForFastestNode) {
        await this.checkStatus()
      } else if (!config.rpc?.oneTimeLoadBalancing) {
        this.timeout = setTimeout(() => this.checkStatus(), Constant.OPEN_RPC.LB_INTERVAL)
      }
    }
  }

  destroy() {
    clearTimeout(this.timeout as number)
  }

  private async checkStatus() {
    const { verbose, rpc } = Container.of(this.id).get(CONFIG)
    const allChains = []
    for (const blockchain of Object.values(Blockchain)) {
      if (!this.rpcUrlMap.has(blockchain)) {
        continue
      }
      const servers: RpcStatus[] = this.rpcUrlMap.get(blockchain) as RpcStatus[]
      const all = []
      /**
       * Check status of all nodes for the given blockchain.
       * If the node is not responding, it will be marked as failed.
       * If the node is responding, it will be marked as not failed and the last block will be updated.
       */
      for (const server of servers) {
        all.push(Utils.fetchWithTimeout(server.node.url, {
          method: 'POST',
          body: JSON.stringify(Constant.OPEN_RPC.STATUS_PAYLOAD[blockchain]),
        }).then(async ({ response: res, responseTime }) => {
          server.lastResponseTime = responseTime
          const response = await res.json()
          if (verbose) {
            console.debug(new Date().toISOString(), `Response time of ${server.node.url} for ${blockchain} blockchain is ${server.lastResponseTime}ms with response: `, response)
          }
          if (res.ok && response.result) {
            server.failed = false
            server.lastBlock = Utils.statusPayloadExtractor(blockchain, response)
          } else {
            if (verbose) {
              console.warn(new Date().toISOString(), `Failed to check status of ${server.node.url} for ${blockchain} blockchain.`, response)
            }
            server.failed = true
          }
        }).catch((e) => {
          if (verbose) {
            console.warn(new Date().toISOString(), `Failed to check status of ${server.node.url} for ${blockchain} blockchain.`, e)
            console.warn(new Date().toISOString(), `Server ${server.node.url} for ${blockchain} will be marked as failed and will be removed from the pool.`)
          }
          server.failed = true
        }))
      }
      /**
       * The fastest node will be selected and will be used for the given blockchain.
       */
      allChains.push(Promise.allSettled(all).then(() => {
        const { fastestServer, index } = Rpc.getFastestServer(servers, rpc?.allowedBlocksBehind as number)
        if (fastestServer && index !== -1) {
          if (verbose) {
            console.debug(new Date().toISOString(), `Server ${fastestServer.node.url} for ${blockchain} blockchain is the active server.`)
          }
          this.activeUrl.set(blockchain, { url: fastestServer.node.url, index })
        }
      }))
    }
    await Promise.allSettled(allChains)
    if (!rpc?.oneTimeLoadBalancing) {
      if (this.timeout) {
        clearTimeout(this.timeout as number)
      }
      this.timeout = setTimeout(() => this.checkStatus(), Constant.OPEN_RPC.LB_INTERVAL)
    }
  }

  private create(blockchain: Blockchain): RpcInvocation {
    const { verbose, rpc: rpcConfig} = Container.of(this.id).get(CONFIG)
    return {
      callRpc: (request: JsonRpcCall) => callRpc(request, this),
      getFastestUrl: () => getFastestUrl(this),
    }

    async function getFastestUrl(rpc: Rpc) {
      if (rpcConfig?.ignoreLoadBalancing) {
        return rpc.getActiveUrl(blockchain)
      }
      await rpc.checkStatus()
      return rpc.getActiveUrl(blockchain)
    }

    async function callRpc(request: JsonRpcCall, rpc: Rpc): Promise<JsonRpcResponse> {
      if (!rpc.rpcUrlMap.has(blockchain)) {
        await rpc.initChainMap(blockchain)
      }
      const url = rpc.getActiveUrl(blockchain)
      try {
        return await rpc.connector.rpcCall(url, request)
      } catch (e) {
        const activeIndex = rpc.getActiveIndex(blockchain)
        if (activeIndex !== -1) {
          /// we are using static URL, so we don't need to do anything
          throw  e
        }
        if (verbose) {
          console.warn(new Date().toISOString(), `Failed to call RPC ${request.method} on ${url} for ${blockchain} blockchain.`, e)
          console.log(new Date().toISOString(), `Switching to another server for ${blockchain} blockchain, marking this as unstable.`)
        }
        /**
         * If the node is not responding, it will be marked as failed.
         * New node will be selected and will be used for the given blockchain.
         */
        const servers = rpc.rpcUrlMap.get(blockchain) as RpcStatus[]
        servers[activeIndex].failed = true
        const { index, fastestServer } = Rpc.getFastestServer(servers, rpcConfig?.allowedBlocksBehind as number)
        if (index === -1) {
          console.error(`All servers for ${blockchain} blockchain are unavailable.`)
          throw e
        }
        rpc.activeUrl.set(blockchain, { url: fastestServer.node.url, index })
        return callRpc(request, rpc)
      }
    }
  }

  private static getFastestServer(servers: RpcStatus[], allowedBlocksBehind: number) {
    const { fastestServer, index } = servers.reduce((result, item, index) => {
      if (!item.failed &&
        ((item.lastBlock - allowedBlocksBehind) > result.fastestServer.lastBlock ||
          (item.lastBlock === result.fastestServer.lastBlock && item.lastResponseTime < result.fastestServer.lastResponseTime))) {
        return { fastestServer: item, index: index };
      } else {
        return result
      }
    }, { fastestServer: { lastBlock: -Infinity, lastResponseTime: Infinity, node: { url: '' } }, index: -1 })
    return { fastestServer, index }
  }

  private getActiveUrl(blockchain: Blockchain): string {
    if (this.activeUrl.has(blockchain)) {
      return this.activeUrl.get(blockchain)?.url as string
    }
    throw new Error(`No active URL for ${blockchain} blockchain`)
  }

  private getActiveIndex(blockchain: Blockchain): number {
    if (this.activeUrl.has(blockchain)) {
      return this.activeUrl.get(blockchain)?.index as number
    }
    throw new Error(`No active URL for ${blockchain} blockchain`)
  }

  private async initChainMap(blockchain: Blockchain) {
    const { verbose } = Container.of(this.id).get(CONFIG)
    if (verbose) {
      console.debug(new Date().toISOString(), `Fetching response from ${Constant.OPEN_RPC.CONFIG_URL[blockchain]}`)
    }
    try {
      const res = await fetch(Constant.OPEN_RPC.CONFIG_URL[blockchain])
      if (res.ok) {
        const servers: Array<{ url: string }> = await res.json()
        const randomIndex = Math.floor(Math.random() * servers.length)
        if (verbose) {
          console.debug(new Date().toISOString(), `Using random URL ${servers[randomIndex].url} for ${blockchain} blockchain during the initialization`)
        }
        this.activeUrl.set(blockchain, { url: servers[randomIndex].url, index: randomIndex })
        this.rpcUrlMap.set(blockchain, servers.map((s) => ({
          node: { url: s.url },
          lastBlock: 0,
          lastResponseTime: 0,
          failed: false,
        })))
      } else {
        console.error(new Date().toISOString(), `Failed to fetch RPC configuration for ${blockchain} blockchain`)
      }
    } catch (e) {
      console.error(new Date().toISOString(), 'Failed to initialize RPC module', e)
    }
  }
}
