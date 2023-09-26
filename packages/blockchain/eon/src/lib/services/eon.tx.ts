import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import {
  ChainAddMinterErc721,
  ChainBurnErc721,
  ChainDeployErc721,
  ChainMintErc721,
  ChainTransferErc721,
} from '@tatumio/shared-blockchain-abstract'
import {
  Erc721Token_General,
  EvmBasedSdkError,
  EvmBasedWeb3,
  evmBasedUtils,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'

const deploySignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
}: {
  body: ChainDeployErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
}) => {
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, publicMint } = body
  const client = await web3.getClient(provider, fromPrivateKey)

  let abi = Erc721Token_General.abi
  let deployData = Erc721Token_General.bytecode

  const contract = new client.eth.Contract(abi as any)

  const deploy = contract.deploy({
    arguments: [name, symbol, publicMint ?? false],
    data: deployData,
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
    chainId,
  }
  return prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    fee.gasLimit,
    signatureId,
    fromPrivateKey,
    fee?.gasPrice,
    provider,
  )
}

const mintSignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
}: {
  body: ChainMintErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
}) => {
  const { nonce, signatureId, fee, tokenId, url, fromPrivateKey } = body
  const contractAddress = body.contractAddress.trim()
  const to = body.to.trim()

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc721Token_General.abi as any, contractAddress)

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
      chainId,
    }

    return prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      fee.gasLimit,
      signatureId,
      fromPrivateKey,
      fee?.gasPrice,
      provider,
    )
  }
  throw new Error('Contract address should not be empty')
}

const burnSignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
}: {
  body: ChainBurnErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId } = body
  const contractAddress = body.contractAddress?.trim()

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_General.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
    chainId,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    fee.gasLimit,
    signatureId,
    fromPrivateKey,
    fee?.gasPrice,
    provider,
  )
}

const addMinterSignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
}: {
  body: ChainAddMinterErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
}) => {
  const { fromPrivateKey, fee, nonce, signatureId } = body
  const contractAddress = body.contractAddress?.trim()
  const minter = body.minter?.trim()

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_General.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods
      .grantRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', minter)
      .encodeABI(),
    nonce,
    chainId,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    fee?.gasLimit,
    signatureId,
    fromPrivateKey,
    fee?.gasPrice,
    provider,
  )
}

const transferSignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
}: {
  body: ChainTransferErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
}) => {
  const { fromPrivateKey, tokenId, fee, nonce, signatureId, value, provenance, provenanceData, tokenPrice } =
    body
  const contractAddress = body.contractAddress?.trim()
  const to = body.to?.trim()

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_General.abi as any, contractAddress)
  const dataBytes = provenance
    ? Buffer.from(provenanceData + "'''###'''" + client.utils.toWei(tokenPrice!, 'ether'), 'utf8')
    : ''
  const tokenData = provenance
    ? contract.methods.safeTransfer(to, tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(to, tokenId).encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: tokenData,
    nonce,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    chainId,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    fee.gasLimit,
    signatureId,
    fromPrivateKey,
    fee?.gasPrice,
    provider,
  )
}

const prepareSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  web3: EvmBasedWeb3,
  gasLimit: string,
  signatureId?: string,
  fromPrivateKey?: string,
  gasPrice?: string,
  provider?: string,
) => {
  const gasPriceDefined = gasPrice
    ? client.utils.toWei(gasPrice, 'gwei')
    : await web3.getGasPriceInWei(provider)
  const tx: TransactionConfig = {
    from: 0,
    ...transaction,
    gas: gasLimit,
    gasPrice: gasPriceDefined,
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  tx.from = tx.from || client.eth.defaultAccount || 0

  if (!fromPrivateKey) {
    throw new Error('signatureId or fromPrivateKey has to be defined')
  }

  await evmBasedUtils.validateSenderBalance(client, fromPrivateKey, tx)

  const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

  if (!signedTransaction.rawTransaction) {
    throw new Error('Unable to get signed tx data')
  }

  return signedTransaction.rawTransaction
}

export const eonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc721: {
      prepare: {
        /**
         * Sign deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        deploySignedTransaction: async (body: ChainDeployErc721, chainId: number, provider?: string) =>
          deploySignedTransaction({
            body,
            web3: args.web3,
            provider,
            chainId,
          }),
        /**
         * Sign mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        mintSignedTransaction: async (body: ChainMintErc721, chainId: number, provider?: string) =>
          mintSignedTransaction({ body, web3: args.web3, provider, chainId }),
        /**
         * Sign burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        burnSignedTransaction: async (body: ChainBurnErc721, chainId: number, provider?: string) =>
          burnSignedTransaction({ body, web3: args.web3, provider, chainId }),
        /**
         * Sign transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        transferSignedTransaction: async (body: ChainTransferErc721, chainId: number, provider?: string) =>
          transferSignedTransaction({ body, web3: args.web3, provider, chainId }),

        /**
         * Sign add minter to ERC 721 with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        addMinterSignedTransaction: (body: ChainAddMinterErc721, chainId: number, provider: string) =>
          addMinterSignedTransaction({ body, web3: args.web3, provider, chainId }),
      },
    },
  }
}
