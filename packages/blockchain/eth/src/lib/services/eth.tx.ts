import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { erc20, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { DeployErc20 } from '@tatumio/api-client'
import { ethWeb3 } from './eth.web3'
import { Erc20Token } from '@tatumio/shared-blockchain-evm-based'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'

export const ethTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: ethErc20(args),
    // ...ethErc20(args),
    //custodial: prepareGenerateCustodialWalletSignedTransaction()
  }
}

interface ISignature {
  signatureId: string;
}

const prepareSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  // TODO specify fee
  fee?: any | undefined
) => {
  // TODO ethWeb3 args
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethWeb3(undefined).getGasPriceInWei()
  const tx = {
    ...transaction,
    gasPrice,
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  tx.gas = fee?.gasLimit ?? (await client.eth.estimateGas(tx))
  const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)

  return signedTransaction.rawTransaction
}

export const ethErc20 = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3 = args.web3.getClient(provider)
      // @ts-ignore
      return new web3.eth.Contract(token_abi, contractAddress).methods.decimals().call()
    },
    prepare: {
      deploySignedTransaction: async (body: DeployErc20 & ISignature, provider?: string) => {
        // TODO: validation
        // await validateBody(body, DeployErc20)
        const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, signatureId, totalCap } = body

        const client = ethWeb3(args).getClient(provider, fromPrivateKey)
        // todo
        const contract = new client.eth.Contract(Erc20Token.abi as any)
        const deploy = contract.deploy({
          data: Erc20Token.bytecode,
          arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
          ],
        })

        const tx: TransactionConfig = {
          from: 0,
          data: deploy.encodeABI(),
          nonce,
        }

        return prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
      },
    },
  }
}

/*

export const ethCustodial = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    prepareGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  }
}*/
