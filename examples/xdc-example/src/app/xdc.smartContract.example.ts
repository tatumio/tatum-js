import { TatumXdcSDK, xdcUtil } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/XinFin#operation/XdcBlockchainSmartContractInvocation
 */
export async function xdcSmartContractExample(): Promise<void> {
  // address in hex format (starting with 0x)
  const address = xdcUtil.toHex('xdcedcdbc1cac4779648279f36f2d03071310d8dec0')

  // your previously deployed contract address
  const contractAddress = 'xdcC9c8ba8C7e2EAF43e84330Db08915A8106d7bD74'

  // smart contract read method
  const { data } = await xdcSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
    contractAddress,
    methodName: 'balanceOf',
    methodABI: {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    // address we want the balance of
    params: [address],
  })
  console.log(`Smart contract data: ${data}`)
}
