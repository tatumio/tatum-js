import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet-testnet.kcc.network
 * https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainSmartContractInvocation
 */
export async function kcsSmartContractExample(): Promise<void> {
  const address = '0x032bcf21a8394832f61fc8128d0b65bf96aa62e6'

  // your previously deployed contract address
  const contractAddress = '0xce331CE994C2638C27BC5221e8e3186D78f82FC5'

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
