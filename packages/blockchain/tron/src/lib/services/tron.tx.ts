import {
  ApiServices,
  CallSmartContractMethod,
  Currency,
  FreezeTron,
  FreezeTronKMS,
  GenerateCustodialWalletTron,
  TransferTronBlockchain,
  TransferTronBlockchainKMS,
  TronService,
} from '@tatumio/api-client'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'
import { FromPrivateKeyOrSignatureIdTron } from '@tatumio/shared-blockchain-abstract'
import { evmBasedGasPump, indexesFromRange } from '@tatumio/shared-blockchain-evm-based'
import { tronTrc10 } from './tron.trc10'
import { tronTrc20 } from './tron.trc20'
import { tronTrc721 } from './tron.trc721'
import { ITronWeb, TronWebClient } from './tron.web'
import { Blockchain } from '@tatumio/shared-core'

export type CallSmartContract = FromPrivateKeyOrSignatureIdTron<CallSmartContractMethod>
export type TronGenerateCustodialWallet = WithoutChain<
  FromPrivateKeyOrSignatureIdTron<GenerateCustodialWalletTron>
>
type TronTransfer = FromPrivateKeyOrSignatureIdTron<TransferTronBlockchain>
type TronFreeze = FromPrivateKeyOrSignatureIdTron<FreezeTron>

