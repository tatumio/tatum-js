import { TransactionHash } from '@tatumio/api-client'
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://faucet.pops.one/

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const { txId } = (await oneSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'ONE',
    // your private key of the address that has coins
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await oneSDK.blockchain.smartContractGetAddress(
    'ONE',
    // replace with your deployed transaction hash
    txId,
  )
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const multiTokenMinted = (await oneSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'ONE',
    to,
    tokenId: '123',
    amount: '1000',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  const multiTokenTransferred = (await oneSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'ONE',
    to,
    tokenId: '123',
    amount: '10',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  const multiTokenBurned = (await oneSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'ONE',
    tokenId: '123',
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
