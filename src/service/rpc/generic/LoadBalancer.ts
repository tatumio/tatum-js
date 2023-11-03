/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { JsonRpcCall, JsonRpcResponse, Network } from '../../../dto'
import { PostI } from '../../../dto/PostI'
import { AbstractRpcInterface } from '../../../dto/rpc/AbstractJsonRpcInterface'
import { CONFIG, Constant, Utils } from '../../../util'
import { RpcNode, RpcNodeType } from '../../tatum'
import { GetI } from '../../../dto/GetI'

interface RpcStatus {
  node: {
    url: string
  }
  lastBlock: number
  lastResponseTime: number
  failed: boolean
}

interface RpcUrl {
  [RpcNodeType.NORMAL]: RpcStatus[]
  [RpcNodeType.ARCHIVE]: RpcStatus[]
}

interface ActiveUrl {
  [RpcNodeType.NORMAL]: UrlIndex
  [RpcNodeType.ARCHIVE]: UrlIndex
}

const NODE_TYPE_LABEL = {
  [RpcNodeType.NORMAL]: 'normal',
  [RpcNodeType.ARCHIVE]: 'archive',
}

interface UrlIndex {
  url: string
  index: number
}

interface InitRemoteHostsParams {
  nodeType: RpcNodeType
  nodes: RpcNode[]
  noSSRFCheck?: boolean
}

enum RequestType {
  RPC = 'RPC',
  POST = 'POST',
  GET = 'GET',
  BATCH = 'BATCH',
}

interface HandleFailedRpcCallParams {
  rpcCall: JsonRpcCall | JsonRpcCall[] | PostI | GetI
  e: unknown
  nodeType: RpcNodeType
  requestType: RequestType
  url: string
}

@Service({
  factory: (data: { id: string }) => {
    return new LoadBalancer(data.id)
  },
  transient: true,
})
export class LoadBalancer implements AbstractRpcInterface {
  protected readonly connector: TatumConnector

