import { TransactionHash } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = 'replaceMeWithTokenId'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://celo.org/developers/faucet

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const multiTokenDeployed = (await celoSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'CELO',
    // your private key of the address that has coins
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Deployed multi token contract with tx id: ${multiTokenDeployed.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await celoSDK.blockchain.smartContractGetAddress('CELO', multiTokenDeployed.txId)

  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed MultiToken smart contract with contract address: ${contractAddress}`)

  const multiTokenMinted = (await celoSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'CELO',
    to,
    tokenId,
    amount: '1000',
    fromPrivateKey,
    contractAddress,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  const multiTokenTransferred = (await celoSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'CELO',
    to,
    tokenId,
    amount: '10',
    fromPrivateKey,
    contractAddress,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  const multiTokenBurned = (await celoSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'CELO',
    tokenId,
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
