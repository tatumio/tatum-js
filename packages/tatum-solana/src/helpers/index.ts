import { solanaBroadcast } from '../blockchain'

export const helperBroadcastTx = async (txData: string) => {
  return await solanaBroadcast(txData)
}
