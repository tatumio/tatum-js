import { TatumFlowSDK, TransactionHashWithAddress } from '@tatumio/flow'
import { SignatureId, TransactionHash } from '@tatumio/api-client'

const flowSDK = TatumFlowSDK({
  apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
  testnet: true,
})

export const flowTxExample = async () => {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet
  const { xpub } = await flowSDK.wallet.generateWallet()

  // Generate public key
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKey
  const receiverPublicKey = flowSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`RECEIVER Public Key: ${receiverPublicKey}`)

  // Create SENDER account using Faucet to fund you address - https://testnet-faucet.onflow.org/

  const senderAccount = '<PUT SENDER ACCOUNT HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // Create receiver account on the blockchain using SENDER funds
  //https://apidoc.tatum.io/tag/Flow#operation/FlowCreateAddressFromPubKey
  const { address: receiverAccount } = (await flowSDK.account.send.createSignedTransaction({
    account: senderAccount,
    privateKey: senderPrivateKey,
    publicKey: receiverPublicKey,
  })) as TransactionHashWithAddress
  console.log(`RECEIVER Account: ${receiverAccount}`)

  // Send FLOW transaction using private key
  // https://apidoc.tatum.io/tag/Flow#operation/FlowTransferBlockchain
  const { txId } = (await flowSDK.transaction.send.transferSignedTransaction({
    account: senderAccount,
    privateKey: senderPrivateKey,
    to: receiverAccount,
    currency: 'FLOW',
    amount: '1',
  })) as TransactionHash
  console.log(`Transaction using private key with ID ${txId} was sent`)

  // Send FLOW transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { signatureId: txSignatureId } = (await flowSDK.transaction.send.transferSignedTransaction({
    account: senderAccount,
    signatureId,
    to: receiverAccount,
    currency: 'FLOW',
    amount: '1',
  })) as SignatureId
  console.log(`Transaction with signature id ${txSignatureId} was sent`)
}

export const flowCustomTxExample = async () => {
  const senderAccount = '<PUT SENDER ACCOUNT HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // Send custom transaction using private key
  // https://apidoc.tatum.io/tag/Flow#operation/FlowTransferCustomBlockchain
  const { txId } = (await flowSDK.transaction.send.customSignedTransaction({
    account: senderAccount,
    privateKey: senderPrivateKey,
    transaction: 'transaction() {prepare(acct: AuthAccount) {}execute { log("Hello")}}',
    args: [],
  })) as TransactionHash
  console.log(`Transaction using private key with ID ${txId} was sent`)

  // Send custom transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { signatureId: txSignatureId } = (await flowSDK.transaction.send.customSignedTransaction({
    account: senderAccount,
    signatureId,
    transaction: 'transaction() {prepare(acct: AuthAccount) {}execute { log("Hello")}}',
    args: [],
  })) as SignatureId
  console.log(`Transaction with signature id ${txSignatureId} was sent`)
}
