import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoSmartContractExample(): Promise<void> {
  const address = '0xf2298860dB19b65E3f4047C463D7646E390534cC'

  // your previously deployed contract address
  const contractAddress = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1'

  // smart contract read method
  const { data } = await celoSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
