import {
  BroadcastFunction,
  ChainTransferErc20,
  ChainMintErc20,
  ChainBurnErc20,
  ChainDeployErc20,
} from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { Erc20Token } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'

const mintSignedTransaction = async (body: ChainMintErc20, web3: EvmBasedWeb3, provider?: string) => {
  // TODO: validation
  // await validateBody(body, MintErc20)

  const client = web3.getClient(provider)

  // TODO: any type
  const contract = new client.eth.Contract(
    Erc20Token.abi as any,
    evmBasedUtils.transformAddress(body.contractAddress).trim().trim(),
  )

  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods
    .mint(
      evmBasedUtils.transformAddress(body.to).trim(),
      `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`,
    )
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    to: evmBasedUtils.transformAddress(body.contractAddress).trim(),
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
  )
}

const burnSignedTransaction = async (body: ChainBurnErc20, web3: EvmBasedWeb3, provider?: string) => {
  // TODO: validation
  // await validateBody(body, BurnErc20)

  const client = web3.getClient(provider)

  // TODO: any type
  const contract = new client.eth.Contract(
    Erc20Token.abi as any,
    evmBasedUtils.transformAddress(body.contractAddress).trim().trim(),
  )

  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())

  const data = contract.methods
    .burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`)
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    to: evmBasedUtils.transformAddress(body.contractAddress),
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
  )
}

const transferSignedTransaction = async (body: ChainTransferErc20, web3: EvmBasedWeb3, provider?: string) => {
  // TODO
  // await validateBody(body, TransferErc20)

  const client = web3.getClient(provider)

  const decimals = new BigNumber(10).pow(body.digits as number)
  // TODO
  const data = new client.eth.Contract(
    Erc20Token.abi as any,
    evmBasedUtils.transformAddress(body.contractAddress).trim().trim(),
  ).methods
    .transfer(
      evmBasedUtils.transformAddress(body.to).trim(),
      `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`,
    )
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    to: evmBasedUtils.transformAddress(body.to),
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

const deploySignedTransaction = async (body: ChainDeployErc20, web3: EvmBasedWeb3, provider?: string) => {
  // TODO: validation
  // await validateBody(body, DeployErc20)
  const { name, address, symbol, supply, digits, fromPrivateKey, nonce, signatureId, totalCap } = body

  const client = web3.getClient(provider)
  // TODO
  const contract = new client.eth.Contract(Erc20Token.abi as any)
  const deploy = contract.deploy({
    data: Erc20Token.bytecode,
    arguments: [
      name,
      symbol,
      evmBasedUtils.transformAddress(address),
      digits,
      `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
      `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
    ],
  })

  const tx: TransactionConfig = {
    from: undefined,
    data: deploy.encodeABI(),
    nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const erc20 = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3 = args.web3.getClient(provider)

      // TODO: any type
      return new web3.eth.Contract(
        Erc20Token.abi as any,
        evmBasedUtils.transformAddress(contractAddress),
      ).methods
        .decimals()
        .call()
    },
    prepare: {
      /**
       * Sign deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc20, provider?: string) =>
        deploySignedTransaction(body, args.web3, provider),
      /**
       * Sign transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferErc20, provider?: string) =>
        transferSignedTransaction(body, args.web3, provider),
      /**
       * Sign mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc20, provider?: string) =>
        mintSignedTransaction(body, args.web3, provider),
      /**
       * Sign burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc20, provider?: string) =>
        burnSignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Send deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await deploySignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await transferSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await mintSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await burnSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}
