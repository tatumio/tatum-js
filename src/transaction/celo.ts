import {CeloProvider, CeloWallet} from '@celo-tools/celo-ethers-wrapper';
import {BigNumber as BN} from '@ethersproject/bignumber';
import {BigNumber} from 'bignumber.js';
import Web3 from 'web3';
import {isHex, stringToHex, toHex, toWei} from 'web3-utils';
import {celoBroadcast} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {CEUR_ADDRESS_MAINNET, CEUR_ADDRESS_TESTNET, CUSD_ADDRESS_MAINNET, CUSD_ADDRESS_TESTNET, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc1155_abi from '../contracts/erc1155/erc1155_abi';
import erc1155_bytecode from '../contracts/erc1155/erc1155_bytecode';
import erc20_abi from '../contracts/erc20/token_abi';
import erc20_bytecode from '../contracts/erc20/token_bytecode';
import erc721_abi from '../contracts/erc721/erc721_abi';
import erc721_bytecode from '../contracts/erc721/erc721_bytecode';
import * as listing from '../contracts/marketplace';
import {
    BurnCeloErc20,
    CeloBurnErc721,
    CeloBurnMultiToken,
    CeloBurnMultiTokenBatch,
    CeloDeployErc721,
    CeloDeployMultiToken,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloMintMultiToken,
    CeloMintMultiTokenBatch,
    CeloSmartContractMethodInvocation,
    CeloTransferErc721,
    CeloTransferMultiToken,
    CeloTransferMultiTokenBatch,
    CeloUpdateCashbackErc721,
    CreateRecord,
    Currency,
    DeployCeloErc20,
    DeployMarketplaceListing,
    GenerateCustodialAddress,
    MintCeloErc20,
    SmartContractReadMethodInvocation,
    TransactionKMS,
    TransferCeloOrCeloErc20Token
} from '../model';
import {obtainCustodialAddressType} from '../wallet/custodial';

const obtainWalletInformation = async (wallet: CeloWallet, feeCurrencyContractAddress?: string) => {
    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    return {
        txCount,
        gasPrice: [CUSD_ADDRESS_MAINNET, CUSD_ADDRESS_TESTNET].includes(feeCurrencyContractAddress || '') && gasPrice.lte(0x1dcd6500)
            ? BN.from(0x3B9ACA00)
            : gasPrice, from
    }
}

const getFeeCurrency = (feeCurrency: Currency, testnet: boolean) => {
    switch (feeCurrency) {
        case Currency.CEUR:
            return testnet ? CEUR_ADDRESS_TESTNET : CEUR_ADDRESS_MAINNET
        case Currency.CUSD:
            return testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET
        default:
            return undefined
    }
}

/**
 * Sign CELO generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareCeloGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateCustodialAddress, provider?: string) => {
    await validateBody(body, GenerateCustodialAddress)

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrency = body.feeCurrency || Currency.CELO
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    const {abi, code} = obtainCustodialAddressType(body)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(abi)
    const deploy = contract.deploy({
        data: code,
    })

    if (body.signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce: body.nonce,
            gasLimit: '0',
            data: deploy.encodeABI(),
        })
    }
    const wallet = new CeloWallet(body.fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: body.nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Sign CELO generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareCeloDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployMarketplaceListing, provider?: string) => {
    await validateBody(body, DeployMarketplaceListing)

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrency = body.feeCurrency || Currency.CELO
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(listing.abi)
    const deploy = contract.deploy({
        data: listing.data,
        arguments: [body.marketplaceFee, body.feeRecipient]
    })

    if (body.signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce: body.nonce,
            gasLimit: '0',
            data: deploy.encodeABI(),
        })
    }
    const wallet = new CeloWallet(body.fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: body.nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}
/**
 * Sign Celo pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const signCeloKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.CELO) {
        throw Error('Unsupported chain.')
    }
    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    await p.ready
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const transaction = JSON.parse(tx.serializedTransaction)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, transaction.feeCurrency)
    transaction.nonce = transaction.nonce || txCount
    transaction.gasPrice = transaction.gasPrice || gasPrice
    transaction.from = from
    transaction.gasLimit = transaction.gasLimit === '0' || !transaction.gasLimit ? (await wallet.estimateGas(transaction)).add(100000).toHexString() : transaction.gasLimit
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy multi token transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloDeployMultiTokenSignedTransaction = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) => {
    await validateBody(body, CeloDeployMultiToken)
    const {
        fromPrivateKey,
        uri,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi)
    const deploy = contract.deploy({
        data: erc1155_bytecode,
        arguments: [uri]
    })

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            data: deploy.encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloDeployErc721SignedTransaction = async (testnet: boolean, body: CeloDeployErc721, provider?: string) => {
    await validateBody(body, CeloDeployErc721)
    const {
        fromPrivateKey,
        name,
        symbol,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi)
    const deploy = contract.deploy({
        data: erc721_bytecode,
        arguments: [name, symbol]
    })

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            data: deploy.encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintCashbackErc721SignedTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
    await validateBody(body, CeloMintErc721)
    const {
        fromPrivateKey,
        url,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
        authorAddresses,
        cashbackValues
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())
    const cb: string[] = []
    for (const c of cashbackValues!) {
        cb.push(`0x${new BigNumber(toWei(c, 'ether')).toString(16)}`)
    }
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            to: contractAddress.trim(),
            gasLimit: '0',
            data: contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint erc732 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintErc721SignedTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
    await validateBody(body, CeloMintErc721)
    const {
        fromPrivateKey,
        url,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            to: contractAddress.trim(),
            gasLimit: '0',
            data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo transfer erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloTransferErc721SignedTransaction = async (testnet: boolean, body: CeloTransferErc721, provider?: string) => {
    await validateBody(body, CeloTransferErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
        value
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            gasLimit: '0',
            nonce,
            to: contractAddress.trim(),
            data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
            value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
        from,
        value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloBurnErc721SignedTransaction = async (testnet: boolean, body: CeloBurnErc721, provider?: string) => {
    await validateBody(body, CeloBurnErc721)
    const {
        fromPrivateKey,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.burn(tokenId).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burn(tokenId).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloDeployErc20SignedTransaction = async (testnet: boolean, body: DeployCeloErc20, provider?: string) => {
    await validateBody(body, DeployCeloErc20)
    const {
        fromPrivateKey,
        name,
        symbol,
        supply,
        address,
        digits,
        feeCurrency,
        nonce,
        signatureId,
        totalCap,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc20_abi)
    const deploy = contract.deploy({
        data: erc20_bytecode,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
        ],
    })
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            data: deploy.encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintErc20SignedTransaction = async (testnet: boolean, body: MintCeloErc20, provider?: string) => {
    await validateBody(body, MintCeloErc20)
    const {
        fromPrivateKey,
        amount,
        to,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
    const p = new CeloProvider(url)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim())
    const decimals = await contract.methods.decimals().call()
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a smart contract write method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloSmartContractWriteMethodInvocation = async (testnet: boolean, body: CeloSmartContractMethodInvocation, provider?: string) => {
    await validateBody(body, CeloSmartContractMethodInvocation)
    const {
        fromPrivateKey,
        feeCurrency,
        fee,
        params,
        methodName,
        methodABI,
        contractAddress,
        nonce,
        signatureId,
        amount,
    } = body

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
    const p = new CeloProvider(url)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract([methodABI], contractAddress.trim())

    const transaction: any = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
        gasLimit: fee?.gasLimit ? `0x${new BigNumber(fee.gasLimit).toString(16)}` : undefined,
        gasPrice: fee?.gasPrice ? `0x${new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16)}` : undefined,
        to: contractAddress.trim(),
        data: contract.methods[methodName as string](...params).encodeABI(),
    }
    if (signatureId) {
        return JSON.stringify(transaction)
    }

    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    transaction.nonce = transaction.nonce || txCount
    transaction.from = from
    transaction.gasLimit = transaction.gasLimit ?? (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    transaction.gasPrice = fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice.toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo smart contract read method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const sendCeloSmartContractReadMethodInvocationTransaction = async (testnet: boolean, body: SmartContractReadMethodInvocation, provider?: string) => {
    await validateBody(body, SmartContractReadMethodInvocation)
    const {
        params,
        methodName,
        methodABI,
        contractAddress,
    } = body

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract([methodABI], contractAddress.trim())
    return {data: await contract.methods[methodName as string](...params).call()}
}
export const sendCeloDeployErc20Transaction = async (testnet: boolean, body: DeployCeloErc20, provider?: string) =>
    celoBroadcast(await prepareCeloDeployErc20SignedTransaction(testnet, body, provider), body.signatureId)
export const sendCeloStoreDataSignedTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
    celoBroadcast(await prepareCeloStoreDataSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloSmartContractMethodInvocationTransaction =
    async (testnet: boolean, body: CeloSmartContractMethodInvocation | SmartContractReadMethodInvocation, provider?: string) => {
        if (body.methodABI.stateMutability === 'view') {
            return sendCeloSmartContractReadMethodInvocationTransaction(testnet, body, provider)
        }
        const celoBody = body as CeloSmartContractMethodInvocation
        return celoBroadcast(await prepareCeloSmartContractWriteMethodInvocation(testnet, celoBody, provider), celoBody.signatureId)
    }

export const getCeloErc20ContractDecimals = async (testnet: boolean, contractAddress: string, provider?: string) => {
    if (!contractAddress) {
        throw new Error('Contract address not set.')
    }
    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim())
    return await contract.methods.decimals().call()
}

/**
 * Prepare a signed Celo transfer erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloTransferErc20SignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
    await validateBody(body, TransferCeloOrCeloErc20Token)
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
        fee,
    } = body

    if (!contractAddress) {
        throw new Error('Contract address not set.')
    }
    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
    const p = new CeloProvider(url)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim())
    const decimals = await contract.methods.decimals().call()
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
            gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
            to: contractAddress.trim(),
            data: contract.methods.transfer(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
        to: contractAddress.trim(),
        gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
        data: contract.methods.transfer(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    }
    transaction.gasLimit = transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloBurnErc20SignedTransaction = async (testnet: boolean, body: BurnCeloErc20, provider?: string) => {
    await validateBody(body, BurnCeloErc20)
    const {
        fromPrivateKey,
        amount,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
    const p = new CeloProvider(url)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim())
    const decimals = await contract.methods.decimals().call()
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.burn('0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burn('0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintMultipleCashbackErc721SignedTransaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) => {
    await validateBody(body, CeloMintMultipleErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        feeCurrency,
        nonce,
        signatureId,
        authorAddresses,
        cashbackValues
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())
    const cashbacks: string[][] = cashbackValues!
    const cb: string[][] = []

    for (const c of cashbacks) {
        const cb2: string[] = []
        for (const c2 of c) {
            cb2.push(`0x${new BigNumber(toWei(c2, 'ether')).toString(16)}`)
        }
        cb.push(cb2)
    }
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.mintMultipleCashback(to.map(t => t.trim()), tokenId, url, authorAddresses, cb).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintMultipleCashback(to.map(t => t.trim()), tokenId, url, authorAddresses, cb).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintMultipleErc721SignedTransaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) => {
    await validateBody(body, CeloMintMultipleErc721)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.mintMultiple(to.map(t => t.trim()), tokenId, url).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintMultiple(to.map(t => t.trim()), tokenId, url).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo update cashback for author erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloUpdateCashbackForAuthorErc721SignedTransaction = async (testnet: boolean, body: CeloUpdateCashbackErc721, provider?: string) => {
    await validateBody(body, CeloUpdateCashbackErc721)
    const {
        fromPrivateKey,
        cashbackValue,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintMultiTokenSignedTransaction = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) => {
    await validateBody(body, CeloMintMultiToken)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        data,
        amount,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            to: contractAddress.trim(),
            gasLimit: '0',
            data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) => {
    await validateBody(body, CeloMintMultiTokenBatch)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        amounts,
        data,
        feeCurrency,
        nonce,
        signatureId
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())
    const amts = amounts.map(amts => amts.map(amt => `0x${new BigNumber(amt).toString(16)}`))
    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.mintBatch(to.map(t => t.trim()), tokenId, amts, data ? data : '0x0').encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintBatch(to.map(t => t.trim()), tokenId, amts, data ? data : '0x0').encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloTransferMultiTokenSignedTransaction = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) => {
    await validateBody(body, CeloTransferMultiToken)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        amount,
        data,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            gasLimit: '0',
            nonce,
            to: contractAddress.trim(),
            data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI()
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
        from
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo batch transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloBatchTransferMultiTokenSignedTransaction = async (testnet: boolean, body: CeloTransferMultiTokenBatch, provider?: string) => {
    await validateBody(body, CeloTransferMultiTokenBatch)
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
        amounts,
        data,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    const amts = amounts.map(amt => `0x${new BigNumber(amt).toString(16)}`)
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            gasLimit: '0',
            nonce,
            to: contractAddress.trim(),
            data: contract.methods.safeBatchTransfer(to.trim(), tokenId.map(token => token.trim()), amts, data ? data : '0x0').encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.safeBatchTransfer(to.trim(), tokenId.map(token => token.trim()), amts, data ? data : '0x0').encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) => {
    await validateBody(body, CeloBurnMultiTokenBatch)
    const {
        fromPrivateKey,
        tokenId,
        account,
        amounts,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareCeloBurnMultiTokenSignedTransaction = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) => {
    await validateBody(body, CeloBurnMultiToken)
    const {
        fromPrivateKey,
        tokenId,
        account,
        amount,
        contractAddress,
        feeCurrency,
        nonce,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc1155_abi, contractAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            gasLimit: '0',
            to: contractAddress.trim(),
            data: contract.methods.burn(account, tokenId, amount).encodeABI(),
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burn(account, tokenId, amount).encodeABI(),
        from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Sign Celo, cUsd or cEur transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareCeloOrCUsdSignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
    await validateBody(body, TransferCeloOrCeloErc20Token)
    const {
        fromPrivateKey,
        to,
        feeCurrency,
        nonce,
        data,
        amount,
        currency,
        fee,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const cUsdAddress = testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET
    const cEurAddress = testnet ? CEUR_ADDRESS_TESTNET : CEUR_ADDRESS_MAINNET
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    const value = `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`

    let recipient
    switch (currency) {
        case Currency.CEUR:
            recipient = cEurAddress
            break
        case Currency.CUSD:
            recipient = cUsdAddress
            break
        default:
            recipient = to.trim()
    }
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract([TRANSFER_METHOD_ABI], cUsdAddress.trim())

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            to: recipient,
            data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
            gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
            gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
            value: currency === Currency.CELO ? value : undefined,
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        to: recipient,
        data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
        gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
        gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
        value: currency === Currency.CELO ? value : undefined,
        from,
    }
    transaction.gasLimit = transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Sign store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareCeloStoreDataSignedTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
    await validateBody(body, CreateRecord)
    const {
        fromPrivateKey,
        to,
        feeCurrency,
        nonce,
        data,
        ethFee: fee,
        signatureId,
    } = body

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    const network = await p.ready

    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency as Currency, testnet)

    if (signatureId) {
        return JSON.stringify({
            chainId: network.chainId,
            feeCurrency: feeCurrencyContractAddress,
            nonce,
            to: to?.trim(),
            data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
            gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
            gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
            value: undefined,
        })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const {txCount, gasPrice, from} = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        to: to?.trim() || from,
        data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
        gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
        gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
        value: undefined,
        from,
    }
    transaction.gasLimit = transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
}

/**
 * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloOrcUsdTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) =>
    celoBroadcast(await prepareCeloOrCUsdSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintErc721Transaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) =>
    celoBroadcast(await prepareCeloMintErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintCashbackErc721Transaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) =>
    celoBroadcast(await prepareCeloMintCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintMultipleErc721Transaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) =>
    celoBroadcast(await prepareCeloMintMultipleErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintMultipleCashbackErc721Transaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) =>
    celoBroadcast(await prepareCeloMintMultipleCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloBurnErc721Transaction = async (testnet: boolean, body: CeloBurnErc721, provider?: string) =>
    celoBroadcast(await prepareCeloBurnErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloUpdateCashbackForAuthorErc721Transaction = async (testnet: boolean, body: CeloUpdateCashbackErc721, provider?: string) =>
    celoBroadcast(await prepareCeloUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider), body.signatureId)
/**
 * Send Celo transfer nft transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloTransferErc721Transaction = async (testnet: boolean, body: CeloTransferErc721, provider?: string) =>
    celoBroadcast(await prepareCeloTransferErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloDeployErc721Transaction = async (testnet: boolean, body: CeloDeployErc721, provider?: string) =>
    celoBroadcast(await prepareCeloDeployErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloDeployMultiTokenTransaction = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) =>
    celoBroadcast(await prepareCeloDeployMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintMultiTokenTransaction = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) =>
    celoBroadcast(await prepareCeloMintMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloMintMultiTokenBatchTransaction = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) =>
    celoBroadcast(await prepareCeloMintMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloTransferMultiTokenTransaction = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) =>
    celoBroadcast(await prepareCeloTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo transfer multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloTransferMultiTokenBatchTransaction = async (testnet: boolean, body: CeloTransferMultiTokenBatch, provider?: string) =>
    celoBroadcast(await prepareCeloBatchTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloBurnMultiTokenTransaction = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) =>
    celoBroadcast(await prepareCeloBurnMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloBurnMultiTokenBatchTransaction = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) =>
    celoBroadcast(await prepareCeloBurnMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloGenerateCustodialWalletSignedTransaction = async (testnet: boolean, body: GenerateCustodialAddress, provider?: string) =>
    celoBroadcast(await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCeloDeployMarketplaceListingSignedTransaction = async (testnet: boolean, body: DeployMarketplaceListing, provider?: string) =>
    celoBroadcast(await prepareCeloDeployMarketplaceListingSignedTransaction(testnet, body, provider), body.signatureId)
