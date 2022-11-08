import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

//https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscBlockchainSmartContractInvocation
export async function bscSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const address = bscSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://testnet.binance.org/faucet-smart
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

  // your previously deployed contract address
  const contractAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'

  // smart contract read method
  const { data } = await bscSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
  const { txId } = (await bscSDK.smartContract.send.smartContractMethodInvocationTransaction({
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
