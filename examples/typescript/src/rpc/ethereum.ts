import { initTatum } from '../tatum'

export const rpc = async () => {
  const tatum = await initTatum()

  const blockNumber = await tatum.rpc.blockNumber()
  console.log(`Current block number is ${blockNumber.toNumber()}`)
}
