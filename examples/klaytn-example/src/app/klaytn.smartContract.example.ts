import { TransactionHash } from '@tatumio/api-client'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnBlockchainSmartContractInvocation
export async function klaytnSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  // /https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = klaytnSDK.wallet.generateAddressFromPrivateKey(fromPrivateKey)
  const to = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)

  // You can fund your address here: https://baobab.wallet.klaytn.foundation/faucet
  console.log(`Fund address: ${address}`)
  console.log(`Private key for ${address}: ${fromPrivateKey}`)

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

  // smart contract write method
  // make sure your address is funded
  const { txId } = (await klaytnSDK.smartContract.send.smartContractMethodInvocationTransaction({
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
