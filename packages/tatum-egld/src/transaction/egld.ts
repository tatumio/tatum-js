import {BigNumber} from 'bignumber.js';
import {TransactionConfig} from 'web3-core';
import {UserSigner, UserSecretKey, Transaction, Nonce, Balance, ChainID, GasLimit, GasPrice, TransactionPayload, TransactionVersion, Address} from '@elrondnetwork/erdjs';
import {egldBroadcast, egldGetTransactionsCount} from '../blockchain';
import {
  axios, validateBody, TATUM_API_URL,
  CreateRecord,
  Currency,
  TransactionKMS,
} from '@tatumio/tatum-core';
import {ESDT_SYSTEM_SMART_CONTRACT_ADDRESS} from '../constants';
import {
    EgldEsdtTransaction,
    EgldBasicTransaction,
    EgldSendTransaction,
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
} from '../model';
import {generateAddressFromPrivatekey} from '../wallet/address';

const ELROND_V3_ENDPOINT = () => `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/egld/node`;

/**
 * Get Elrond network config
 */
export const egldGetConfig = async () => {
    const gasStationUrl = await getEgldClient();
    // try {
        const {data} = await axios.get(`${gasStationUrl}/${process.env.TATUM_API_KEY}/network/config`);
        return data
    // } catch (e) {
    //     console.error(e)
    // }
    // return null
}

/**
 * Estimate Gas price for the transaction.
 */
export const egldGetGasPrice = async (): Promise<number> => {
  const { data } = await egldGetConfig();
  const price = data?.config?.erd_min_gas_price;
  if (price) {
    return price;
  }
  throw Error(data?.data?.returnMessage || 'egld.gasPrice.error')
}

/**
 * Estimate Gas limit for the transaction.
 */
export const egldGetGasLimit = async (tx: EgldBasicTransaction): Promise<number> => {
    const gasStationUrl = await getEgldClient();
    const {data} = await axios.post(`${gasStationUrl}/${process.env.TATUM_API_KEY}/transaction/cost`, tx);
    const gas = data?.data?.txGasUnits;
    if (gas) {
      return gas;
    }
    throw Error(data?.data?.returnMessage || 'egld.gasLimit.error')
  }

/**
 * Sign transaction
 */
export const signEgldTransaction = async (tx: Transaction, fromPrivateKey: string): Promise<string> => {
    const fromAddrSigner = new UserSigner(UserSecretKey.fromString(fromPrivateKey));
    fromAddrSigner.sign(tx);
    return JSON.stringify(tx.toSendable());
}

