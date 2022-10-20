import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

//https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscBlockchainSmartContractInvocation
export async function bscSmartContractExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic } = await bscSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // FUND YOUR SENDER ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // any previously deployed contract address
  const contractAddress = '0x687422eEA2cB73B5d3e242bA5456b782919AFc85'

  // smart contract read method
  const { data } = await bscSDK.smartContract.send.smartContractReadMethodInvocationTransaction({
    contractAddress,
    methodName: 'transfer',
    methodABI: {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    params: ['0x632'],
  })

  console.log(`Smart contract data: ${data}`)

  // smart contract write method
  const { txId } = (await bscSDK.smartContract.send.smartContractMethodInvocationTransaction({
    contractAddress,
    methodName: 'transfer',
    methodABI: {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    params: ['0x632'],
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transaction successfully sent with ID ${txId}`)
}
