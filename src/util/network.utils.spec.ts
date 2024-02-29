import { Network } from '../dto'
import { NetworkUtils } from './network.utils'

describe('Network Utils', () => {
  describe('getChainId', () => {
    it.each([
      [Network.ETHEREUM, 1],
      [Network.ETHEREUM_SEPOLIA, 11155111],
      [Network.CELO, 42220],
      [Network.CELO_ALFAJORES, 44787],
    ])('valid %s -> %s', (network: Network, expected: number) => {
      expect(NetworkUtils.getChainId(network)).toBe(expected)
    })
  })

  describe('isTestnet', () => {
    it.each([
      [Network.ETHEREUM, false],
      [Network.ETHEREUM_SEPOLIA, true],
      [Network.CELO, false],
      [Network.CELO_ALFAJORES, true],
    ])('valid %s -> %s', (network: Network, expected: boolean) => {
      expect(NetworkUtils.isTestnet(network)).toBe(expected)
    })
  })

  describe('isAlternateTestnet', () => {
    it.each([
      [Network.ETHEREUM, false],
      [Network.ETHEREUM_SEPOLIA, false],
      [Network.ETHEREUM_HOLESKY, true],
      [Network.CELO, false],
      [Network.CELO_ALFAJORES, false],
    ])('valid %s -> %s', (network: Network, expected: boolean) => {
      expect(NetworkUtils.isAlternateTestnet(network)).toBe(expected)
    })
  })
})
