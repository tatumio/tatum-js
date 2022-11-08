import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethSmartContractExample(): Promise<void> {
  const address = '0xaB90F4f1f9716cc60FA16D02abC3272D09de415c'

  // your previously deployed contract address
  const contractAddress = '0xC9c8ba8C7e2EAF43e84330Db08915A8106d7bD74'

  // smart contract read method
  const { data } = await ethSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
