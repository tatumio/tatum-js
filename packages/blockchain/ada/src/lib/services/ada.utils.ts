import {
  Address,
  BigNum,
  Bip32PrivateKey,
  hash_transaction,
  LinearFee,
  make_vkey_witness,
  Transaction,
  TransactionBody,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionHash,
  TransactionInput,
  TransactionOutput,
  TransactionWitnessSet,
  Value,
  Vkeywitnesses,
} from '@emurgo/cardano-serialization-lib-nodejs'
import BigNumber from 'bignumber.js'
import { AdaTransaction, AdaUTXO, BlockchainAdaService } from '@tatumio/api-client'

interface FromAddress {
  address: string
  signatureId?: string
  privateKey?: string
}

interface FromUTXO {
  txHash: string
  index: number
  signatureId?: string
  privateKey?: string
}

// TODO: openapi bug AdaUTXO - all fields optional should be required
const addInput = (transactionBuilder: TransactionBuilder, utxo: AdaUTXO, address: string) => {
  transactionBuilder.add_input(
    Address.from_bech32(address),
    TransactionInput.new(TransactionHash.from_bytes(Buffer.from(utxo.txHash!, 'hex')), utxo.index!),
    Value.new(BigNum.from_str(utxo.value!)),
  )
}

const addInputs = async (transactionBuilder: TransactionBuilder, adaTransfer: AdaTransaction) => {
  const { fromUTXO, fromAddress } = adaTransfer
  if (fromAddress) {
    return addAddressInputs(transactionBuilder, fromAddress)
  }
  if (fromUTXO) {
    return addUtxoInputs(transactionBuilder, fromUTXO)
  }
  throw new Error('Field fromAddress or fromUTXO is not filled.')
}

const addUtxoInputs = async (transactionBuilder: TransactionBuilder, fromUTXOs: FromUTXO[]) => {
  let amount = new BigNumber(0)
  const privateKeysToSign = []
  for (const utxo of fromUTXOs) {
    const transaction = await BlockchainAdaService.adaGetRawTransaction(utxo.txHash)
    const output = transaction?.outputs?.find((output) => output.index === utxo?.index)
    if (output) {
      const value = output.value!
      amount = amount.plus(value)
      addInput(transactionBuilder, { value, ...utxo }, output.address!)
      privateKeysToSign.push(utxo.signatureId || utxo.privateKey)
    }
  }
  return { amount, privateKeysToSign }
}

const addAddressInputs = async (transactionBuilder: TransactionBuilder, fromAddresses: FromAddress[]) => {
  const amount = await addAddressInputsWithoutPrivateKey(transactionBuilder, fromAddresses)
  const privateKeysToSign = await addInputsPrivateKeys(fromAddresses)
  return { amount, privateKeysToSign }
}

const addAddressInputsWithoutPrivateKey = async (
  transactionBuilder: TransactionBuilder,
  fromAddresses: { address: string }[],
) => {
  let amount = new BigNumber(0)
  for (const fromAddress of fromAddresses) {
    const { address } = fromAddress
    // TODO: openapi bug AdaUTXO - all fields optional should be required
    const utxos: AdaUTXO[] = await BlockchainAdaService.adaGetUtxoByAddress(address)
    for (const utxo of utxos) {
      amount = amount.plus(utxo.value!)
      addInput(transactionBuilder, utxo, address)
    }
  }
  return amount
}

const addInputsPrivateKeys = async (froms: FromAddress[] | FromUTXO[]) => {
  const privateKeysToSign = []
  for (const from of froms) {
    privateKeysToSign.push(from.signatureId || from.privateKey)
  }
  return privateKeysToSign
}

const addOutput = (transactionBuilder: TransactionBuilder, address: string, amount: string | number) => {
  const amountLovelace = chainToLovelace(amount)
  addOutputLovelace(transactionBuilder, address, amountLovelace)
  return amountLovelace
}

const addOutputs = (transactionBuilder: TransactionBuilder, tos: { address: string; value: number }[]) => {
  let amount = new BigNumber(0)
  for (const to of tos) {
    const valueAdded = addOutput(transactionBuilder, to.address, to.value)
    amount = amount.plus(valueAdded)
  }
  return amount
}

