import { TransactionHash } from '@tatumio/api-client'
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainSmartContractInvocation
 */
export async function kcsSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet
  const { mnemonic, xpub } = await kcsSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddressPrivateKey
  const fromPrivateKey = await kcsSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = kcsSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = kcsSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://faucet-testnet.kcc.network
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

  // your previously deployed contract address
  const contractAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'

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
    params: ['0x352a7a5277eC7619500b06fA051974621C1acd12'],
  })
  console.log(`Smart contract data: ${data}`)

  // smart contract write method
  // make sure your address is funded
  const { txId } = (await kcsSDK.smartContract.send.smartContractMethodInvocationTransaction({
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
    params: [100000000, to],
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transaction successfully sent with ID ${txId}`)
}
