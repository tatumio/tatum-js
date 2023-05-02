import {
  CreateTronTrc20Blockchain,
  CreateTronTrc20BlockchainKMS,
  TransferTronTrc20Blockchain,
  TransferTronTrc20BlockchainKMS,
  TronService,
} from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'
import { FromPrivateKeyOrSignatureIdTron } from '@tatumio/shared-blockchain-abstract'
import { Erc20Token } from '@tatumio/shared-blockchain-evm-based'

type TransferTronTrc20 = FromPrivateKeyOrSignatureIdTron<TransferTronTrc20Blockchain>
type CreateTronTrc20 = FromPrivateKeyOrSignatureIdTron<CreateTronTrc20Blockchain>

const prepareSignedTransaction = async (body: TransferTronTrc20, tronWeb: ITronWeb, provider?: string) => {
  const { to, tokenAddress, amount, feeLimit } = body

  const client = tronWeb.getClient(provider)

  client.setAddress(tokenAddress)
  const contractInstance = await client.contract(Erc20Token.abi, tokenAddress)

  const from = body.signatureId
    ? body.from
    : client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

  const balance = ((await contractInstance.balanceOf(from).call()) as BigNumber).toString()
  const decimals = await contractInstance.decimals().call({ _isConstant: true })
  const valueToSend = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals))
  if (valueToSend.isGreaterThan(new BigNumber(balance || 0))) {
    throw new Error('Insufficient TRC20 balance')
  }

  const tokenAddressHex = client.address.toHex(tokenAddress)
  const methodName = 'transfer(address,uint256)'
  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    },
  ]
  const feeLimitSun = client.toSun(feeLimit)

  if (body.signatureId) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      tokenAddressHex,
      methodName,
      {
        feeLimit: feeLimitSun,
        from,
      },
      params,
      from,
    )
    return JSON.stringify(transaction)
  } else {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      tokenAddressHex,
      methodName,
      {
        feeLimit: feeLimitSun,
        from,
      },
      params,
      from,
    )
    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

const prepareCreateSignedTransaction = async (
  body: CreateTronTrc20,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { name, decimals, recipient, symbol, totalSupply } = body

  const client = tronWeb.getClient(provider)

  const params = {
    feeLimit: 1000000000,
    callValue: 0,
    userFeePercentage: 100,
    originEnergyLimit: 1,
    abi: JSON.stringify(Erc20Token.abi),
    bytecode: Erc20Token.bytecode,
    parameters: [name, symbol, decimals, client.address.toHex(recipient), totalSupply],
    name,
  }

  if (body.signatureId) {
    const tx = await client.transactionBuilder.createSmartContract(params, body.from)

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.createSmartContract(
      params,
      client.address.fromPrivateKey(body.fromPrivateKey),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

export const tronTrc20 = (args: { tronWeb: ITronWeb }) => {
  return {
    // TODO: return any?
    /**
     * Get TRC20 balance for the given tron address.
     * @param address the address whose balance is returned
     * @param contractAddress the TRC20 contract address
     * @param provider
     */
    getAccountTrc20Address: async (address: string, contractAddress: string, provider?: string) => {
      const client = args.tronWeb.getClient(provider)
      client.setAddress(contractAddress)
      const contractInstance = await client.contract().at(contractAddress)

      return contractInstance.balanceOf(address).call()
    },
    // TODO: return any?
    getTrc20ContractDecimals: async (contractAddress: string, provider?: string) => {
      const client = args.tronWeb.getClient(provider)
      client.setAddress(contractAddress)
      const contractInstance = await client.contract().at(contractAddress)

      return contractInstance.decimals().call()
    },
    prepare: {
      /**
       * Sign create Tron TRC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (body: TransferTronTrc20, provider?: string) =>
        prepareSignedTransaction(body, args.tronWeb, provider),
      /**
       * Prepare create Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      createSignedTransaction: async (body: CreateTronTrc20, provider?: string) =>
        prepareCreateSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (body: TransferTronTrc20, provider?: string) => {
        if (body.signatureId) {
          return TronService.tronTransferTrc20(body as TransferTronTrc20BlockchainKMS)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },
      /**
       * Create Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      createSignedTransaction: async (body: CreateTronTrc20, provider?: string) => {
        if (body.signatureId) {
          return TronService.tronCreateTrc20(body as CreateTronTrc20BlockchainKMS)
        } else {
          return TronService.tronBroadcast({
            txData: await prepareCreateSignedTransaction(body, args.tronWeb, provider),
          })
        }
      },
    },
  }
}
