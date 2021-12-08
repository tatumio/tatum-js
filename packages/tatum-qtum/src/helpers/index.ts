import { broadcast } from '../blockchain'

export const helperBroadcastTx = async (txData: string) => {
  return await broadcast(txData)
}
