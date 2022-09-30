import { EvmBasedBlockchain } from '@tatumio/shared-core'
import Web3 from 'web3'
import {
  CustodialWalletFactoryV2,
  evmBasedGasPump,
  evmBasedUtils,
  evmBasedWeb3,
  indexesFromRange,
} from '@tatumio/shared-blockchain-evm-based'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import BigNumber from 'bignumber.js'
import { celoUtils } from '../utils/celo.utils'

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
        const feeCurrencyAddress = body.feeCurrency
          ? celoUtils.getFeeCurrency(body.feeCurrency, testnet)
          : undefined

        const p = new CeloProvider(provider)
        const network = await p.ready

        const celoTransaction: any = {
          chainId: network.chainId,
          feeCurrency: feeCurrencyAddress,
          nonce: body.nonce,
          gasLimit: gasLimit ? `0x${new BigNumber(gasLimit).toString(16)}` : undefined,
          gasPrice: evmBasedUtils.gasPriceWeiToHexWithFallback(fee?.gasPrice),
          to: contractAddress.trim(),
          data: contract.methods[methodName as string](...params).encodeABI(),
        }

        if (signatureId) {
          return JSON.stringify(celoTransaction)
        }

        if (!fromPrivateKey) {
          throw new Error('signatureId or fromPrivateKey has to be defined')
        }
        const wallet = new CeloWallet(fromPrivateKey as string, p)

        const walletInfo = await celoUtils.obtainWalletInformation(wallet, feeCurrencyAddress)

        celoTransaction.nonce = celoTransaction.nonce || walletInfo.txCount
        celoTransaction.from = walletInfo.from
        return celoUtils.prepareSignedTransactionAbstraction(wallet, celoTransaction)
      },
    },
  }
}
