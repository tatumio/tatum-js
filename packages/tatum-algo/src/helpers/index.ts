import { algorandBroadcast } from '../blockchain'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await algorandBroadcast(txData, signatureId)
}
