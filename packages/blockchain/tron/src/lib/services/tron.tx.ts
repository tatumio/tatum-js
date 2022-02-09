import {
  BlockchainTronService,
  CallSmartContractMethod,
  CallSmartContractMethodKMS,
  FreezeTron,
  FreezeTronKMS,
  GenerateCustodialWalletTron,
  GenerateCustodialWalletTronKMS,
  GenerateMarketplaceTron,
  GenerateMarketplaceTronKMS,
  TransferTronBlockchain,
  TransferTronBlockchainKMS,
} from '@tatumio/api-client'
import { ListingSmartContract } from '@tatumio/shared-blockchain-evm-based'
import { tronTrc10 } from './tron.trc10'
import { tronTrc20 } from './tron.trc20'
import { tronTrc721 } from './tron.trc721'
import { ITronWeb } from './tron.web'

function isTransferTronBlockchainKMS(
  input: TransferTronBlockchain | TransferTronBlockchainKMS,
): input is TransferTronBlockchainKMS {
  return (input as TransferTronBlockchainKMS).signatureId !== undefined
}

const prepareSignedTransaction = async (
  body: TransferTronBlockchain | TransferTronBlockchainKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { to, amount } = body
  const client = tronWeb.getClient(provider)

  if (isTransferTronBlockchainKMS(body)) {
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

function isFreezeTronKMS(input: FreezeTron | FreezeTronKMS): input is FreezeTronKMS {
  return (input as FreezeTronKMS).signatureId !== undefined
}

const prepareFreezeTransaction = async (
  body: FreezeTron | FreezeTronKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { receiver, amount, resource, duration } = body
  const client = tronWeb.getClient(provider)

  if (isFreezeTronKMS(body)) {
    const tx = await client.transactionBuilder.freezeBalance(
      client.toSun(parseFloat(amount)),
      duration,
      resource,
      body.from,
      receiver,
    )

    return JSON.stringify(tx)
  } else {
    const tx = await client.transactionBuilder.freezeBalance(
      client.toSun(parseFloat(amount)),
      duration,
      resource,
      client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey)),
      receiver,
    )

    return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
  }
}

function isCallSmartContractMethodKMS(
  input: CallSmartContractMethod | CallSmartContractMethodKMS,
): input is CallSmartContractMethodKMS {
  return (input as CallSmartContractMethodKMS).signatureId !== undefined
}

const prepareSmartContractInvocation = async (
  body: CallSmartContractMethod | CallSmartContractMethodKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { amount, contractAddress, methodName, params } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const sender = isCallSmartContractMethodKMS(body)
    ? body.signatureId
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

  if (isCallSmartContractMethodKMS(body)) {
    return JSON.stringify(transaction)
  }

  return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
}

const prepareCustodialTransferBatch = async (
  body: CallSmartContractMethod | CallSmartContractMethodKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { contractAddress, fee } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const sender = isCallSmartContractMethodKMS(body)
    ? body.signatureId
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

  if (isCallSmartContractMethodKMS(body)) {
    return JSON.stringify(transaction)
  }

  return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
}

function isGenerateCustodialWalletTronKMS(
  input: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
): input is GenerateCustodialWalletTronKMS {
  return (input as GenerateCustodialWalletTronKMS).signatureId !== undefined
}

const prepareGenerateCustodialWalletSignedTransaction = async (
  body: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const client = tronWeb.getClient(provider)

  // TODO: implement obtainCustodialAddressType
  const { abi, code } = {} as any

  const sender = isGenerateCustodialWalletTronKMS(body)
    ? body.from
    : client.address.fromPrivateKey(body.fromPrivateKey)

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

  if (isGenerateCustodialWalletTronKMS(body)) {
    return JSON.stringify(tx)
  }

  return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
}

function isGenerateMarketplaceTronKMS(
  input: GenerateMarketplaceTron | GenerateMarketplaceTronKMS,
): input is GenerateMarketplaceTronKMS {
  return (input as GenerateMarketplaceTronKMS).signatureId !== undefined
}

const prepareDeployMarketplaceListingSignedTransaction = async (
  body: GenerateMarketplaceTron | GenerateMarketplaceTronKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const client = tronWeb.getClient(provider)

  const sender = isGenerateMarketplaceTronKMS(body)
    ? body.from
    : client.address.fromPrivateKey(body.fromPrivateKey)

  const tx = await client.transactionBuilder.createSmartContract(
    {
      feeLimit: client.toSun(body.feeLimit || 300),
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(ListingSmartContract.abi),
      bytecode: ListingSmartContract.bytecode,
      parameters: [body.marketplaceFee, body.feeRecipient],
      name: 'CustodialWallet',
    },
    sender,
  )

  if (isGenerateMarketplaceTronKMS(body)) {
    return JSON.stringify(tx)
  }

  return JSON.stringify(await client.trx.sign(tx, body.fromPrivateKey))
}

export const tronTx = (args: { tronWeb: ITronWeb }) => {
  return {
    trc10: tronTrc10(args),
    trc20: tronTrc20(args),
    trc721: tronTrc721(args),
    prepare: {
      /**
       * Sign Tron transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (
        body: TransferTronBlockchain | TransferTronBlockchainKMS,
        provider?: string,
      ) => prepareSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron Freeze balance transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider optional provider to enter. if not present, Tatum provider will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      freezeTransaction: async (body: FreezeTron | FreezeTronKMS, provider?: string) =>
        prepareFreezeTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron custodial transfer transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      smartContractInvocation: async (
        body: CallSmartContractMethod | CallSmartContractMethodKMS,
        provider?: string,
      ) => prepareSmartContractInvocation(body, args.tronWeb, provider),
      /**
       * Sign Tron custodial transfer batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      custodialTransferBatch: async (
        body: CallSmartContractMethod | CallSmartContractMethodKMS,
        provider?: string,
      ) => prepareCustodialTransferBatch(body, args.tronWeb, provider),
      /**
       * Sign Tron generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      generateCustodialWalletSignedTransaction: async (
        body: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
        provider?: string,
      ) => prepareGenerateCustodialWalletSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign TRON deploy new smart contract for NFT marketplace transaction. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum provider will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      deployMarketplaceListingSignedTransaction: async (
        body: GenerateMarketplaceTron | GenerateMarketplaceTronKMS,
        tronWeb: ITronWeb,
        provider?: string,
      ) => prepareDeployMarketplaceListingSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (
        body: TransferTronBlockchain | TransferTronBlockchainKMS,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron Freeze balance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      freezeTransaction: async (body: FreezeTron | FreezeTronKMS, provider?: string) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareFreezeTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      generateCustodialWalletSignedTransaction: async (
        body: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareGenerateCustodialWalletSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum provider will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      deployMarketplaceListingSignedTransaction: async (
        body: GenerateMarketplaceTron | GenerateMarketplaceTronKMS,
        tronWeb: ITronWeb,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareDeployMarketplaceListingSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
    },
  }
}
