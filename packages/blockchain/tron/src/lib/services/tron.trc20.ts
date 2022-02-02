import {
  BlockchainTronService,
  CreateTronTrc20Blockchain,
  CreateTronTrc20BlockchainKMS,
  TransferTronTrc20Blockchain,
  TransferTronTrc20BlockchainKMS,
} from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'
import { Trc20Token } from '@tatumio/shared-blockchain-evm-based'

function isTransferTronTrc20BlockchainKMS(
  input: TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS,
): input is TransferTronTrc20BlockchainKMS {
  return (input as TransferTronTrc20BlockchainKMS).signatureId !== undefined
}

const prepareSignedTransaction = async (
  body: TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { to, tokenAddress, amount, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(tokenAddress)
  const contractInstance = await client.contract().at(tokenAddress)
  const decimals = await contractInstance.decimals().call()

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

  if (isTransferTronTrc20BlockchainKMS(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      tokenAddressHex,
      methodName,
      {
        feeLimit: feeLimitSun,
        from: body.from,
      },
      params,
      body.from,
    )
    return JSON.stringify(transaction)
  } else {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      tokenAddressHex,
      methodName,
      {
        feeLimit: feeLimitSun,
        from: client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
      },
      params,
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
    )
    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

function isCreateTronTrc20BlockchainKMS(
  input: CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS,
): input is CreateTronTrc20BlockchainKMS {
  return (input as CreateTronTrc20BlockchainKMS).signatureId !== undefined
}

const prepareCreateSignedTransaction = async (
  body: CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS,
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
    abi: JSON.stringify(Trc20Token.abi),
    bytecode: Trc20Token.bytecode,
    parameters: [name, symbol, decimals, client.address.toHex(recipient), totalSupply],
    name,
  }

  if (isCreateTronTrc20BlockchainKMS(body)) {
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
      signedTransaction: async (
        body: TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS,
        provider?: string,
      ) => prepareSignedTransaction(body, args.tronWeb, provider),
      /**
       * Prepare create Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      createSignedTransaction: async (
        body: CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS,
        provider?: string,
      ) => prepareCreateSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (
        body: TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareSignedTransaction(body, args.tronWeb, provider),
        }),
      /**
       * Create Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      createSignedTransaction: async (
        body: CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareCreateSignedTransaction(body, args.tronWeb, provider),
        }),
    },
  }
}
