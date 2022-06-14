import { CreateRecord, PolygonService } from '@tatumio/api-client'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'
import {
  custodial,
  erc20,
  erc721,
  evmBasedUtils,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'

export type StoreDataTransactionBody = WithoutChain<CreateRecord> & {
  signatureId?: string
  gasLimit?: string
  gasPrice?: string
}

const storeDataTransaction = async (
  body: StoreDataTransactionBody & { signatureId?: string },
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider, body.fromPrivateKey)

  const hexData = isHex(body.data) ? stringToHex(body.data) : toHex(body.data)

  const tx: TransactionConfig = {
    from: 0,
    to: body.to || client.eth.accounts.wallet[0].address,
    data: hexData,
    gas: body.gasLimit,
    nonce: body.nonce,
    gasPrice: body.gasPrice
      ? `0x${new BigNumber(toWei(body.gasPrice, 'gwei')).toString(16)}`
      : await web3.getGasPriceInWei(),
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.gasLimit,
    body.gasPrice,
  )
}

export const polygonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  const nativeTxs = native({
    ...args,
    broadcastFunction: PolygonService.polygonBroadcast,
  })

  return {
    native: {
      ...nativeTxs,
      prepare: {
        ...nativeTxs.prepare,
        /**
         * Sign Polygon store data transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        storeDataTransaction: async (body: StoreDataTransactionBody, provider?: string) =>
          storeDataTransaction(body, args.web3, provider),
      },
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
  }
}
