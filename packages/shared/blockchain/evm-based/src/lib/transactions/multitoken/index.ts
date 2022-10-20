import {
  BroadcastFunction,
  ChainBurnMultiToken,
  ChainBurnMultiTokenBatch,
  ChainDeployMultiToken,
  ChainMintMultiToken,
  ChainMintMultiTokenBatch,
  ChainTransferMultiToken,
  ChainTransferMultiTokenBatch,
} from '@tatumio/shared-blockchain-abstract'
import { ApiServices, MultiTokensErc1155OrCompatibleService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { Erc1155 } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'
import BigNumber from 'bignumber.js'

const mintMultiToken = async (body: ChainMintMultiToken, web3: EvmBasedWeb3, provider?: string) => {
  const { contractAddress, nonce, signatureId, fee, to, tokenId, fromPrivateKey, data, amount } = body
  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0')
      .encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const mintMultiTokenBatch = async (body: ChainMintMultiTokenBatch, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amounts, signatureId } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mintBatch(to, tokenId, amts, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const deployMultiToken = async (body: ChainDeployMultiToken, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, fee, uri, nonce, signatureId } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any)

  const deploy = contract.deploy({
    arguments: [uri, body.publicMint ?? false],
    data: Erc1155.bytecode,
  } as any)

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const transferMultiToken = async (body: ChainTransferMultiToken, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amount, data } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .safeTransfer(
        to.trim(),
        tokenId,
        // TODO: remove ! when type will be fixed
        `0x${new BigNumber(amount!).toString(16)}`,
        data ? data : '0x0',
      )
      .encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const transferMultiTokenBatch = async (
  body: ChainTransferMultiTokenBatch,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amounts, data } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)
  const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .safeBatchTransfer(
        to.trim(),
        tokenId.map((token) => token.trim()),
        amts,
        data ? data : '0x0',
      )
      .encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const burnMultiToken = async (body: ChainBurnMultiToken, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, account, tokenId, amount, fee, contractAddress, nonce, signatureId } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const burnMultiTokenBatch = async (body: ChainBurnMultiTokenBatch, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, account, tokenId, amounts, fee, contractAddress, nonce, signatureId } = body

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

export const multiToken = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Sign mint MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenTransaction: async (body: ChainMintMultiToken, provider?: string) =>
        mintMultiToken(body, args.web3, provider),
      /**
       * Sign mint MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenBatchTransaction: async (body: ChainMintMultiTokenBatch, provider?: string) =>
        mintMultiTokenBatch(body, args.web3, provider),
      /**
       * Send MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenTransaction: async (body: ChainTransferMultiToken, provider?: string) =>
        transferMultiToken(body, args.web3, provider),
      /**
       * Send MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenBatchTransaction: async (body: ChainTransferMultiTokenBatch, provider?: string) =>
        transferMultiTokenBatch(body, args.web3, provider),
      /**
       * Sign deploy MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployMultiTokenTransaction: async (body: ChainDeployMultiToken, provider?: string) =>
        deployMultiToken(body, args.web3, provider),
      /**
       * Sign burn MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenTransaction: async (body: ChainBurnMultiToken, provider?: string) =>
        burnMultiToken(body, args.web3, provider),
      /**
       * Sign burn MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenBatchTransaction: async (body: ChainBurnMultiTokenBatch, provider?: string) =>
        burnMultiTokenBatch(body, args.web3, provider),
    },
    send: {
      /**
       * Send MultiToken mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenTransaction: async (body: ChainMintMultiToken, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.mintMultiToken(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await mintMultiToken(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       * Send MultiToken mint batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenBatchTransaction: async (body: ChainMintMultiTokenBatch, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.mintMultiTokenBatch(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await mintMultiTokenBatch(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       * Send MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenTransaction: async (body: ChainTransferMultiToken, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.transferMultiToken(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await transferMultiToken(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       * Send MultiToken batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenBatchTransaction: async (body: ChainTransferMultiTokenBatch, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.transferMultiTokenBatch(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await transferMultiTokenBatch(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       ** Send MultiToken deploy transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployMultiTokenTransaction: async (body: ChainDeployMultiToken, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.deployMultiToken(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await deployMultiToken(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       * Send MultiToken butn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenTransaction: async (body: ChainBurnMultiToken, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.burnMultiToken(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await burnMultiToken(body, args.web3, provider)) as string,
          })
        }
      },
      /**
       * Send MultiToken butn batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenBatchTransaction: async (body: ChainBurnMultiTokenBatch, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return ApiServices.multiToken.burnMultiTokenBatch(body as any)
        } else {
          return args.broadcastFunction({
            txData: (await burnMultiTokenBatch(body, args.web3, provider)) as string,
          })
        }
      },
    },

    getTransactionByAddress: MultiTokensErc1155OrCompatibleService.multiTokenGetTransactionByAddress,
    getTransaction: MultiTokensErc1155OrCompatibleService.multiTokenGetTransaction,
    getAddressBalance: MultiTokensErc1155OrCompatibleService.multiTokenGetAddressBalance,
    getBalance: MultiTokensErc1155OrCompatibleService.multiTokenGetBalance,
    getBalanceBatch: MultiTokensErc1155OrCompatibleService.multiTokenGetBalanceBatch,
    getMetadata: MultiTokensErc1155OrCompatibleService.multiTokenGetMetadata,
  }
}
