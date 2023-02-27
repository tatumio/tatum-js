import type { NextApiRequest, NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const tatum = await initTatum()
    const { data } = await tatum.notification.getAll({ pageSize: Number(req.query.pageSize), offset: Number(req.query.offset) })
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    const tatum = await initTatum()
    const result = await tatum.notification.subscribe.addressEvent(req.body)
    return res.status(200).json(result)
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
