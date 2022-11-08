import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { TransactionHash } from '@tatumio/api-client'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnNftExpressExample() {
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)
  const tokenId = '1000'

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  console.log(`Fund me to transfer nft from address ${address} with private key: ${fromPrivateKey}`)

  // upload your file to the ipfs following this tutorial:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // Mint NFTs on the pre-built smart contract provided by Tatum
  const nftMinted = (await klaytnSDK.nft.mintNFT({
    chain: 'KLAY',
    to: address,
    // uploaded metadata from ipfs from tutorial above
    url: 'https://my_token_data.com',
  })) as TransactionHash

  console.log(`Minted nft with transaction ID: ${nftMinted.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const deployedTransaction = await klaytnSDK.blockchain.smartContractGetAddress('KLAY', nftMinted.txId)
  const contractAddress = deployedTransaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  const nftTransferred = (await klaytnSDK.nft.transferNFT({
    chain: 'KLAY',
    value: '1',
    to,
    tokenId,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transfered nft with transacion hash: ${nftTransferred.txId}`)

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  const nftBurned = (await klaytnSDK.nft.burnNFT({
    chain: 'KLAY',
    tokenId,
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${nftBurned.txId}`)

  // Minting NFTs with NFT Express using your own smart contract
  const mintedWithMinter = (await klaytnSDK.nft.mintNFT({
    chain: 'KLAY',
    to: address,
    url: 'https://my_token_data.com',
    tokenId,
    contractAddress,
    // minter address is Tatum address which can be found here - https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
    minter: '0xc16ae5e8c985b906935a0cadf4e24f0400531883',
  })) as TransactionHash

  console.log(`Minted nft with Tatum minter address with transaction hash: ${mintedWithMinter.txId}`)
}
