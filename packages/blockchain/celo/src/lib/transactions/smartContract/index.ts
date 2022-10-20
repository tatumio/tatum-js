import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { CallReadSmartContractMethod, Currency } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import {
  evmBasedUtils,
  EvmBasedWeb3,
  smartContractReadMethodInvocation,
} from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { toWei } from 'web3-utils'
import {
  CeloTransactionConfig,
  celoUtils,
  SmartContractWriteMethodInvocationCelo,
} from '../../utils/celo.utils'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

const smartContractWriteMethodInvocation = async (
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

  const contract = new new Web3(celoUtils.getProviderUrl(provider)).eth.Contract(
    [methodABI],
    contractAddress.trim(),
  )

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

export const smartContract = (args: {
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  smartContractApiMethod: any
}) => {
  return {
    prepare: {
      /**
       * Prepare a smart contract write method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
       * @returns raw transaction data in hex, to be broadcasted to blockchain.
       */
      smartContractWriteMethodInvocationTransaction: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
        testnet?: boolean,
      ) =>
        evmBasedUtils.tryCatch(
          () => smartContractWriteMethodInvocation(body, provider, testnet),
          SdkErrorCode.EVM_SMART_CONTRACT_CANNOT_PREPARE_TX,
        ),
    },
    send: {
      /**
       * Send invoke smart contract transaction to the blockchain.
       * Invoked method only reads from blockchain the data and returns them back.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       */
      smartContractReadMethodInvocationTransaction: async (
        body: CallReadSmartContractMethod,
        provider?: string,
      ) => smartContractReadMethodInvocation(body, args.web3, provider),

      /**
       * Send Celo smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param testnet
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractMethodInvocationTransaction: async (
        body: SmartContractWriteMethodInvocationCelo,
        provider?: string,
        testnet?: boolean,
      ) => {
        if (body.signatureId) {
          return args.smartContractApiMethod(body)
        } else if (body.methodABI.stateMutability === 'view') {
          return smartContractReadMethodInvocation(body, args.web3, provider)
        } else {
          return args.broadcastFunction({
            txData: await smartContractWriteMethodInvocation(body, provider, testnet),
          })
        }
      },
    },
  }
}
