import {
  BurnNftKMSTron,
  BurnNftTron,
  DeployNftTron,
  DeployNftTronKMS,
  MintMultipleNftKMSTron,
  MintMultipleNftTron,
  MintNftKMSTron,
  MintNftTron,
  TransferNftKMSTron,
  TransferNftTron,
  TronService,
  NftErc721OrCompatibleService,
} from '@tatumio/api-client'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'
import { FromPrivateKeyOrSignatureIdTron } from '@tatumio/shared-blockchain-abstract'
import { Trc721Token } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'
import { Blockchain } from '@tatumio/shared-core'

type DeployTronNft = WithoutChain<FromPrivateKeyOrSignatureIdTron<DeployNftTron>>
type MintTronNft = WithoutChain<FromPrivateKeyOrSignatureIdTron<MintNftTron>>
type TransferTronNft = WithoutChain<FromPrivateKeyOrSignatureIdTron<TransferNftTron>>
type BurnTronNft = WithoutChain<FromPrivateKeyOrSignatureIdTron<BurnNftTron>>
type MintTronMultipleNft = WithoutChain<FromPrivateKeyOrSignatureIdTron<MintMultipleNftTron>>

const prepareDeploySignedTransaction = async (body: DeployTronNft, tronWeb: ITronWeb, provider?: string) => {
  const client = tronWeb.getClient(provider)

  const { name, symbol, feeLimit } = body

  const params = {
    feeLimit: client.toSun(feeLimit),
    callValue: 0,
    userFeePercentage: 100,
    originEnergyLimit: 1,
    abi: JSON.stringify(Trc721Token.abi),
    bytecode: Trc721Token.bytecode,
    parameters: [name, symbol],
    name,
  }

  if (body.signatureId) {
    const tx = await client.transactionBuilder.createSmartContract(params, body.from)

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.createSmartContract(
      params,
      client.address.fromPrivateKey(body.fromPrivateKey),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

const prepareMintSignedTransaction = async (body: MintTronNft, tronWeb: ITronWeb, provider?: string) => {
  const { url, to, tokenId, contractAddress, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'mintWithTokenURI(address,uint256,string)'

  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
    {
      type: 'string',
      value: url,
    },
  ]

  if (body.signatureId) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

// TODO: do a balance check before sending tx - https://app.clickup.com/t/24443045/TT-3496
const transferSignedTransaction = async (body: TransferTronNft, tronWeb: ITronWeb, provider?: string) => {
  const { to, tokenId, contractAddress, feeLimit } = body
  const client = tronWeb.getClient(provider)

  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
  ]
  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'safeTransfer(address,uint256)'

  client.setAddress(contractAddress)

  if (body.signatureId) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
        callValue: 0,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
        callValue: 0,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

const burnSignedTransaction = async (body: BurnTronNft, tronWeb: ITronWeb, provider?: string) => {
  const { tokenId, contractAddress, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'burn(uint256)'
  const params = [
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
  ]

  if (body.signatureId) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

const prepareMintMultipleSignedTransaction = async (
  body: MintTronMultipleNft,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { to, tokenId, contractAddress, url, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'mintMultiple(address[],uint256[],string[])'
  const params = [
    {
      type: 'address[]',
      value: to.map((a) => client.address.toHex(a)),
    },
    {
      type: 'uint256[]',
      value: tokenId.map((t) => `0x${new BigNumber(t).toString(16)}`),
    },
    {
      type: 'string[]',
      value: url,
    },
  ]

  if (body.signatureId) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

export const tronTrc721 = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      /**
       * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (body: DeployTronNft, provider?: string) =>
        prepareDeploySignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: MintTronNft, provider?: string) =>
        prepareMintSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron transfer trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: TransferTronNft, provider?: string) =>
        transferSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron burn trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: BurnTronNft, provider?: string) =>
        burnSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron mint multiple trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleSignedTransaction: async (body: MintTronMultipleNft, provider?: string) =>
        prepareMintMultipleSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron deploy trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: DeployTronNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftDeployErc721({
            ...body,
            chain: Blockchain.TRON,
          } as DeployNftTronKMS)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareDeploySignedTransaction(body, args.tronWeb, provider),
          })
        }
      },

      /**
       * Send Tron mint cashback trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: MintTronNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintErc721({
            ...body,
            chain: Blockchain.TRON,
          } as MintNftKMSTron)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareMintSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },

      /**
       * Send Tron transfer trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: TransferTronNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftTransferErc721({
            ...body,
            chain: Blockchain.TRON,
          } as TransferNftKMSTron)
        } else {
          return TronService.tronBroadcast({
            txData: await transferSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },
      /**
       * Send Tron burn trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: BurnTronNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftBurnErc721({
            ...body,
            chain: Blockchain.TRON,
          } as BurnNftKMSTron)
        } else {
          return TronService.tronBroadcast({
            txData: await burnSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },
      /**
       * Send Tron mint multiple trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (body: MintTronMultipleNft, provider?: string) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintMultipleErc721({
            ...body,
            chain: Blockchain.TRON,
          } as MintMultipleNftKMSTron)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareMintMultipleSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },
    },
  }
}
