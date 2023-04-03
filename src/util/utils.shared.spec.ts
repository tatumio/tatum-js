import { Utils } from './util.shared'
import { Blockchain } from '../dto/Blockchain.dto'

describe('Utils tests', function () {
  describe('statusPayloadExtractor', function () {

    it('Bitcoin', function () {
      expect(Utils.statusPayloadExtractor(Blockchain.BITCOIN, { id: 1, jsonrpc: '2.0', result: 123 })).toEqual(123)
    })
    it('Litecoin', function () {
      expect(Utils.statusPayloadExtractor(Blockchain.LITECOIN, { id: 1, jsonrpc: '2.0', result: 123 })).toEqual(123)
    })
    it('Ethereum', function () {
      expect(Utils.statusPayloadExtractor(Blockchain.ETHEREUM, { id: 1, jsonrpc: '2.0', result: '0x123' })).toEqual(291)
    })
    it('Polygon', function () {
      expect(Utils.statusPayloadExtractor(Blockchain.POLYGON, { id: 1, jsonrpc: '2.0', result: '0x123' })).toEqual(291)
    })
    it('Monero', function () {
      expect(Utils.statusPayloadExtractor(Blockchain.MONERO, {
        id: 1,
        jsonrpc: '2.0',
        result: { count: 123 },
      })).toEqual(123)
    })
  })
})
