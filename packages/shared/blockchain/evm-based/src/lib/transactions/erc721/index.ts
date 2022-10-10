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
import { Erc721_Provenance } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'
import BigNumber from 'bignumber.js'
import { ApiServices, MintNftMinter, TransactionHash } from '@tatumio/api-client'
import { Erc721Token_General } from '../../contracts/erc721General'
import { Erc721Token_Cashback } from '../../contracts/erc721Cashback'

const mintSignedTransactionMinter = async (body: MintNftMinter) => {
  const request = await ApiServices.nft.nftMintErc721(body)
  if (request) return (request as TransactionHash).txId
  else throw new Error('Unable to mint NFT with a minter.')
}

const mintSignedTransaction = async (body: ChainMintErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { contractAddress, nonce, signatureId, fee, to, tokenId, url, fromPrivateKey } = body
  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      nonce: nonce,
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

  const client = web3.getClient(provider, fromPrivateKey)
  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)
  const cashbacks: string[] = cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  const transformedTo = to.trim()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: erc20
        ? contract.methods
            .mintWithCashback(transformedTo, tokenId, url, authorAddresses, cb, erc20)
            .encodeABI()
        : contract.methods.mintWithCashback(transformedTo, tokenId, url, authorAddresses, cb).encodeABI(),
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

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)
  const cashbacks: string[][] = cashbackValues!
  const cb = cashbacks.map((cashback) =>
    cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`),
  )

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: erc20
      ? contract.methods.mintMultipleCashback(to, tokenId, url, authorAddresses, cb, erc20).encodeABI()
      : contract.methods.mintMultipleCashback(to, tokenId, url, authorAddresses, cb).encodeABI(),
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

const mintMultipleSignedTransaction = async (
  body: ChainMintMultipleNft,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, fee } = body

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: undefined,
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
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const burnSignedTransaction = async (body: ChainBurnErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(tokenId).encodeABI(),
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

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(
    provenance ? Erc721_Provenance.abi : (Erc721Token_Cashback.abi as any),
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
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const updateCashbackForAuthorSignedTransaction = async (
  body: ChainUpdateCashbackErc721,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721Token_Cashback.abi as any, contractAddress)

  const tx: TransactionConfig = {
    from: undefined,
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
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const deploySignedTransaction = async (body: ChainDeployErc721, web3: EvmBasedWeb3, provider?: string) => {
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance, cashback, publicMint } = body

  if (provenance && cashback) {
    throw new Error('Only one of provenance or cashback must be present and true.')
  }

  const client = await web3.getClient(provider, fromPrivateKey)

  let abi = Erc721Token_General.abi
  let deployData = Erc721Token_General.bytecode
  if (body.provenance) {
    abi = Erc721_Provenance.abi
    deployData = Erc721_Provenance.bytecode
  } else if (body.cashback) {
    abi = Erc721Token_Cashback.abi
    deployData = Erc721Token_Cashback.bytecode
  }

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

const mintProvenanceSignedTransaction = async (body: ChainMintNft, web3: EvmBasedWeb3, provider?: string) => {
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
    fixedValues,
    erc20,
  } = body

  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721_Provenance.abi as any, contractAddress)
  const cb: string[] = []
  const fval: string[] = []
  const authors: string[] = []
  if (authorAddresses && cashbackValues && fixedValues) {
    cashbackValues.forEach((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
    fixedValues.forEach((c) => fval.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
    authorAddresses?.map((a) => authors.push(a))
  }

  const data = erc20
    ? contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authors, cb, fval, erc20)
    : contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authors, cb, fval)
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: data.encodeABI(),
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
  throw new Error('Contract address should not be empty!')
}

const mintMultipleProvenanceSignedTransaction = async (
  body: ChainMintMultipleNft & { fixedValues: string[][] },
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
    fixedValues,
    erc20,
    fee,
  } = body

  const client = await web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract(Erc721_Provenance.abi as any, contractAddress)
  const cb: string[][] = []
  const fv: string[][] = []
  if (authorAddresses && cashbackValues && fixedValues) {
    for (let i = 0; i < cashbackValues.length; i++) {
      const cb2: string[] = []
      const fv2: string[] = []
      for (let j = 0; j < cashbackValues[i].length; j++) {
        cb2.push(`0x${new BigNumber(cashbackValues[i][j]).multipliedBy(100).toString(16)}`)
        fv2.push(`0x${new BigNumber(client.utils.toWei(fixedValues[i][j], 'ether')).toString(16)}`)
      }
      cb.push(cb2)
      fv.push(fv2)
    }
  }

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: erc20
      ? contract.methods
          .mintMultiple(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses ?? [],
            cb,
            fv,
            erc20,
          )
          .encodeABI()
      : contract.methods.mintMultiple(to, tokenId, url, authorAddresses ?? [], cb, fv).encodeABI(),
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
      mintSignedTransaction: async (body: Omit<ChainMintErc721, 'minter'>, provider?: string) =>
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
      /**
       * Sign mint ERC 721 provenance transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintProvenanceSignedTransaction: async (body: ChainMintNft, provider?: string) =>
        mintProvenanceSignedTransaction(body, args.web3, provider),
      /**
       * Sign mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleProvenanceSignedTransaction: async (
        body: ChainMintMultipleNft & { fixedValues: string[][] },
        provider?: string,
      ) => mintMultipleProvenanceSignedTransaction(body, args.web3, provider),
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
        if (body.minter) {
          await mintSignedTransactionMinter(body as MintNftMinter)
        } else {
          await args.broadcastFunction({
            txData: (await mintSignedTransaction(body, args.web3, provider)) as string,
            signatureId: body.signatureId,
          })
        }
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
          txData: (await mintCashbackSignedTransaction(body, args.web3, provider)) as string,
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
          txData: (await mintMultipleCashbackSignedTransaction(body, args.web3, provider)) as string,
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
          txData: (await mintMultipleSignedTransaction(body, args.web3, provider)) as string,
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
          txData: (await burnSignedTransaction(body, args.web3, provider)) as string,
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
          txData: (await transferSignedTransaction(body, args.web3, provider)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 update cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      updateCashbackForAuthorSignedTransaction: async (body: ChainUpdateCashbackErc721, provider?: string) =>
        args.broadcastFunction({
          txData: (await updateCashbackForAuthorSignedTransaction(body, args.web3, provider)) as string,
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
          txData: (await deploySignedTransaction(body, args.web3, provider)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 mint provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintProvenanceSignedTransaction: async (body: ChainMintNft, provider?: string) =>
        args.broadcastFunction({
          txData: (await mintProvenanceSignedTransaction(body, args.web3, provider)) as string,
          signatureId: body.signatureId,
        }),
      /**
       * Send BEP721 mint multiple provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleProvenanceSignedTransaction: async (
        body: ChainMintMultipleNft & { fixedValues: string[][] },
        provider?: string,
      ) =>
        args.broadcastFunction({
          txData: (await mintMultipleProvenanceSignedTransaction(body, args.web3, provider)) as string,
          signatureId: body.signatureId,
        }),
    },
  }
}
