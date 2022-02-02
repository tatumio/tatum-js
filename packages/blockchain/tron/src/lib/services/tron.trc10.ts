import { TransferTronTrc10Blockchain } from '@tatumio/api-client'
import axios, { AxiosRequestConfig } from 'axios'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'

// TODO refactor this mess
const getTrc10Precision = async (tokenId: string, testnet = false): Promise<number> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `/v1/assets/${tokenId}`,
    baseURL: `${testnet ? 'https://api.shasta.trongrid.io' : 'https://api.trongrid.io'}`,
    headers: {
      'content-type': 'application/json',
      'TRON-PRO-API-KEY': process.env.TRON_PRO_API_KEY,
    },
  }

  const { data } = (await axios.request(config)).data
  if (!data?.length) {
    throw new Error('Unable to get tron precision')
  }

  return data[0].precision
}

const prepareSignedTransaction = async (
  body: TransferTronTrc10Blockchain,
  testnet = false,
  tronWeb: ITronWeb,
  precision?: number,
  provider?: string,
) => {
  const { fromPrivateKey, to, tokenId, amount } = body

  const client = tronWeb.getClient(provider)

  const definedPrecision = precision ?? (await getTrc10Precision(tokenId, testnet))
  const tx = await client.transactionBuilder.sendToken(
    to,
    new BigNumber(amount).multipliedBy(new BigNumber(10).pow(definedPrecision)),
    tokenId,
    client.address.fromHex(client.address.fromPrivateKey(fromPrivateKey)),
  )

  return JSON.stringify(await client.trx.sign(tx, fromPrivateKey))
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
        body: TransferTronTrc10Blockchain,
        testnet = false,
        precision?: number,
        provider?: string,
      ) => prepareSignedTransaction(body, testnet, args.tronWeb, precision, provider),
    },
  }
}
