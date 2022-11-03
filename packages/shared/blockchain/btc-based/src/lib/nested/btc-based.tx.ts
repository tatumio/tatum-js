import {
  ApiServices,
  BlockchainFeesService,
  BtcBasedBalance,
  BtcTransactionFromAddress,
  BtcTransactionFromAddressKMS,
  BtcTransactionFromUTXO,
  BtcTransactionFromUTXOKMS,
  BtcUTXO,
  Currency,
  EstimateFeeFromAddress,
  EstimateFeeFromUTXO,
  FeeBtc,
  LtcTransactionAddress,
  LtcTransactionAddressKMS,
  LtcTransactionUTXO,
  LtcTransactionUTXOKMS,
  LtcUTXO,
  TransactionHash,
} from '@tatumio/api-client'
import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import { amountUtils, SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BtcBasedSdkError } from '../btc-based.sdk.errors'
import BigNumber from 'bignumber.js'
import { BtcBasedWalletUtils } from '../btc-based.wallet.utils'

interface BtcBasedTransaction extends Transaction {
  serialize(unchecked?: boolean): string
}

export type BtcBasedTx<T> = {
  sendTransaction: (body: T, options: BtcBasedTxOptions) => Promise<TransactionHash>
  prepareSignedTransaction: (body: T, options: BtcBasedTxOptions) => Promise<string>
}

export type BtcTransactionTypes =
  | BtcTransactionFromAddress
  | BtcTransactionFromAddressKMS
  | BtcTransactionFromUTXO
  | BtcTransactionFromUTXOKMS

export type FeeChange = { fee?: number; change?: string }

export type LtcTransactionTypes =
  | LtcTransactionAddress
  | LtcTransactionAddressKMS
  | LtcTransactionUTXO
  | LtcTransactionUTXOKMS

type BtcBasedTransactionTypes = BtcTransactionTypes | LtcTransactionTypes

type BtcFromAddressTypes = BtcTransactionFromAddress | BtcTransactionFromAddressKMS

type LtcFromAddressTypes = LtcTransactionAddress | LtcTransactionAddressKMS

type BtcFromUtxoTypes = BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS
type LtcFromUtxoTypes = LtcTransactionUTXO | LtcTransactionUTXOKMS

export type BtcBasedFromWithChange = BtcTransactionFromAddress | LtcTransactionAddress
export type BtcBasedFromWithKmsChange = BtcTransactionFromAddressKMS | LtcTransactionAddressKMS
export type BtcBasedUtxoWithChange = BtcTransactionFromUTXO | LtcTransactionUTXO
export type BtcBasedUtxoKMSWithChange = BtcTransactionFromUTXOKMS | LtcTransactionUTXOKMS

type GetTxByAddressType =
  | typeof ApiServices.blockchain.bitcoin.btcGetTxByAddress
  | typeof ApiServices.blockchain.ltc.ltcGetTxByAddress

type GetUtxoType =
  | typeof ApiServices.blockchain.bitcoin.btcGetUtxo
  | typeof ApiServices.blockchain.ltc.ltcGetUtxo

type BroadcastType =
  | typeof ApiServices.blockchain.bitcoin.btcBroadcast
  | typeof ApiServices.blockchain.ltc.ltcBroadcast

type GetBalanceOfAddress =
  | typeof ApiServices.blockchain.bitcoin.btcGetBalanceOfAddress
  | typeof ApiServices.blockchain.ltc.ltcGetBalanceOfAddress

type BtcBasedTxOptions = { testnet: boolean; skipAllChecks?: boolean }

