"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDeployErc20Transaction = exports.sendCustomErc20Transaction = exports.sendEthOrErc20Transaction = exports.sendStoreDataTransaction = exports.prepareDeployErc20SignedTransaction = exports.prepareCustomErc20SignedTransaction = exports.prepareEthOrErc20SignedTransaction = exports.prepareStoreDataTransaction = exports.signEthKMSTransaction = exports.ethGetGasPriceInWei = void 0;
const axios_1 = __importDefault(require("axios"));
const bignumber_js_1 = require("bignumber.js");
const class_validator_1 = require("class-validator");
const web3_1 = __importDefault(require("web3"));
const blockchain_1 = require("../blockchain");
const constants_1 = require("../constants");
const token_abi_1 = __importDefault(require("../contracts/erc20/token_abi"));
const token_bytecode_1 = __importDefault(require("../contracts/erc20/token_bytecode"));
const model_1 = require("../model");
/**
 * Estimate Gas price for the transaction.
 * @param client
 */
exports.ethGetGasPriceInWei = async (client) => {
    const { data } = await axios_1.default.get('https://ethgasstation.info/json/ethgasAPI.json');
    return client.utils.toWei(new bignumber_js_1.BigNumber(data.fast).dividedBy(10).toString(), 'gwei');
};
/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signEthKMSTransaction = async (tx, fromPrivateKey, testnet, provider) => {
    if (tx.chain !== model_1.Currency.ETH) {
        throw Error('Unsupported chain.');
    }
    const client = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction;
};
/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareStoreDataTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { fromPrivateKey, to, ethFee, data, nonce, } = body;
    const client = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const address = to || client.eth.defaultAccount;
    const addressNonce = nonce ? nonce : await blockchain_1.ethGetTransactionsCount(address);
    const customFee = ethFee ? ethFee : {
        gasLimit: `${data.length * 68 + 21000}`,
        gasPrice: client.utils.fromWei(await exports.ethGetGasPriceInWei(client), 'gwei'),
    };
    const tx = {
        from: 0,
        to: address.trim(),
        value: '0',
        gasPrice: customFee.gasPrice,
        gas: customFee.gasLimit,
        data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
        nonce: addressNonce,
    };
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareEthOrErc20SignedTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { fromPrivateKey, to, amount, currency, fee, data, nonce, } = body;
    const client = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    let tx;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await exports.ethGetGasPriceInWei(client);
    if (currency === model_1.Currency.ETH) {
        tx = {
            from: 0,
            to: to.trim(),
            value: client.utils.toWei(`${amount}`, 'ether'),
            gasPrice,
            data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
            nonce,
        };
    }
    else {
        // @ts-ignore
        const contract = new client.eth.Contract([constants_1.TRANSFER_METHOD_ABI], constants_1.CONTRACT_ADDRESSES[currency]);
        const digits = new bignumber_js_1.BigNumber(10).pow(constants_1.CONTRACT_DECIMALS[currency]);
        tx = {
            from: 0,
            to: constants_1.CONTRACT_ADDRESSES[currency],
            data: contract.methods.transfer(to.trim(), `0x${new bignumber_js_1.BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
            gasPrice,
            nonce,
        };
    }
    if (fee) {
        tx.gas = fee.gasLimit;
    }
    else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareCustomErc20SignedTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { fromPrivateKey, to, amount, contractAddress, digits, fee, nonce, } = body;
    const client = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    let tx;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await exports.ethGetGasPriceInWei(client);
    // @ts-ignore
    const contract = new client.eth.Contract([constants_1.TRANSFER_METHOD_ABI], contractAddress);
    const decimals = new bignumber_js_1.BigNumber(10).pow(digits);
    tx = {
        from: 0,
        to: contractAddress,
        data: contract.methods.transfer(to.trim(), `0x${new bignumber_js_1.BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };
    if (fee) {
        tx.gas = fee.gasLimit;
    }
    else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareDeployErc20SignedTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, } = body;
    const client = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await exports.ethGetGasPriceInWei(client);
    // @ts-ignore
    const contract = new client.eth.Contract(token_abi_1.default);
    const deploy = contract.deploy({
        data: token_bytecode_1.default,
        arguments: [
            name,
            symbol,
            address,
            digits,
            `0x${new bignumber_js_1.BigNumber(supply).multipliedBy(new bignumber_js_1.BigNumber(10).pow(digits)).toString(16)}`,
            `0x${new bignumber_js_1.BigNumber(supply).multipliedBy(new bignumber_js_1.BigNumber(10).pow(digits)).toString(16)}`,
        ],
    });
    const tx = {
        from: 0,
        data: deploy.encodeABI(),
        gasPrice,
        nonce,
    };
    if (fee) {
        tx.gas = fee.gasLimit;
    }
    else {
        tx.gas = await client.eth.estimateGas(tx) + 5000;
    }
    return (await client.eth.accounts.signTransaction(tx, fromPrivateKey)).rawTransaction;
};
/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendStoreDataTransaction = async (testnet, body, provider) => {
    return blockchain_1.ethBroadcast(await exports.prepareStoreDataTransaction(testnet, body, provider));
};
/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendEthOrErc20Transaction = async (testnet, body, provider) => {
    return blockchain_1.ethBroadcast(await exports.prepareEthOrErc20SignedTransaction(testnet, body, provider));
};
/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendCustomErc20Transaction = async (testnet, body, provider) => {
    return blockchain_1.ethBroadcast(await exports.prepareCustomErc20SignedTransaction(testnet, body, provider));
};
/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendDeployErc20Transaction = async (testnet, body, provider) => {
    return blockchain_1.ethBroadcast(await exports.prepareDeployErc20SignedTransaction(testnet, body, provider));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zYWN0aW9uL2V0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsK0NBQXVDO0FBQ3ZDLHFEQUFpRDtBQUNqRCxnREFBd0I7QUFFeEIsOENBQW9FO0FBQ3BFLDRDQUtzQjtBQUN0Qiw2RUFBb0Q7QUFDcEQsdUZBQThEO0FBQzlELG9DQUF1SDtBQUV2SDs7O0dBR0c7QUFDVSxRQUFBLG1CQUFtQixHQUFHLEtBQUssRUFBRSxNQUFZLEVBQUUsRUFBRTtJQUN0RCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDakYsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLHdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6RixDQUFDLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsRUFBa0IsRUFBRSxjQUFzQixFQUFFLE9BQWdCLEVBQUUsUUFBaUIsRUFBRSxFQUFFO0lBQzNILElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxnQkFBUSxDQUFDLEdBQUcsRUFBRTtRQUMzQixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcseUJBQWEscUJBQXFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN0RyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsTUFBTSxDQUFDLEdBQUcs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