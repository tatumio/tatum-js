import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { Currency, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { toWei } from 'web3-utils'
import {
  CeloTransactionConfig,
  celoUtils,
  SmartContractWriteMethodInvocationCelo,
} from '../../utils/celo.utils'

const prepareSmartContractWriteMethodInvocation = async (
  body: SmartContractWriteMethodInvocationCelo,
  provider?: string,
  testnet?: boolean,
) => {
  const {
    fromPrivateKey,
    feeCurrency,
    fee,
    params,
    methodName,
    methodABI,
    contractAddress,
    nonce,
    signatureId,
    amount,
  } = body

  const celoProvider = celoUtils.getProvider(provider)
  const network = await celoProvider.ready

  const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)

  const url = provider ?? TATUM_API_CONSTANTS.URL

  const contract = new new Web3(url).eth.Contract([methodABI], contractAddress.trim())

  const transaction: CeloTransactionConfig = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce,
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    gasLimit: evmBasedUtils.gasLimitToHexWithFallback(fee?.gasLimit),
    gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
    to: contractAddress.trim(),
    data: contract.methods[methodName as string](...params).encodeABI(),
  }
  if (signatureId) {
    return JSON.stringify(transaction)
  }

  const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
  const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
    wallet,
    feeCurrencyContractAddress,
  )

  transaction.nonce = transaction.nonce || txCount
  transaction.from = from
  transaction.gasLimit =
    transaction.gasLimit ??
    (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  transaction.gasPrice = fee?.gasPrice
    ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16)
    : gasPrice.toHexString()
  return wallet.signTransaction(transaction)
}

const prepareSmartContractReadMethodInvocation = async (
  body: SmartContractWriteMethodInvocationCelo,
  provider?: string,
): Promise<string> => {
  const { params, methodName, methodABI, contractAddress } = body
  const url = provider ?? TATUM_API_CONSTANTS.URL

  const contract = new new Web3(url).eth.Contract([methodABI], contractAddress.trim())

  return contract.methods[methodName as string](...params).call()
}

export const smartContract = (args: { broadcastFunction: BroadcastFunction }) => {
  return {
    prepare: {
      /**
       * Prepare a smart contract write method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      smartContractWriteMethodInvocation: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
        testnet?: boolean,
      ) => prepareSmartContractWriteMethodInvocation(body, provider, testnet),
      /**
       * Prepare a signed Celo smart contract read method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      smartContractReadMethodInvocation: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
      ) => prepareSmartContractReadMethodInvocation(body, provider),
    },
    send: {
      /**
       * Send Celo smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractWriteMethodInvocation: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        await args.broadcastFunction({
          txData: await prepareSmartContractWriteMethodInvocation(body, provider, testnet),
          signatureId: body.signatureId,
        }),
      /**
       * Send Celo smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractReadMethodInvocation: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
      ) =>
        await args.broadcastFunction({
          txData: await prepareSmartContractReadMethodInvocation(body, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}
