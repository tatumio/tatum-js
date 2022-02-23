import { BigNumber } from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { Blockchain } from '@tatumio/shared-core'
import {
  ChainCreateRecord,
  CreateRecord,
  EgldEsdtTransaction,
  EsdtAddOrBurnNftQuantity,
  EsdtControlChanges,
  EsdtCreateNftOrSft,
  EsdtFreezeOrWipeNft,
  EsdtFreezeOrWipeOrOwnership,
  EsdtIssue,
  EsdtIssueNftOrSft,
  EsdtMint,
  EsdtSpecialRole,
  EsdtToken,
  EsdtTransfer,
  EsdtTransferNft,
  EsdtTransferNftCreateRole,
  ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
  egldUtils,
} from '../utils/egld.utils'
import { BlockchainElrondNetworkEgldService } from '@tatumio/api-client'
import { egldWallet } from './egld.wallet'

export const egldTxService = (args: { apiKey: string; blockchain: Blockchain }) => {
  const utils = egldUtils(args.apiKey)
  const { blockchain } = args
  const broadcastFunction = BlockchainElrondNetworkEgldService.egldBroadcast
  return {
    prepare: {
      /**
       * Sign EGLD Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      storeDataSignedTransaction: async (body: ChainCreateRecord) =>
        storeDataSignedTransaction({ ...body, chain: blockchain }),
      /**
       * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      deployEsdtSignedTransaction: async (body: EgldEsdtTransaction) => deployEsdtSignedTransaction(body),
      /**
       * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      transferEsdtSignedTransaction: async (body: EgldEsdtTransaction) => transferEsdtSignedTransaction(body),
      /**
       * Sign ESDT mint transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      mintEsdtSignedTransaction: async (body: EgldEsdtTransaction) => mintEsdtSignedTransaction(body),
      /**
       * Sign ESDT burn transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      burnEsdtSignedTransaction: async (body: EgldEsdtTransaction) => burnEsdtSignedTransaction(body),
      /**
       * Sign ESDT pause transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      pauseEsdtSignedTransaction: async (body: EgldEsdtTransaction) => pauseEsdtSignedTransaction(body),
      /**
       * Sign ESDT special role transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data tos be broadcast to blockchain.
       */
      specialRoleEsdtOrNftSignedTransaction: async (body: EgldEsdtTransaction) =>
        specialRoleEsdtOrNftSignedTransaction(body),
      /**
       * Sign ESDT freze | wipe | transfer ownership transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      freezeOrWipeOrOwvershipEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        freezeOrWipeOrOwvershipEsdtSignedTransaction(body),
      /**
       * Sign ESDT control changes (upgrading props) transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      controlChangesEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        controlChangesEsdtSignedTransaction(body),
      /**
       * Sign ESDT issue transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      deployNftOrSftSignedTransaction: async (body: EgldEsdtTransaction) =>
        deployNftOrSftSignedTransaction(body),
      /**
       * Sign ESDT create NFT/SFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      createNftOrSftSignedTransaction: async (body: EgldEsdtTransaction) =>
        createNftOrSftSignedTransaction(body),
      /**
       * Sign ESDT transfer NFT create role transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      transferNftCreateRoleSignedTransaction: async (body: EgldEsdtTransaction) =>
        transferNftCreateRoleSignedTransaction(body),
      /**
       * Sign ESDT stop NFT create transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      stopNftCreateSignedTransaction: async (body: EgldEsdtTransaction) =>
        stopNftCreateSignedTransaction(body),
      /**
       * Sign ESDT Burn or Add quantity (SFT only) transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      addOrBurnNftQuantitySignedTransaction: async (body: EgldEsdtTransaction) =>
        addOrBurnNftQuantitySignedTransaction(body),
      /**
       * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      freezeNftSignedTransaction: async (body: EgldEsdtTransaction) => freezeNftSignedTransaction(body),
      /**
       * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      wipeNftSignedTransaction: async (body: EgldEsdtTransaction) => wipeNftSignedTransaction(body),
      /**
       * Sign ESDT transfer NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      transferNftSignedTransaction: async (body: EgldEsdtTransaction) => transferNftSignedTransaction(body),
      /**
       * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (body: EgldEsdtTransaction) => signedTransaction(body),
    },
    send: {
      /**
       * Send EGLD store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      storeDataSignedTransaction: async (body: ChainCreateRecord) =>
        broadcastFunction({
          txData: await storeDataSignedTransaction({ ...body, chain: blockchain }),
          signatureId: body.signatureId,
        }),
      /**
       * Send EGLD deploy ESDT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deployEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await deployEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      /**
       * Send EGLD invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      transferEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await transferEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      mintEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await mintEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      burnEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await burnEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      pauseEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await pauseEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      specialRoleEsdtOrNftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await specialRoleEsdtOrNftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      freezeOrWipeOrOwvershipEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await freezeOrWipeOrOwvershipEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      controlChangesEsdtSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await controlChangesEsdtSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      /**
       * Send EGLD NFT deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deployNftOrSftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await deployNftOrSftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      createNftOrSftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await createNftOrSftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      transferNftCreateRoleSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await transferNftCreateRoleSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      stopNftCreateSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await stopNftCreateSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      addOrBurnNftQuantitySignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await addOrBurnNftQuantitySignedTransaction(body),
          signatureId: body.signatureId,
        }),
      freezeNftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await freezeNftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      wipeNftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await wipeNftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      /**
       * Send EGLD ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      transferNftSignedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await transferNftSignedTransaction(body),
          signatureId: body.signatureId,
        }),
      /**
       * Send EGLD or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (body: EgldEsdtTransaction) =>
        broadcastFunction({
          txData: await signedTransaction(body),
          signatureId: body.signatureId,
        }),
    },
  }
  async function storeDataSignedTransaction(body: CreateRecord) {
    const { fromPrivateKey, signatureId, from, data } = body
    const address = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey)
    if (!address) {
      throw new Error('Recipient must be provided.')
    }

    const tx: TransactionConfig = {
      from: from || 0,
      to: address,
      value: '0',
      data,
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function deployEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtIssuanceData({
        ...(data as EsdtIssue),
        service: (data as EsdtIssue).service || 'issue',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function transferEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, to, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtTransferData({
        ...(data as EsdtTransfer),
        service: (data as EsdtTransfer).service || 'ESDTTransfer',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function mintEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, amount, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value: 0,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtMintOrBurnData({
        ...(data as EsdtMint),
        supply: amount ? new BigNumber(amount).toNumber() : 0,
        service: (data as EsdtMint).service || 'localMint',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function burnEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtMintOrBurnData({
        ...(data.data as EsdtMint),
        service: (data.data as EsdtMint).service || 'localBurn',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function pauseEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtPauseData({
        ...(data as EsdtToken),
        service: (data as EsdtToken).service || 'pause',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function specialRoleEsdtOrNftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtSpecialRoleData({
        ...(data as EsdtSpecialRole),
        service: (data as EsdtSpecialRole).service || 'setSpecialRole',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function freezeOrWipeOrOwvershipEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtFreezeOrWipeOrOwnershipData({
        ...(data as EsdtFreezeOrWipeOrOwnership),
        service: (data as EsdtFreezeOrWipeOrOwnership).service || 'transferOwnership',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function controlChangesEsdtSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, fee, ...data } = body

    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEsdtControlChangesData({
        ...(data as EsdtControlChanges),
        service: (data as EsdtControlChanges).service || 'controlChanges',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function deployNftOrSftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    // @ts-ignore
    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareIssuanceNftOrSftData({
        ...(data as EsdtIssueNftOrSft),
        service: (data as EsdtIssueNftOrSft).service || 'issueNonFungible',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function createNftOrSftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: sender,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareCreateNftOrSftData({
        ...(data as EsdtCreateNftOrSft),
        service: (data as EsdtCreateNftOrSft).service || 'ESDTNFTCreate',
      }),
    }

    // gas limit = 60000000 + (1500 * data.length) + (50000 * NFT size)
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function transferNftCreateRoleSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareTransferNftCreateRoleData({
        ...(data as EsdtTransferNftCreateRole),
        service: (data as EsdtTransferNftCreateRole).service || 'transferNFTCreateRole',
      }),
    }

    // gas limit = 60000000 + (1500 * data.length)
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function stopNftCreateSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareStopNftCreateData({
        ...(data as EsdtToken),
        service: (data as EsdtToken).service || 'stopNFTCreate',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function addOrBurnNftQuantitySignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: sender,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareAddOrBurnNftQuantityData({
        ...(data as EsdtAddOrBurnNftQuantity),
        service: (data as EsdtAddOrBurnNftQuantity).service || 'ESDTNFTBurn',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function freezeNftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareFreezeOrWipeNftData({
        ...(data as EsdtFreezeOrWipeNft),
        service: (data as EsdtFreezeOrWipeNft).service || 'freezeSingleNFT',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function wipeNftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareFreezeOrWipeNftData({
        ...(data as EsdtFreezeOrWipeNft),
        service: (data as EsdtFreezeOrWipeNft).service || 'wipeSingleNFT',
      }),
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function transferNftSignedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || egldWallet().generateAddressFromPrivateKey(fromPrivateKey as string)

    const tx: TransactionConfig = {
      from: sender,
      to: sender,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareTransferNftData({
        ...(data as EsdtTransferNft),
        service: (data as EsdtTransferNft).service || 'ESDTNFTTransfer',
      }),
    }

    // TRANSFER: GasLimit: 1000000 + length of Data field in bytes * 1500
    // TRANSFER TO SMART CONTRACT: GasLimit: 1000000 + extra for smart contract call
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('1000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }

  async function signedTransaction(body: EgldEsdtTransaction) {
    const { fromPrivateKey, signatureId, from, to, amount, fee, data } = body

    const tx: TransactionConfig = {
      from: from || 0,
      to: to,
      value: amount,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data,
    }

    return await utils.prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
  }
}

/**
 * Encode number for ESDT transaction
 * @param n number or BigNumber
 * @returns n as hex encoded string with an even number of characters
 */
const encodeNumber = (n: number | BigNumber): string => {
  const bn = new BigNumber(n)
  if (bn.isNaN()) {
    return ''
  }
  const result = bn.toString(16).toLowerCase()

  return `${(result.length % 2 ? '0' : '') + result}`
}

/**
 * Prepare properties for ESDT Issue transaction
 * @param props content of the data transaction
 * @returns props as encoded string
 */
const prepareProperties = (props: any): string => {
  if (!props) {
    return ''
  }
  const keys = Object.keys(props)
  // const asHexTrue = '0x01'
  // const asHexFalse = '0x'
  const asHexTrue = Buffer.from('true').toString('hex')
  const asHexFalse = Buffer.from('false').toString('hex')
  let result = ''
  for (const k of keys) {
    result += `@${Buffer.from(k).toString('hex')}@${props[k] ? asHexTrue : asHexFalse}`
  }
  return result
}

/**
 * Prepare data for ESDT transactions
 * @param data content of the data
 * @returns data as string
 */
const prepareEsdtIssuanceData = async (data: EsdtIssue): Promise<string> => {
  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const initialSupply = encodeNumber(data.supply)
  const decimals = encodeNumber(data.digits)
  const properties = prepareProperties(
    data.properties || {
      canAddSpecialRoles: true,
      canChangeOwner: true,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
    },
  )

  return `${data.service}@${tokenName}@${tokenTicker}@${initialSupply}@${decimals}` + properties
}

const prepareEsdtTransferData = async (data: EsdtTransfer): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const value = encodeNumber(data.value)
  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${value}` + args
}

const prepareEsdtMintOrBurnData = async (data: EsdtMint): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const supply = encodeNumber(data.supply)

  return `${data.service}@${tokenId}@${supply}`
}

const prepareEsdtPauseData = async (data: EsdtToken): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')

  return `${data.service}@${tokenId}`
}

const prepareEsdtFreezeOrWipeOrOwnershipData = async (data: EsdtFreezeOrWipeOrOwnership): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const account = Buffer.from(data.account).toString('hex')

  return `${data.service}@${tokenId}@${account}`
}

const prepareEsdtSpecialRoleData = async (data: EsdtSpecialRole): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const account = Buffer.from(data.account).toString('hex')
  let roles = ''
  for (const k of data.role) {
    roles += `@${Buffer.from(k).toString('hex')}`
  }

  return `${data.service}@${tokenId}@${account}` + roles
}

const prepareEsdtControlChangesData = async (data: EsdtControlChanges): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const properties = prepareProperties(data.properties)

  return `${data.service}@${tokenId}` + properties
}

const prepareIssuanceNftOrSftData = async (data: EsdtIssueNftOrSft): Promise<string> => {
  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const properties = prepareProperties(data.properties)

  return `${data.service}@${tokenName}@${tokenTicker}` + properties
}

const prepareCreateNftOrSftData = async (data: EsdtCreateNftOrSft): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nftName = Buffer.from(data.nftName).toString('hex')
  const quantity = encodeNumber(data.quantity)
  const royalties = encodeNumber(new BigNumber(data.royalties).multipliedBy(100))
  const attributes = Buffer.from(data.attributes).toString('hex')

  let uris = ''
  for (const k of data.uri) {
    uris += `@${Buffer.from(k).toString('hex')}`
  }

  return (
    `${data.service}@${tokenId}@${quantity}@${nftName}@${royalties}` + `@${data.hash}@${attributes}` + uris
  )
}

const prepareTransferNftCreateRoleData = async (data: EsdtTransferNftCreateRole): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const from = Buffer.from(data.from).toString('hex')
  const to = Buffer.from(data.to).toString('hex')

  return `${data.service}@${tokenId}@${from}@${to}`
}

const prepareStopNftCreateData = async (data: EsdtToken): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')

  return `${data.service}@${tokenId}`
}

const prepareAddOrBurnNftQuantityData = async (data: EsdtAddOrBurnNftQuantity): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const quantity = encodeNumber(data.quantity)

  return `${data.service}@${tokenId}@${nonce}@${quantity}`
}

const prepareFreezeOrWipeNftData = async (data: EsdtFreezeOrWipeNft): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const account = Buffer.from(data.account).toString('hex')

  return `${data.service}@${tokenId}@${nonce}@${account}`
}

const prepareTransferNftData = async (data: EsdtTransferNft): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const nonce = encodeNumber(data.nonce)
  const quantity = encodeNumber(data.quantity)
  const to = Buffer.from(data.to).toString('hex')

  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${nonce}@${quantity}@${to}` + args
}
