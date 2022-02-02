import { tronTrc10 } from './tron.trc10'
import { ITronWeb } from './tron.web'

export const tronTx = (args: { tronWeb: ITronWeb }) => {
  return {
    trc10: tronTrc10(args),
  }
}
