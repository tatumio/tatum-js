import {BigNumber} from 'bignumber.js';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {toWei} from 'web3-utils';
import {ethBroadcast, ethGetTransactionsCount} from '../blockchain';
import {axios, validateBody} from '../connector/tatum';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc1155TokenABI from '../contracts/erc1155/erc1155_abi';
import erc1155TokenBytecode from '../contracts/erc1155/erc1155_bytecode';
import erc20_abi from '../contracts/erc20/token_abi';
import erc20TokenABI from '../contracts/erc20/token_abi';
import erc20TokenBytecode from '../contracts/erc20/token_bytecode';
import erc721TokenABI from '../contracts/erc721/erc721_abi';
import erc721TokenBytecode from '../contracts/erc721/erc721_bytecode';
import * as listing from '../contracts/marketplace';
import {
    BurnErc20,
    CreateRecord,
    Currency,
    DeployErc20,
    DeployMarketplaceListing,
    EthBurnErc721,
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthDeployErc721,
    EthDeployMultiToken,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    Fee,
    GenerateCustodialAddress,
    MintErc20,
    MintMultiToken,
    MintMultiTokenBatch,
    SmartContractMethodInvocation,
    SmartContractReadMethodInvocation,
    TransactionKMS,
    TransferCustomErc20,
    TransferEthErc20,
    TransferMultiToken,
    TransferMultiTokenBatch,
    UpdateCashbackErc721,
} from '../model';
import {obtainCustodialAddressType} from '../wallet';

/**
 * Estimate Gas price for the transaction.
 */
export const ethGetGasPriceInWei = async () => {
    let gasStationUrl = 'https://ethgasstation.info/json/ethgasAPI.json';
    if (process.env.TATUM_GAS_STATION_API_KEY) {
        gasStationUrl = `${gasStationUrl}?apiKey=${process.env.TATUM_GAS_STATION_API_KEY}`;
    }
    const data = await Promise.all([
        axios.get(gasStationUrl.toString())
            .then(response => `${response.data.fastest / 10}`),
    ])
    const gasPrice = data[0] === '0' ? '20' : data[0]
    return Web3.utils.toWei(gasPrice, 'gwei')
}

/**
 * Returns Ethereum server to connect to.
 *
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @param privateKey
 */
