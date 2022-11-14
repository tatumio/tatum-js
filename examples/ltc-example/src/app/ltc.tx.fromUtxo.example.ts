import { LtcTransactionUTXO } from '@tatumio/api-client'
import { TatumLtcSDK } from '@tatumio/ltc'

const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ltcFromUtxoTransactionsExample() {
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // To transfer LTC, please get familiar with UTXO model. For more information consult our documentation https://apidoc.tatum.io/tag/Litecoin#operation/LtcTransferBlockchain
  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next LTC tx
  // It is possible to have more than one transaction Ids
  // As an example, after running wallet example, use this url (http://testnet.litecointools.com/) to faucet the address generated in the example
  // The faucet transaction will take some time to be confirmed, you can validate that in https://blockexplorer.one/
  // After to be confirm, replace the bellow values
  const txHash = '1a91340d3ea25d55a4395948d8ace5f2fcc6e1871a494cdb0e0d576e65fe9fc4'
  const address = 'mhwaS2i6iAfb9zvVAFCLtAdFCDCAPSLY19'
  const index = 0

  // Private key for utxo address
  const privateKey = REPLACE_ME_WITH_PRIVATE_KEY

  // Set recipient values, amount and address where to send. Because of internal structure of LTC chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.00015
  const recipientAddress = 'mhwaS2i6iAfb9zvVAFCLtAdFCDCAPSLY19'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Transaction - prepare tx to be sent and get compiled and signed transaction that can be broadcast
  const txData = await ltcSDK.transaction.prepareSignedTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
          privateKey: privateKey,
        },
      ],
      to: [
        {
          address: recipientAddress,
          value: valueToSend,
        },
      ],
      fee: fee,
      changeAddress: changeAddress,
    } as LtcTransactionUTXO,
    options,
  )
  console.log(`Transaction prepared: ${txData}`)

  // Transaction - send to blockchain
  // This method will prepare and broadcast transaction immediately
  // https://apidoc.tatum.io/tag/Litecoin#operation/LtcTransferBlockchain
  const { txId } = await ltcSDK.transaction.sendTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
          privateKey: privateKey,
        },
      ],
      to: [
        {
          address: recipientAddress,
          value: valueToSend,
        },
      ],
      fee: fee,
      changeAddress: changeAddress,
    } as LtcTransactionUTXO,
    options,
  )
  console.log(`Transaction sent: ${txId}`)
}
