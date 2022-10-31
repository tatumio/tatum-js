import { TatumOneSDK } from '@tatumio/one'
import { TransactionHash } from '@tatumio/api-client'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneErc20Example() {
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://faucet.pops.one/

  // deploy erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const erc20Deployed = (await oneSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address,
    supply: '10000000',
    fromPrivateKey,
    digits: 18,
    totalCap: '10000000',
  })) as TransactionHash

  console.log(`Deployed erc20 token with transaction ID ${erc20Deployed.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await oneSDK.blockchain.smartContractGetAddress('ONE', erc20Deployed.txId)
  const contractAddress = transaction.contractAddress as string

  // mint erc20 (fungible token)
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Mint
  const erc20Minted = (await oneSDK.erc20.send.mintSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Minted erc20 token/s with transaction ID ${erc20Minted.txId}`)

  // send erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const erc20Transffered = (await oneSDK.erc20.send.transferSignedTransaction({
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
    digits: 18,
  })) as TransactionHash

  console.log(`Erc20 transaction with transaction ID ${erc20Transffered.txId} was sent.`)

  // burn erc20 (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const erc20Burned = (await oneSDK.erc20.send.burnSignedTransaction({
    amount: '10',
    contractAddress,
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Burned erc20 token/s with transaction ID ${erc20Burned.txId}`)
}
