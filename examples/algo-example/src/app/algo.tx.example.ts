import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function algoTxExample() {
  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const privateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // Send Algos to an Algorand account using private key
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const sentAlgoTransaction = await algoSDK.transaction.send.signedTransaction({
    amount: '1',
    privateKey,
    address: to,
    account: address,
    fee: '0.001',
  })
  console.log(`Transaction using private key with ID ${sentAlgoTransaction.txId} was sent`)

  const signatureId = '26d3883e-4e17-48b3-a0ee-09a3e484ac83'
  // Send Algos to an Algorand account using signatureId
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const sentAlgoSignedTransactionKms = await algoSDK.transaction.send.signedTransaction({
    amount: '10',
    signatureId,
    address: to,
    account: address,
    from: address,
    fee: '0.001',
  })
  console.log(`Transaction with ID ${sentAlgoSignedTransactionKms.txId} was sent`)
}
