import {BigNumber} from 'bignumber.js';
import * as tweetnacl from 'tweetnacl';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {egldBroadcast, egldEstimateGas, egldGetTransactionsCount} from '../blockchain';
import {axios, validateBody} from '../connector/tatum';
import {ESDT_SYSTEM_SMART_CONTRACT_ADDRESS, TATUM_API_URL} from '../constants';
import {
    Currency,
    EgldEsdtTransaction,
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
    Fee,
    TransactionKMS,
} from '../model';
import {generateAddressFromPrivatekey} from '../wallet/address';

const ELROND_V3_ENDPOINT = `${TATUM_API_URL}/v3/egld/web3/${process.env.TATUM_API_KEY}`;

/**
 * Get Elrond network config
 */
export const egldGetConfig = async () => {
    const gasStationUrl = await getEgldClient('https://api.elrond.com'); // TODO: use TATUM API endpoint
    try {
        const {data} = await axios.get(`${gasStationUrl}/network/config`);
        return data
    } catch (e) {
        console.error(e.toString())
    }
    return null
}

/**
 * Estimate Gas price for the transaction.
 */
export const egldGetGasPrice = async (): Promise<number> => {
    const config = await egldGetConfig()
    return config?.erd_min_gas_price || 1000000000
}

/**
 * Estimate Gas limit for the transaction.
 */
export const egldGetGasLimit = async (tx: EgldSendTransaction): Promise<number> => {
    // TODO: use this as TATUM API endpoint
    // const gasStationUrl = 'https://api.elrond.com';
    // // const gasStationUrl = await getEgldClient();
    // try {
    //     const {data} = await axios.post(`${gasStationUrl}/transaction/cost`, tx);
    //     return data?.txGasUnits || 50000;
    // } catch (e) {
    // }
    // return 50000;

    return new BigNumber((await egldEstimateGas(tx)) || 50000).toNumber()
}

// /**
//  * Get account nonce
//  */
// const egldGetAccountNonce = async (from: string): Promise<number> => {
//     // TODO: use this as TATUM API endpoint
//     // const {data} = await axios.get(`${ELROND_V3_ENDPOINT}/address/${from}/nonce`);
//     // return data?.nonce;
//     return await egldGetTransactionsCount(from)
// }

/**
 * Sign transaction
 */
export const signEgldTransaction = async (tx: EgldSendTransaction, fromPrivateKey: string): Promise<string> => {
    const message = new Uint8Array(Buffer.from(JSON.stringify(tx)))

    const pair = tweetnacl.sign.keyPair.fromSeed(new Uint8Array(Buffer.from(fromPrivateKey, 'hex')))
    const signingKey = pair.secretKey
    const signature = Buffer.from(tweetnacl.sign(message, signingKey)).toString('hex')
    // "tweetnacl.sign()" returns the concatenated [signature, message], therfore we remove the appended message:
    tx.signature = signature.slice(0, signature.length - message.length)

    return JSON.stringify(tx)
}

/**
 * Returns EGLD server to connect to.
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getEgldClient = (provider?: string) => {
    const client = (provider || ELROND_V3_ENDPOINT)
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
    return await prepareSignedTransactionAbstraction(client, transaction, undefined, fromPrivateKey, undefined)
}

// /**
//  * Sign EGLD Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
//  * @param body content of the transaction to broadcast
//  * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
//  * @returns transaction data to be broadcast to blockchain.
//  */
// export const prepareEgldStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
//     await validateBody(body, CreateRecord);
//     const {
//         fromPrivateKey,
//         to,
//         ethFee,
//         data,
//         nonce,
//         signatureId
//     } = body;
//     const client = getEgldClient(provider);
//     const address = to || client.eth.defaultAccount;
//     if (!address) {
//         throw new Error('Recipient must be provided.');
//     }
//     const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data);
//     const addressNonce = nonce ? nonce : await egldGetTransactionsCount(address);
//     const customFee = ethFee ? {
//         ...ethFee,
//         gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
//     } : {
//         gasLimit: `${hexData.length * 68 + 21000}`,
//         gasPrice: await egldGetGasPrice(),
//     };

//     const tx: TransactionConfig = {
//         from: 0,
//         to: address,
//         value: '0',
//         gasPrice: customFee.gasPrice,
//         gas: customFee.gasLimit,
//         data: hexData,
//         nonce: addressNonce,
//     };

//     if (signatureId) {
//         return JSON.stringify(tx);
//     }

//     return (await client.eth.accounts.signEgldTransaction(tx, fromPrivateKey as string)).rawTransaction as string;
// };

/**
 * Encode number for ESDT transaction
 * @param n number or BigNumber
 * @returns n as hex encoded string with an even number of characters
 */
