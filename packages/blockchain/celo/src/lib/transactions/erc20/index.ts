import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { Currency } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { Erc20Token } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  CeloTransactionConfig,
  celoUtils,
  ChainDeployErc20Celo,
  ChainMintErc20Celo,
} from '../../utils/celo.utils'

const initialize = async (
  args: Pick<ChainDeployErc20Celo, 'feeCurrency'>,
  provider?: string,
  testnet?: boolean,
) => {
  const celoProvider = celoUtils.getProvider(provider)

  return {
    celoProvider,
    network: await celoProvider.ready,
    feeCurrencyContractAddress: celoUtils.getFeeCurrency(args.feeCurrency, testnet),
    contract: new new Web3().eth.Contract(Erc20Token.abi as any), // todo contract address
  }
}

const prepareDeploySignedTransaction = async (
  body: ChainDeployErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, name, symbol, supply, address, digits, nonce, signatureId, totalCap } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await initialize(
    body,
    provider,
    testnet,
  )

  const deploy = contract.deploy({
    data: Erc20Token.bytecode,
    arguments: [
      name,
      symbol,
      address,
      digits,
      `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
      `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
    ],
  })
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }

  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

const prepareMintSignedTransaction = async (
  body: ChainMintErc20Celo,
  provider?: string,
  testnet?: boolean,
) => {
  const { fromPrivateKey, amount, to, contractAddress, nonce, signatureId } = body

  const { celoProvider, network, feeCurrencyContractAddress, contract } = await initialize(
    body,
    provider,
    testnet,
  )

  const decimals = await contract.methods.decimals().call()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16))
        .encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  const tx: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16))
      .encodeABI(),
    from,
  }
  return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
}

export const erc20 = (args: { broadcastFunction: BroadcastFunction }) => {
  return {
    prepare: {
      /**
       * Prepare a signed Celo deploy erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc20Celo, provider?: string, testnet?: boolean) =>
        prepareDeploySignedTransaction(body, provider, testnet),
      /**
       * Prepare a signed Celo mint erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc20Celo, provider?: string, testnet?: boolean) =>
        prepareMintSignedTransaction(body, provider, testnet),
    },
    send: {
      /**
       * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc20Celo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: await prepareDeploySignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
      /**
       * Send Mint Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc20Celo, provider?: string, testnet?: boolean) =>
        await args.broadcastFunction({
          txData: await prepareMintSignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
    },
  }
}
