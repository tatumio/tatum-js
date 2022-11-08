import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet-testnet.kcc.network
 * https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainSmartContractInvocation
 */
export async function kcsSmartContractExample(): Promise<void> {
  const address = '0xaB90F4f1f9716cc60FA16D02abC3272D09de415c'

  // your previously deployed contract address
  const contractAddress = '0xC9c8ba8C7e2EAF43e84330Db08915A8106d7bD74'

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
