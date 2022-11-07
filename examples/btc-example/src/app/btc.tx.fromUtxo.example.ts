import { TatumBtcSDK } from '@tatumio/btc'
import { BtcTransactionFromUTXO } from '@tatumio/api-client'

const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function btcFromUtxoTransactionsExample() {
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next BTC tx
  // It is possible to have more than one
  const txHash = '1a91340d3ea25d55a4395948d8ace5f2fcc6e1871a494cdb0e0d576e65fe9fc4'
  const address = 'tb1qldrj9c68py7eyn6a3m722vn8fpk3lueza2zxff'
  const index = 0

  // Private key for utxo address
  const privateKey = REPLACE_ME_WITH_PRIVATE_KEY

  // Set recipient values, amount and address where to send. Because of internal structure of BTC chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.00015
  const recipientAddress = 'tb1qzkfcm9sapgxptjd5l7w9s88v8q3994srs8vv7z'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  // Transaction - prepare tx to be sent and get compiled and signed transaction that can be broadcast
  const txData = await btcSDK.transaction.prepareSignedTransaction(
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
    } as BtcTransactionFromUTXO,
    { testnet: true },
  )

  // Transaction - send to blockchain
  // This method will prepare and broadcast transaction immediately
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BtcTransfer
  const { txId } = await btcSDK.transaction.sendTransaction(
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
    } as BtcTransactionFromUTXO,
    { testnet: true },
  )
}
