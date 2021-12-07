import { Currency, TransactionKMS } from '@tatumio/tatum-core'
import { signKMSTransaction } from './bnb'

describe('BNB tests', () => {
  it('should test KMS sign', async () => {
    const tx: TransactionKMS = {
      withdrawalId: '60b4ea4fae706954a27ee2db',
      chain: Currency.BNB,
      serializedTransaction:
        '{"msg":{"inputs":[{"address":{"type":"Buffer","data":[22,174,133,65,63,89,92,209,200,114,36,27,58,123,15,35,105,169,217,112]},"coins":[{"denom":"BNB","amount":1700000}]}],"outputs":[{"address":{"type":"Buffer","data":[22,174,133,65,63,89,92,209,200,114,36,27,58,123,15,35,105,169,217,112]},"coins":[{"denom":"BNB","amount":1700000}]}],"aminoPrefix":"2A2C87FA"},"signMsg":{"inputs":[{"address":"tbnb1z6hg2sflt9wdrjrjysdn57c0yd56nkts9lmwun","coins":[{"denom":"BNB","amount":1700000}]}],"outputs":[{"address":"tbnb1z6hg2sflt9wdrjrjysdn57c0yd56nkts9lmwun","coins":[{"denom":"BNB","amount":1700000}]}]},"memo":"109429545"}',
      hashes: ['26452800-ee32-42ab-a07d-f52d0745d7c7'],
      index: undefined,
      withdrawalResponses: undefined,
      id: '60b4ea4fae706954a27ee2dd',
    }
    const data = await signKMSTransaction(tx, '268a1c3c1b08e4cfd93cf380c39027ac0b6a707abcb4f578ad9ffd172a6eb327', true)
    expect(data).toBeDefined()
  })
})
