import { ITronWeb } from './tron.web'
import { tronTx } from './tron.tx'


export const tronGasPump = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      gasPumpBatch: async (
        testnet: boolean,
        body: any,
        provider?: string,
      ) => tronTx(args).gasPump.prepare.prepareGasPumpBatch(testnet, body, provider),
    },
  }
}
