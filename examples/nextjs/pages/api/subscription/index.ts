// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initTatum } from '../../../utils/tatum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const tatum = await initTatum()
    const { data } = await tatum.notification.getAll()
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    console.log(req.body)
    const tatum = await initTatum()
    const result = await tatum.notification.subscribe.addressTransaction(req.body)
    return res.status(200).json(result)
  } else {
    return res.status(405).send({ message: 'Method not allowed.' })
  }
}
