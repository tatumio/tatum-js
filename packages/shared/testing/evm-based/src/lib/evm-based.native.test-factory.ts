import { SdkWithNativeFunctions } from '@tatumio/shared-blockchain-abstract'
import { expectHexString } from '@tatumio/shared-testing-common'
import { GanacheAccount } from './ganacheHelper'

export const nativeTestFactory = {
  prepare: {
    transferSignedTransaction: (sdk: SdkWithNativeFunctions, accounts: GanacheAccount[]) => {
      it('valid from signatureId', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.transferSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          amount: '1',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(result)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
        expect(json.value).toBe('1000000000000000000')
      })

      it('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.transferSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          amount: '1',
          fromPrivateKey: accounts[0].privateKey,
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        })

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferSignedTransaction({
            to: 'someinvalidaddress',
            amount: '1',
            fromPrivateKey: accounts[0].privateKey,
            nonce: 3252345722143,
            fee: {
              gasLimit: '53632',
              gasPrice: '20',
            },
          })
          fail()
        } catch (e: any) {
          expect(e.message).toMatch('is invalid')
        }
      })
    },
  },
}
