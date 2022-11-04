import { TatumCeloSDK } from '@tatumio/celo'
import { TransactionHash } from '@tatumio/api-client'
import { chain } from 'lodash'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoErc20Example() {
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // Fund your address here: https://celo.org/developers/faucet

  // deploy erc20 (fungible token) transaction
  const erc20Deployed = (await celoSDK.erc20.send.deploySignedTransaction({
    chain: 'CELO',
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address,
    supply: '10000000',
    fromPrivateKey,
    digits: 18,
    totalCap: '10000000',
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Deployed erc20 token with transaction ID ${erc20Deployed.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await celoSDK.blockchain.smartContractGetAddress('CELO', erc20Deployed.txId)
  const contractAddress = transaction.contractAddress as string

  // burn erc20 (fungible token) transaction
  const erc20Burned = (await celoSDK.erc20.send.burnSignedTransaction({
    chain: 'CELO',
    amount: '10',
    contractAddress,
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Burned erc20 token/s with transaction ID ${erc20Burned.txId}`)

  const erc20Minted = (await celoSDK.erc20.send.mintSignedTransaction({
    chain: 'CELO',
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Minted erc20 token/s with transaction ID ${erc20Minted.txId}`)

  // send erc20 (fungible token) transaction
  const erc20Transffered = (await celoSDK.erc20.send.transferSignedTransaction({
    chain: 'CELO',
    to,
    amount: '10',
    contractAddress,
    fromPrivateKey,
    digits: 18,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Erc20 transaction with transaction ID ${erc20Transffered.txId} was sent.`)
}
