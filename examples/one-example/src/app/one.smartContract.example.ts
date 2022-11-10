import { oneUtils, TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// https://apidoc.tatum.io/tag/Harmony#operation/OneBlockchainSmartContractInvocation
export async function oneSmartContractExample(): Promise<void> {
  // address in hex format (starting with 0x)
  const address = oneUtils.toHex('one1x2p0wrqkntjdmak6h53lrqgl2sxye7hfj0w4mf')

  // your previously deployed contract address
  const contractAddress = 'one1w9ws4e2jledsfgxraec83w30hwqyes4rvkzu2r'

  // smart contract read method
  const { data } = await oneSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
