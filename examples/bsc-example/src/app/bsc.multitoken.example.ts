import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet(undefined, { testnet: true })
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://testnet.binance.org/faucet-smart

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const multiTokenDeployed = (await bscSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'BSC',
    // your private key of the address that has coins
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await bscSDK.blockchain.smartContractGetAddress(
    'BSC',
    // replace with your deployed transaction hash
    '0xb9e87148c399efedea0f459a421c3cac56b3e2ab31b2bca83124f22fd4a8cfe6',
  )
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // Please note that minted tokens might not appear immediately on the blockchain so in order to execute
  // all examples at once you should set some timeout between the calls or execute examples separately

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
