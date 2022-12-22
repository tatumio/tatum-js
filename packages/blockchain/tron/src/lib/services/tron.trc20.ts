import {
  CreateTronTrc20Blockchain,
  CreateTronTrc20BlockchainKMS,
  TransferTronTrc20Blockchain,
  TransferTronTrc20BlockchainKMS,
  TronService,
} from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'
import { Trc20Token } from '@tatumio/shared-blockchain-evm-based'
import { isWithSignatureId, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { TronSdkError } from '../tron.sdk.errors'

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

  const from = 'signatureId' in body
    ? body.from
    : client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

  const balance = ((await contractInstance.balanceOf(from).call()) as BigNumber).toNumber()
  const valueToSend = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals))
  if (valueToSend.isGreaterThan(new BigNumber(balance || 0))) {
    throw new TronSdkError(SdkErrorCode.TRON_NOT_ENOUGH_BALANCE)
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

  if (isWithSignatureId(body)) {
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

  if (isWithSignatureId(body)) {
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
        TronService.tronBroadcast({
          txData: await prepareSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
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
        TronService.tronBroadcast({
          txData: await prepareCreateSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
    },
  }
}
