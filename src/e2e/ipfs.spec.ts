import fs from 'fs'
import { Network } from '../dto'
import { EvmE2eUtils } from './rpc/evm/evm.e2e.utils'

describe.skip('IPFS', () => {
  it('should upload file to IPFS', async () => {
    const tatum = await EvmE2eUtils.initTatum(Network.ETHEREUM, process.env.V4_API_KEY_MAINNET)
    const fileData = fs.readFileSync('./test.txt') // Adjust the path to your file
    const response = await tatum.ipfs.uploadFile({ file: fileData })
    expect(response.status).toBe('SUCCESS')
    expect(response.data.ipfsHash).toBeDefined()
  })
})
