import { DogeTransactionUTXO } from '@tatumio/api-client'
import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeTransactionsExample() {
  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next DOGE tx
  // It is possible to have more than one
  const txHash = 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7'
  const address = 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7'
  const value = '60'
  const index = 1

  // Private key for utxo address
  const privateKey = 'QTEcWfGqd2RbCRuAvoXAz99D8RwENfy8j6X92vPnUKR7yL1kXouk'

  // Set recipient values, amount and address where to send. Because of internal structure of DOGE chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.00015
  const recipientAddress = 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  // Transaction - prepare tx to be sent and get compiled and signed transaction that can be broadcast
  const txData = await dogeSDK.transaction.prepareSignedTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
          privateKey: privateKey,
          address: address,
          value: value,
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
    } as DogeTransactionUTXO,
    { testnet: true },
  )

  // Transaction - send to blockchain
  // This method will prepare and broadcast transaction immediately
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeTransferBlockchain
  const { txId } = await dogeSDK.transaction.sendTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
          privateKey: privateKey,
          address: address,
          value: value,
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
    } as DogeTransactionUTXO,
    { testnet: true },
  )
}
