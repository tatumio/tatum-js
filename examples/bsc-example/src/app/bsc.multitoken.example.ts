import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR SENDER ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const multiTokenDeployed = (await bscSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'BSC',
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await bscSDK.blockchain.smartContractGetAddress('BSC', multiTokenDeployed.txId)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const multiTokenMinted = (await bscSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'BSC',
    to,
    tokenId: '123',
    amount: '1000',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  const multiTokenTransferred = (await bscSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'BSC',
    to,
    tokenId: '123',
    amount: '10',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  const multiTokenBurned = (await bscSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
