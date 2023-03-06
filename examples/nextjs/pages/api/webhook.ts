import type { NextApiResponse } from 'next'
import { initTatum } from '../../utils/tatum'
import { GetAllQueryRequest } from '../../dto'

export default async function handler(
  req: GetAllQueryRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const tatum = await initTatum()
    const { data } = await tatum.notification.getAllExecutedWebhooks({ pageSize: Number(req.query.pageSize), offset: Number(req.query.offset) })
    return res.status(200).json(data)
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
