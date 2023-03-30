import { Blockchain } from '../dto/Blockchain.dto'

export const Constant = {
  TATUM_API_URL: 'https://api.tatum.com/v1/',
  OPEN_RPC: {
    LB_INTERVAL: 30_000,
    ALLOWED_BLOCKS_BEHIND: 2,
    CONFIG_URL: {
      [Blockchain.BITCOIN]: 'https://bitcoin.cdn.openrpc.io',
      [Blockchain.LITECOIN]: 'https://litecoin.cdn.openrpc.io',
      [Blockchain.ETHEREUM]: 'https://ethereum.cdn.openrpc.io',
      [Blockchain.POLYGON]: 'https://polygon.cdn.openrpc.io',
      [Blockchain.MONERO]: 'https://monero.cdn.openrpc.io',
    },
    STATUS_PAYLOAD: {
      [Blockchain.BITCOIN]: {
        jsonrpc: '2.0',
        method: 'getblockcount',
        id: 1,
      },
      [Blockchain.LITECOIN]: {
        jsonrpc: '2.0',
        method: 'getblockcount',
        id: 1,
      },
      [Blockchain.ETHEREUM]: {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        id: 1,
      },
      [Blockchain.POLYGON]: {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        id: 1,
      },
      [Blockchain.MONERO]: {
        jsonrpc: '2.0',
        method: 'get_block_count',
        id: 1,
      },
    },
  },
}
