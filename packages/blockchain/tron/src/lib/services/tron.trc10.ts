import {
  CreateTronTrc10Blockchain,
  CreateTronTrc10BlockchainKMS,
  TransferTronTrc10Blockchain,
  TransferTronTrc10BlockchainKMS,
  TronService,
} from '@tatumio/api-client'
import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'

const prepareSignedTransaction = async (
  body: TransferTronTrc10Blockchain | TransferTronTrc10BlockchainKMS,
  tronWeb: ITronWeb,
  precision?: number,
  provider?: string,
) => {
  const { to, tokenId, amount } = body

  const client = tronWeb.getClient(provider)

  const definedPrecision =
    precision ?? (await TronService.tronTrc10Detail(Number.parseInt(tokenId))).precision

  if (!definedPrecision) {
    throw new Error('Unable to obtain precision')
  }

  if (isWithSignatureId(body)) {
    const tx = await client.transactionBuilder.sendToken(
      to,
      new BigNumber(amount).multipliedBy(new BigNumber(10).pow(definedPrecision)),
      tokenId,
      body.from,
    )

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.sendToken(
      to,
      new BigNumber(amount).multipliedBy(new BigNumber(10).pow(definedPrecision)),
      tokenId,
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

const prepareCreateSignedTransaction = async (
  body: CreateTronTrc10Blockchain | CreateTronTrc10BlockchainKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { name, abbreviation, description, url, totalSupply, decimals } = body

  const client = tronWeb.getClient(provider)

  const createTokenParams = {
    name,
    abbreviation,
    description,
    url,
    totalSupply: new BigNumber(totalSupply).multipliedBy(new BigNumber(10).pow(decimals)),
    trxRatio: 1,
    tokenRatio: 1,
    saleStart: Date.now() + 60000,
    saleEnd: Date.now() + 100000,
    freeBandwidth: 0,
    freeBandwidthLimit: 0,
    frozenAmount: 0,
    frozenDuration: 0,
    precision: decimals,
  }

  if (isWithSignatureId(body)) {
    const tx = await client.transactionBuilder.createToken(createTokenParams, body.from)

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.createToken(
      createTokenParams,
      client.address.fromPrivateKey(body.fromPrivateKey),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

export const tronTrc10 = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      /**
       * Sign Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @param precision
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (
        body: TransferTronTrc10Blockchain | TransferTronTrc10BlockchainKMS,
        precision?: number,
        provider?: string,
      ) => prepareSignedTransaction(body, args.tronWeb, precision, provider),
      /**
       * Sign create Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      createSignedTransaction: async (
        body: CreateTronTrc10Blockchain | CreateTronTrc10BlockchainKMS,
        provider?: string,
      ) => prepareCreateSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet mainnet or testnet version
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (
        body: TransferTronTrc10Blockchain | TransferTronTrc10BlockchainKMS,
        precision?: number,
        provider?: string,
      ) =>
        TronService.tronBroadcast({
          txData: await prepareSignedTransaction(body, args.tronWeb, precision, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Create Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      createSignedTransaction: async (
        body: CreateTronTrc10Blockchain | CreateTronTrc10BlockchainKMS,
        provider?: string,
      ) =>
        TronService.tronBroadcast({
          txData: await prepareCreateSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
    },
  }
}
