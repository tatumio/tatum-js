import {
  BroadcastFunction,
  ChainAddMinterErc721,
  ChainBurnErc721,
  ChainDeployErc721,
  ChainMintErc721,
  ChainMintMultipleNft,
  ChainTransferErc721,
} from '@tatumio/shared-blockchain-abstract'
import { TransactionConfig } from 'web3-core'
import { Erc721_Provenance } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, evmBasedUtils } from '../../evm-based.utils'
import BigNumber from 'bignumber.js'
import {
  BurnNftKMS,
  DeployNftKMS,
  MintMultipleNftKMS,
  MintNftKMS,
  MintNftMinter,
  NftErc721OrCompatibleService,
  TransactionHash,
  TransferNftKMS,
} from '@tatumio/api-client'
import { Erc721Token_General } from '../../contracts/erc721General'
import { Erc721Token_Cashback } from '../../contracts/erc721Cashback'
import { blockchainHelper, EvmBasedBlockchain } from '@tatumio/shared-core'
import { EvmBasedSdkError } from '../../evm-based.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

const mintSignedTransactionMinter = async (body: MintNftMinter) => {
  const request = await NftErc721OrCompatibleService.nftMintErc721(body)
  if (request) return (request as TransactionHash).txId
  else throw new Error('Unable to mint NFT with a minter.')
}

const mintSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainMintErc721
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { nonce, signatureId, fee, tokenId, url, fromPrivateKey } = body
  const contractAddress = addressTransformer(body.contractAddress.trim())
  const to = addressTransformer(body.to.trim())

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)

  const alreadyMinted = await evmBasedUtils.alreadyMinted(contract, tokenId)
  if (alreadyMinted) {
    throw new EvmBasedSdkError({ code: SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_ALREADY_MINTED })
  }

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress,
      data: contract.methods.mintWithTokenURI(to, tokenId, url).encodeABI(),
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
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
  throw new Error('Contract address should not be empty')
}

const mintMultipleSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainMintMultipleNft
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, url, nonce, signatureId, fee } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const to = body.to?.map((a) => addressTransformer(a?.trim()))

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: undefined,
    to: contractAddress,
    data: contract.methods.mintMultiple(to, tokenId, url).encodeABI(),
    nonce,
  }
  return evmBasedUtils.prepareSignedTransactionAbstraction(
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

const burnSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainBurnErc721
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
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

const addMinterSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainAddMinterErc721
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, fee, nonce, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const minter = addressTransformer(body.minter?.trim())

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_General.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods
      .grantRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', minter)
      .encodeABI(),
    nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
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

const transferSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainTransferErc721
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const to = addressTransformer(body.to?.trim())

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)
  const dataBytes = ''
  const tokenData = contract.methods.safeTransfer(to, tokenId).encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: tokenData,
    nonce,
    value: undefined,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
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

const deploySignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainDeployErc721
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, publicMint } = body

  const client = await web3.getClient(provider, fromPrivateKey)

  const abi = Erc721Token_General.abi
  const deployData = Erc721Token_General.bytecode

  const contract = new client.eth.Contract(abi as any)

  const deploy = contract.deploy({
    arguments: [name, symbol, publicMint ?? false],
    data: deployData,
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }
  return evmBasedUtils.prepareSignedTransactionAbstraction(
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

const isUsingNftMinter = (body: object): body is MintNftMinter => {
  return 'minter' in body
}

export const erc721 = ({
  blockchain,
  web3,
  broadcastFunction,
  addressTransformer = (address: string) => address,
}: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const chain = blockchainHelper.getDefaultCurrencyByBlockchain(blockchain)

  return {
    prepare: {
      /**
       * Sign mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc721, provider?: string) =>
        mintSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) =>
        mintMultipleSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc721, provider?: string) =>
        burnSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferErc721, provider?: string) =>
        transferSignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc721, provider?: string) =>
        deploySignedTransaction({ body, web3, provider, addressTransformer }),
      /**
       * Sign add minter to ERC 721 with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      addMinterSignedTransaction: (body: ChainAddMinterErc721, provider: string) =>
        addMinterSignedTransaction({ body, web3, provider, addressTransformer }),
    },
    send: {
      /**
       * Send BEP721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc721 | MintNftMinter, provider?: string) => {
        if (isUsingNftMinter(body)) {
          return mintSignedTransactionMinter(body)
        } else if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintErc721({
            ...body,
            chain,
          } as MintNftKMS)
        } else {
          return broadcastFunction({
            txData: await mintSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },

      /**
       * Send BEP721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintMultipleErc721({
            ...body,
            chain,
          } as MintMultipleNftKMS)
        } else {
          return broadcastFunction({
            txData: await mintMultipleSignedTransaction({
              body,
              web3,
              provider,
              addressTransformer,
            }),
          })
        }
      },
      /**
       * Send BEP721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the  Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc721, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftBurnErc721({
            ...body,
            chain,
          } as BurnNftKMS)
        } else {
          return broadcastFunction({
            txData: await burnSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },

      /**
       * Send BEP721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferErc721, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftTransferErc721({
            ...body,
            chain,
          } as TransferNftKMS)
        } else {
          return broadcastFunction({
            txData: await transferSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Send BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc721, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftDeployErc721({
            ...body,
            chain,
          } as DeployNftKMS)
        } else {
          return broadcastFunction({
            txData: await deploySignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
    },
  }
}
