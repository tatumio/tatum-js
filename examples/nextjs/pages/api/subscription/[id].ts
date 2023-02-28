import type { NextApiRequest, NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    console.log(req.query)
    // @ts-ignore
    const tatum = await initTatum({ apiKey: req.query.apiKey, network: req.query.network })
    await tatum.notification.unsubscribe(id as string)
    return res.status(200).end()
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
