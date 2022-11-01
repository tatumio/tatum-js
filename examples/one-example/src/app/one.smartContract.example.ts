import { TransactionHash } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// https://apidoc.tatum.io/tag/Harmony#operation/OneBlockchainSmartContractInvocation
export async function oneSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateWallet
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = oneSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR SENDER ACCOUNT WITH ONE FROM https://faucet.pops.one/
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

  // your previously deployed contract address
  const contractAddress = 'one1w9ws4e2jledsfgxraec83w30hwqyes4rvkzu2r'

  // smart contract read method
  const { data } = await oneSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
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
    params: ['one1x2p0wrqkntjdmak6h53lrqgl2sxye7hfj0w4mf'],
  })
  console.log(`Smart contract data: ${data}`)

  // smart contract write method
  // make sure your address is funded
  const { txId } = (await oneSDK.smartContract.send.smartContractMethodInvocationTransaction({
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
