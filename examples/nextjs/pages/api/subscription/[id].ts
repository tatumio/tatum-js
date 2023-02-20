import type { NextApiRequest, NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    const tatum = await initTatum()
    await tatum.notification.unsubscribe(id as string)
    return res.status(200).end()
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
