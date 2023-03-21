import type { NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'
import { GetAllQueryRequest } from '../../../dto'
import { NotificationType } from "@tatumcom/js";

export default async function handler(
  req: GetAllQueryRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const tatum = await initTatum()
    const { data } = await tatum.notification.getAll({
      pageSize: Number(req.query.pageSize),
      offset: Number(req.query.offset),
    })
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const tatum = await initTatum()
      let result : any
      switch (req.body.type){
        case NotificationType.ADDRESS_EVENT:
          result = await tatum.notification.subscribe.addressEvent({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.INCOMING_NATIVE_TX:
          result = await tatum.notification.subscribe.incomingNativeTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_NATIVE_TX:
          result = await tatum.notification.subscribe.outgoingNativeTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_FAILED_TX:
          result = await tatum.notification.subscribe.outgoingFailedTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.PAID_FEE:
          result = await tatum.notification.subscribe.paidFee({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.INCOMING_INTERNAL_TX:
          result = await tatum.notification.subscribe.incomingInternalTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_INTERNAL_TX:
          result = await tatum.notification.subscribe.outgoingInternalTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.INCOMING_FUNGIBLE_TX:
          result = await tatum.notification.subscribe.incomingFungibleTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_FUNGIBLE_TX:
          result = await tatum.notification.subscribe.outgoingFungibleTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.INCOMING_NFT_TX:
          result = await tatum.notification.subscribe.incomingNftTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_NFT_TX:
          result = await tatum.notification.subscribe.outgoingNftTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.INCOMING_MULTITOKEN_TX:
          result = await tatum.notification.subscribe.incomingMultitokenTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.OUTGOING_MULTITOKEN_TX:
          result = await tatum.notification.subscribe.outgoingMultitokenTx({address: req.body.address, chain: req.body.chain, url: req.body.url})
          break;
        case NotificationType.FAILED_TXS_PER_BLOCK:
          result = await tatum.notification.subscribe.failedTxsPerBlock({chain: req.body.chain, url: req.body.url})
          break;
      }
      return res.status(200).json(result)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
