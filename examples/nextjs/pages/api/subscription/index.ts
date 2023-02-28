import type { NextApiRequest, NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // @ts-ignore
    const tatum = await initTatum({ apiKey: req.query.apiKey, network: req.query.network })
    const { data } = await tatum.notification.getAll({
      pageSize: Number(req.query.pageSize),
      offset: Number(req.query.offset),
    })
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const tatum = await initTatum(req.body.apiKey)
      const result = await tatum.notification.subscribe.addressEvent(req.body)
      return res.status(200).json(result)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
