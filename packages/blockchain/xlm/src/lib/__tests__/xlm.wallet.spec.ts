import { xlmWallet } from '@tatumio/xlm'

describe('XlmSDK - wallet', () => {
  describe('isValidAddress', () => {
    it('positive',  () => {
      expect(xlmWallet().isValidAddress('GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55')).toBeTruthy()
    })

    describe('negative', () => {
      it.each([
        [''],
        ['abcd'],
        [0],
        ['12345'],
        [null],
        [undefined],
      ])('%s',  (value: any) => {
        expect(xlmWallet().isValidAddress(value)).toBeFalsy()
      })

    })
  })

  describe('isValidSecret', () => {
    it('positive',  () => {
      expect(xlmWallet().isValidSecret('SDWXSA3NBBLCM5E3OGLXAKXDYGB3YNEJN2KZTEAXUWYVR3QHVRSWFXJT')).toBeTruthy()
    })

    describe('negative', () => {
      it.each([
        [''],
        ['abcd'],
        [0],
        ['12345'],
        [null],
        [undefined],
      ])('%s',  (value: any) => {
        expect(xlmWallet().isValidSecret(value)).toBeFalsy()
      })
    })
  })
})
