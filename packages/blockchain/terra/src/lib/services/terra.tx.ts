import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { BlockchainTerraService, Currency, TransferTerraBlockchain } from '@tatumio/api-client'
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
      case Currency.LUNA_KRT:
        amount.ukrt = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.ukrt = new BigNumber(body.fee || 200000).multipliedBy(1000000).toNumber()
        break
      case Currency.LUNA:
        amount.uluna = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.uluna = new BigNumber(body.fee || 200000).multipliedBy(1000000).toNumber()
        break
      case Currency.LUNA_UST:
        amount.uust = new BigNumber(body.amount).multipliedBy(1000000).toNumber()
        fee.uust = new BigNumber(body.fee || 200000).multipliedBy(1000000).toNumber()
        break
    }
    try {
      const tx = await lcd.wallet(key).createAndSignTx({
        memo: body.memo,
        fee: new Fee(parseInt(body.fee || '200000'), fee),
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
      return BlockchainTerraService.terraBroadcast({ txData: await prepare(testnet, body) })
    },
  }
}
