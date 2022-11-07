import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet-testnet.kcc.network
 * https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainSmartContractInvocation
 */
export async function kcsSmartContractExample(): Promise<void> {
  const address = 'xdcfd46a9707ed1f6eb7d7cfe0c6a2bac72d6aa57d4'

  // your previously deployed contract address
  const contractAddress = 'xdc2F8C49490E5662f1b4957c0BC46e8B25b2787cd8'

  // smart contract read method
  const { data } = await kcsSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
