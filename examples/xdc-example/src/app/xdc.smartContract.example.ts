import { TransactionHash } from '@tatumio/api-client'
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/XinFin#operation/XdcBlockchainSmartContractInvocation
 */

export async function xdcSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddressPrivateKey
  const fromPrivateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = xdcSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = xdcSDK.wallet.generateAddressFromXPub(xpub, 1)

  // You can fund your address here: https://faucet.apothem.network/
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

  // your previously deployed contract address
  const contractAddress = 'xdc2f8c49490e5662f1b4957c0bc46e8b25b2787cd8'

  // smart contract read method
  const { data } = await xdcSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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

  // smart contract write method
  // make sure your address is funded
  const { txId } = (await xdcSDK.smartContract.send.smartContractMethodInvocationTransaction({
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
