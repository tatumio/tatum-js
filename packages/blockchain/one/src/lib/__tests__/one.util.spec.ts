import { oneUtils } from '@tatumio/one'

describe('ONE utils', () => {
  const CASES = [
    ['one1ahxmc89vgaukfqne7dhj6qc8zvgd3hkqf5nygk', '0xedcdbc1cac4779648279f36f2d03071310d8dec0'],
    ['', ''],
    [null, null],
    [undefined, undefined],
  ]

  const INVERSE_CASES = CASES.map((c) => [c[1], c[0]])

  describe('toHex', () => {
    it.each(CASES)('%s', async (given, expected) => {
      expect(oneUtils.toHex(given)).toBe(expected)
    })
  })

  describe('fromHex', () => {
    it.each(INVERSE_CASES)('%s', async (given, expected) => {
      expect(oneUtils.fromHex(given)).toBe(expected)
    })
  })
})