// TODO: do a balance check before sending tx - https://app.clickup.com/t/24443045/TT-3496
const prepareSignedTransaction = async (body: TronTransfer, tronWeb: ITronWeb, provider?: string) => {
  const { to, amount } = body
  const client = tronWeb.getClient(provider)

  if (body.signatureId) {
    const tx = await client.transactionBuilder.sendTrx(to, client.toSun(amount), body.from)

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.sendTrx(
      to,
      client.toSun(amount),
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

const prepareFreezeTransaction = async (body: TronFreeze, tronWeb: ITronWeb, provider?: string) => {
  const { amount, resource } = body
  const client: TronWebClient = tronWeb.getClient(provider)

  if (body.signatureId) {
    const tx = await client.transactionBuilder.freezeBalanceV2(
      client.toSun(parseFloat(amount)),
      resource,
      body.from,
    )

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.freezeBalanceV2(
      client.toSun(parseFloat(amount)),
      resource,
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

const prepareUnfreezeTransaction = async (body: TronFreeze, tronWeb: ITronWeb, provider?: string) => {
  const { amount, resource } = body
  const client: TronWebClient = tronWeb.getClient(provider)

  if (body.signatureId) {
    const tx = await client.transactionBuilder.unfreezeBalanceV2(
      client.toSun(parseFloat(amount)),
      resource,
      body.from,
    )

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.unfreezeBalanceV2(
      client.toSun(parseFloat(amount)),
      resource,
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

const prepareSmartContractInvocation = async (
  body: CallSmartContract,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { amount, contractAddress, methodName, params } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const sender = body.signatureId
    ? body?.from
    : client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

  const { transaction } = await client.transactionBuilder.triggerSmartContract(
    contractAddressHex,
    methodName,
    {
      feeLimit: client.toSun(body.fee?.gasLimit),
      from: sender,
      callValue: client.toSun(amount || 0),
    },
    params,
    sender,
  )

  if (body.signatureId) {
    return JSON.stringify(transaction)
  }

  return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
}

const prepareGasPumpBatch = async (body: any, tronWeb: ITronWeb, provider?: string, testnet?: boolean) => {
  const indexes = indexesFromRange(body.from, body.to)
  const client = tronWeb.getClient(provider)
  const params = [
    { type: 'address', value: client.address.toHex(body.owner.trim()) },
    { type: 'uint256[]', value: indexes },
  ]
  const methodName = 'createBatch(address,uint256[])'

  const contractAddress = client.address.toHex(
    evmBasedGasPump().getGasPumpFactoryContractAddress('TRON', testnet),
  )

  client.setAddress(contractAddress)

  const sender = body.signatureId
    ? client.address.fromHex(body.owner)
    : client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

  const { transaction } = await client.transactionBuilder.triggerSmartContract(
    contractAddress,
    methodName,
    {
      feeLimit: body.feeLimit ? client.toSun(body.feeLimit) : client.toSun(0),
      from: sender,
      callValue: client.toSun(0),
    },
    params,
    sender,
  )

  if (body.signatureId) {
    return JSON.stringify(transaction)
  }
  return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
}

const prepareCustodialTransferBatch = async (
  body: CallSmartContract,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { contractAddress, fee } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const sender = body.signatureId
    ? body?.from
    : client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))
  const methodName = 'transferBatch(address[],uint256[],address[],uint256[],uint256[])'

  const { transaction } = await client.transactionBuilder.triggerSmartContract(
    contractAddressHex,
    methodName,
    {
      feeLimit: client.toSun(fee?.gasLimit),
      from: sender,
    },
    [
      { type: 'address[]', value: body.params[0].map(client.address.toHex) },
      { type: 'uint256[]', value: body.params[1] },
      { type: 'address[]', value: body.params[2].map(client.address.toHex) },
      { type: 'uint256[]', value: body.params[3] },
      { type: 'uint256[]', value: body.params[4] },
    ],
    sender,
  )

  if (body.signatureId) {
    return JSON.stringify(transaction)
  }

  return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
}

const prepareGenerateCustodialWalletSignedTransaction = async (
  body: TronGenerateCustodialWallet,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const client = tronWeb.getClient(provider)

  // TODO: implement obtainCustodialAddressType
  const { abi, code } = {} as any

  const sender = body.signatureId ? body.from : client.address.fromPrivateKey(body.fromPrivateKey)

  const tx = await client.transactionBuilder.createSmartContract(
    {
      feeLimit: client.toSun(body.feeLimit || 100),
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(abi),
      bytecode: code,
      parameters: [],
      name: 'CustodialWallet',
    },
    sender,
  )

  if (body.signatureId) {
    return JSON.stringify(tx)
  }

  return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
}

export const tronTx = (args: { tronWeb: ITronWeb }) => {
  return {
    trc10: tronTrc10(args),
    trc20: tronTrc20(args),
    trc721: tronTrc721(args),
    native: {
      prepare: {
        /**
         * Sign Tron transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction data to be broadcast to blockchain.
         */
        signedTransaction: async (body: TronTransfer, provider?: string) =>
          prepareSignedTransaction(body, args.tronWeb, provider),
        /**
         * Sign Tron Freeze balance V2 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider optional provider to enter. if not present, Tatum provider will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        freezeTransaction: async (body: TronFreeze, provider?: string) =>
          prepareFreezeTransaction(body, args.tronWeb, provider), /**
         * Sign Tron Unfreeze balance V2 transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider optional provider to enter. if not present, Tatum provider will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        unfreezeTransaction: async (body: TronFreeze, provider?: string) =>
          prepareUnfreezeTransaction(body, args.tronWeb, provider),
      },
      send: {
        /**
         * Send Tron transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param provider optional provider to enter. if not present, Tatum provider will be used.
         * @returns transaction id of the transaction in the blockchain
         */
        signedTransaction: async (body: TronTransfer, provider?: string) => {
          if (body.signatureId) {
            return ApiServices.blockchain.tron.tronTransfer(body as TransferTronBlockchainKMS)
          } else {
            return TronService.tronBroadcast({
              txData: await prepareSignedTransaction(body, args.tronWeb, provider),
            })
          }
        },
        /**
         * Send Tron Unfreeze balance V2 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction id of the transaction in the blockchain
         */
        freezeTransaction: async (body: TronFreeze, provider?: string) => {
          if (body.signatureId) {
            return ApiServices.blockchain.tron.tronUnfreeze(body as FreezeTronKMS)
          } else {
            return TronService.tronBroadcast({
              txData: await prepareUnfreezeTransaction(body, args.tronWeb, provider),
            })
          }
        },/**
         * Send Tron Unfreeze balance V2 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction id of the transaction in the blockchain
         */
        unfreezeTransaction: async (body: TronFreeze, provider?: string) => {
          if (body.signatureId) {
            return ApiServices.blockchain.tron.tronUnfreeze(body as FreezeTronKMS)
          } else {
            return TronService.tronBroadcast({
              txData: await prepareFreezeTransaction(body, args.tronWeb, provider),
            })
          }
        },
      },
    },
    smartContract: {
      prepare: {
        /**
         * Sign Tron custodial transfer transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction data to be broadcast to blockchain.
         */
        smartContractInvocation: async (body: CallSmartContract, provider?: string) =>
          prepareSmartContractInvocation(body, args.tronWeb, provider),
      },
    },
    custodial: {
      prepare: {
        /**
         * Sign Tron custodial transfer batch transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction data to be broadcast to blockchain.
         */
        custodialTransferBatch: async (body: CallSmartContract, provider?: string) =>
          prepareCustodialTransferBatch(body, args.tronWeb, provider),
        /**
         * Sign Tron generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast
         * @param provider
         * @returns transaction data to be broadcast to blockchain.
         */
        generateCustodialWalletSignedTransaction: async (
          body: TronGenerateCustodialWallet,
          provider?: string,
        ) => prepareGenerateCustodialWalletSignedTransaction(body, args.tronWeb, provider),
      },
      send: {
        /**
         * Send Tron generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
         * This operation is irreversible.
         * @param body content of the transaction to broadcast
         * @returns transaction id of the transaction in the blockchain
         */
        generateCustodialWalletSignedTransaction: async (
          body: TronGenerateCustodialWallet,
          provider?: string,
        ) => {
          if (body.signatureId) {
            return ApiServices.custodial.custodialCreateWallet({
              ...body,
              chain: Blockchain.TRON,
            })
          } else {
            return TronService.tronBroadcast({
              txData: await prepareGenerateCustodialWalletSignedTransaction(body, args.tronWeb, provider),
            })
          }
        },
      },
    },
    gasPump: {
      prepare: {
        prepareGasPumpBatch: async (testnet: boolean, body: any, provider?: string) =>
          prepareGasPumpBatch(body, args.tronWeb, provider, testnet),
      },
    },
  }
}
