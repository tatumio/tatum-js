import { DeployErc20 } from '@tatumio/api-client';
import { ISignature } from '@tatumio/shared-blockchain-abstract';
import { EvmBasedBlockchain } from '@tatumio/shared-core';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { Erc20Token } from '../../contracts';
import { EvmBasedWeb3 } from '../../services/evm-based.web3';

const prepareSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  web3: EvmBasedWeb3,
  // TODO specify fee
  fee?: any | undefined,
) => {
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await web3.getGasPriceInWei()
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

export const erc20 = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3 = args.web3.getClient(provider)
      // @ts-ignore
      return new web3.eth.Contract(Erc20Token.abi, contractAddress).methods.decimals().call()
    },
    prepare: {
      deploySignedTransaction: async (body: DeployErc20 & ISignature, provider?: string) => {
        // TODO: validation
        // await validateBody(body, DeployErc20)
        const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, signatureId, totalCap } = body

        const client = args.web3.getClient(provider)
        // TODO
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

        return prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, args.web3, fee)
      },
    }
  }
}
