import { TransactionHash } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainSmartContractInvocation
export async function celoSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = celoSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://celo.org/developers/faucet
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

  // your previously deployed contract address
  const contractAddress = '0xB051B46C05ee25C4F9A7aaa0C249a35995235f01'

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
    params: ['0xaB90F4f1f9716cc60FA16D02abC3272D09de415c'],
  })
  console.log(`Smart contract data: ${data}`)

  // smart contract write method
  // make sure your address is funded
  const { txId } = (await celoSDK.smartContract.send.smartContractMethodInvocationTransaction({
    contractAddress,
    methodName: 'transfer',
    methodABI: {
      constant: false,
      inputs: [
        { name: '_value', type: 'uint256' },
        { name: '_to', type: 'address' },
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    params: ['100000000', to],
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Transaction successfully sent with ID ${txId}`)
}
