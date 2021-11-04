import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { ethGetTransactionsCount } from '../blockchain'
import {
  Currency,
  ETH_BASED_CURRENCIES,
  getAccountById,
  getVirtualCurrencyByName,
  TransactionKMS,
  validateBody,
  CONTRACT_ADDRESSES,
  CONTRACT_DECIMALS,
  TransferOffchain,
} from '@tatumio/tatum-core'
import { PrepareEthErc20SignedOffchainTransaction, PrepareEthSignedOffchainTransaction } from '../model'
import { ethGetGasPriceInWei, getClient } from '../transaction'
import { generatePrivateKeyFromMnemonic } from '../wallet'
import { offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal } from './common'
import { offchainTransferEthKMS } from './kms'

/**
 * Send Ethereum transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendEthOffchainTransaction = async (testnet: boolean, body: TransferOffchain, provider?: string) => {
  if (body.signatureId) {
    return offchainTransferEthKMS(body)
  }
  await validateBody(body, TransferOffchain)
  const { mnemonic, index, privateKey, nonce, ...withdrawal } = body
  const { amount, address } = withdrawal

  let fromPriv: string
  if (mnemonic && index !== undefined) {
    fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(testnet, mnemonic, index) : (privateKey as string)
  } else if (privateKey) {
    fromPriv = privateKey
  } else {
    throw new Error('No mnemonic or private key is present.')
  }

  const web3 = await getClient(provider, fromPriv)
  const gasPrice = body.gasPrice ? web3.utils.toWei(body.gasPrice, 'gwei') : await ethGetGasPriceInWei()

  const account = await getAccountById(withdrawal.senderAccountId)
  const { txData, gasLimit } = await prepareEthSignedOffchainTransaction({
    amount,
    privateKey: fromPriv,
    address,
    currency: account.currency,
    web3,
    gasPrice,
    nonce,
    gasLimit: body.gasLimit,
  })
  // @ts-ignore
  withdrawal.fee = new BigNumber(
    web3.utils.fromWei(new BigNumber(body.gasLimit || gasLimit).multipliedBy(gasPrice).toString(), 'ether')
  ).toString()
  const { id } = await offchainStoreWithdrawal(withdrawal)
  try {
    return { ...(await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.ETH })), id }
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
 * Send Ethereum ERC20 transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendEthErc20OffchainTransaction = async (testnet: boolean, body: TransferOffchain, provider?: string) => {
  await validateBody(body, TransferOffchain)
  const { mnemonic, index, privateKey, nonce, ...withdrawal } = body
  const { amount, address } = withdrawal

  let fromPriv
  if (mnemonic && index !== undefined) {
    fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(testnet, mnemonic, index) : (privateKey as string)
  } else if (privateKey) {
    fromPriv = privateKey
  } else {
    throw new Error('No mnemonic or private key is present.')
  }

  const web3 = await getClient(provider, fromPriv)
  const gasPrice = body.gasPrice ? web3.utils.toWei(body.gasPrice, 'gwei') : await ethGetGasPriceInWei()

  const account = await getAccountById(withdrawal.senderAccountId)

  if (ETH_BASED_CURRENCIES.includes(account.currency)) {
    return sendEthOffchainTransaction(testnet, body, provider)
  }

  const vc = await getVirtualCurrencyByName(account.currency)
  const { txData, gasLimit } = await prepareEthErc20SignedOffchainTransaction({
    amount,
    privateKey: fromPriv,
    address,
    web3,
    tokenAddress: vc.erc20Address as string,
    gasPrice,
    nonce,
    gasLimit: body.gasLimit,
  })
  // @ts-ignore
  withdrawal.fee = new BigNumber(web3.utils.fromWei(new BigNumber(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString()
  const { id } = await offchainStoreWithdrawal(withdrawal)
  try {
    return { ...(await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.ETH })), id }
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
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEthOffchainKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
  if (tx.chain !== Currency.ETH) {
    throw Error('Unsupported chain.')
  }
  const client = await getClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
  if (!transactionConfig.nonce) {
    transactionConfig.nonce = await ethGetTransactionsCount(client.eth.defaultAccount as string)
  }
  if (
    !transactionConfig.gasPrice ||
    transactionConfig.gasPrice === '0' ||
    transactionConfig.gasPrice === 0 ||
    transactionConfig.gasPrice === '0x0'
  ) {
    transactionConfig.gasPrice = await ethGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

/**
 * Sign Ethereum transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @returns transaction data to be broadcast to blockchain.
 * @param body
 */
export const prepareEthSignedOffchainTransaction = async (body: PrepareEthSignedOffchainTransaction) => {
  await validateBody(body, PrepareEthSignedOffchainTransaction)
  const { currency, address, amount, gasLimit, gasPrice, nonce, privateKey, web3 } = body
  let tx: TransactionConfig
  if (currency === Currency.ETH) {
    tx = {
      from: 0,
      to: address.trim(),
      value: web3.utils.toWei(amount, 'ether'),
      gasPrice,
      nonce,
    }
  } else {
    if (!Object.keys(CONTRACT_ADDRESSES).includes(currency)) {
      throw new Error('Unsupported ETH ERC20 blockchain.')
    }
    // @ts-ignore
    const contract = new web3.eth.Contract(tokenAbi, CONTRACT_ADDRESSES[currency])

    tx = {
      from: 0,
      to: CONTRACT_ADDRESSES[currency],
      data: contract.methods
        .transfer(
          address.trim(),
          `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(CONTRACT_DECIMALS[currency])).toString(16)}`
        )
        .encodeABI(),
      gasPrice,
      nonce,
    }
  }
  tx.gas = gasLimit || (await web3.eth.estimateGas(tx))
  return {
    txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
    gasLimit: tx.gas,
  }
}

/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @returns transaction data to be broadcast to blockchain.
 * @param body
 */
export const prepareEthErc20SignedOffchainTransaction = async (body: PrepareEthErc20SignedOffchainTransaction) => {
  await validateBody(body, PrepareEthErc20SignedOffchainTransaction)

  const { amount, privateKey, address, gasPrice, nonce, tokenAddress, web3, gasLimit } = body
  // @ts-ignore
  const contract = new web3.eth.Contract(tokenAbi, tokenAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: tokenAddress.trim(),
    data: contract.methods
      .transfer(address.trim(), `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18)).toString(16)}`)
      .encodeABI(),
    gasPrice,
    nonce,
  }
  tx.gas = gasLimit || (await web3.eth.estimateGas(tx))
  return {
    txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
    gasLimit: tx.gas,
  }
}
