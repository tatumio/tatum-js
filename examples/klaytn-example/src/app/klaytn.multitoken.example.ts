import { TransactionHash } from '@tatumio/api-client'
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnMultiTokenExample(): Promise<void> {
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '123'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  const multiTokenDeployed = (await klaytnSDK.multiToken.send.deployMultiTokenTransaction({
    chain: 'KLAY',
    // your private key of the address that has coins
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log('Deployed multi token transaction: ', multiTokenDeployed)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await klaytnSDK.blockchain.smartContractGetAddress('KLAY', multiTokenDeployed.txId)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const multiTokenMinted = (await klaytnSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'KLAY',
    to,
    tokenId,
    amount: '1000',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${multiTokenMinted.txId}`)

  const multiTokenTransferred = (await klaytnSDK.multiToken.send.transferMultiTokenTransaction({
    chain: 'KLAY',
    to,
    tokenId,
    amount: '10',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenTransferred.txId}`)

  const multiTokenBurned = (await klaytnSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'KLAY',
    tokenId,
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
  })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${multiTokenBurned.txId}`)
}
