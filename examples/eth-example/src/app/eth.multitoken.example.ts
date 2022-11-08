import { TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const to = ethSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://faucet.sepolia.dev/

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const multiTokenDeployed = (await ethSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'ETH',
    // your private key of the address that has coins
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await ethSDK.blockchain.smartContractGetAddress(
    'ETH',
    // replace with your deployed transaction hash
    multiTokenDeployed.txId,
  )
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/MintMultiToken
  const multiTokenMinted = (await ethSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'ETH',
    to,
    tokenId: '123',
    amount: '1000',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/TransferMultiToken
  const multiTokenTransferred = (await ethSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'ETH',
    to,
    tokenId: '123',
    amount: '10',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/BurnMultiToken
  const multiTokenBurned = (await ethSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'ETH',
    tokenId: '123',
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
  })) as TransactionHash

  console.log(`Burned Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