/**
 * Returns EGLD server to connect to.
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getEgldClient = (provider?: string) => {
    const client = (provider || ELROND_V3_ENDPOINT())
    return client
}

/**
 * Sign EGLD pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEgldKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
    if (tx.chain !== Currency.EGLD) {
        throw Error('Unsupported chain.')
    }
    const client = getEgldClient(provider)
    const transaction = JSON.parse(tx.serializedTransaction)
    return await prepareSignedTransactionAbstraction(client, transaction, undefined, fromPrivateKey)
}

/**
 * Sign EGLD Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord);
    const {
        fromPrivateKey,
        signatureId,
        from,
        data,
    } = body;
    const client = getEgldClient(provider);
    const address = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string);
    if (!address) {
        throw new Error('Recipient must be provided.');
    }

    const tx: TransactionConfig = {
        from: from || 0,
        to: address,
        value: '0',
        data,
    };

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
};

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
 const prepareEgldEsdtIssuanceData = async (data: EsdtIssue): Promise<string> => {
    await validateBody(data, EsdtIssue)

    const tokenName = Buffer.from(data.name).toString('hex')
    const tokenTicker = Buffer.from(data.symbol).toString('hex')
    const initialSupply = encodeNumber(data.supply)
    const decimals = encodeNumber(data.digits)
    const properties = prepareProperties(data.properties || {
      canAddSpecialRoles: true, canChangeOwner: true, canUpgrade: true, canMint: true, canBurn: true, 
    })

    return `${data.service}@${tokenName}@${tokenTicker}@${initialSupply}@${decimals}` + properties
 }

const prepareEgldEsdtTransferData = async (data: EsdtTransfer): Promise<string> => {
    await validateBody(data, EsdtTransfer)

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

const prepareEgldEsdtMintOrBurnData = async (data: EsdtMint): Promise<string> => {
    await validateBody(data, EsdtMint)

    console.log('prepareEgldEsdtMintOrBurnData', data)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const supply = encodeNumber(data.supply)

    return `${data.service}@${tokenId}@${supply}`
}

const prepareEgldEsdtPauseData = async (data: EsdtToken): Promise<string> => {
    await validateBody(data, EsdtToken)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')

    return `${data.service}@${tokenId}`
}

const prepareEgldEsdtFreezeOrWipeOrOwnershipData = async (data: EsdtFreezeOrWipeOrOwnership): Promise<string> => {
    await validateBody(data, EsdtFreezeOrWipeOrOwnership)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const account = Buffer.from(data.account).toString('hex')

    return `${data.service}@${tokenId}@${account}`
}

const prepareEgldEsdtSpecialRoleData = async (data: EsdtSpecialRole): Promise<string> => {
    await validateBody(data, EsdtSpecialRole)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const account = Buffer.from(data.account).toString('hex')
    let roles = ''
    for (const k of data.role) {
        roles += `@${Buffer.from(k).toString('hex')}`
    }

    return `${data.service}@${tokenId}@${account}`+ roles
}

const prepareEgldEsdtControlChangesData = async (data: EsdtControlChanges): Promise<string> => {
    await validateBody(data, EsdtControlChanges)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const properties = prepareProperties(data.properties)

    return `${data.service}@${tokenId}` + properties
}

const prepareEgldIssuanceNftOrSftData = async (data: EsdtIssueNftOrSft): Promise<string> => {
    await validateBody(data, EsdtIssueNftOrSft)

    const tokenName = Buffer.from(data.name).toString('hex')
    const tokenTicker = Buffer.from(data.symbol).toString('hex')
    const properties = prepareProperties(data.properties)

    return `${data.service}@${tokenName}@${tokenTicker}` + properties
}

const prepareEgldCreateNftOrSftData = async (data: EsdtCreateNftOrSft): Promise<string> => {
    await validateBody(data, EsdtCreateNftOrSft)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const nftName = Buffer.from(data.nftName).toString('hex')
    const quantity = encodeNumber(data.quantity)
    const royalties = encodeNumber(new BigNumber(data.royalties).multipliedBy(100))
    const attributes = Buffer.from(data.attributes).toString('hex')

    let uris = ''
    for (const k of data.uri) {
        uris += `@${Buffer.from(k).toString('hex')}`
    }

    return `${data.service}@${tokenId}@${quantity}@${nftName}@${royalties}`
        + `@${data.hash}@${attributes}` + uris
}

const prepareEgldTransferNftCreateRoleData = async (data: EsdtTransferNftCreateRole): Promise<string> => {
    await validateBody(data, EsdtTransferNftCreateRole)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const from = Buffer.from(data.from).toString('hex')
    const to = Buffer.from(data.to).toString('hex')

    return `${data.service}@${tokenId}@${from}@${to}`
}

const prepareEgldStopNftCreateData = async (data: EsdtToken): Promise<string> => {
    await validateBody(data, EsdtToken)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')

    return `${data.service}@${tokenId}`
}

const prepareEgldAddOrBurnNftQuantityData = async (data: EsdtAddOrBurnNftQuantity): Promise<string> => {
    await validateBody(data, EsdtAddOrBurnNftQuantity)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const nonce = encodeNumber(data.nonce)
    const quantity = encodeNumber(data.quantity)

    return `${data.service}@${tokenId}@${nonce}@${quantity}`
}

const prepareEgldFreezeOrWipeNftData = async (data: EsdtFreezeOrWipeNft): Promise<string> => {
    await validateBody(data, EsdtFreezeOrWipeNft)

    const tokenId = Buffer.from(data.tokenId as string).toString('hex')
    const nonce = encodeNumber(data.nonce)
    const account = Buffer.from(data.account).toString('hex')

    return `${data.service}@${tokenId}@${nonce}@${account}`
}

const prepareEgldTransferNftData = async (data: EsdtTransferNft): Promise<string> => {
    await validateBody(data, EsdtTransferNft)

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

/**
 * Sign transaction abstraction. Nothing is broadcast to the blockchain.
 * @param client Web3 client of the EGLD Server to connect to. If not set, default public server will be used.
 * @param transaction content of the transaction to broadcast
 * @param signatureId signature ID
 * @param fromPrivateKey private key
 * @param fee Fee object
 * @returns transaction data to be broadcast to blockchain.
 */
