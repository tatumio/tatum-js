import BigNumber from 'bignumber.js'
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-doge'
import {
  validateBody,
  Currency,
  TransactionKMS,
  WithdrawalResponseData,
  KeyPair,
  TransferBtcBasedOffchain,
  ChainTransactionKMS,
  offchainBroadcast,
  offchainCancelWithdrawal,
  offchainStoreWithdrawal,
} from '@tatumio/tatum-core'
import { generateAddressFromXPub, generatePrivateKeyFromMnemonic } from '../wallet'
import { offchainTransferKMS } from './kms'

/**
 * Send Dogecoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
  if (body.signatureId) {
    return offchainTransferKMS(body)
  }
  await validateBody(body, TransferBtcBasedOffchain)
  const { mnemonic, keyPair, attr: changeAddress, xpub, ...withdrawal } = body
  if (!withdrawal.fee) {
    withdrawal.fee = '1'
  }
  const { id, data } = await offchainStoreWithdrawal(withdrawal)
  const { amount, address } = withdrawal
  let txData
  try {
    txData = await prepareSignedOffchainTransaction(
      testnet,
      data,
      amount,
      address,
      mnemonic,
      keyPair,
      changeAddress,
      xpub,
      withdrawal.multipleAmounts
    )
  } catch (e) {
    console.error(e)
    await offchainCancelWithdrawal(id)
    throw e
  }
  try {
    return { ...(await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.DOGE })), id }
  } catch (e) {
    console.error(e)
    try {
      await offchainCancelWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
    throw e
  }
}

/**
 * Sign Dogecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signOffchainKMSTransaction = async (tx: ChainTransactionKMS, mnemonic: string, testnet: boolean) => {
  ;(tx as TransactionKMS).chain = Currency.DOGE
  if (!tx.withdrawalResponses) {
    throw Error('Unsupported chain.')
  }
  const builder = new Transaction(JSON.parse(tx.serializedTransaction))
  for (const response of tx.withdrawalResponses) {
    if (response.vIn === '-1') {
      continue
    }
    builder.sign(PrivateKey.fromWIF(await generatePrivateKeyFromMnemonic(testnet, mnemonic, response.address?.derivationKey || 0)))
  }
  return builder.serialize(true)
}

/**
 * Sign Dogecoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address, if multiple recipients are present, it should be string separated by ','
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @param xpub xpub of the wallet
 * @param multipleAmounts if multiple recipients are present in the address separated by ',', this should be list of amounts to send
 * @param signatureId if using KMS, this is signatureId of the wallet representing mnemonic
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedOffchainTransaction = async (
  testnet: boolean,
  data: WithdrawalResponseData[],
  amount: string,
  address: string,
  mnemonic?: string,
  keyPair?: KeyPair[],
  changeAddress?: string,
  xpub?: string,
  multipleAmounts?: string[],
  signatureId?: string
) => {
  const tx = new Transaction()

  data.forEach((input) => {
    if (input.vIn !== '-1') {
      tx.from({
        txId: input.vIn,
        outputIndex: input.vInIndex,
        script: Script.fromAddress(input.address.address).toString(),
        satoshis: Number(new BigNumber(input.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
      })
    }
  })

  const lastVin = data.find((d) => d.vIn === '-1') as WithdrawalResponseData
  if (multipleAmounts?.length) {
    for (const [i, multipleAmount] of multipleAmounts.entries()) {
      tx.to(address.split(',')[i], Number(new BigNumber(multipleAmount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
    }
  } else {
    tx.to(address, Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
  }
  if (new BigNumber(lastVin.amount).isGreaterThan(0)) {
    if (xpub) {
      tx.to(
        generateAddressFromXPub(testnet, xpub, 0),
        Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR))
      )
    } else if (changeAddress) {
      tx.to(changeAddress, Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
    } else {
      throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.')
    }
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  for (const input of data) {
    // when there is no address field present, input is pool transfer to 0
    if (input.vIn === '-1') {
      continue
    }
    if (mnemonic) {
      const derivationKey = input.address?.derivationKey || 0
      tx.sign(PrivateKey.fromWIF(await generatePrivateKeyFromMnemonic(testnet, mnemonic, derivationKey)))
    } else if (keyPair) {
      const { privateKey } = keyPair.find((k) => k.address === input.address.address) as KeyPair
      tx.sign(PrivateKey.fromWIF(privateKey))
    } else {
      throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.')
    }
  }

  return tx.serialize(true)
}
