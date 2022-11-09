import { TatumBchSDK } from '@tatumio/bch'

export async function bchTransactionsExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Send Transaction
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
  const tx = await bchSDK.transaction.sendTransaction(
    {
      fromUTXO: [
        {
          txHash: '1ad94a0c8aee8ee0f1273a551486254fb09b9cce3ed56294c8a72b15e89ee11c',
          index: 0,
          privateKey: 'cU39Ur7xeb2rhty3QxYtuUxZj2UgKCoJtMPEqvLqsY7a4CpTyCU4',
        },
      ],
      to: [
        {
          address: 'bchtest:qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl',
          value: 0.00015,
        },
      ],
      fee: '0.00001',
      changeAddress: 'bchtest:qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65',
    },
    { testnet: true },
  )
  console.log('Transaction using private key was sent txID: ', tx)
}
