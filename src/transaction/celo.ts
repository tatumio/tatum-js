import {CeloProvider, CeloWallet} from '@celo-tools/celo-ethers-wrapper';
import {BigNumber} from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import Web3 from 'web3';
import {celoBroadcast} from '../blockchain';
import {CUSD_ADDRESS_MAINNET, CUSD_ADDRESS_TESTNET, TATUM_API_URL, TRANSFER_METHOD_ABI} from '../constants';
import erc20_abi from '../contracts/erc20/token_abi';
import erc20_bytecode from '../contracts/erc20/token_bytecode';
import erc721_abi from '../contracts/erc721/erc721_abi';
import erc721_bytecode from '../contracts/erc721/erc721_bytecode';
import {
    BurnCeloErc20,
    BurnErc721,
    Currency,
    DeployCeloErc20,
    DeployErc721,
    MintCeloErc20,
    MintErc721,
    MintMultipleErc721,
    TransactionKMS,
    TransferCeloOrCeloErc20Token,
    TransferErc721,
} from '../model';

/**
 * Sign Celo pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signCeloKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.CELO) {
        throw Error('Unsupported chain.');
    }
    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);
    const transaction = JSON.parse(tx.serializedTransaction);
    transaction.gasPrice = await wallet.getGasPrice(transaction.feeCurrency);
    return wallet.signTransaction(transaction);
};

export const prepareCeloDeployErc721SignedTransaction = async (testnet: boolean, body: DeployErc721, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        name,
        symbol,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi);
    const deploy = contract.deploy({
        data: erc721_bytecode,
        arguments: [name, symbol]
    });

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloMintErc721SignedTransaction = async (testnet: boolean, body: MintErc721, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        url,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);
    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim());

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloTransferErc721SignedTransaction = async (testnet: boolean, body: TransferErc721, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim());

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloBurnErc721SignedTransaction = async (testnet: boolean, body: BurnErc721, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        tokenId,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim());

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burn(tokenId).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloDeployErc20SignedTransaction = async (testnet: boolean, body: DeployCeloErc20, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        name,
        symbol,
        supply,
        address,
        digits,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc20_abi);
    const deploy = contract.deploy({
        data: erc20_bytecode,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
        ],
    });
    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        gasPrice,
        data: deploy.encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloMintErc20SignedTransaction = async (testnet: boolean, body: MintCeloErc20, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        amount,
        to,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`;
    const p = new CeloProvider(url);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);
    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim());

    const [txCount, gasPrice, decimals, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        contract.methods.decimals().call(),
        wallet.getAddress(),
    ]);

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloTransferErc20SignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        amount,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`;
    const p = new CeloProvider(url);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim());

    const [txCount, gasPrice, decimals, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        contract.methods.decimals().call(),
        wallet.getAddress(),
    ]);

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.transfer(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloBurnErc20SignedTransaction = async (testnet: boolean, body: BurnCeloErc20, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        amount,
        contractAddress,
        feeCurrency,
        nonce,
    } = body;

    const url = provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`;
    const p = new CeloProvider(url);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3(url)).eth.Contract(erc20_abi, contractAddress.trim());

    const [txCount, gasPrice, decimals, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        contract.methods.decimals().call(),
        wallet.getAddress(),
    ]);

    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.burn('0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

export const prepareCeloMintMultipleErc721SignedTransaction = async (testnet: boolean, body: MintMultipleErc721, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        tokenId,
        contractAddress,
        url,
        feeCurrency,
        nonce,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : (testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET);

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract(erc721_abi, contractAddress.trim());

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        gasLimit: '0',
        to: contractAddress.trim(),
        gasPrice,
        data: contract.methods.mintMultiple(to.map(t => t.trim()), tokenId, url).encodeABI(),
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

/**
 * Sign Celo or cUsd transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCeloOrCUsdSignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
    await validateOrReject(body);
    const {
        fromPrivateKey,
        to,
        feeCurrency,
        nonce,
        data,
        amount,
        currency,
    } = body;

    const p = new CeloProvider(provider || `${TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`);
    const network = await p.ready;
    const wallet = new CeloWallet(fromPrivateKey, p);

    const cUsdAddress = testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET;
    const feeCurrencyContractAddress = (feeCurrency === Currency.CELO) ? undefined : cUsdAddress;
    let value;
    if (currency === Currency.CELO) {
        value = `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`;
    } else {
        value = `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`;
    }

    // @ts-ignore
    const contract = new (new Web3()).eth.Contract([TRANSFER_METHOD_ABI], cUsdAddress.trim());

    const [txCount, gasPrice, from] = await Promise.all([
        wallet.getTransactionCount(),
        wallet.getGasPrice(feeCurrencyContractAddress),
        wallet.getAddress(),
    ]);
    const transaction = {
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce: nonce || txCount,
        to: currency === Currency.CELO ? to.trim() : cUsdAddress,
        data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
        gasLimit: '0',
        gasPrice,
        value: currency === Currency.CELO ? value : undefined,
        from,
    };
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CUSD ? 100000 : 0).toHexString();
    if (body.signatureId) {
        return JSON.stringify(transaction);
    }
    return wallet.signTransaction(transaction);
};

/**
 * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloOrcUsdTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
    return celoBroadcast(await prepareCeloOrCUsdSignedTransaction(testnet, body, provider));
};
