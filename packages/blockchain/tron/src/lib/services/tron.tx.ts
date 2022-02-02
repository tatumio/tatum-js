import { tronTrc10 } from './tron.trc10'
import { tronTrc20 } from './tron.trc20'
import { ITronWeb } from './tron.web'

export const tronTx = (args: { tronWeb: ITronWeb }) => {
  return {
    trc10: tronTrc10(args),
    trc20: tronTrc20(args),
  }
}