const prepareSignedTransactionAbstraction = async (
    client: string, transaction: TransactionConfig, signatureId: string | undefined, fromPrivateKey: string | undefined
): Promise<string> => {
    const sender = transaction.from as string || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string);

    const { data } = await egldGetConfig();
    const { config } = data;
    const gasPrice = (transaction.gasPrice ? transaction.gasPrice : config?.erd_min_gas_price) || 1000000000;
    const nonce = await egldGetTransactionsCount(sender as string);

    const egldTx: EgldSendTransaction = {
        nonce,
        value: new BigNumber(transaction.value as string).isLessThan(0) ? '0' : new BigNumber(transaction.value as string).multipliedBy(1e18).toString(),
        receiver: transaction.to as string,
        sender,
        gasPrice,
        gasLimit: 0,
        data: transaction.data ? Buffer.from(transaction.data as string).toString('base64') : undefined,
        chainID: config.erd_chain_id,
        version: config.erd_min_transaction_version,
    };

    const gasLimit = transaction.gas || await egldGetGasLimit(egldTx);
    egldTx.gasLimit = new BigNumber(gasLimit).toNumber();

    if (signatureId) {
      return JSON.stringify({
        from: sender,
        to: transaction.to as string,
        value: transaction.value as string,
        data: transaction.data,
        gasPrice,
        gasLimit,
      });
    }

    const erdjsTransaction = new Transaction({
        nonce: new Nonce(egldTx.nonce),
        value: Balance.fromString(egldTx.value),
        receiver: new Address(egldTx.receiver),
        sender: new Address(egldTx.sender),
        gasPrice: new GasPrice(egldTx.gasPrice),
        gasLimit: new GasLimit(egldTx.gasLimit),
        data: transaction.data ? new TransactionPayload(transaction.data) : undefined,
        chainID: new ChainID(egldTx.chainID),
        version: new TransactionVersion(egldTx.version),
    });
    
    return await signEgldTransaction(erdjsTransaction, fromPrivateKey as string);
}

