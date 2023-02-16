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
  }
  return res.status(405).send({ message: 'Method not allowed.' })
}
