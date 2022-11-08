import { TransactionHash } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const account = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '1234'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://faucet.pops.one/

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const { txId } = (await oneSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'ONE',
    // your private key of the address that has coins
    fromPrivateKey: '0xcc3580f2176fd811c15cdbc56edb606a7852447980513a7a378fae3994303172',
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log('Deployed multitoken contract with id:', txId)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetTransaction
  const transaction = await oneSDK.blockchain.get(txId)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const multiTokenMinted = (await oneSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'ONE',
    to: account,
    tokenId,
    amount: '100',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  const multiTokenTransferred = (await oneSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'ONE',
    to,
    tokenId,
    amount: '1',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  const multiTokenBurned = (await oneSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'ONE',
    tokenId,
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account,
  })) as TransactionHash

  console.log(`Burned Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
