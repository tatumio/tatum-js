import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { Currency, TerraService, TransferTerraBlockchain } from '@tatumio/api-client'
import { Fee, MsgSend, RawKey } from '@terra-money/terra.js'
import { terraClient } from './terra.client'
import { BigNumber } from 'bignumber.js'

export const terraTxService = (args: SDKArguments) => {
  const client = terraClient(args)

  const prepare = async (testnet: boolean, body: TransferTerraBlockchain): Promise<string> => {
    const key = new RawKey(Buffer.from(body.fromPrivateKey, 'hex'))
    const lcd = client.getClient(testnet)
    const amount: any = {}
    const fee: any = {}
    switch (body.currency) {
      case Currency.LUNA_KRW:
        amount.ukrw = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.ukrw = new BigNumber(body.fee || '50').multipliedBy(1000000).toNumber()
        break
      case Currency.LUNA:
        amount.uluna = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.uluna = new BigNumber(body.fee || '0.02').multipliedBy(1000000).toNumber()
        break
      case Currency.LUNA_USD:
        amount.uusd = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.uusd = new BigNumber(body.fee || '0.2').multipliedBy(1000000).toNumber()
        break
    }
    try {
      const tx = await lcd.wallet(key).createAndSignTx({
        memo: body.memo,
        fee: new Fee(200000, fee),
        msgs: [new MsgSend(key.accAddress, body.to, amount)],
      })
      return Buffer.from(tx.toBytes()).toString('hex')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return {
    /**
     * Prepare native transaction, signs it but doesnt broadcast to the blockchain.
     */
    prepare,

    /**
     * Signs and broadcast native transaction to the blockchain
     * @param testnet
     * @param body
     */
    send: async (testnet: boolean, body: TransferTerraBlockchain) => {
      return TerraService.terraBroadcast({ txData: await prepare(testnet, body) })
    },
  }
}
