import { EvmUtils } from './EvmUtils'

describe('EvmUtils', () => {
  describe('isArchiveMethod', () => {
    it.each([
      ['eth_getCode', true],
      ['eth_call', true],
      ['debug', true],
      ['trace', true],
      ['getStorageAt', false],
      ['eth_call', true],
      ['getBalance', false],
      ['eth_getCode', true],
      ['getBlockByNumber', false],
      ['getLogs', false],
      ['other', false],
    ])('archive method %s -> %s', (method, expected) => {
      expect(EvmUtils.isArchiveMethod({ method, id: 2, jsonrpc: 'test' })).toBe(expected)
    })

    it.each([
      ['getStorageAt', [1, 2], false],
      ['getStorageAt', [1, 2, 'latest'], false],
      ['getStorageAt', [1, 2, 3], true],
      ['getStorageAt', [], false],
      ['getBalance', [1], false],
      ['getBalance', [1, 'latest'], false],
      ['getBalance', [1, 2], true],
      ['getBalance', [], false],
      ['getBlockByNumber', [], false],
      ['getBlockByNumber', ['latest'], false],
      ['getBlockByNumber', [1], true],
      ['getLogs', [1, { fromBlock: 'latest' }], false],
      ['getLogs', [1, { fromBlock: 'latest', toBlock: 'latest' }], false],
      ['getLogs', [1, { toBlock: 'latest' }], false],
      ['getLogs', [1, { toBlock: 1 }], true],
      ['getLogs', [1, { fromBlock: 1 }], true],
    ])('archive method & param %s -> %s', (method, params, expected) => {
      expect(EvmUtils.isArchiveMethod({ method, params, id: 2, jsonrpc: 'test' })).toBe(expected)
    })
  })
})
