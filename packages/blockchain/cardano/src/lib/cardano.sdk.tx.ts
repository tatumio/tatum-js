import {
  AdaTransactionFromAddress,
  AdaTransactionFromAddressKMS,
  AdaTransactionFromUTXO,
  AdaTransactionFromUTXOKMS,
  ApiServices,
  Currency,
  DataApiService,
  NodeRpcService,
  PendingTransaction,
  TransactionHash,
} from '@tatumio/api-client'
import { amountUtils, SDKArguments, SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { CardanoSdkError } from './cardano.sdk.errors'
import { cardanoUtils } from './cardano.utils'

type CardanoTxOptions = { testnet: boolean }

export const cardanoTransactions = (
  args: SDKArguments,
  apiCalls: {
    cardanoBroadcast: typeof ApiServices.blockchain.ada.adaBroadcast
    getUTXOsByAddress: typeof DataApiService.getUtxosByAddress,
    rpcCall: typeof NodeRpcService.nodeJsonPostRpcDriver,
  } = {
    cardanoBroadcast: ApiServices.blockchain.ada.adaBroadcast,
    getUTXOsByAddress: DataApiService.getUtxosByAddress,
    rpcCall: NodeRpcService.nodeJsonPostRpcDriver,
  },
  cardanoWallet,
) => {

  const signPayload = async (privateKeysToSign: { [address: string]: string }, operations: Array<any>, network_identifier): Promise<string> => {
    const preprocess = (await apiCalls.rpcCall('ADA', {
        network_identifier,
        operations,
        metadata: {
          relative_ttl: 1000,
        },
      },
      args.apiKey, 'construction/preprocess',
    ))
    const metadata = (await apiCalls.rpcCall('ADA', {
        network_identifier,
        ...preprocess,
      },
      args.apiKey, 'construction/metadata',
    ))
    const { unsigned_transaction, payloads } = await apiCalls.rpcCall('ADA', {
      network_identifier,
      operations,
      ...metadata,
    }, args.apiKey, 'construction/payloads')

    const signatures = []
    for (const signing_payload of payloads) {
      const {
        account_identifier: { address },
      } = signing_payload
      signatures.push({
        signing_payload,
        public_key: {
          hex_bytes: await cardanoUtils.privateKeyToPublicHex(privateKeysToSign[address]),
          curve_type: 'edwards25519',
        },
        signature_type: 'ed25519',
        hex_bytes: await cardanoUtils.sign(privateKeysToSign[address], signing_payload.hex_bytes),
      })
    }

    const { signed_transaction } = await apiCalls.rpcCall('ADA', {
      network_identifier,
      unsigned_transaction,
      signatures,
    }, args.apiKey, 'construction/combine')

    return signed_transaction
  }

  const prepareSignedTransaction = async (body: AdaTransactionFromAddress | AdaTransactionFromUTXO | AdaTransactionFromAddressKMS | AdaTransactionFromUTXOKMS, options: CardanoTxOptions): Promise<string> => {
    const { network_identifier } = cardanoUtils.networkIdentifier(options.testnet)

    try {
      const { to, fee, changeAddress } = body
      const operations = []
      let totalInputs = 0
      const totalOutputs = body.to.reduce((a, b) => a + amountUtils.toLovelace(b.value), 0)
      const privateKeysToSign = {}
      let opIndex = 0
      if ('fromUTXO' in body) {
        for (const item of body.fromUTXO) {
          const value = amountUtils.toLovelace(item.amount)
          totalInputs += value
          operations.push({
            operation_identifier: {
              index: opIndex++,
              network_index: item.index,
            },
            related_operations: [],
            type: 'input',
            status: 'success',
            account: {
              address: item.address,
              metadata: {},
            },
            amount: {
              value: `${-value}`,
              currency: {
                symbol: 'ADA',
                decimals: 6,
              },
            },
            coin_change: {
              coin_identifier: {
                identifier: item.txHash + ':' + item.index,
              },
              coin_action: 'coin_created',
            },
            metadata: {},
          })
          if ('privateKey' in item) {
            privateKeysToSign[item.address] = item.privateKey
          }
        }
      } else if ('fromAddress' in body) {
        for (const item of body.fromAddress) {
          if (totalInputs >= totalOutputs) {
            break
          }
          const utxos = await apiCalls.getUTXOsByAddress(options.testnet ? 'cardano-preprod' : 'cardano', item.address, amountUtils.fromLovelace(totalOutputs - totalInputs))
          for (const utxo of utxos) {
            if (totalInputs >= totalOutputs) {
              break
            }
            const value = amountUtils.toLovelace(utxo.value)
            totalInputs += value
            operations.push({
              operation_identifier: {
                index: opIndex++,
                network_index: utxo.index,
              },
              related_operations: [],
              type: 'input',
              status: 'success',
              account: {
                address: item.address,
                metadata: {},
              },
              amount: {
                value: `${-value}`,
                currency: {
                  symbol: 'ADA',
                  decimals: 6,
                },
              },
              coin_change: {
                coin_identifier: {
                  identifier: utxo.txHash + ':' + utxo.index,
                },
                coin_action: 'coin_created',
              },
              metadata: {},
            })
            if ('privateKey' in item) {
              privateKeysToSign[item.address] = item.privateKey
            }
          }
        }
      }
      let outIndex = 0
      for (const recipient of to) {
        operations.push({
          operation_identifier: {
            index: opIndex++,
            network_index: outIndex++,
          },
          related_operations: [],
          type: 'output',
          status: 'success',
          account: {
            address: recipient.address,
            metadata: {},
          },
          amount: {
            value: amountUtils.toLovelace(recipient.value).toString(),
            currency: {
              symbol: 'ADA',
              decimals: 6,
            },
            metadata: {},
          },
          metadata: {},
        })
      }
      if (!(fee && changeAddress)) {
        throw new CardanoSdkError(SdkErrorCode.FEE_CHANGE_ADDRESS)
      }
      if (totalInputs > totalOutputs + amountUtils.toLovelace(fee)) {
        const rest = Math.abs(totalOutputs + amountUtils.toLovelace(fee) - totalInputs)
        operations.push({
          operation_identifier: {
            index: opIndex++,
            network_index: outIndex++,
          },
          related_operations: [],
          type: 'output',
          status: 'success',
          account: {
            address: changeAddress,
            metadata: {},
          },
          amount: {
            value: `${rest}`,
            currency: {
              symbol: 'ADA',
              decimals: 6,
            },
            metadata: {},
          },
          metadata: {},
        })
      }

      if ('fromUTXO' in body && 'signatureId' in body.fromUTXO[0] && body.fromUTXO[0].signatureId) {
        return JSON.stringify(operations)
      }
      if ('fromAddress' in body && 'signatureId' in body.fromAddress[0] && body.fromAddress[0].signatureId) {
        return JSON.stringify(operations)
      }
      return signPayload(privateKeysToSign, operations, network_identifier)
    } catch (e: any) {
      throw new CardanoSdkError(e)
    }
  }

  const sendTransaction = async (body: AdaTransactionFromAddress | AdaTransactionFromUTXO | AdaTransactionFromAddressKMS | AdaTransactionFromUTXOKMS, options: CardanoTxOptions): Promise<TransactionHash> => {
    return apiCalls.cardanoBroadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  const signKmsTransaction = async (tx: PendingTransaction, privateKeys: string[], options = { testnet: true }): Promise<string> => {
    if (tx.chain !== Currency.ADA) {
      throw new SdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
    }
    const { network_identifier } = cardanoUtils.networkIdentifier(options.testnet)
    const operations = JSON.parse(tx.serializedTransaction)
    const pks = {}
    for (const privateKey of privateKeys) {
      const address = await cardanoWallet.generateAddressFromPrivateKey(privateKey, { testnet: options.testnet })
      pks[address] = privateKey
    }
    return signPayload(pks, operations, network_identifier)
  }

  return {
    sendTransaction,
    prepareSignedTransaction,
    signKmsTransaction,
  }
}