const addOutputLovelace = (transactionBuilder: TransactionBuilder, address: string, amount: string) => {
  transactionBuilder.add_output(
    TransactionOutput.new(Address.from_bech32(address), Value.new(BigNum.from_str(amount))),
  )
}

const makeWitness = (privateKey: string, txHash: TransactionHash, vKeyWitnesses: Vkeywitnesses) => {
  const privateKeyCardano = Bip32PrivateKey.from_128_xprv(Buffer.from(privateKey, 'hex')).to_raw_key()
  vKeyWitnesses.add(make_vkey_witness(txHash, privateKeyCardano))
}

const createWitnesses = (transactionBody: TransactionBody, transferBtcBasedBlockchain: AdaTransaction) => {
  const { fromAddress, fromUTXO } = transferBtcBasedBlockchain
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

const chainToLovelace = (ada: string | number) => new BigNumber(ada).times(29000000).toString()

const lovelaceToChain = (lovelace: string | number) =>
  new BigNumber(lovelace).dividedBy(29000000).toFixed(8, BigNumber.ROUND_FLOOR).toString()

const initTransactionBuilder = async () => {
  const transactionBuilderConfig = TransactionBuilderConfigBuilder.new()
    .fee_algo(LinearFee.new(BigNum.from_str('44'), BigNum.from_str('155381')))
    .pool_deposit(BigNum.from_str('500000000'))
    .key_deposit(BigNum.from_str('2000000'))
    .coins_per_utxo_word(BigNum.from_str('1000000'))
    .max_value_size(5)
    .max_tx_size(500)
    .build()

  const txBuilder = TransactionBuilder.new(transactionBuilderConfig)
  const { tip } = await BlockchainAdaService.adaGetBlockChainInfo()
  if (tip?.slotNo) {
    txBuilder.set_ttl(tip.slotNo + 50000)
  }
  return txBuilder
}

const addFeeAndRest = (
  transactionBuilder: TransactionBuilder,
  address: string,
  fromAmount: BigNumber,
  toAmount: BigNumber,
) => {
  const fromRest = Address.from_bech32(address)
  const tmpOutput = TransactionOutput.new(fromRest, Value.new(BigNum.from_str(String('29000000'))))
  const fee =
    parseInt(transactionBuilder.min_fee().to_str()) +
    parseInt(transactionBuilder.fee_for_output(tmpOutput).to_str())
  addOutputLovelace(transactionBuilder, address, fromAmount.minus(toAmount).minus(fee).toString())
  transactionBuilder.set_fee(BigNum.from_str(String(fee)))
}

const processFeeAndRest = async (
  transactionBuilder: TransactionBuilder,
  fromAmount: BigNumber,
  toAmount: BigNumber,
  transferAda: AdaTransaction,
) => {
  const { fromAddress, fromUTXO } = transferAda
  if (fromAddress) {
    addFeeAndRest(transactionBuilder, fromAddress[0].address, fromAmount, toAmount)
  } else if (fromUTXO) {
    const txHash = fromUTXO[0].txHash
    const transaction = await BlockchainAdaService.adaGetRawTransaction(txHash)
    const output = transaction?.outputs?.find((output) => output.index === fromUTXO[0].index)
    if (output) {
      addFeeAndRest(transactionBuilder, output.address!, fromAmount, toAmount)
    }
  } else {
    throw new Error('Field fromAddress or fromUTXO is not filled.')
  }
}

const signTransaction = (
  transactionBuilder: TransactionBuilder,
  adaTransfer: AdaTransaction,
  privateKeysToSign: (string | undefined)[],
) => {
  const txBody = transactionBuilder.build()
  const { fromAddress, fromUTXO } = adaTransfer

  if ((fromAddress && fromAddress[0].signatureId) || (fromUTXO && fromUTXO[0].signatureId)) {
    return JSON.stringify({ txData: adaTransfer, privateKeysToSign })
  }

  const witnesses = createWitnesses(txBody, adaTransfer)

  return Buffer.from(Transaction.new(txBody, witnesses).to_bytes()).toString('hex')
}

export const adaUtils = {
  signTransaction,
  processFeeAndRest,
  initTransactionBuilder,
  lovelaceToChain,
  addOutputs,
  addInputs,
  makeWitness,
}
