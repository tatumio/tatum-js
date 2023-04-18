import type { NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'
import { GetAllQueryRequest } from '../../../dto'
import { TatumSDK, Network, Ethereum } from '@tatumcom/js'

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
      const tatum = await TatumSDK.init<Ethereum>({network: Network.ETHEREUM_SEPOLIA})

      const result = await tatum.notification.subscribe.addressEvent({
        url: req.body.url,
        address: req.body.address,
      })
      // how do I subscribe to some notifications? :(

      return res.status(200).json(result)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
  //{address: req.body.address, url: req.body.url}
}
