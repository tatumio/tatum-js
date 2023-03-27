import { AdaTransactionFromAddress, AdaTransactionFromUTXO } from '@tatumio/api-client'
import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '03fea4e2-9c66-453d-b760-e0318182ae74' })

export async function cardanoTransactionExample() {
  // To transfer cardano, please get familiar with UTXO model. For more information consult our documentation https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoTransferBlockchain
  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next cardano tx
  // It is possible to have more than one transaction Ids
  // As an example, after running wallet example, use this url (https://testnet-faucet.com/cardano-testnet/) to faucet the address generated in the example
  // The faucet transaction will take some time to be confirmed, you can validate that in https://blockexplorer.one/
  // After to be confirm, replace the bellow values
  const txHash = '1a80caf9d71a99e1ed6f41faa97e51c8a5635a7df681fc45dabdd1e14c9cbcd8'
  const address = 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5'
  const value = 10
  const index = 1

  // Private key for utxo address
  const privateKey = '8873d5e84af86978f03b63d9ffc9c6f940bd8501d32e91980c904e8d81c305507dc95992faa5aefccb263b28b411eda2dde7882d922742663804a69d78182e34'

  // Set recipient values, amount and address where to send. Because of internal structure of cardano chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.0015
  const recipientAddress = 'addr_test1vzfp68vn36ze5yz7x7evracmasuptjmz99qk4j23gun3pcqhlevq5'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Transaction - send to blockchain
  // This method will prepare and broadcast transaction immediately
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoTransferBlockchain
  const { txId } = await cardanoSDK.transaction.sendTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
          privateKey: privateKey,
          address: address,
          amount: value,
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
    } as AdaTransactionFromUTXO,
    options,
  )
  console.log(`Sent tx from UTXO with hash ${txId}`)

  const { txId: txIdAddress } = await cardanoSDK.transaction.sendTransaction(
    {
      fromAddress: [
        {
          privateKey: privateKey,
          address: address,
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
    } as AdaTransactionFromAddress,
    options,
  )
  console.log(`Sent tx from address with hash ${txIdAddress}`)
}
