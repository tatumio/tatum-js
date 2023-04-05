import { TatumSDK } from '@tatumcom/js'

const run = async () => {
  /**
   * Initialize Tatum SDK with default configuration. For now, we are waiting for a fastest node during the initialization. We don't want to run load balancing during the runtime.
   */
  const sdk = await TatumSDK.init({ rpc: { waitForFastestNode: true, oneTimeLoadBalancing: true } })

  console.log(new Date().toISOString(), JSON.stringify(await sdk.rpc.bitcoin.callRpc({
    method: 'getblockchaininfo',
    params: [],
    jsonrpc: '2.0',
    id: 1,
  }), null, 2))

  console.log(new Date().toISOString(), JSON.stringify(await sdk.rpc.litecoin.callRpc({
    method: 'getblockchaininfo',
    params: [],
    jsonrpc: '2.0',
    id: 1,
  }), null, 2))

  sdk.destroy()
}

run()
