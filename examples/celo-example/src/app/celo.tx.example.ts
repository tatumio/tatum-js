import { TatumCeloSDK } from '@tatumio/celo'
import { SignatureId, TransactionHash } from '@tatumio/api-client'

const testnet = true
const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://celo.org/developers/faucet
 */
export async function celoTxExample(): Promise<void> {
  const senderAddress = '0xf2298860db19b65e3f4047c463d7646e390534cc'
  const senderPrivateKey = '0xbc37600d75bd7f3aee0846f156c97bdf4be80ea1346de6c646bc01843b968fc9'

  const receiverAddress = '0x4ddc7558029d0bca58078ed761d114dc7c7d3ab8'

  // send native transaction using private key
  // https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer
  const { txId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to: senderAddress,
    amount: '0.0001',
    feeCurrency: 'CELO',
    fromPrivateKey: senderPrivateKey,
  })) as TransactionHash

  console.log(`Native Transaction using private key was sent txID =`, txId)

  // send CUSD transaction using private key
  // https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer
  const { txId: cusdTxId } = (await celoSDK.transaction.send.celoOrCUsdSignedTransaction(
    {
      to: senderAddress,
      amount: '0.0001',
      currency: 'CUSD',
      feeCurrency: 'CELO',
      fromPrivateKey: senderPrivateKey,
    },
    undefined,
    testnet,
  )) as TransactionHash

  console.log(`CUSD Transaction using private key was sent txID =`, cusdTxId)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const { signatureId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to: receiverAddress,
    amount: '0.0001',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })) as SignatureId

  console.log(`Transaction using signatureId was sent signatureId =`, signatureId)
}
