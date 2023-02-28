import type { NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'
import { DeleteSubscriptionRequest } from '../../../dto'

export default async function handler(
  req: DeleteSubscriptionRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    console.log(req.query)
    const tatum = await initTatum({ apiKey: req.query.apiKey, network: req.query.network })
    await tatum.notification.unsubscribe(id as string)
    return res.status(200).end()
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
