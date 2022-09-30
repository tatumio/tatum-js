import { EvmBasedBlockchain } from '@tatumio/shared-core'
import Web3 from 'web3'
import {
  CustodialWalletFactoryV2,
  evmBasedGasPump,
  evmBasedWeb3,
  indexesFromRange,
} from '@tatumio/shared-blockchain-evm-based'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { BigNumber as BN } from '@ethersproject/bignumber/lib/bignumber'
import BigNumber from 'bignumber.js'
import { toWei } from 'web3-utils'
import { celoUtils } from '@tatumio/celo'

export const celoGasPump = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)
  return {
    prepare: {
      gasPumpBatch: async (body: any, provider?: string, testnet?: boolean) => {
        const indexes = indexesFromRange(body.from, body.to)
        const params = [body.owner.trim(), indexes]
        const methodName = 'createBatch'
        const contractAddress = evmBasedGasPump().getGasPumpFactoryContractAddress(body.chain, testnet)
        const methodABI: any = CustodialWalletFactoryV2.abi.find((a) => a.name === methodName)
        const { fromPrivateKey, fee, signatureId, gasLimit } = body
        const client = args.client ?? evmBasedWeb3Result.getClient(provider, body.fromPrivateKey)

        const contract = new client.eth.Contract([methodABI])

        const transaction = {
          fee: body.fee,
          nonce: body.nonce,
          fromPrivateKey: body.fromPrivateKey,
          signatureId: body.signatureId,
          index: body.index,
          amount: body.amount,
          from: 0,
          to: contractAddress.trim(),
          contractAddress: body.contractAddress,
          methodName: methodName,
          data: contract.methods[methodName as string](...params).encodeABI(),
          feeCurrency: body.feeCurrency ? celoUtils.getFeeCurrency(body.feeCurrency, testnet) : undefined,
          params,
          gasPrice: fee ? fee.gasPrice : undefined,
          methodABI,
        }

        const p = new CeloProvider(provider)
        const network = await p.ready

        let currentGasPrice
        if (transaction.gasPrice) {
          currentGasPrice =
            transaction.gasPrice instanceof BN
              ? transaction.gasPrice
              : `0x${new BigNumber(toWei(transaction.gasPrice as string, 'gwei')).toString(16)}`
        }

        const celoTransaction: any = {
          chainId: network.chainId,
          feeCurrency: transaction.feeCurrency,
          nonce: transaction.nonce,
          gasLimit: gasLimit ? `0x${new BigNumber(gasLimit).toString(16)}` : undefined,
          gasPrice: currentGasPrice,
          to: transaction.to,
          data: transaction.data,
        }

        if (signatureId) {
          return JSON.stringify(celoTransaction)
        }

        if (!fromPrivateKey) {
          throw new Error('signatureId or fromPrivateKey has to be defined')
        }
        const wallet = new CeloWallet(fromPrivateKey as string, p)

        const walletInfo = await obtainWalletInformation(wallet)

        celoTransaction.nonce = transaction.nonce || walletInfo.txCount
        celoTransaction.from = walletInfo.from

        const gasLimitDefined = (await wallet.estimateGas(celoTransaction)).add(
          celoUtils.isCeloAddress(transaction.feeCurrency) ? 0 : 100000,
        )
        celoTransaction.gasLimit = gasLimitDefined ? gasLimitDefined.toHexString() : celoTransaction.gasLimit
        return wallet.signTransaction(celoTransaction)
      },
    },
  }
}

const obtainWalletInformation = async (wallet: CeloWallet) => {
  const [txCount, from] = await Promise.all([wallet.getTransactionCount(), wallet.getAddress()])
  return {
    txCount,
    from,
  }
}
