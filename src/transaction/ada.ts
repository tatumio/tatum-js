import {
  Address,
  BigNum,
  Bip32PrivateKey, hash_transaction,
  LinearFee, make_vkey_witness, Transaction, TransactionBody,
  TransactionBuilder, TransactionHash, TransactionInput, TransactionOutput, TransactionWitnessSet, Value, Vkeywitnesses,
} from '@emurgo/cardano-serialization-lib-nodejs'
import BigNumber from 'bignumber.js'
import { adaBroadcast, adaGetBlockChainInfo, adaGetTransaction, adaGetUtxos } from '../blockchain/ada'
import { validateBody } from '../connector/tatum'
import { AdaUtxo, Currency, FromAddress, FromUTXO, To, TransactionKMS, TransferAdaBlockchain } from '../model'

/**
 * Prepare a signed Ada transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @param transferAdaBlockchain content of the transaction to prepare.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareAdaTransaction = async (transferAdaBlockchain: TransferAdaBlockchain) => {
  await validateBody(transferAdaBlockchain, TransferAdaBlockchain)
  const txBuilder = await initTransactionBuilder()
  const { to } = transferAdaBlockchain

  const { privateKeysToSign, amount: fromAmount } = await addInputs(txBuilder, transferAdaBlockchain)
  const toAmount = addOutputs(txBuilder, to)
  await processFeeAndRest(txBuilder, fromAmount, toAmount, transferAdaBlockchain)

  return signTransaction(txBuilder, transferAdaBlockchain, privateKeysToSign)
}

/**
 * Send Ada transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendAdaTransaction = async (body: TransferAdaBlockchain) => {
  return adaBroadcast(await prepareAdaTransaction(body))
}

/**
 * Sign Ada pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signAdaKMSTransaction = async (tx: TransactionKMS, privateKeys: string[]) => {
  if (tx.chain !== Currency.ADA) {
    throw Error('Unsupported chain.')
  }
  const transferAdaBlockchain = JSON.parse(tx.serializedTransaction).txData
  const txBuilder = await initTransactionBuilder()
  const { to } = transferAdaBlockchain

  const {amount: fromAmount } = await addInputs(txBuilder, transferAdaBlockchain)
  const toAmount = addOutputs(txBuilder, to)
  await processFeeAndRest(txBuilder, fromAmount, toAmount, transferAdaBlockchain)

  const txBody = txBuilder.build()
  const txHash = hash_transaction(txBody)


  const vKeyWitnesses = Vkeywitnesses.new()
  for (const key of privateKeys) {
    makeWitness(key, txHash, vKeyWitnesses)
  }
  const witnesses = TransactionWitnessSet.new()
  witnesses.set_vkeys(vKeyWitnesses)

  return Buffer.from(
    Transaction.new(txBody, witnesses).to_bytes(),
  ).toString('hex')
}

export const addOutputs = (transactionBuilder: TransactionBuilder, tos: To[]) => {
  let amount = new BigNumber(0)
  for (const to of tos) {
    const valueAdded = addOutputAda(transactionBuilder, to.address, to.value)
    amount = amount.plus(valueAdded)
  }
  return amount
}

export const addFee = (txBuilder: TransactionBuilder, feeInLovelace: BigNumber) => {
  txBuilder.set_fee(BigNum.from_str(feeInLovelace.toString()))
}

export const addChangeIfNeeded = (txBuilder: TransactionBuilder, changeAddress: string) => {
  txBuilder.add_change_if_needed(Address.from_bech32(changeAddress))
}

export const addInputs = async (transactionBuilder: TransactionBuilder, transferAdaBlockchain: TransferAdaBlockchain) => {
  const { fromUTXO, fromAddress } = transferAdaBlockchain
  if (fromAddress) {
    return addAddressInputs(transactionBuilder, fromAddress)
  }
  if (fromUTXO) {
    return addUtxoInputs(transactionBuilder, fromUTXO)
  }
  throw new Error('Field fromAddress or fromUTXO is not filled.')
}

export const addAddressInputs = async (transactionBuilder: TransactionBuilder, fromAddresses: FromAddress[]) => {
  const amount = await addAddressInputsWithoutPrivateKey(transactionBuilder, fromAddresses)
  const privateKeysToSign = await addInputsPrivateKeys(fromAddresses)
  return { amount, privateKeysToSign }
}

export const addAddressInputsWithoutPrivateKey = async (transactionBuilder: TransactionBuilder, fromAddresses: { address: string }[]) => {
  let amount = new BigNumber(0)
  for (const fromAddress of fromAddresses) {
    const { address } = fromAddress
    const utxos: AdaUtxo[] = await adaGetUtxos(address)
    for (const utxo of utxos) {
      amount = amount.plus(utxo.value)
      addInput(transactionBuilder, utxo, address)
    }
  }
  return amount
}

export const addInputsPrivateKeys = async (froms: FromAddress[] | FromUTXO[]) => {
  const privateKeysToSign = []
  for (const from of froms) {
    privateKeysToSign.push(from.signatureId || from.privateKey)
  }
  return privateKeysToSign
}

export const addUtxoInputs = async (transactionBuilder: TransactionBuilder, fromUTXOs: FromUTXO[]) => {
  let amount = new BigNumber(0)
  const privateKeysToSign = []
  for (const utxo of fromUTXOs) {
    const transaction = await adaGetTransaction(utxo.txHash)
    const output = transaction.outputs.find(output => output.index === utxo.index)
    if (output) {
      const value = output.value
      amount = amount.plus(value)
      addInput(transactionBuilder, { value, ...utxo }, output.address)
      privateKeysToSign.push(utxo.signatureId || utxo.privateKey)
    }
  }
  return { amount, privateKeysToSign }
}

export const addOutputLovelace = (transactionBuilder: TransactionBuilder, address: string, amount: string) => {
  transactionBuilder.add_output(TransactionOutput.new(
    Address.from_bech32(address),
    Value.new(BigNum.from_str(amount)),
  ))
}

export const addOutputAda = (transactionBuilder: TransactionBuilder, address: string, amount: string | number) => {
  const amountLovelace = adaToLovelace(amount)
  addOutputLovelace(transactionBuilder, address, amountLovelace)
  return amountLovelace
}

export const addInput = (transactionBuilder: TransactionBuilder, utxo: AdaUtxo, address: string) => {
  transactionBuilder.add_input(
    Address.from_bech32(address),
    TransactionInput.new(
      TransactionHash.from_bytes(Buffer.from(utxo.txHash, 'hex')),
      utxo.index,
    ),
    Value.new(BigNum.from_str(utxo.value)),
  )
}

export const initTransactionBuilder = async () => {
  const txBuilder = TransactionBuilder.new(
    LinearFee.new(
      BigNum.from_str('44'),
      BigNum.from_str('155381'),
    ),
    BigNum.from_str('1000000'),
    BigNum.from_str('500000000'),
    BigNum.from_str('2000000'),
  )
  const { tip: { slotNo } } = await adaGetBlockChainInfo()
  txBuilder.set_ttl(slotNo + 50000)
  return txBuilder
}

export const createWitnesses = (transactionBody: TransactionBody, transferAdaBlockchain: TransferAdaBlockchain) => {
  const { fromAddress, fromUTXO } = transferAdaBlockchain
  const txHash = hash_transaction(transactionBody)
  const vKeyWitnesses = Vkeywitnesses.new()
  if (fromAddress) {
    for (const address of fromAddress) {
      if (address.privateKey) {
        makeWitness(address.privateKey, txHash, vKeyWitnesses)
      }
    }
  } else if (fromUTXO) {
    for (const utxo of fromUTXO) {
      if (utxo.privateKey) {
        makeWitness(utxo.privateKey, txHash, vKeyWitnesses)
      }
    }
  } else {
    throw new Error('No private key for witness found.')
  }
  const witnesses = TransactionWitnessSet.new()
  witnesses.set_vkeys(vKeyWitnesses)
  return witnesses
}

export const makeWitness = (privateKey: string, txHash: TransactionHash, vKeyWitnesses: Vkeywitnesses) => {
  const privateKeyCardano = Bip32PrivateKey.from_128_xprv(
    Buffer.from(privateKey, 'hex'),
  ).to_raw_key()
  vKeyWitnesses.add(make_vkey_witness(txHash, privateKeyCardano))
}

export const processFeeAndRest = async (
  transactionBuilder: TransactionBuilder,
  fromAmountInLovelace: BigNumber,
  toAmountInLovelace: BigNumber,
  transferAdaBlockchain: TransferAdaBlockchain,
) => {
  const feeInLovelace = new BigNumber(adaToLovelace(transferAdaBlockchain?.fee || 0))
  const changeAddress = transferAdaBlockchain.changeAddress
  if (feeInLovelace.isEqualTo(0)) {
    addChangeIfNeeded(transactionBuilder, changeAddress)
  } else {
    const changeInLovelace = fromAmountInLovelace.minus(toAmountInLovelace).minus(feeInLovelace)
    if (changeInLovelace.gt(0))
      addOutputLovelace(transactionBuilder, changeAddress, changeInLovelace.toString())
    addFee(transactionBuilder, feeInLovelace)
  }
}

export const signTransaction = (transactionBuilder: TransactionBuilder, transferAdaBlockchain: TransferAdaBlockchain, privateKeysToSign: (string|undefined)[]) => {
  const txBody = transactionBuilder.build()
  const { fromAddress, fromUTXO } = transferAdaBlockchain

  if ((fromAddress && fromAddress[0].signatureId) || (fromUTXO && fromUTXO[0].signatureId)) {
    return JSON.stringify({ txData: transferAdaBlockchain, privateKeysToSign })
  }

  const witnesses = createWitnesses(txBody, transferAdaBlockchain)

  return Buffer.from(
    Transaction.new(txBody, witnesses).to_bytes(),
  ).toString('hex')
}

export const lovelaceToAda = (lovelace: string | number) => new BigNumber(lovelace).dividedBy(1000000).toFixed(8, BigNumber.ROUND_FLOOR).toString()
export const adaToLovelace = (ada: string | number) => new BigNumber(ada).times(1000000).toString()