import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.polygon.technology
 * https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainSmartContractInvocation
 */
export async function polygonSmartContractExample(): Promise<void> {
  const address = '0xedcdbc1cac4779648279f36f2d03071310d8dec0'

  // your previously deployed contract address
  const contractAddress = '0xC9c8ba8C7e2EAF43e84330Db08915A8106d7bD74'

  // smart contract read method
  const { data } = await polygonSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
