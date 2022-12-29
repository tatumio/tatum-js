import {
  ApproveErc20KMS,
  ChainBurnErc20KMS,
  ChainDeployErc20KMS,
  ChainMintErc20KMS,
  ChainTransferEthErc20KMS,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import {
  BroadcastFunction,
  ChainApproveErc20,
  ChainBurnErc20,
  ChainSdkDeployErc20,
  ChainMintErc20,
  ChainTransferErc20,
} from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { Erc20Token } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, AddressTransformerDefault, evmBasedUtils } from '../../evm-based.utils'
import { blockchainHelper, EvmBasedBlockchain } from '@tatumio/shared-core'

const mintSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainMintErc20
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  // TODO: validation
  // await validateBody(body, MintErc20)

  const client = web3.getClient(provider, body.fromPrivateKey)

  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const contract = new client.eth.Contract(Erc20Token.abi as any, contractAddress)

  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods
    .mint(to, `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`)
    .encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    // @ts-ignore
    body.fee?.gasLimit, // @TODO openapi bug
    // @ts-ignore
    body.fee?.gasPrice, // @TODO openapi bug
    provider,
  )
}

const burnSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainBurnErc20
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  // TODO: validation
  // await validateBody(body, BurnErc20)

  const client = web3.getClient(provider, body.fromPrivateKey)

  const contractAddress = addressTransformer(body.contractAddress.trim())

  // TODO: any type
  const contract = new client.eth.Contract(Erc20Token.abi as any, contractAddress)

  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())

  const data = contract.methods
    .burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`)
    .encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data,
    nonce: body.nonce,
  }

  if (body.fromPrivateKey) {
    await evmBasedUtils.validateErc20Balance(client, body.fromPrivateKey, contractAddress, tx)
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
    provider,
  )
}

const transferSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainTransferErc20
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  // TODO
  // await validateBody(body, TransferErc20)

  const client = web3.getClient(provider, body.fromPrivateKey)

  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const decimals = new BigNumber(10).pow(body.digits as number)
  // TODO
  const data = new client.eth.Contract(Erc20Token.abi as any, contractAddress).methods
    .transfer(to, `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`)
    .encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
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
    provider,
  )
}

const deploySignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainSdkDeployErc20
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  // TODO: validation
  // await validateBody(body, DeployErc20)
  const { name, symbol, supply, digits, fromPrivateKey, nonce, signatureId, totalCap } = body

  const client = web3.getClient(provider, fromPrivateKey)

  const address = addressTransformer(body.address.trim())

  // TODO
  const contract = new client.eth.Contract(Erc20Token.abi as any)
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
    provider,
  )
}

const decimals = async (contractAddress: string, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  return new client.eth.Contract(Erc20Token.abi as any, contractAddress).methods.decimals().call()
}

const approveSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainApproveErc20
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const amount = new BigNumber(body.amount)
    .multipliedBy(new BigNumber(10).pow(await decimals(body.contractAddress, web3, provider)))
    .toString(16)

  const contractAddress = addressTransformer(body.contractAddress.trim())
  const spender = addressTransformer(body.spender.trim())

  const params = [spender, `0x${amount}`]

  const client = web3.getClient(provider, body.fromPrivateKey)

  // TODO remove any type
  const data = new client.eth.Contract(Erc20Token.abi as any, contractAddress).methods
    .approve(...params)
    .encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    data,
    to: contractAddress,
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
    provider,
  )
}

export const erc20 = ({
  blockchain,
  web3,
  broadcastFunction,
  addressTransformer = AddressTransformerDefault,
}: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const chain = blockchainHelper.getDefaultCurrencyByBlockchain(blockchain)

  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3Client = web3.getClient(provider)

      // TODO: any type
      return new web3Client.eth.Contract(Erc20Token.abi as any, addressTransformer(contractAddress)).methods
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
      deploySignedTransaction: async (body: ChainSdkDeployErc20, provider?: string) =>
        deploySignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferErc20, provider?: string) =>
        transferSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc20, provider?: string) =>
        mintSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc20, provider?: string) =>
        burnSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Prepare approve ERC20 signed transaction.
       * @param body body of the approve operation
       * @param provider optional Web3 provider
       */
      approveSignedTransaction: async (body: ChainApproveErc20, provider?: string) =>
        approveSignedTransaction({ body, web3, provider, addressTransformer }),
    },
    send: {
      /**
       * Send deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainSdkDeployErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Deploy({
            ...body,
            chain,
          } as ChainDeployErc20KMS)
        } else {
          return broadcastFunction({
            txData: await deploySignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Send transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Transfer({
            ...body,
            chain,
          } as ChainTransferEthErc20KMS)
        } else {
          return broadcastFunction({
            txData: await transferSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },

      /**
       * Send mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Mint({
            ...body,
            chain,
          } as ChainMintErc20KMS)
        } else {
          return broadcastFunction({
            txData: await mintSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Send burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Burn({
            ...body,
            chain,
          } as ChainBurnErc20KMS)
        } else {
          return broadcastFunction({
            txData: await burnSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Send approve erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      approveSignedTransaction: async (body: ChainApproveErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Approve({
            ...body,
            chain,
          } as ApproveErc20KMS)
        } else {
          return broadcastFunction({
            txData: await approveSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
    },
  }
}
