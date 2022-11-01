import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency, TransactionHash } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function polygonMultitokenExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet()
  // Generate private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const fromPrivateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // Generate source and destination address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const to = polygonSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // deploy multitoken (ERC1155) smart contract
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/DeployMultiToken
  const deployed = (await polygonSDK.multiToken.send.deployMultiTokenTransaction({
    chain: Currency.MATIC,
    fromPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash
  console.log(`Deployed 1155 token with transaction ID ${deployed.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await polygonSDK.blockchain.smartContractGetAddress(Currency.MATIC, deployed.txId)
  const contractAddress = transaction.contractAddress as string

  const tokenId = '123'

  // mint multitoken (ERC1155) token
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/MintMultiToken
  const minted = (await polygonSDK.multiToken.send.mintMultiTokenTransaction({
    chain: Currency.MATIC,
    tokenId,
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Minted 1155 token with transaction ID ${minted.txId}`)

  // send multitoken (ERC1155) token
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/TransferMultiToken
  const transferred = (await polygonSDK.multiToken.send.transferMultiTokenTransaction({
    chain: Currency.MATIC,
    to,
    tokenId,
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Transfer 1155 token with transaction ID ${transferred.txId} was sent.`)

  // burn multitoken (ERC1155) token
  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/BurnMultiToken
  const burned = (await polygonSDK.multiToken.send.burnMultiTokenTransaction({
    chain: Currency.MATIC,
    tokenId,
    account: to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash
  console.log(`Burned 1155 token with transaction ID ${burned.txId}`)
}
