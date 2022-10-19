import { TransactionHash } from '@tatumio/api-client'
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscTxWithPrivateKeyExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR SENDER ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // send native transaction
  const { txId: nativeTransactionId } = await bscSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)

  // deploy erc20 (fungible token) transaction
  const { txId: erc20DeployTransactionId } = (await bscSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address,
    supply: '10000000',
    fromPrivateKey,
    digits: 18,
    totalCap: '10000000',
  })) as TransactionHash

  console.log(`Deployed erc20 token with transaction ID ${erc20DeployTransactionId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(erc20DeployTransactionId)
  const contractAddress = transaction.contractAddress as string

  const { txId: mintedErc20TransactionId } = (await bscSDK.erc20.send.mintSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Minted erc20 token/s with transaction ID ${mintedErc20TransactionId}`)

  // send erc20 (fungible token) transaction
  const { txId: erc20TokenTransactionId } = (await bscSDK.erc20.send.transferSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
    digits: 18,
  })) as TransactionHash

  console.log(`Erc20 transaction with ID ${erc20TokenTransactionId} was sent.`)

  // burn erc20 (fungible token) transaction
  const { txId: burnErc20TransactionId } = (await bscSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Burned erc20 token/s with transaction ID ${burnErc20TransactionId}`)
}

export async function bscTxWithSignatureIdExample(): Promise<void> {
  // if you don't already have wallet and address - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  // FUND YOUR SENDER ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // send native transaction
  const { txId: nativeTransactionId } = await bscSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)

  // deploy erc20 (fungible token) transaction
  const { txId: erc20DeployTransactionId } = (await bscSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address,
    supply: '10000000',
    signatureId,
    digits: 18,
    totalCap: '10000000',
  })) as TransactionHash

  console.log(`Deployed erc20 token with transaction ID ${erc20DeployTransactionId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(erc20DeployTransactionId)
  const contractAddress = transaction.contractAddress as string

  const { txId: mintedErc20TransactionId } = (await bscSDK.erc20.send.mintSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    signatureId,
  })) as TransactionHash

  console.log(`Minted erc20 token/s with transaction ID ${mintedErc20TransactionId}`)

  // send erc20 (fungible token) transaction
  const { txId: erc20TokenTransactionId } = (await bscSDK.erc20.send.transferSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    signatureId,
    digits: 18,
  })) as TransactionHash

  console.log(`Erc20 transaction with ID ${erc20TokenTransactionId} was sent.`)

  // burn erc20 (fungible token) transaction
  const { txId: burnErc20TransactionId } = (await bscSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress,
    signatureId,
  })) as TransactionHash

  console.log(`Burned erc20 token/s with transaction ID ${burnErc20TransactionId}`)
}

export async function bscNftTxExample(): Promise<void> {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  const { txId: deployNftTransactionHash } = (await bscSDK.nft.send.deploySignedTransaction({
    chain: 'BSC',
    name: 'MY_TOKEN',
    symbol: '1oido3id3',
    fromPrivateKey,
  })) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(deployNftTransactionHash)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const { txId: mintNftTransactionHash } = (await bscSDK.nft.send.mintSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to,
    contractAddress,
    url: 'https://my_token_data.com',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT mint transaction sent with transaction ID: ${mintNftTransactionHash}`)

  // Transfer an NFT
  const { txId: transferNftTransactionHash } = (await bscSDK.nft.send.transferSignedTransaction({
    chain: 'BSC',
    tokenId: '453453',
    to,
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`NFT transaction sent with transaction ID: ${transferNftTransactionHash}`)

  // Burn an NFT
  const { txId: burnNftTransactionHash } = (await bscSDK.nft.send.burnSignedTransaction({
    chain: 'BSC',
    tokenId: '45343653',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`NFT burn transaction sent with transaction ID: ${burnNftTransactionHash}`)
}

export async function bscMultiTokenTxExample(): Promise<void> {
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  const { txId: deployMultiTokenTransactionHash } = (await bscSDK.multiToken.send.deployMultiTokenTransaction(
    {
      chain: 'BSC',
      fromPrivateKey,
      uri: 'example.com',
    },
  )) as TransactionHash

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetTransaction
  const transaction = await bscSDK.blockchain.get(deployMultiTokenTransactionHash)
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  const { txId: mintMultiTokenTransactionHash } = (await bscSDK.multiToken.send.mintMultiTokenTransaction({
    chain: 'BSC',
    to,
    tokenId: '123',
    amount: '1000',
    fromPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with transaction ID: ${mintMultiTokenTransactionHash}`)

  const { txId: transferMultiTokenTransactionHash } =
    (await bscSDK.multiToken.send.transferMultiTokenTransaction({
      chain: 'BSC',
      to,
      tokenId: '123',
      amount: '10',
      fromPrivateKey,
      contractAddress,
    })) as TransactionHash

  console.log(`Sent Multi Token with transaction ID: ${transferMultiTokenTransactionHash}`)

  const { txId: burnMultiTokenTransactionHash } = (await bscSDK.multiToken.send.burnMultiTokenTransaction({
    chain: 'BSC',
    tokenId: '123',
    amount: '1',
    fromPrivateKey,
    contractAddress,
    account: to,
  })) as TransactionHash
  console.log(`Sent Multi Token with transaction ID: ${burnMultiTokenTransactionHash}`)
}

export async function gasPumpTxExample(): Promise<void> {
  const { txId: transferCustodialTransactionHash } = await bscSDK.custodial.send.transferFromCustodialWallet({
    chain: 'BSC',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
    contractType: 0,
    custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    recipient: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
    tokenId: '20',
  })

  console.log(`Sent transaction with ID: ${transferCustodialTransactionHash}`)

  const { txId: approveFromCustodialTransactionHash } =
    await bscSDK.custodial.send.approveFromCustodialWallet({
      chain: 'BSC',
      signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
      contractType: 0,
      custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
      tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
      spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
      amount: '1',
    })

  console.log(`Sent transaction with ID: ${approveFromCustodialTransactionHash}`)
}
