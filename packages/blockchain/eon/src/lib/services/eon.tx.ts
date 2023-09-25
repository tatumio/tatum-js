import { ChainDeployErc721 } from '@tatumio/shared-blockchain-abstract'
import {
  Erc721Token_Cashback,
  Erc721Token_General,
  Erc721_Provenance,
  EvmBasedWeb3,
  evmBasedUtils,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'

const deploySignedTransaction = async ({
  body,
  web3,
  provider,
  chainId,
  estimateGasFn,
}: {
  body: ChainDeployErc721
  web3: EvmBasedWeb3
  provider?: string
  chainId: number
  estimateGasFn: (tx: any) => Promise<number>
}) => {
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance, cashback, publicMint } = body

  if (provenance && cashback) {
    throw new Error('Only one of provenance or cashback must be present and true.')
  }

  const client = await web3.getClient(provider, fromPrivateKey)

  let abi = Erc721Token_General.abi
  let deployData = Erc721Token_General.bytecode
  if (body.provenance) {
    abi = Erc721_Provenance.abi
    deployData = Erc721_Provenance.bytecode
  } else if (body.cashback) {
    abi = Erc721Token_Cashback.abi
    deployData = Erc721Token_Cashback.bytecode
  }

  const contract = new client.eth.Contract(abi as any)

  const deploy = contract.deploy({
    arguments: [name, symbol, publicMint ?? false],
    data: deployData,
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
    chainId,
  }
  return prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    estimateGasFn,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
  )
}

const prepareSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  web3: EvmBasedWeb3,
  estimateGasFn: (tx: any) => Promise<number>,
  signatureId?: string,
  fromPrivateKey?: string,
  gasLimit?: string,
  gasPrice?: string,
  provider?: string,
) => {
  const gasPriceDefined = gasPrice
    ? client.utils.toWei(gasPrice, 'gwei')
    : await web3.getGasPriceInWei(provider)
  const tx: TransactionConfig = {
    from: 0,
    ...transaction,
    gas: gasLimit,
    gasPrice: gasPriceDefined,
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  tx.from = tx.from || client.eth.defaultAccount || 0

  tx.gas = tx.gas ?? (await estimateGasFn(tx))

  if (!fromPrivateKey) {
    throw new Error('signatureId or fromPrivateKey has to be defined')
  }

  await evmBasedUtils.validateSenderBalance(client, fromPrivateKey, tx)

  const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

  if (!signedTransaction.rawTransaction) {
    throw new Error('Unable to get signed tx data')
  }

  return signedTransaction.rawTransaction
}

export const eonTxService = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  estimateGasFn: (tx: any) => Promise<number>
}) => {
  return {
    erc721: {
      prepare: {
        deploySignedTransaction: async (body: ChainDeployErc721, chainId: number, provider?: string) =>
          deploySignedTransaction({
            body,
            web3: args.web3,
            provider,
            chainId,
            estimateGasFn: args.estimateGasFn,
          }),
      },
    },
  }
}
