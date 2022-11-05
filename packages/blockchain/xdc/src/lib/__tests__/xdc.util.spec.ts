import { xdcUtil } from '../xdc.util'

describe('XDC util', () => {
  const CASES = [
    ['xdce383d8e1b50df4fe48f978819e724f68d0ed36a5', '0xe383d8e1b50df4fe48f978819e724f68d0ed36a5'],
    ['xdcccbd5fb2405e9ac8790a656c7e3f08cb5ce15168', '0xccbd5fb2405e9ac8790a656c7e3f08cb5ce15168'],
    ['', ''],
    [null, null],
    [undefined, undefined],
  ]

  const INVERSE_CASES = CASES.map((c) => [c[1], c[0]])

  describe('toHex', () => {
    it.each(CASES)('%s', async (given, expected) => {
      expect(xdcUtil.toHex(given)).toBe(expected)
    })
  })

  describe('fromHex', () => {
    it.each(INVERSE_CASES)('%s', async (given, expected) => {
      expect(xdcUtil.fromHex(given)).toBe(expected)
    })
  })
})