  private rpcUrls: RpcUrl = {
    [RpcNodeType.NORMAL]: [],
    [RpcNodeType.ARCHIVE]: [],
  }
  private activeUrl: ActiveUrl = {
    [RpcNodeType.NORMAL]: {} as UrlIndex,
    [RpcNodeType.ARCHIVE]: {} as UrlIndex,
  }
  private timeout: unknown
  private network: Network

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.network = Container.of(this.id).get(CONFIG).network
  }

  async init() {
    const config = Container.of(this.id).get(CONFIG)
    const nodes = config.rpc?.nodes
    if (nodes) {
      Utils.log({ id: this.id, message: 'Initializing RPC module from static URLs' })
      this.initCustomNodes(nodes)
    } else {
      Utils.log({ id: this.id, message: 'Initializing RPC module from remote hosts' })
      await this.initRemoteHostsUrls()
    }

    // TODO: consider removing this because we already have a timeout in checkStatuses()
    if (!config.rpc?.oneTimeLoadBalancing) {
      this.timeout = setTimeout(() => this.checkStatuses(), Constant.OPEN_RPC.LB_INTERVAL)
      // Check if we are running in Node.js environment
      if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
        process.on('exit', () => this.destroy())
      }
    } else {
      await this.checkStatuses()
    }
  }

  destroy() {
    clearTimeout(this.timeout as number)
  }

  private initCustomNodes(nodes: RpcNode[]) {
    this.initRemoteHosts({ nodeType: RpcNodeType.NORMAL, nodes: nodes, noSSRFCheck: true })
    this.initRemoteHosts({ nodeType: RpcNodeType.ARCHIVE, nodes: nodes, noSSRFCheck: true })
    if (nodes?.length) {
      for (const node of nodes) {
        if (node.type === RpcNodeType.NORMAL) {
          this.rpcUrls[RpcNodeType.NORMAL].push({
            node: { url: node.url },
            lastBlock: 0,
            lastResponseTime: 0,
            failed: false,
          })
        }
        if (node.type === RpcNodeType.ARCHIVE) {
          this.rpcUrls[RpcNodeType.ARCHIVE].push({
            node: { url: node.url },
            lastBlock: 0,
            lastResponseTime: 0,
            failed: false,
          })
        }
      }
    } else {
      Utils.log({ id: this.id, message: 'No RPC URLs provided' })
    }
  }

  private async checkStatuses() {
    await this.checkStatus(RpcNodeType.NORMAL)
    await this.checkStatus(RpcNodeType.ARCHIVE)
    if (!this.activeUrl[RpcNodeType.NORMAL].url && !this.activeUrl[RpcNodeType.ARCHIVE].url) {
      Utils.log({ id: this.id, message: 'No active node found, please set node urls manually.' })
      throw new Error('No active node found, please set node urls manually.')
    }

    const { rpc } = Container.of(this.id).get(CONFIG)
    if (!rpc?.oneTimeLoadBalancing) {
      if (this.timeout) {
        this.destroy()
      }
      this.timeout = setTimeout(() => this.checkStatuses(), Constant.OPEN_RPC.LB_INTERVAL)
    }
  }

  private async checkStatus(nodeType: RpcNodeType) {
    const { rpc, network } = Container.of(this.id).get(CONFIG)
    const all = []
    /**
     * Check status of all nodes.
     * If the node is not responding, it will be marked as failed.
     * If the node is responding, it will be marked as not failed and the last block will be updated.
     */
    const statusPayload = Utils.getStatusPayload(network)
    for (const server of this.rpcUrls[nodeType]) {
      Utils.log({ id: this.id, message: `Checking status of ${server.node.url}` })
      all.push(
        Utils.fetchWithTimeout(Utils.getStatusUrl(network, server.node.url), this.id, {
          method: Utils.getStatusMethod(network),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // body: statusPayload ? JSON.stringify(statusPayload) : undefined,
          // add body only if is defined
          ...(statusPayload && { body: JSON.stringify(statusPayload) }),
        })
          .then(async ({ response: res, responseTime }) => {
            server.lastResponseTime = responseTime
            const response = await res.json()
            Utils.log({
              id: this.id,
              message: `Response time of ${server.node.url} is ${server.lastResponseTime}ms with response: `,
              data: response,
            })
            if (res.ok && Utils.isResponseOk(network, response)) {
              server.failed = false
              server.lastBlock = Utils.parseStatusPayload(network, response)
            } else {
              Utils.log({
                id: this.id,
                message: `Failed to check status of ${server.node.url}. Error: ${JSON.stringify(
                  response,
                  Object.getOwnPropertyNames(response),
                )}`,
              })
              server.failed = true
            }
          })
          .catch((e) => {
            Utils.log({
              id: this.id,
              message: `Failed to check status of ${server.node.url}. Error: ${JSON.stringify(
                e,
                Object.getOwnPropertyNames(e),
              )}`,
            })
            Utils.log({
              id: this.id,
              message: `Server ${server.node.url} will be marked as failed and will be removed from the pool.`,
            })
            server.failed = true
          }),
      )
    }
    /**
     * The fastest node will be selected and will be used.
     */
    await Promise.allSettled(all).then(() => {
      const { fastestServer, index } = LoadBalancer.getFastestServer(
        this.rpcUrls[nodeType],
        rpc?.allowedBlocksBehind as number,
      )

      Utils.log({
        id: this.id,
        data: this.rpcUrls[nodeType],
        mode: 'table',
      })
      if (fastestServer && index !== -1) {
        Utils.log({
          id: this.id,
          message: `Server ${fastestServer.node.url} is selected as active server for ${RpcNodeType[nodeType]}.`,
          data: { url: fastestServer.node.url, index },
        })
        this.activeUrl[nodeType] = { url: fastestServer.node.url, index }
      }
    })
  }

  private static getFastestServer(servers: RpcStatus[], allowedBlocksBehind: number) {
    const { fastestServer, index } = servers.reduce(
      (result, item, index) => {
        const isNotFailed = !item.failed
        const isFasterBlock = item.lastBlock - allowedBlocksBehind > result.fastestServer.lastBlock
        const isSameBlockFasterResponse =
          item.lastBlock === result.fastestServer.lastBlock &&
          item.lastResponseTime < result.fastestServer.lastResponseTime

        if (isNotFailed && (isFasterBlock || isSameBlockFasterResponse)) {
          return { fastestServer: item, index: index }
        } else {
          return result
        }
      },
      { fastestServer: { lastBlock: -Infinity, lastResponseTime: Infinity, node: { url: '' } }, index: -1 },
    )

    return { fastestServer, index }
  }

  public getActiveArchiveUrlWithFallback() {
    const activeArchiveUrl = this.getActiveUrl(RpcNodeType.ARCHIVE)
    if (activeArchiveUrl?.url) {
      return { url: activeArchiveUrl.url, type: RpcNodeType.ARCHIVE }
    }

    if (this.getActiveUrl(RpcNodeType.NORMAL)?.url) {
      return { url: this.getActiveUrl(RpcNodeType.NORMAL).url, type: RpcNodeType.NORMAL }
    }

    throw new Error('No active node found.')
  }

  public getActiveNormalUrlWithFallback() {
    const activeNormalUrl = this.getActiveUrl(RpcNodeType.NORMAL)
    if (activeNormalUrl?.url) {
      return { url: activeNormalUrl.url, type: RpcNodeType.NORMAL }
    }

    if (this.getActiveUrl(RpcNodeType.ARCHIVE)?.url) {
      return { url: this.getActiveUrl(RpcNodeType.ARCHIVE).url, type: RpcNodeType.ARCHIVE }
    }

    throw new Error('No active node found.')
  }

  public getActiveUrl(nodeType: RpcNodeType) {
    return { url: this.activeUrl[nodeType]?.url as string, type: nodeType }
  }

  private getActiveIndex(nodeType: RpcNodeType): number {
    return this.activeUrl[nodeType]?.index as number
  }

  private checkSSRF(url: string): boolean {
    try {
      const parsedUrl = new URL(url)
      return parsedUrl.hostname.endsWith('rpc.tatum.io')
    } catch (e) {
      Utils.log({
        id: this.id,
        message: `Failed to parse URL ${url}. Error: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`,
      })
      return false
    }
  }

  private initRemoteHosts({ nodeType, nodes, noSSRFCheck }: InitRemoteHostsParams) {
    const filteredNodes = nodes.filter((node) => {
      // Check if the node type matches.
      const typeMatch = node.type === nodeType

      // If noSSRFCheck is true, skip the SSRF check.
      if (noSSRFCheck) {
        return typeMatch
      }

      // If noSSRFCheck is false or undefined, check if the URL ends with 'rpc.tatum.io'.
      const ssrfCheckPassed = this.checkSSRF(node.url)

      // Log if the URL doesn't pass the SSRF check
      if (!ssrfCheckPassed) {
        Utils.log({
          id: this.id,
          message: `Skipping URL ${node.url} as it doesn't pass the SSRF check.`,
        })
      }

      return typeMatch && ssrfCheckPassed
    })

    if (filteredNodes.length === 0) {
      return
    }

    if (!this.rpcUrls[nodeType]) {
      this.rpcUrls[nodeType] = []
    }

    this.rpcUrls[nodeType] = [
      ...this.rpcUrls[nodeType],
      ...filteredNodes.map((s) => ({
        node: { url: s.url },
        lastBlock: 0,
        lastResponseTime: 0,
        failed: false,
      })),
    ]

    Utils.log({
      id: this.id,
      message: `Added ${filteredNodes.length} nodes (${filteredNodes.map((s) => s.url).join(', ')}) for ${
        this.network
      } blockchain during the initialization for node ${NODE_TYPE_LABEL[nodeType]}.`,
    })

    const randomIndex = Math.floor(Math.random() * this.rpcUrls[nodeType].length)

    Utils.log({
      id: this.id,
      message: `Using random URL ${this.rpcUrls[nodeType][randomIndex].node.url} for ${this.network} blockchain during the initialization for node ${NODE_TYPE_LABEL[nodeType]}.`,
    })

    this.activeUrl[nodeType] = { url: this.rpcUrls[nodeType][randomIndex].node.url, index: randomIndex }
  }

  private async initRemoteHostsUrls() {
    const network = this.network
    const rpcList = Utils.getRpcListUrl(network)
    Utils.log({ id: this.id, message: `Fetching response from ${rpcList}` })
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const [normal, archive] = await Promise.all(rpcList.map((url) => fetch(url)))
      await this.initRemoteHostsFromResponse(normal, RpcNodeType.NORMAL)
      await this.initRemoteHostsFromResponse(archive, RpcNodeType.ARCHIVE)
    } catch (e) {
      console.error(
        new Date().toISOString(),
        `Failed to initialize RPC module. Error: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`,
      )
    }
  }

  async initRemoteHostsFromResponse(response: Response, nodeType: RpcNodeType) {
    if (response.ok) {
      const nodes: RpcNode[] = await response.json()
      this.initRemoteHosts({ nodeType: RpcNodeType.NORMAL, nodes: nodes })
      this.initRemoteHosts({ nodeType: RpcNodeType.ARCHIVE, nodes: nodes })
    } else {
      Utils.log({
        id: this.id,
        message: `Failed to fetch RPC configuration for ${this.network} blockchain for ${RpcNodeType[nodeType]} nodes`,
      })
    }
  }

  async handleFailedRpcCall({ rpcCall, e, nodeType, requestType, url }: HandleFailedRpcCallParams) {
    const { rpc: rpcConfig } = Container.of(this.id).get(CONFIG)
    const activeIndex = this.getActiveIndex(nodeType)
    if (requestType === RequestType.RPC && 'method' in rpcCall) {
      Utils.log({
        id: this.id,
        message: `Failed to call RPC ${rpcCall.method} on ${url}. Error: ${JSON.stringify(
          e,
          Object.getOwnPropertyNames(e),
        )}`,
      })
    } else if (requestType === RequestType.BATCH && Array.isArray(rpcCall)) {
      const methods = rpcCall.map((item) => item.method).join(', ')
      Utils.log({
        id: this.id,
        message: `Failed to call RPC methods [${methods}] on ${url}. Error: ${JSON.stringify(
          e,
          Object.getOwnPropertyNames(e),
        )}`,
      })
    } else if (requestType === RequestType.POST && 'path' in rpcCall && 'body' in rpcCall) {
      Utils.log({
        id: this.id,
        message: `Failed to call request on url ${url}${rpcCall.path} with body ${JSON.stringify(
          rpcCall.body,
        )}. Error: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`,
      })
    } else if (requestType === RequestType.GET && 'path' in rpcCall) {
      Utils.log({
        id: this.id,
        message: `Failed to call request on url ${url}${rpcCall.path}. Error: ${JSON.stringify(
          e,
          Object.getOwnPropertyNames(e),
        )}`,
      })
    } else {
      // Handle other cases
      Utils.log({
        id: this.id,
        message: `Failed to call request on url ${url}. Error: ${JSON.stringify(
          e,
          Object.getOwnPropertyNames(e),
        )}`,
      })
    }

    Utils.log({
      id: this.id,
      message: `Switching to another server, marking ${url} as unstable.`,
    })

    if (activeIndex == null) {
      console.error(
        `No active node found for node type ${RpcNodeType[nodeType]}. Looks like your request is malformed or all nodes are down. Turn on verbose mode to see more details and check status pages.`,
      )
      throw e
    }

    /**
     * If the node is not responding, it will be marked as failed.
     * New node will be selected and will be used for the given blockchain.
     */
    const servers = this.rpcUrls[nodeType] as RpcStatus[]
    servers[activeIndex].failed = true
    const { index, fastestServer } = LoadBalancer.getFastestServer(
      servers,
      rpcConfig?.allowedBlocksBehind as number,
    )
    if (index === -1) {
      console.error(
        `All RPC nodes are unavailable. Looks like your request is malformed or all nodes are down. Turn on verbose mode to see more details and check status pages.`,
      )
      throw e
    }
    Utils.log({
      id: this.id,
      message: `Server ${fastestServer.node.url} is selected as active server, because ${url} failed.`,
    })
    this.activeUrl[nodeType] = { url: fastestServer.node.url, index }
  }

  async rawRpcCall(rpcCall: JsonRpcCall, archive?: boolean): Promise<JsonRpcResponse<any>> {
    const { url, type } = archive
      ? this.getActiveArchiveUrlWithFallback()
      : this.getActiveNormalUrlWithFallback()
    try {
      Utils.log({
        id: this.id,
        message: `Sending RPC ${rpcCall.method} to ${url} for ${this.network} blockchain node type ${RpcNodeType[type]}.`,
      })
      return await this.connector.rpcCall(url, rpcCall)
    } catch (e) {
      await this.handleFailedRpcCall({ rpcCall, e, nodeType: type, requestType: RequestType.RPC, url })
      return await this.rawRpcCall(rpcCall)
    }
  }

  async rawBatchRpcCall(rpcCall: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    const { url, type } = this.getActiveArchiveUrlWithFallback()
    try {
      return await this.connector.rpcCall(url, rpcCall)
    } catch (e) {
      await this.handleFailedRpcCall({ rpcCall, e, nodeType: type, requestType: RequestType.BATCH, url })
      return await this.rawBatchRpcCall(rpcCall)
    }
  }

  async post<T>({ path, body, prefix }: PostI): Promise<T> {
    const { url, type } = this.getActiveNormalUrlWithFallback()
    const basePath = prefix ? `${url}${prefix}` : url
    try {
      return await this.connector.post<T>({ basePath, path, body })
    } catch (e) {
      await this.handleFailedRpcCall({
        rpcCall: { path, body },
        e,
        nodeType: type,
        requestType: RequestType.POST,
        url: basePath,
      })
      return await this.post({ path, body, prefix })
    }
  }

  async get<T>({ path, prefix }: GetI): Promise<T> {
    const { url, type } = this.getActiveNormalUrlWithFallback()
    const basePath = prefix ? `${url}${prefix}` : url
    try {
      return await this.connector.get<T>({ basePath, path })
    } catch (e) {
      await this.handleFailedRpcCall({
        rpcCall: { path },
        e,
        nodeType: type,
        requestType: RequestType.GET,
        url: basePath,
      })
      return await this.get({ path, prefix })
    }
  }

  getRpcNodeUrl(): string {
    return this.getActiveNormalUrlWithFallback().url
  }
}
