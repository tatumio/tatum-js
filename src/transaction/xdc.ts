import {BigNumber} from 'bignumber.js';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {toWei} from 'web3-utils';
import {xdcBroadcast, xdcGetTransactionsCount} from '../blockchain';
import {axios, validateBody} from '../connector/tatum';
import {TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import {
    BurnErc20,
    CreateRecord,
    Currency,
    DeployErc20,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    Fee,
    MintErc20,
    SmartContractMethodInvocation,
    SmartContractReadMethodInvocation,
    TransactionKMS,
    TransferCustomErc20,
    TransferErc20,
    UpdateCashbackErc721
} from '../model';

/**
 * Convert XDC address format.
 */
export const fromXdcAddress = (xdcAddress: string): string => {
    return xdcAddress.trim().replace('xdc', '0x')
}

/**
 * Estimate Gas price for the transaction.
 */
export const xdcGetGasPriceInWei = async () => {
    const gasStationUrl = 'https://rpc.xinfin.network/'
    try {
        const {data} = await axios.post(`${gasStationUrl}gasPrice`, {'jsonrpc': '2.0', 'method': 'eth_gasPrice', 'params': [], 'id': 1})
        return data ? Web3.utils.toWei(data, 'wei') : Web3.utils.toWei('5', 'kwei')
    } catch (e) {
        return Web3.utils.toWei('5', 'kwei')
    }
    return Web3.utils.toWei('5', 'kwei')
}

/**
 * Returns XDC server to connect to.
 *
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getXdcClient = (provider?: string, fromPrivateKey?: string) => {
    const client = new Web3(provider || `${TATUM_API_URL}/v3/xdc/web3/${process.env.TATUM_API_KEY}`)
    if (fromPrivateKey) {
        client.eth.accounts.wallet.clear()
        client.eth.accounts.wallet.add(fromPrivateKey)
        client.eth.defaultAccount = client.eth.accounts.wallet[0].address
    }
    return client
}

/**
 * Sign XDC pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signXdcKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
    if (tx.chain !== Currency.XDC) {
        throw Error('Unsupported chain.')
    }
    const client = getXdcClient(provider, fromPrivateKey)
    const transactionConfig = JSON.parse(tx.serializedTransaction)
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
    if (!transactionConfig.nonce) {
        transactionConfig.nonce = await xdcGetTransactionsCount(client.eth.defaultAccount as string)
    }
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign XDC Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord)
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
        signatureId
    } = body
    const client = getXdcClient(provider, fromPrivateKey)
    const address = to || client.eth.defaultAccount
    if (!address) {
        throw new Error('Recipient must be provided.')
    }
    const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)
    const addressNonce = nonce ? nonce : await xdcGetTransactionsCount(address)
    const customFee = ethFee ? {
        ...ethFee,
        gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
    } : {
        gasLimit: `${hexData.length * 68 + 21000}`,
        gasPrice: await xdcGetGasPriceInWei(),
    }

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(address),
        value: '0',
        gasPrice: customFee.gasPrice,
        gas: customFee.gasLimit,
        data: hexData,
        nonce: addressNonce,
    }

    if (signatureId) {
        return JSON.stringify(tx)
    }

    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param client Web3 client of the XDC Server to connect to. If not set, default public server will be used.
 * @param transaction content of the transaction to broadcast
 * @param signatureId signature ID
 * @param fromPrivateKey private key
 * @param fee Fee object
 * @returns transaction data to be broadcast to blockchain.
 */
const prepareErc20SignedTransactionAbstraction = async (
    client: Web3, transaction: TransactionConfig, signatureId: string | undefined, fromPrivateKey: string | undefined, fee?: Fee | undefined
) => {
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await xdcGetGasPriceInWei()
    const tx = {
        ...transaction,
        gasPrice,
    }

    if (signatureId) {
        return JSON.stringify(tx)
    }

    tx.gas = fee?.gasLimit ?? await client.eth.estimateGas(tx)
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
    await validateBody(body, MintErc20)
    const {
        fromPrivateKey,
        amount,
        to,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, fromXdcAddress(contractAddress))
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.mint(fromXdcAddress(to), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
    await validateBody(body, BurnErc20)
    const {
        fromPrivateKey,
        amount,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, fromXdcAddress(contractAddress))
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign XDC or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcOrErc20SignedTransaction = async (body: TransferErc20, provider?: string) => {
    await validateBody(body, TransferErc20)
    const {
        fromPrivateKey,
        to,
        amount,
        fee,
        data,
        nonce,
        signatureId
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(to),
        value: client.utils.toWei(`${amount}`, 'ether'),
        data: client.utils.isHex(data as string | number) ? client.utils.stringToHex(data as string) : client.utils.toHex(data as string | number),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcCustomErc20SignedTransaction = async (body: TransferCustomErc20, provider?: string) => {
    await validateBody(body, TransferCustomErc20)
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        digits,
        fee,
        nonce,
        signatureId
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], fromXdcAddress(contractAddress))
    const decimals = new BigNumber(10).pow(digits)
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.transfer(fromXdcAddress(to), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
    await validateBody(body, DeployErc20)
    const {
        name,
        address,
        symbol,
        supply,
        digits,
        fromPrivateKey,
        nonce,
        fee,
        signatureId,
        totalCap,
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI)
    const _digits = new BigNumber(10).pow(digits)
    const deploy = contract.deploy({
        data: erc20TokenBytecode,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(totalCap || supply).multipliedBy(_digits).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(_digits).toString(16)}`,
        ],
    })
    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractMethodInvocation)
    const {
        fromPrivateKey,
        fee,
        params,
        methodName,
        methodABI,
        contractAddress,
        amount,
        nonce,
        signatureId,
    } = body
    const client = getXdcClient(provider, fromPrivateKey)

    const contract = new client.eth.Contract([methodABI])

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        value: toWei(amount || '0', 'ether'),
        data: contract.methods[methodName as string](...params).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcMintErc721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        fee,
        url,
        signatureId
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.mintWithTokenURI(fromXdcAddress(to), tokenId, url).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign XDC mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcMintErcCashback721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        fee,
        url,
        signatureId,
        authorAddresses,
        cashbackValues
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))
    const cb: string[] = []
    const cashbacks: string[] = cashbackValues!
    for (const c of cashbacks) {
        cb.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
    }
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.mintWithCashback(fromXdcAddress(to), tokenId, url, authorAddresses, cb).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcMintMultipleCashbackErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        nonce,
        signatureId,
        authorAddresses,
        cashbackValues,
        fee
    } = body

    const client = await getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))
    const cashbacks: string[][] = cashbackValues!
    const cb: string[][] = []

    for (const c of cashbacks) {
        const cb2: string[] = []
        for (const c2 of c) {
            cb2.push(`0x${new BigNumber(client.utils.toWei(c2, 'ether')).toString(16)}`)
        }
        cb.push(cb2)
    }
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.mintMultipleCashback(to.map(t => fromXdcAddress(t)), tokenId, url, authorAddresses, cb).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcMintMultipleErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
    await validateBody(body, EthMintMultipleErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        nonce,
        signatureId,
        fee
    } = body

    const client = await getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.mintMultiple(to.map(t => fromXdcAddress(t)), tokenId, url).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcBurnErc721SignedTransaction = async (body: EthBurnErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721)
    const {
        fromPrivateKey,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId
    } = body

    const client = getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))
    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.burn(tokenId).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcTransferErc721SignedTransaction = async (body: EthTransferErc721, provider?: string) => {
    await validateBody(body, EthTransferErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
        value
    } = body

    const client = await getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.safeTransfer(fromXdcAddress(to), tokenId).encodeABI(),
        nonce,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
    await validateBody(body, UpdateCashbackErc721)
    const {
        fromPrivateKey,
        cashbackValue,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = await getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, fromXdcAddress(contractAddress))

    const tx: TransactionConfig = {
        from: 0,
        to: fromXdcAddress(contractAddress),
        data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcDeployErc721SignedTransaction = async (body: EthDeployErc721, provider?: string) => {
    await validateBody(body, EthDeployErc721)
    const {
        fromPrivateKey,
        fee,
        name,
        symbol,
        nonce,
        signatureId,
    } = body

    const client = await getXdcClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc721TokenABI, null, {
        data: erc721TokenBytecode,
    })

    // @ts-ignore
    const deploy = contract.deploy({
        arguments: [name, symbol]
    })

    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Send XDC invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 */
export const sendXdcSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractReadMethodInvocation)
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body
    const client = getXdcClient(provider)
    const contract = new client.eth.Contract([methodABI], fromXdcAddress(contractAddress))
    return {data: await contract.methods[methodName as string](...params).call()}
}

/**
 * Send XDC store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
    xdcBroadcast(await prepareXdcStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send XDC or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcOrErc20Transaction = async (body: TransferErc20, provider?: string) =>
    xdcBroadcast(await prepareXdcOrErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcCustomErc20Transaction = async (body: TransferCustomErc20, provider?: string) =>
    xdcBroadcast(await prepareXdcCustomErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcDeployErc20Transaction = async (body: DeployErc20, provider?: string) =>
    xdcBroadcast(await prepareXdcDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcSmartContractMethodInvocationTransaction = async (body: SmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
    if (body.methodABI.stateMutability === 'view') {
        return sendXdcSmartContractReadMethodInvocationTransaction(body, provider)
    }
    return xdcBroadcast(await prepareXdcSmartContractWriteMethodInvocation(body, provider), (body as SmartContractMethodInvocation).signatureId)
}

/**
 * Send XDC ERC721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcMintErc721Transaction = async (body: EthMintErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcMintErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcMintErcCashback721Transaction = async (body: EthMintErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcMintErcCashback721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcMintMultipleCashbackErc721Transaction = async (body: EthMintMultipleErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcMintMultipleErc721Transaction = async (body: EthMintMultipleErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcMintMultipleErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcBurnErc721Transaction = async (body: EthBurnErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcBurnErc721SignedTransaction(body, provider), body.signatureId)

export const sendXdcUpdateCashbackForAuthorErc721Transaction = async (body: UpdateCashbackErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcErc721Transaction = async (body: EthTransferErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcDeployErc721Transaction = async (body: EthDeployErc721, provider?: string) =>
    xdcBroadcast(await prepareXdcDeployErc721SignedTransaction(body, provider), body.signatureId)

// TODO: add ERC-1155 support
