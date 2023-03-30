import { Container, Service } from 'typedi'
import { CONFIG, Constant, Utils } from '../../util'
import { Blockchain } from '../../dto/Blockchain.dto'

interface RpcStatus {
  node: {
    url: string
  }
  lastBlock: number
  lastResponseTime: number
  failed: boolean
  active: boolean
}

@Service({
  factory: (data: { id: string }) => {
    return new Rpc(data.id)
  }, transient: true,
})
export class Rpc {
  private readonly rpcUrlMap = new Map<Blockchain, RpcStatus[]>()
  private readonly activeUrl = new Map<Blockchain, string>()
  private interval: NodeJS.Timeout

  constructor(private readonly id: string) {
  }

  async init() {
    const config = Container.of(this.id).get(CONFIG)
    if (config.rpc?.ignoreLoadBalancing) {
      if (config.verbose) {
        console.debug('Initializing RPC module from static URLs')
      }
      // we are ignoring load balancing, getting static URLs from the chains they provided configuration for
      for (const blockchain of Object.values(Blockchain)) {
        const urls = config.rpc[blockchain]?.url
        if (urls?.length) {
          this.activeUrl.set(blockchain, urls[0])
          if (config.verbose) {
            console.debug(`Using static URL ${urls[0]} for ${blockchain}`)
          }
        }
      }
    } else {
      if (config.verbose) {
        console.debug('Initializing RPC module from remote hosts')
      }
      const all = []
      for (const blockchain of Object.values(Blockchain)) {
        if (config.verbose) {
          console.debug(`Fetching response from ${Constant.OPEN_RPC.CONFIG_URL[blockchain]}`)
        }
        all.push(fetch(Constant.OPEN_RPC.CONFIG_URL[blockchain]).then(async (res) => {
          if (res.ok) {
            const servers: Array<{ url: string }> = await res.json()
            const randomIndex = Math.floor(Math.random() * servers.length)
            if (config.verbose) {
              console.debug(`Using random URL ${servers[randomIndex].url} for ${blockchain} blockchain during the initialization`)
            }
            this.activeUrl.set(blockchain, servers[randomIndex].url)
            this.rpcUrlMap.set(blockchain, servers.map((s, index) => ({
              node: { url: s.url },
              lastBlock: 0,
              lastResponseTime: 0,
              failed: false,
              active: index === randomIndex,
            })))
          } else {
            console.error(`Failed to fetch RPC configuration for ${blockchain} blockchain`)
            process.exit(1)
          }
        }))
      }
      try {
        await Promise.all(all)
      } catch (e) {
        console.error('Failed to initialize RPC module', e)
        process.exit(1)
      }
      this.checkStatus()
      this.interval = setInterval(() => this.checkStatus(), Constant.OPEN_RPC.LB_INTERVAL)
      process.on('exit', () => clearInterval(this.interval))
    }
  }

  private async checkStatus() {
    const { verbose } = Container.of(this.id).get(CONFIG)
    const allChains = []
    for (const blockchain of Object.values(Blockchain)) {
      if (!this.rpcUrlMap.has(blockchain)) {
        continue
      }
      const servers: RpcStatus[] = this.rpcUrlMap.get(blockchain) as RpcStatus[]
      let fastestServer: RpcStatus | undefined
      let fastestServerIndex: number | undefined
      const all = []
      for (const [index, server] of servers.entries()) {
        const start = Date.now()
        all.push(Utils.fetchWithTimeout(server.node.url, {
          method: 'POST',
          body: JSON.stringify(Constant.OPEN_RPC.STATUS_PAYLOAD[blockchain]),
        }).then(async (res) => {
          server.lastResponseTime = Date.now() - start
          const response = await res.json()
          if (verbose) {
            console.debug(`Response time of ${server.node.url} for ${blockchain} blockchain is ${server.lastResponseTime}ms with response: `, response)
          }
          if (res.ok && response.result) {
            server.failed = false
            server.lastBlock = Utils.statusPayloadExtractor(blockchain, response)
            if (!fastestServer || server.lastResponseTime < fastestServer.lastResponseTime) {
              if (verbose) {
                console.debug(`Server ${server.node.url} for ${blockchain} blockchain is now the fastest server.`)
              }
              fastestServer = server
              fastestServerIndex = index
            }
          } else {
            if (verbose) {
              console.warn(`Failed to check status of ${server.node.url} for ${blockchain} blockchain.`, response)
            }
            server.failed = true
            server.active = false
          }
        }).catch((e) => {
          if (verbose) {
            console.warn(`Failed to check status of ${server.node.url} for ${blockchain} blockchain.`, e)
            console.warn(`Server ${server.node.url} for ${blockchain} will be marked as failed and will be removed from the pool.`)
          }
          server.failed = true
          server.active = false
        }))
      }
      allChains.push(Promise.allSettled(all).then(() => {
        if (fastestServer && fastestServerIndex) {
          if (verbose) {
            console.debug(`Server ${fastestServer.node.url} for ${blockchain} blockchain is the active server.`)
          }
          servers[fastestServerIndex].active = true
          this.activeUrl.set(blockchain, fastestServer.node.url)
        }
      }))
    }
    await Promise.allSettled(allChains)
  }
}