/**
 * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldDeployEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtIssuanceData({ ...data as EsdtIssue, service: (data as EsdtIssue).service || 'issue' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldTransferEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        to,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtTransferData({ ...data as EsdtTransfer, service: (data as EsdtTransfer).service || 'ESDTTransfer' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT mint transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldMintEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        fee,
        amount,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value: 0,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtMintOrBurnData({
          ...data as EsdtMint,
          supply: amount ? new BigNumber(amount).toNumber() : 0,
          service: (data as EsdtMint).service || 'localMint'
        }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT burn transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldBurnEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtMintOrBurnData({ ...data as EsdtMint, service: (data as EsdtMint).service || 'localBurn' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT pause transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldPauseEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtPauseData({ ...data as EsdtToken, service: (data as EsdtToken).service || 'pause' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT special role transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldSpecialRoleEsdtOrNftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtSpecialRoleData({ ...data as EsdtSpecialRole, service: (data as EsdtSpecialRole).service || 'setSpecialRole' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

export const sendEgldSpecialRoleEsdtOrNftTransaction = async (body: EgldEsdtTransaction, provider?: string) =>
    egldBroadcast(await prepareEgldSpecialRoleEsdtOrNftSignedTransaction(body, provider), body.signatureId)

/**
 * Sign ESDT freze | wipe | transfer ownership transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldFreezeOrWipeOrOwvershipEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig =  {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldEsdtFreezeOrWipeOrOwnershipData({ ...data as EsdtFreezeOrWipeOrOwnership, service: (data as EsdtFreezeOrWipeOrOwnership).service || 'transferOwnership' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT control changes (upgrading props) transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldControlChangesEsdtSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
  await validateBody(body, EgldEsdtTransaction)
  const {
      fromPrivateKey,
      signatureId,
      from,
      fee,
      ...data
  } = body

  const client = getEgldClient(provider)
  const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

  const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEgldEsdtControlChangesData({ ...data as EsdtControlChanges, service: (data as EsdtControlChanges).service || 'controlChanges' }),
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT issue transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldDeployNftOrSftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    // @ts-ignore
    const tx: TransactionConfig = {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldIssuanceNftOrSftData({ ...data as EsdtIssueNftOrSft, service: (data as EsdtIssueNftOrSft).service || 'issueNonFungible' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT create NFT/SFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldCreateNftOrSftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldCreateNftOrSftData({ ...data as EsdtCreateNftOrSft, service: (data as EsdtCreateNftOrSft).service || 'ESDTNFTCreate' }),
    }

    // gas limit = 60000000 + (1500 * data.length) + (50000 * NFT size)
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transfer NFT create role transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldTransferNftCreateRoleSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldTransferNftCreateRoleData({ ...data as EsdtTransferNftCreateRole, service: (data as EsdtTransferNftCreateRole).service || 'transferNFTCreateRole' }),
    }

    // gas limit = 60000000 + (1500 * data.length)
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT stop NFT create transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldStopNftCreateSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldStopNftCreateData({ ...data as EsdtToken, service: (data as EsdtToken).service || 'stopNFTCreate' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT Burn or Add quantity (SFT only) transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldAddOrBurnNftQuantitySignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldAddOrBurnNftQuantityData({ ...data as EsdtAddOrBurnNftQuantity, service: (data as EsdtAddOrBurnNftQuantity).service || 'ESDTNFTBurn' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldFreezeNftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldFreezeOrWipeNftData({ ...data as EsdtFreezeOrWipeNft, service: (data as EsdtFreezeOrWipeNft).service || 'freezeSingleNFT' }),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT freeze NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
 export const prepareEgldWipeNftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
  await validateBody(body, EgldEsdtTransaction)
  const {
      fromPrivateKey,
      signatureId,
      from,
      amount,
      fee,
      ...data
  } = body

  const client = getEgldClient(provider)

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

  const tx: TransactionConfig = {
      from: sender,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      gasPrice: fee?.gasPrice,
      gas: fee?.gasLimit,
      data: await prepareEgldFreezeOrWipeNftData({ ...data as EsdtFreezeOrWipeNft, service: (data as EsdtFreezeOrWipeNft).service || 'wipeSingleNFT' }),
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ESDT transfer NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldTransferNftSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        amount,
        fee,
        ...data
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = from || await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data: await prepareEgldTransferNftData({ ...data as EsdtTransferNft, service: (data as EsdtTransferNft).service || 'ESDTNFTTransfer' }),
    }

    // TRANSFER: GasLimit: 1000000 + length of Data field in bytes * 1500
    // TRANSFER TO SMART CONTRACT: GasLimit: 1000000 + extra for smart contract call
    // const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('1000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEgldSignedTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    await validateBody(body, EgldEsdtTransaction)
    const {
        fromPrivateKey,
        signatureId,
        from,
        to,
        amount,
        fee,
        data,
    } = body

    const client = getEgldClient(provider)

    const tx: TransactionConfig = {
        from: from || 0,
        to: to,
        value: amount,
        gasPrice: fee?.gasPrice,
        gas: fee?.gasLimit,
        data,
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Send EGLD store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
    egldBroadcast(await prepareEgldStoreDataTransaction(body, provider), body.signatureId);

/**
 * Send EGLD or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldTransaction = async (body: EgldEsdtTransaction, provider?: string) =>
    egldBroadcast(await prepareEgldSignedTransaction(body, provider), body.signatureId)

/**
 * Send EGLD deploy ESDT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldDeployEsdtTransaction = async (body: EgldEsdtTransaction, provider?: string) =>
    egldBroadcast(await prepareEgldDeployEsdtSignedTransaction(body, provider), body.signatureId)

/**
 * Send EGLD invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldSmartContractMethodInvocationTransaction = async (body: EgldEsdtTransaction, provider?: string) => {
    return egldBroadcast(await prepareEgldTransferEsdtSignedTransaction(body, provider), body.signatureId)
}

/**
 * Send EGLD ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldTransferNftTransaction = async (body: EgldEsdtTransaction, provider?: string) =>
    egldBroadcast(await prepareEgldTransferNftSignedTransaction(body, provider), body.signatureId)

/**
 * Send EGLD NFT deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEgldDeployNftTransaction = async (body: EgldEsdtTransaction, provider?: string) =>
    egldBroadcast(await prepareEgldDeployNftOrSftSignedTransaction(body, provider), body.signatureId)

// TODO: add ERC-1155 support
