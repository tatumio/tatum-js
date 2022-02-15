import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import Web3 from 'web3'
import { celoUtils, CeloTransactionConfig, ChainTransferCeloBlockchain } from '../../utils/celo.utils'
import { Erc20Token } from '@tatumio/shared-blockchain-evm-based'

const transferSignedTransaction = async (
  body: ChainTransferCeloBlockchain,
  provider?: string,
  testnet?: boolean,
) => {
  // TODO
  // await validateBody(body, ChainTransferCeloBlockchain)

  const { fromPrivateKey, signatureId, to, currency, feeCurrency, amount, nonce } = body
  const celoProvider = celoUtils.getProvider(provider)

  if (to && currency && feeCurrency && amount) {
    const network = await celoProvider.ready
    const feeCurrencyContractAddress = celoUtils.getFeeCurrency(feeCurrency, testnet)
    const currencyContractAddress = celoUtils.getFeeCurrency(currency, testnet)
    const contract = new new Web3().eth.Contract(Erc20Token.abi as any, to.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        currency: currencyContractAddress, // see below
        nonce,
        to: to.trim(),
        data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).toString(16)}`).encodeABI(),
      })
    }

    const wallet = new CeloWallet(fromPrivateKey as string, celoProvider)
    const { txCount, from } = await celoUtils.obtainWalletInformation(wallet, feeCurrencyContractAddress)

    /**
     * "invalid object key - currency (argument="transaction:currency""
     * this does not pass with currency appended to the tx (???) removed currency extension to TransactionConfig for now
     */
    const tx: CeloTransactionConfig = {
      chainId: network.chainId,
      from: from,
      to: to.trim(),
      data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).toString(16)}`).encodeABI(),
      value: `0x${new BigNumber(amount).toString(16)}`,
      nonce: nonce || txCount,
      feeCurrency: feeCurrencyContractAddress,
    }

    return await celoUtils.prepareSignedTransactionAbstraction(wallet, tx)
  }
  throw new Error('The target (to) address, currency, feeCurrency or the amount cannot be empty')
}

export const native = (args: { blockchain: EvmBasedBlockchain; broadcastFunction: BroadcastFunction }) => {
  return {
    prepare: {
      /**
       * Sign transfer of native asset transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (
        body: ChainTransferCeloBlockchain,
        provider?: string,
        testnet?: boolean,
      ) => transferSignedTransaction(body, provider, testnet),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        body: ChainTransferCeloBlockchain,
        provider?: string,
        testnet?: boolean,
      ) =>
        args.broadcastFunction({
          txData: await transferSignedTransaction(body, provider, testnet),
          signatureId: body.signatureId,
        }),
    },
  }
}
