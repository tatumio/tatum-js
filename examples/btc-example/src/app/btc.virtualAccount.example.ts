import { TatumBtcSDK } from '@tatumio/btc'

export async function btcVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // if you don't already have a wallet, address and private key - generate them
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateWallet
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet()

  // Generate PrivateKey from Mnemonic with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateAddressPrivateKey
  const privateKey = await btcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // Generate Address from xpub with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateAddress
  const to = btcSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for BTC with specific blockchain address
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await btcSDK.ledger.account.create({
    currency: 'BTC',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // Create a deposit address for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await btcSDK.virtualAccount.depositAddress.create(virtualAccount.id, 1)
  console.log(address)

  // Fund your address here: https://testnet-faucet.mempool.co/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // If you have funds on account - you can transfer it to another bch address
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/BtcTransfer
  const result = await btcSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    address: 'xxxxxxxxx',
    amount: '1',
    keyPair: [
      {
        address: address.address,
        privateKey: privateKey,
      },
    ],
    fee: '0.1',
    attr: address.address,
  })
  console.log(result)

  // Check whether a blockchain address is assigned to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await btcSDK.virtualAccount.depositAddress.checkExists(address.address)
  console.log(account)

  //Create multiple deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddressesBatch
  const addresses = await btcSDK.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: virtualAccount.id,
        derivationKey: 0,
      },
      {
        accountId: virtualAccount.id,
        derivationKey: 1,
      },
    ],
  })
  console.log(addresses)

  // Assign a blockchain address to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await btcSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  // Get all deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await btcSDK.virtualAccount.depositAddress.getByAccount(virtualAccount.id)
  console.log(addressByAccount)

  // Remove a deposit address from a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await btcSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
}