const encodeNumber = (n: number | BigNumber): string => {
    const bn = new BigNumber(n)
    if (bn.isNaN()) {
        return '00'
    }
    const result = bn.toString(16).toLowerCase()

    return `${(result.length % 2 ? '' : '0') + result}`
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

    const tokenName = Buffer.from(data.tokenName).toString('hex')
    const tokenTicker = Buffer.from(data.tokenTicker).toString('hex')
    const initialSupply = encodeNumber(data.initialSupply)
    const decimals = encodeNumber(data.decimals)
    const properties = prepareProperties(data.properties)

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

    const tokenName = Buffer.from(data.tokenName).toString('hex')
    const tokenTicker = Buffer.from(data.tokenTicker).toString('hex')
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
    client: string, transaction: TransactionConfig, signatureId: string | undefined, fromPrivateKey: string | undefined, fee?: Fee | undefined
): Promise<string> => {
    const config = await egldGetConfig()
    const gasPrice = fee?.gasPrice ? new BigNumber(fee?.gasPrice as string).toNumber() : config?.erd_min_gas_price || 1000000000
    const sender = await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)
    const nonce = transaction.nonce ? transaction.nonce as number : await egldGetTransactionsCount(sender as string)

    const egldTx: EgldSendTransaction = {
        nonce,
        value: new BigNumber(transaction.value as string).isLessThan(0) ? '0' : new BigNumber(transaction.value as string).multipliedBy(1e18).toString(),
        receiver: transaction.to as string,
        sender,
        gasPrice,
        gasLimit: new BigNumber(fee?.gasLimit as string).toNumber(),
        data: transaction.data,
        chainID: config.erd_chain_id,
        version: config.erd_min_transaction_version,
        signature: signatureId,
    }

    if (signatureId) {
        return JSON.stringify(egldTx)
    }

    egldTx.gasLimit = fee?.gasLimit ? new BigNumber(fee?.gasLimit).toNumber() : await egldGetGasLimit(egldTx)

    return await signEgldTransaction(egldTx, fromPrivateKey as string)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        nonce,
        data: await prepareEgldEsdtIssuanceData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        to,
        amount,
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '500000'

    const tx: TransactionConfig =  {
        from: 0,
        to,
        value,
        data: await prepareEgldEsdtTransferData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig =  {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtMintOrBurnData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig =  {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtMintOrBurnData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig =  {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtPauseData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig =  {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtSpecialRoleData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
}

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
        fee,
        data,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig =  {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtFreezeOrWipeOrOwnershipData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
      fee,
      data,
      signatureId,
  } = body

  const client = getEgldClient(provider)

  const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        data: await prepareEgldEsdtControlChangesData(data),
    }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0.05
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    // @ts-ignore
    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        nonce,
        data: await prepareEgldIssuanceNftOrSftData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        nonce,
        data: await prepareEgldCreateNftOrSftData(data),
    }

    // gas limit = 60000000 + (1500 * data.length) + (50000 * NFT size)
    const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0

    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        nonce,
        data: await prepareEgldTransferNftCreateRoleData(data),
    }

    // gas limit = 60000000 + (1500 * data.length)
    const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('60000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        nonce,
        data: await prepareEgldStopNftCreateData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '10000000'
    const sender = await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        nonce,
        data: await prepareEgldAddOrBurnNftQuantityData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

    const tx: TransactionConfig = {
        from: 0,
        to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
        value,
        nonce,
        data: await prepareEgldFreezeOrWipeNftData(data),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
      amount,
      fee,
      data,
      nonce,
      signatureId,
  } = body

  const client = getEgldClient(provider)

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const gasLimit = fee?.gasLimit ? fee.gasLimit : '60000000'

  const tx: TransactionConfig = {
      from: 0,
      to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
      value,
      nonce,
      data: await prepareEgldFreezeOrWipeNftData(data),
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        amount,
        fee,
        data,
        nonce,
        signatureId,
    } = body

    const client = getEgldClient(provider)

    const value = amount ? new BigNumber(amount).toNumber() : 0
    const sender = await generateAddressFromPrivatekey(Currency.EGLD, false, fromPrivateKey as string)

    const tx: TransactionConfig = {
        from: sender,
        to: sender,
        value,
        nonce,
        data: await prepareEgldTransferNftData(data),
    }

    // TRANSFER: GasLimit: 1000000 + length of Data field in bytes * 1500
    // TRANSFER TO SMART CONTRACT: GasLimit: 1000000 + extra for smart contract call
    const gasLimit = fee?.gasLimit ? fee.gasLimit : new BigNumber('1000000').plus((tx.data as string).length).multipliedBy(1500).toString()

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, { gasLimit, gasPrice: fee?.gasPrice as string } as Fee)
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
        to,
        amount,
        fee,
        data,
        signatureId
    } = body

    const client = getEgldClient(provider)

    const tx: TransactionConfig = {
        from: 0,
        to: to,
        value: amount,
        data: Web3.utils.isHex(data as string | number) ? Web3.utils.stringToHex(data as string) : Web3.utils.toHex(data as string | number),
    }

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

// /**
//  * Send EGLD store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
//  * This operation is irreversible.
//  * @param body content of the transaction to broadcast
//  * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
//  * @returns transaction id of the transaction in the blockchain
//  */
// export const sendEgldStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
//     egldBroadcast(await prepareEgldStoreDataTransaction(body, provider), body.signatureId);

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