export const getClient = (provider?: string, privateKey?: string) => {
    let url = provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`;
    if (process.env.TESTNET_TYPE === 'ethereum-rinkeby') {
        url += '?testnetType=ethereum-rinkeby';
    }
    const web3 = new Web3(url);
    if (privateKey) {
        web3.eth.accounts.wallet.add(privateKey);
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    }
    return web3;
}

/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEthKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
    if (tx.chain !== Currency.ETH) {
        throw Error('Unsupported chain.')
    }
    const client = getClient(provider, fromPrivateKey)
    const transactionConfig = JSON.parse(tx.serializedTransaction)
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
    if (!transactionConfig.nonce) {
        transactionConfig.nonce = await ethGetTransactionsCount(client.eth.defaultAccount as string)
    }
    if (!transactionConfig.gasPrice || transactionConfig.gasPrice === '0' || transactionConfig.gasPrice === 0 || transactionConfig.gasPrice === '0x0') {
        transactionConfig.gasPrice = await ethGetGasPriceInWei()
    }
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign Eth generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
    await validateBody(body, GenerateCustodialAddress)

    const client = getClient(provider, body.fromPrivateKey)

    const {abi, code} = obtainCustodialAddressType(body)
    // @ts-ignore
    const contract = new client.eth.Contract(abi)
    const deploy = contract.deploy({
        data: code,
    })
    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce: body.nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, body.signatureId, body.fromPrivateKey, body.fee)
}

/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord)
    const {
        fromPrivateKey,
        to,
        ethFee,
        data,
        nonce,
        signatureId
    } = body
    const client = getClient(provider, fromPrivateKey)
    const address = (to || client.eth.defaultAccount) as string
    const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)
    const addressNonce = nonce ? nonce : await ethGetTransactionsCount(address)
    const customFee = ethFee ? {
        ...ethFee,
        gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
    } : {
        gasLimit: `${hexData.length * 68 + 21000}`,
        gasPrice: await ethGetGasPriceInWei(),
    }

    const tx: TransactionConfig = {
        from: 0,
        to: address.trim(),
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
 * Sign Ethereum mint ERC 20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
    await validateBody(body, MintErc20)
    const {
        fromPrivateKey,
        amount,
        to,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mint(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}
const prepareEthSignedTransactionAbstraction = async (
    client: Web3, transaction: TransactionConfig, signatureId: string | undefined, fromPrivateKey: string | undefined, fee?: Fee | undefined
) => {
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei()
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
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
    await validateBody(body, BurnErc20)
    const {
        fromPrivateKey,
        amount,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
    const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthOrErc20SignedTransaction = async (body: TransferEthErc20, provider?: string) => {
    await validateBody(body, TransferEthErc20)
    const {
        fromPrivateKey,
        to,
        amount,
        currency,
        fee,
        data,
        nonce,
        signatureId
    } = body

    const client = getClient(provider, fromPrivateKey)

    let tx: TransactionConfig
    if (currency === Currency.ETH) {
        tx = {
            from: 0,
            to: to.trim(),
            value: client.utils.toWei(`${amount}`, 'ether'),
            data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
            nonce,
        }
    } else {
        // @ts-ignore
        const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], CONTRACT_ADDRESSES[currency])
        const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[currency])
        tx = {
            from: 0,
            to: CONTRACT_ADDRESSES[currency],
            data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
            nonce,
        }
    }

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomErc20SignedTransaction = async (body: TransferCustomErc20, provider?: string) => {
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

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], contractAddress)
    const decimals = new BigNumber(10).pow(digits)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress,
        data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
        nonce,
    }

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
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

    const client = getClient(provider, fromPrivateKey)
    // @ts-ignore
    const contract = new client.eth.Contract(erc20TokenABI)
    const deploy = contract.deploy({
        data: erc20TokenBytecode,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
        ],
    })
    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractMethodInvocation)
    const {
        fromPrivateKey,
        fee,
        params,
        methodName,
        methodABI,
        amount,
        contractAddress,
        nonce,
        signatureId,
    } = body
    const client = getClient(provider, fromPrivateKey)

    const contract = new client.eth.Contract([methodABI])
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
        data: contract.methods[methodName as string](...params).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign ETH generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareEthDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) => {
    await validateBody(body, DeployMarketplaceListing)
    const {
        fromPrivateKey,
        fee,
        feeRecipient,
        marketplaceFee,
        nonce,
        signatureId,
    } = body

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(listing.abi, null, {
        data: listing.data,
    })

    // @ts-ignore
    const deploy = contract.deploy({
        arguments: [marketplaceFee, feeRecipient]
    })

    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
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

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintCashbackErc721SignedTransaction = async (body: EthMintErc721, provider?: string) => {
    await validateBody(body, EthMintErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        authorAddresses,
        cashbackValues,
        url,
        nonce,
        signatureId,
        fee
    } = body

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const cashbacks: string[] = cashbackValues!
    // tslint:disable-next-line: prefer-for-of
    const cb = cashbacks.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleCashbackErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
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

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const cashbacks: string[][] = cashbackValues!
    const cb = cashbacks.map(cashback => cashback.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintMultipleCashback(to.map(t => t.trim()), tokenId, url, authorAddresses, cb).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
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

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintMultiple(to.map(t => t.trim()), tokenId, url).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc721SignedTransaction = async (body: EthBurnErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721)
    const {
        fromPrivateKey,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(tokenId).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
    await validateBody(body, EthBurnErc721)
    const {
        fromPrivateKey,
        cashbackValue,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferErc721SignedTransaction = async (body: EthTransferErc721, provider?: string) => {
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

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc721TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
        nonce,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenBatchSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) => {
    await validateBody(body, MintMultiTokenBatch)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        data,
        fee,
        amounts,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const amts = amounts.map(amts => amts.map(amt => `0x${new BigNumber(amt).toString(16)}`))
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mintBatch(to, tokenId, amts, data ? data : '0x0').encodeABI(),
        nonce,
    }

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) => {
    await validateBody(body, MintMultiToken)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        nonce,
        data,
        fee,
        amount,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum burn ERC 1155 batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnBatchMultiTokenSignedTransaction = async (body: EthBurnMultiTokenBatch, provider?: string) => {
    await validateBody(body, EthBurnMultiTokenBatch)
    const {
        fromPrivateKey,
        account,
        tokenId,
        amounts,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum burn ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnMultiTokenSignedTransaction = async (body: EthBurnMultiToken, provider?: string) => {
    await validateBody(body, EthBurnMultiToken)
    const {
        fromPrivateKey,
        account,
        tokenId,
        amount,
        fee,
        contractAddress,
        nonce,
        signatureId,
    } = body

    const client = getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.burn(account, tokenId, amount).encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum transfer ERC 1155 Batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBatchTransferMultiTokenSignedTransaction = async (body: TransferMultiTokenBatch, provider?: string) => {
    await validateBody(body, TransferMultiTokenBatch)
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
        amounts,
        data
    } = body

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const amts = amounts.map(amt => `0x${new BigNumber(amt).toString(16)}`)

    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeBatchTransfer(to.trim(), tokenId.map(token => token.trim()), amts, data ? data : '0x0').encodeABI(),
        nonce
    }

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum transfer ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferMultiTokenSignedTransaction = async (body: TransferMultiToken, provider?: string) => {
    await validateBody(body, EthTransferErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        fee,
        contractAddress,
        nonce,
        signatureId,
        amount,
        data,
    } = body

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new (client).eth.Contract(erc1155TokenABI, contractAddress)
    const tx: TransactionConfig = {
        from: 0,
        to: contractAddress.trim(),
        data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
        nonce
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum deploy ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployMultiTokenSignedTransaction = async (body: EthDeployMultiToken, provider?: string) => {
    await validateBody(body, EthDeployMultiToken)
    const {
        fromPrivateKey,
        fee,
        uri,
        nonce,
        signatureId,
    } = body

    const client = await getClient(provider, fromPrivateKey)

    // @ts-ignore
    const contract = new client.eth.Contract(erc1155TokenABI, null, {
        data: erc1155TokenBytecode,
    })

    // @ts-ignore
    const deploy = contract.deploy({
        arguments: [uri]
    })

    const tx: TransactionConfig = {
        from: 0,
        data: deploy.encodeABI(),
        nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployErc721SignedTransaction = async (body: EthDeployErc721, provider?: string) => {
    await validateBody(body, EthDeployErc721)
    const {
        fromPrivateKey,
        fee,
        name,
        symbol,
        nonce,
        signatureId,
    } = body

    const client = await getClient(provider, fromPrivateKey)

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

    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const getEthErc20ContractDecimals = async (testnet: boolean, contractAddress: string, provider?: string) => {
    if (!contractAddress) {
        throw new Error('Contract address not set.')
    }
    const client = await getClient(provider)
    // @ts-ignore
    const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
    return await contract.methods.decimals().call()
}

/**
 * Send Ethereum invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractReadMethodInvocation)
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body
    const client = getClient(provider)
    const contract = new client.eth.Contract([methodABI], contractAddress)
    return {data: await contract.methods[methodName as string](...params).call()}
}

/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
    ethBroadcast(await prepareStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthOrErc20Transaction = async (body: TransferEthErc20, provider?: string) =>
    ethBroadcast(await prepareEthOrErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomErc20Transaction = async (body: TransferCustomErc20, provider?: string) =>
    ethBroadcast(await prepareCustomErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20Transaction = async (body: DeployErc20, provider?: string) =>
    ethBroadcast(await prepareDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (body: SmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
    if (body.methodABI.stateMutability === 'view') {
        return sendSmartContractReadMethodInvocationTransaction(body, provider)
    }
    return ethBroadcast(await prepareSmartContractWriteMethodInvocation(body, provider), (body as SmartContractMethodInvocation).signatureId)
}

/**
 * Send Ethereum ERC721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721Transaction = async (body: EthMintErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 mint with cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackErc721Transaction = async (body: EthMintErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 mint multiple cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultipleCashbackErc721SignedTransaction = async (body: EthMintMultipleErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721Transaction = async (body: EthMintMultipleErc721, provider?: string) =>
    ethBroadcast(await prepareEthMintMultipleErc721SignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum ERC721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721Transaction = async (body: EthBurnErc721, provider?: string) =>
    ethBroadcast(await prepareEthBurnErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 update cashback for author transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthorErc721Transaction = async (body: UpdateCashbackErc721, provider?: string) =>
    ethBroadcast(await prepareEthUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendErc721Transaction = async (body: EthTransferErc721, provider?: string) =>
    ethBroadcast(await prepareEthTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721Transaction = async (body: EthDeployErc721, provider?: string) =>
    ethBroadcast(await prepareEthDeployErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMultiTokenTransaction = async (body: TransferMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMultiTokenBatchTransaction = async (body: TransferMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum MultiToken deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthDeployMultiTokenTransaction = async (body: EthDeployMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthDeployMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultiTokenTransaction = async (body: MintMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthMintMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken mint batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultiTokenBatchTransaction = async (body: MintMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthBurnMultiTokenTransaction = async (body: EthBurnMultiToken, provider?: string) =>
    ethBroadcast(await prepareEthBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken burn batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthBurnBatchMultiTokenTransaction = async (body: EthBurnMultiTokenBatch, provider?: string) =>
    ethBroadcast(await prepareEthBurnBatchMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) =>
    ethBroadcast(await prepareEthGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendEthDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) =>
    ethBroadcast(await prepareEthDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
