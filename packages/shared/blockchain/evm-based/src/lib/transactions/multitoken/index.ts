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
import { MultiTokensErc1155OrCompatibleService } from '@tatumio/api-client'
import { TransactionConfig } from 'web3-core'
import { Erc1155 } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, evmBasedUtils } from '../../evm-based.utils'
import BigNumber from 'bignumber.js'

const mintMultiToken = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainMintMultiToken
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { nonce, signatureId, fee, tokenId, fromPrivateKey, data, amount } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods
      .mint(to, tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0')
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

const mintMultiTokenBatch = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainMintMultiTokenBatch
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, nonce, data, fee, amounts, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = body.to?.map((a) => addressTransformer(a.trim()))

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
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

const deployMultiToken = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainDeployMultiToken
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
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

const transferMultiToken = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainTransferMultiToken
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId, amount, data } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods
      .safeTransfer(
        to,
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

const transferMultiTokenBatch = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainTransferMultiTokenBatch
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId, amounts, data } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)
  const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods
      .safeBatchTransfer(
        to,
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

const burnMultiToken = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainBurnMultiToken
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, amount, fee, nonce, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const account = addressTransformer(body.account.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
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

const burnMultiTokenBatch = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainBurnMultiTokenBatch
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, amounts, fee, nonce, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const account = addressTransformer(body.account.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc1155.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
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

export const multiToken = ({
  web3,
  broadcastFunction,
  addressTransformer = (address: string) => address,
}: {
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
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
        mintMultiToken({ body, web3, provider, addressTransformer }),
      /**
       * Sign mint MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenBatchTransaction: async (body: ChainMintMultiTokenBatch, provider?: string) =>
        mintMultiTokenBatch({ body, web3, provider, addressTransformer }),
      /**
       * Send MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenTransaction: async (body: ChainTransferMultiToken, provider?: string) =>
        transferMultiToken({ body, web3, provider, addressTransformer }),
      /**
       * Send MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenBatchTransaction: async (body: ChainTransferMultiTokenBatch, provider?: string) =>
        transferMultiTokenBatch({ body, web3, provider, addressTransformer }),
      /**
       * Sign deploy MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployMultiTokenTransaction: async (body: ChainDeployMultiToken, provider?: string) =>
        deployMultiToken({ body, web3, provider, addressTransformer }),
      /**
       * Sign burn MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenTransaction: async (body: ChainBurnMultiToken, provider?: string) =>
        burnMultiToken({ body, web3, provider, addressTransformer }),
      /**
       * Sign burn MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenBatchTransaction: async (body: ChainBurnMultiTokenBatch, provider?: string) =>
        burnMultiTokenBatch({ body, web3, provider, addressTransformer }),
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
          return MultiTokensErc1155OrCompatibleService.mintMultiToken(body as any)
        } else {
          return broadcastFunction({
            txData: (await mintMultiToken({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.mintMultiTokenBatch(body as any)
        } else {
          return broadcastFunction({
            txData: (await mintMultiTokenBatch({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.transferMultiToken(body as any)
        } else {
          return broadcastFunction({
            txData: (await transferMultiToken({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.transferMultiTokenBatch(body as any)
        } else {
          return broadcastFunction({
            txData: (await transferMultiTokenBatch({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.deployMultiToken(body as any)
        } else {
          return broadcastFunction({
            txData: (await deployMultiToken({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.burnMultiToken(body as any)
        } else {
          return broadcastFunction({
            txData: (await burnMultiToken({ body, web3, provider, addressTransformer })) as string,
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
          return MultiTokensErc1155OrCompatibleService.burnMultiTokenBatch(body as any)
        } else {
          return broadcastFunction({
            txData: (await burnMultiTokenBatch({ body, web3, provider, addressTransformer })) as string,
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
