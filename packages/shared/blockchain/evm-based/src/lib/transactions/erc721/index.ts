import {
  BroadcastFunction,
  ChainBurnErc721,
  ChainDeployErc721,
  ChainMintErc721,
  ChainMintMultipleNft,
  ChainMintNft,
  ChainTransferErc721,
  ChainUpdateCashbackErc721,
} from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { Erc721Token, Erc721_Provenance } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'
import { BlockchainNftService, MintNftKMS } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'

const mintSignedTransaction = async (body: ChainMintErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { contractAddress, nonce, signatureId, fee, to, tokenId, url, fromPrivateKey } = body
  const client = web3.getClient(provider)
  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      nonce: nonce,
    }
    // TODO private key undefined - not in MintErc721 type
    return await evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      signatureId,
      fromPrivateKey,
      web3,
      fee.gasLimit,
      fee.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty')
}

const mintCashbackSignedTransaction = async (body: ChainMintNft, web3: EvmBasedWeb3, provider?: string) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    nonce,
    fee,
    url,
    signatureId,
    authorAddresses,
    cashbackValues,
    erc20,
  } = body

  const client = web3.getClient(provider)
  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)
  const cashbacks: string[] = cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: erc20
        ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
        : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
      nonce,
    }

    return await evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      signatureId,
      fromPrivateKey,
      web3,
      fee.gasLimit,
      fee.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

export const mintMultipleCashbackSignedTransaction = async (
  body: ChainMintMultipleNft,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    url,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    fee,
    erc20,
  } = body

  const client = await web3.getClient(provider)

  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)
  const cashbacks: string[][] = cashbackValues!
  const cb = cashbacks.map((cashback) =>
    cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`),
  )
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: erc20
      ? contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb,
            erc20,
          )
          .encodeABI()
      : contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb,
          )
          .encodeABI(),
    nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

const mintMultipleSignedTransaction = async (
  body: ChainMintMultipleNft,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, fee } = body

  const client = await web3.getClient(provider)

  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .mintMultiple(
        to.map((t) => t.trim()),
        tokenId,
        url,
      )
      .encodeABI(),
    nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

const burnSignedTransaction = async (body: ChainBurnErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = web3.getClient(provider)

  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

const transferSignedTransaction = async (
  body: ChainTransferErc721,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const {
    fromPrivateKey,
    to,
    tokenId,
    fee,
    contractAddress,
    nonce,
    signatureId,
    value,
    provenance,
    provenanceData,
    tokenPrice,
  } = body

  const client = await web3.getClient(provider)

  const contract = new client.eth.Contract(
    provenance ? Erc721_Provenance.abi : (Erc721Token.abi as any),
    contractAddress,
  )
  const dataBytes = provenance
    ? Buffer.from(provenanceData + "'''###'''" + client.utils.toWei(tokenPrice!, 'ether'), 'utf8')
    : ''
  const tokenData = provenance
    ? contract.methods.safeTransfer(to.trim(), tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(to.trim(), tokenId).encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: tokenData,
    nonce,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

const updateCashbackForAuthorSignedTransaction = async (
  body: ChainUpdateCashbackErc721,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = await web3.getClient(provider)

  const contract = new client.eth.Contract(Erc721Token.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .updateCashbackForAuthor(
        tokenId,
        `0x${new BigNumber(client.utils.toWei(cashbackValue, 'ether')).toString(16)}`,
      )
      .encodeABI(),
    nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

const deploySignedTransaction = async (body: ChainDeployErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance } = body

  const client = await web3.getClient(provider)

  const contract = new client.eth.Contract(
    provenance ? Erc721_Provenance.abi : (Erc721Token.abi as any),
    null,
    {
      data: provenance ? Erc721_Provenance.bytecode : Erc721Token.bytecode,
    },
  )

  // @ts-ignore
  const deploy = contract.deploy({
    arguments: [name, symbol],
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    signatureId,
    fromPrivateKey,
    web3,
    fee.gasLimit,
    fee.gasPrice,
  )
}

// TODO change documentation in comments!!!

export const erc721 = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Sign mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: ChainMintErc721, provider?: string) =>
        mintSignedTransaction(body, args.web3, provider),
      /**
       * Sign mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintCashbackSignedTransaction: async (body: ChainMintNft, provider?: string) =>
        mintCashbackSignedTransaction(body, args.web3, provider),
      /**
       * Sign mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleCashbackSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) =>
        mintMultipleCashbackSignedTransaction(body, args.web3, provider),
      /**
       * Sign mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) =>
        mintMultipleSignedTransaction(body, args.web3, provider),
      /**
       * Sign burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: ChainBurnErc721, provider?: string) =>
        burnSignedTransaction(body, args.web3, provider),
      /**
       * Sign transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferErc721, provider?: string) =>
        transferSignedTransaction(body, args.web3, provider),
      /**
       * Sign update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      updateCashbackForAuthorSignedTransaction: async (body: ChainUpdateCashbackErc721, provider?: string) =>
        updateCashbackForAuthorSignedTransaction(body, args.web3, provider),
      /**
       * Sign deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (body: ChainDeployErc721, provider?: string) =>
        deploySignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Send BEP721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: ChainMintErc721, provider?: string) => {
        if (!body.fromPrivateKey && !body.signatureId) {
          return BlockchainNftService.nftMintErc721(body as MintNftKMS)
        }
        return args.broadcastFunction({
          txData: await mintSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        })
      },
      /**
       * Send BEP721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintCashbackSignedTransaction: async (body: ChainMintNft, provider?: string) =>
        args.broadcastFunction({
          txData: await mintCashbackSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleCashbackSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) =>
        args.broadcastFunction({
          txData: await mintMultipleCashbackSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (body: ChainMintMultipleNft, provider?: string) =>
        args.broadcastFunction({
          txData: await mintMultipleSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the  Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: ChainBurnErc721, provider?: string) =>
        args.broadcastFunction({
          txData: await burnSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferErc721, provider?: string) =>
        args.broadcastFunction({
          txData: await transferSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      updateCashbackForAuthorSignedTransaction: async (body: ChainUpdateCashbackErc721, provider?: string) =>
        args.broadcastFunction({
          txData: await updateCashbackForAuthorSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: ChainDeployErc721, provider?: string) =>
        args.broadcastFunction({
          txData: await deploySignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}
