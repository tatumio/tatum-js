import {
  BurnNftKMSTron as ApiBurnNftKMSTron,
  BurnNftTron,
  DeployNftTron,
  DeployNftTronKMS as ApiDeployNftTronKMS,
  MintMultipleNftKMSTron as ApiMintMultipleNftKMSTron,
  MintMultipleNftTron,
  MintNftKMSTron as ApiMintNftKMSTron,
  MintNftTron,
  TransferNftKMSTron as ApiTransferNftKMSTron,
  TransferNftTron,
  TronService,
  UpdateCashbackValueForAuthorNftKMSTron as ApiUpdateCashbackValueForAuthorNftKMSTron,
  UpdateCashbackValueForAuthorNftTron,
} from '@tatumio/api-client'
import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'
import { Trc721Token } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'
import { ITronWeb } from './tron.web'

// TODO: OpenAPI bug -> missing from property
type DeployNftTronKMS = ApiDeployNftTronKMS & { from: string }

const prepareDeploySignedTransaction = async (
  body: DeployNftTron | DeployNftTronKMS,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const client = tronWeb.getClient(provider)

  const { name, symbol, feeLimit } = body

  const params = {
    feeLimit: client.toSun(feeLimit),
    callValue: 0,
    userFeePercentage: 100,
    originEnergyLimit: 1,
    abi: JSON.stringify(Trc721Token.abi),
    bytecode: Trc721Token.bytecode,
    parameters: [name, symbol],
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

// TODO: OpenAPI bug -> missing from property
type MintNftKMSTron = ApiMintNftKMSTron & { from: string }

const prepareMintCashbackSignedTransaction = async (
  body: MintNftTron | MintNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { url, to, tokenId, contractAddress, feeLimit, authorAddresses, cashbackValues } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'mintWithCashback(address,uint256,string,address[],uint256[])'

  const cb: string[] = []
  if (cashbackValues) {
    for (const c of cashbackValues) {
      cb.push(`0x${new BigNumber(c).multipliedBy(1e6).toString(16)}`)
    }
  }
  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
    {
      type: 'string',
      value: url,
    },
    {
      type: 'address[]',
      value: authorAddresses?.map((a) => client.address.toHex(a)),
    },
    {
      type: 'uint256[]',
      value: cb,
    },
  ]

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

const prepareMintSignedTransaction = async (
  body: MintNftTron | MintNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { url, to, tokenId, contractAddress, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'mintWithTokenURI(address,uint256,string)'

  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
    {
      type: 'string',
      value: url,
    },
  ]

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

// TODO: OpenAPI bug -> missing from property
type TransferNftKMSTron = ApiTransferNftKMSTron & { from: string }

const transferSignedTransaction = async (
  body: TransferNftTron | TransferNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { to, tokenId, contractAddress, feeLimit, value } = body
  const client = tronWeb.getClient(provider)

  const params = [
    { type: 'address', value: client.address.toHex(to) },
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
  ]
  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'safeTransfer(address,uint256)'

  client.setAddress(contractAddress)

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
        callValue: value ? `0x${new BigNumber(value).multipliedBy(1e6).toString(16)}` : 0,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
        callValue: value ? `0x${new BigNumber(value).multipliedBy(1e6).toString(16)}` : 0,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

// TODO: OpenAPI bug -> missing from property
type BurnNftKMSTron = ApiBurnNftKMSTron & { from: string }

const burnSignedTransaction = async (
  body: BurnNftTron | BurnNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { tokenId, contractAddress, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'burn(uint256)'
  const params = [
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
  ]

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

// TODO: OpenAPI bug -> missing from property
type MintMultipleNftKMSTron = ApiMintMultipleNftKMSTron & { from: string }

const prepareMintMultipleSignedTransaction = async (
  body: MintMultipleNftTron | MintMultipleNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { to, tokenId, contractAddress, url, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'mintMultiple(address[],uint256[],string[])'
  const params = [
    {
      type: 'address[]',
      value: to.map((a) => client.address.toHex(a)),
    },
    {
      type: 'uint256[]',
      value: tokenId.map((t) => `0x${new BigNumber(t).toString(16)}`),
    },
    {
      type: 'string[]',
      value: url,
    },
  ]

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

// TODO: OpenAPI bug -> missing from property
type UpdateCashbackValueForAuthorNftKMSTron = ApiUpdateCashbackValueForAuthorNftKMSTron & { from: string }

const prepareUpdateCashbackValueForAuthorSignedTransaction = async (
  body: UpdateCashbackValueForAuthorNftTron | UpdateCashbackValueForAuthorNftKMSTron,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const { cashbackValue, tokenId, contractAddress, feeLimit } = body

  const client = tronWeb.getClient(provider)
  client.setAddress(contractAddress)

  const contractAddressHex = client.address.toHex(contractAddress)
  const methodName = 'updateCashbackForAuthor(uint256,uint256)'
  const params = [
    {
      type: 'uint256',
      value: `0x${new BigNumber(tokenId).toString(16)}`,
    },
    {
      type: 'uint256',
      value: `0x${new BigNumber(cashbackValue).multipliedBy(1e6).toString(16)}`,
    },
  ]

  if (isWithSignatureId(body)) {
    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: body.from,
      },
      params,
      body.from,
    )

    return JSON.stringify(transaction)
  } else {
    const sender = client.address.fromHex(client.address.fromPrivateKey(body.fromPrivateKey))

    const { transaction } = await client.transactionBuilder.triggerSmartContract(
      contractAddressHex,
      methodName,
      {
        feeLimit: client.toSun(feeLimit),
        from: sender,
      },
      params,
      sender,
    )

    return JSON.stringify(await client.trx.sign(transaction, body.fromPrivateKey))
  }
}

export const tronTrc721 = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      /**
       * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (body: DeployNftTron | DeployNftTronKMS, provider?: string) =>
        prepareDeploySignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      mintCashbackSignedTransaction: async (body: MintNftTron | MintNftKMSTron, provider?: string) =>
        prepareMintCashbackSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (body: MintNftTron | MintNftKMSTron, provider?: string) =>
        prepareMintSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron transfer trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: TransferNftTron | TransferNftKMSTron, provider?: string) =>
        transferSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron burn trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (body: BurnNftTron | BurnNftKMSTron, provider?: string) =>
        burnSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron mint multiple trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleSignedTransaction: async (
        body: MintMultipleNftTron | MintMultipleNftKMSTron,
        provider?: string,
      ) => prepareMintMultipleSignedTransaction(body, args.tronWeb, provider),
      /**
       * Sign Tron update cashback for author trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider
       * @returns transaction data to be broadcast to blockchain.
       */
      updateCashbackValueForAuthorSignedTransaction: async (
        body: UpdateCashbackValueForAuthorNftTron | UpdateCashbackValueForAuthorNftKMSTron,
        provider?: string,
      ) => prepareUpdateCashbackValueForAuthorSignedTransaction(body, args.tronWeb, provider),
    },
    send: {
      /**
       * Send Tron deploy trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (body: DeployNftTron | DeployNftTronKMS, provider?: string) =>
        TronService.tronBroadcast({
          txData: await prepareDeploySignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron mint cashback trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      mintCashbackSignedTransaction: async (body: MintNftTron | MintNftKMSTron, provider?: string) =>
        TronService.tronBroadcast({
          txData: await prepareMintCashbackSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron mint cashback trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (body: MintNftTron | MintNftKMSTron, provider?: string) =>
        TronService.tronBroadcast({
          txData: await prepareMintSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron transfer trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: TransferNftTron | TransferNftKMSTron, provider?: string) =>
        TronService.tronBroadcast({
          txData: await transferSignedTransaction(body, args.tronWeb, provider),
        }),
      /**
       * Send Tron burn trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (body: BurnNftTron | BurnNftKMSTron, provider?: string) =>
        TronService.tronBroadcast({
          txData: await burnSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron mint multiple trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (
        body: MintMultipleNftTron | MintMultipleNftKMSTron,
        provider?: string,
      ) =>
        TronService.tronBroadcast({
          txData: await prepareMintMultipleSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
      /**
       * Send Tron update cashback for author trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      updateCashbackValueForAuthorSignedTransaction: async (
        body: UpdateCashbackValueForAuthorNftTron | UpdateCashbackValueForAuthorNftKMSTron,
        provider?: string,
      ) =>
        TronService.tronBroadcast({
          txData: await prepareUpdateCashbackValueForAuthorSignedTransaction(body, args.tronWeb, provider),
          // TODO: SignatureID is missing in OpenApi
        }),
    },
  }
}
