// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Network, TatumSdk } from '@tatumcom/js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const x = await TatumSdk.init({ apiKey: 'c53da34e-114d-4961-9030-d1a720a0ec38', network: Network.Testnet })
  const y = await x.notification.getAll()
  res.status(200).json(y.data)
}