export const btcBasedTransactions = (
  currency: Currency,
  utils: BtcBasedWalletUtils,
  apiCalls: {
    getTxByAddress: GetTxByAddressType
    getUtxo: GetUtxoType
    broadcast: BroadcastType
    getBalanceOfAddress: GetBalanceOfAddress
  },
  {
    createTransaction,
    createPrivateKey,
    prepareUnspentOutput,
    scriptFromAddress,
  }: {
    createTransaction: typeof Transaction
    createPrivateKey: typeof PrivateKey
    prepareUnspentOutput: typeof Transaction.UnspentOutput.fromObject
    scriptFromAddress: typeof Script.fromAddress
  } = {
    createTransaction: Transaction,
    createPrivateKey: PrivateKey,
    prepareUnspentOutput: Transaction.UnspentOutput.fromObject,
    scriptFromAddress: Script.fromAddress,
  },
): BtcBasedTx<BtcBasedTransactionTypes> => {
  const getChain = (type: string) => {
    return type === 'BtcFromAddressTypes' ? 'BTC' : 'LTC'
  }

  const getEstimateFee = async (
    body: BtcFromAddressTypes | LtcFromAddressTypes | BtcFromUtxoTypes | LtcFromUtxoTypes,
  ): Promise<string> => {
    return (
      (
        (await BlockchainFeesService.estimateFeeBlockchain({
          chain: getChain(typeof body),
          type: 'TRANSFER',
          fromAddress: 'fromAddress' in body ? body.fromAddress.map((a) => a.address) : undefined,
          fromUTXO:
            'fromUTXO' in body
              ? body.fromUTXO.map((utxo) => ({ txHash: utxo.txHash, index: utxo.index }))
              : undefined,
          to: body.to,
        } as EstimateFeeFromAddress | EstimateFeeFromUTXO)) as FeeBtc
      ).slow || ''
    )
  }

  const validateBalanceFromAddress = async (
    body: BtcFromAddressTypes | LtcFromAddressTypes,
  ): Promise<boolean> => {
    let totalBalance: BigNumber = new BigNumber(0)

    // get all addresses balances
    const balances = await Promise.all(body.fromAddress.map((a) => apiCalls.getBalanceOfAddress(a.address)))

    totalBalance = balances.reduce(
      (sum: BigNumber, balance: BtcBasedBalance) =>
        sum.plus(new BigNumber(balance.incoming || 0).minus(new BigNumber(balance.outgoing || 0))),
      new BigNumber(0),
    )

    // get total amout to transfer
    const totalValue = body.to.reduce((sum, t) => sum.plus(new BigNumber(t.value)), new BigNumber(0))

    // get total (slower) fee
    const totalFee = new BigNumber(body.fee || (await getEstimateFee(body)))

    if (totalBalance.isLessThan(totalValue.plus(totalFee))) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_INSUFFICIENT_FEE)
    }

    return true
  }

  const privateKeysFromAddress = async (
    transaction: BtcBasedTransaction,
    body: BtcFromAddressTypes | LtcFromAddressTypes,
    options: BtcBasedTxOptions,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []
      // Validate if balance is sufficient
      await validateBalanceFromAddress(body)

      for (const item of body.fromAddress) {
        const txs = await apiCalls.getTxByAddress(item.address, 50) // @TODO OPENAPI remove pageSize

        for (const tx of txs) {
          if (!tx.outputs || !tx.hash) continue

          for (const [i, o] of tx.outputs.entries()) {
            if (o.address !== item.address) {
              continue
            }

            const utxo = await getUtxoSilent(tx.hash, i)
            if (utxo === null) {
              continue
            }

            transaction.from([
              prepareUnspentOutput({
                txId: tx.hash,
                outputIndex: i,
                script: scriptFromAddress(o.address).toString(),
                satoshis: utxo.value,
              }),
            ])

            if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
            else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
          }
        }
      }

      if (transaction.inputs.length === 0 && !options.skipAllChecks) {
        const addresses = body.fromAddress.map((value) => value.address).join(', ')
        throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS, [addresses])
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const validateBalanceFromUTXO = async (
    body: BtcFromUtxoTypes | LtcFromUtxoTypes,
    utxos: BtcUTXO[] | LtcUTXO[],
  ): Promise<boolean> => {
    // get all UTXOs balances
    const totalBalance = utxos.reduce((sum, u) => sum.plus(new BigNumber(u.value || 0)), new BigNumber(0))

    // get total (slower) fee
    const totalFee = new BigNumber(body.fee || (await getEstimateFee(body)))

    // get total amout to transfer
    const totalValue = body.to.reduce((sum, t) => sum.plus(new BigNumber(t.value)), new BigNumber(0))

    if (totalBalance.isLessThan(totalValue.plus(totalFee))) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_INSUFFICIENT_FEE)
    }

    return true
  }

  const privateKeysFromUTXO = async (
    transaction: Transaction,
    body: BtcFromUtxoTypes | LtcFromUtxoTypes,
    options: BtcBasedTxOptions,
  ): Promise<Array<string>> => {
    try {
      const privateKeysToSign = []
      const utxos = []

      for (const utxoItem of body.fromUTXO) {
        const utxo = await getUtxoSilent(utxoItem.txHash, utxoItem.index)
        if (utxo === null || !utxo.address) continue

        utxos.push(utxo)

        const address = utxo.address
        transaction.from([
          prepareUnspentOutput({
            txId: utxoItem.txHash,
            outputIndex: utxo.index,
            script: scriptFromAddress(address).toString(),
            satoshis: utxo.value,
          }),
        ])

        if ('signatureId' in utxoItem) privateKeysToSign.push(utxoItem.signatureId)
        else if ('privateKey' in utxoItem) privateKeysToSign.push(utxoItem.privateKey)
      }

      // Validate if balance is sufficient
      await validateBalanceFromUTXO(body, utxos)

      if (transaction.inputs.length === 0 && !options.skipAllChecks) {
        const utxos = body.fromUTXO.map((value) => `[${value.txHash} ${value.index}]`).join(', ')
        throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NO_INPUTS, [utxos])
      }

      return privateKeysToSign
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  // TODO off for now, different address types break logic, offchain tx conflicts
  const verifyPrivateKey = (privateKey: string, address: string, options: BtcBasedTxOptions): void => {
    if (utils.generateAddressFromPrivateKey(privateKey, options) !== address && !options.skipAllChecks) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_MISSING_PRIVATE_KEY)
    }
  }

  async function getUtxoSilent(hash: string, i: number): Promise<BtcUTXO | LtcUTXO | null> {
    try {
      return await apiCalls.getUtxo(hash, i)
    } catch (e) {
      return null
    }
  }

  const prepareSignedTransaction = async function (
    body: BtcBasedTransactionTypes,
    options: BtcBasedTxOptions,
  ): Promise<string> {
    try {
      const tx: BtcBasedTransaction = new createTransaction()
      let privateKeysToSign: string[] = []

      if (body.changeAddress) {
        tx.change(body.changeAddress)
      }
      if (body.fee) {
        tx.fee(amountUtils.toSatoshis(body.fee))
      }
      body.to.forEach((to) => {
        tx.to(to.address, amountUtils.toSatoshis(to.value))
      })

      if ('fromAddress' in body) {
        privateKeysToSign = await privateKeysFromAddress(tx, body, options)

        const fromAddress = body.fromAddress
        if (fromAddress && 'signatureId' in fromAddress[0] && fromAddress[0].signatureId) {
          return JSON.stringify(tx)
        }
      } else if ('fromUTXO' in body) {
        privateKeysToSign = await privateKeysFromUTXO(tx, body, options)

        const fromUTXO = body.fromUTXO
        if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
          return JSON.stringify(tx)
        }
      }

      new Set(privateKeysToSign).forEach((key) => {
        tx.sign(new createPrivateKey(key))
      })

      const ltcSerialization = currency === Currency.LTC //TODO some troubles in signing LTC?
      if (ltcSerialization && !options.skipAllChecks) {
        verifyAmounts(tx, body)
      }

      return tx.serialize(ltcSerialization || options.skipAllChecks)
    } catch (e: any) {
      if (e instanceof SdkError) {
        throw e
      }
      throw new BtcBasedSdkError(e)
    }
  }

  const verifyAmounts = (tx: Transaction, body: BtcBasedTransactionTypes) => {
    const outputsSum: BigNumber = body.to
      .map((to) => amountUtils.toSatoshis(to.value))
      .reduce((e, acc) => e.plus(acc), new BigNumber(0))

    const inputsSum: BigNumber = tx.inputs
      .map((i: any) => new BigNumber(i.output.satoshis))
      .reduce((v: BigNumber, acc: BigNumber) => v.plus(acc), new BigNumber(0))

    if (outputsSum.eq(inputsSum)) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
    }

    if (outputsSum.gt(inputsSum)) {
      throw new BtcBasedSdkError(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
    }
  }

  const sendTransaction = async function (
    body: BtcBasedTransactionTypes,
    options: BtcBasedTxOptions,
  ): Promise<TransactionHash> {
    return apiCalls.broadcast({
      txData: await prepareSignedTransaction(body, options),
    })
  }

  return {
    /**
     * Send bitcoin based transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain
     */
    sendTransaction,
    /**
     * Prepare a signed bitcoin based transaction with the private key locally. Nothing is broadcasted to the blockchain.
     * @returns raw transaction data in hex, to be broadcasted to blockchain.
     */
    prepareSignedTransaction,
  }
}
