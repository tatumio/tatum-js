import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnBlockchainSmartContractInvocation
export async function klaytnSmartContractExample(): Promise<void> {
  const address = '0xedcdbc1cac4779648279f36f2d03071310d8dec0'

  // your previously deployed contract address
  const contractAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'

  // smart contract read method
  const { data } = await klaytnSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
