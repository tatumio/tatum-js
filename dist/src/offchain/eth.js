"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareEthErc20SignedOffchainTransaction = exports.prepareEthSignedOffchainTransaction = exports.signEthOffchainKMSTransaction = exports.sendEthErc20OffchainTransaction = exports.sendEthOffchainTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const class_validator_1 = require("class-validator");
const web3_1 = __importDefault(require("web3"));
const constants_1 = require("../constants");
const token_abi_1 = __importDefault(require("../contracts/erc20/token_abi"));
const ledger_1 = require("../ledger");
const model_1 = require("../model");
const transaction_1 = require("../transaction");
const wallet_1 = require("../wallet");
const common_1 = require("./common");
/**
 * Send Ethereum transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendEthOffchainTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { mnemonic, index, privateKey, nonce } = body, withdrawal = __rest(body, ["mnemonic", "index", "privateKey", "nonce"]);
    const { amount, address } = withdrawal;
    let fromPriv;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.ETH, testnet, mnemonic, index) : privateKey;
    }
    else if (privateKey) {
        fromPriv = privateKey;
    }
    else {
        throw new Error('No mnemonic or private key is present.');
    }
    const web3 = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    const gasPrice = await transaction_1.ethGetGasPriceInWei(web3);
    const account = await ledger_1.getAccountById(withdrawal.senderAccountId);
    const { txData, gasLimit } = await exports.prepareEthSignedOffchainTransaction(amount, fromPriv, address, account.currency, web3, gasPrice, nonce);
    // @ts-ignore
    withdrawal.fee = new bignumber_js_1.default(web3.utils.fromWei(new bignumber_js_1.default(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    const { id } = await common_1.offchainStoreWithdrawal(withdrawal);
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.ETH })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Send Ethereum ERC20 transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendEthErc20OffchainTransaction = async (testnet, body, provider) => {
    await class_validator_1.validateOrReject(body);
    const { mnemonic, index, privateKey, nonce } = body, withdrawal = __rest(body, ["mnemonic", "index", "privateKey", "nonce"]);
    const { amount, address } = withdrawal;
    let fromPriv;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.ETH, testnet, mnemonic, index) : privateKey;
    }
    else if (privateKey) {
        fromPriv = privateKey;
    }
    else {
        throw new Error('No mnemonic or private key is present.');
    }
    const web3 = new web3_1.default(provider || `${constants_1.TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    const gasPrice = await transaction_1.ethGetGasPriceInWei(web3);
    const account = await ledger_1.getAccountById(withdrawal.senderAccountId);
    if (model_1.ETH_BASED_CURRENCIES.includes(account.currency)) {
        return exports.sendEthOffchainTransaction(testnet, body, provider);
    }
    const vc = await ledger_1.getVirtualCurrencyByName(account.currency);
    const { txData, gasLimit } = await exports.prepareEthErc20SignedOffchainTransaction(amount, fromPriv, address, web3, vc.erc20Address, gasPrice, nonce);
    // @ts-ignore
    withdrawal.fee = new bignumber_js_1.default(web3.utils.fromWei(new bignumber_js_1.default(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    const { id } = await common_1.offchainStoreWithdrawal(withdrawal);
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.ETH })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signEthOffchainKMSTransaction = async (tx, fromPrivateKey, testnet, provider) => {
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
 * Sign Ethereum transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param privateKey private key to sign transaction and send funds from
 * @param address recipient address
 * @param currency Ethereum or supported ERC20
 * @param web3 instance of the web3 client
 * @param gasPrice gas price of the blockchain fee
 * @param nonce nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareEthSignedOffchainTransaction = async (amount, privateKey, address, currency, web3, gasPrice, nonce) => {
    let tx;
    if (currency === 'ETH') {
        tx = {
            from: 0,
            to: address.trim(),
            value: web3.utils.toWei(amount, 'ether'),
            gasPrice,
            nonce,
        };
    }
    else {
        if (!Object.keys(constants_1.CONTRACT_ADDRESSES).includes(currency)) {
            throw new Error('Unsupported ETH ERC20 blockchain.');
        }
        // @ts-ignore
        const contract = new web3.eth.Contract(token_abi_1.default, constants_1.CONTRACT_ADDRESSES[currency]);
        tx = {
            from: 0,
            to: constants_1.CONTRACT_ADDRESSES[currency],
            data: contract.methods.transfer(address.trim(), `0x${new bignumber_js_1.default(amount).multipliedBy(new bignumber_js_1.default(10).pow(constants_1.CONTRACT_DECIMALS[currency])).toString(16)}`).encodeABI(),
            gasPrice,
            nonce,
        };
    }
    tx.gas = await web3.eth.estimateGas(tx);
    return {
        txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction,
        gasLimit: tx.gas
    };
};
/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param privateKey private key to sign transaction and send funds from
 * @param address recipient address
 * @param tokenAddress blockchain address of the custom ERC20 token
 * @param web3 instance of the web3 client
 * @param gasPrice gas price of the blockchain fee
 * @param nonce nonce of the transaction. this is counter of the transactions from given address. should be + 1 from previous one.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareEthErc20SignedOffchainTransaction = async (amount, privateKey, address, web3, tokenAddress, gasPrice, nonce) => {
    // @ts-ignore
    const contract = new web3.eth.Contract(token_abi_1.default, tokenAddress);
    let tx;
    tx = {
        from: 0,
        to: tokenAddress.trim(),
        data: contract.methods.transfer(address.trim(), `0x${new bignumber_js_1.default(amount).multipliedBy(new bignumber_js_1.default(10).pow(18)).toString(16)}`).encodeABI(),
        gasPrice,
        nonce,
    };
    tx.gas = await web3.eth.estimateGas(tx);
    return {
        txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction,
        gasLimit: tx.gas
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29mZmNoYWluL2V0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUFxQztBQUNyQyxxREFBaUQ7QUFDakQsZ0RBQXdCO0FBRXhCLDRDQUFrRjtBQUNsRiw2RUFBb0Q7QUFDcEQsc0NBQW1FO0FBQ25FLG9DQUF1SDtBQUN2SCxnREFBbUQ7QUFDbkQsc0NBQXlEO0FBQ3pELHFDQUE4RjtBQUU5Rjs7Ozs7OztHQU9HO0FBQ1UsUUFBQSwwQkFBMEIsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUF5QixFQUFFLFFBQWlCLEVBQUUsRUFBRTtJQUMvRyxNQUFNLGtDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQU0sRUFDRixRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEtBQ2xDLElBQUksRUFEbUMsVUFBVSxVQUNqRCxJQUFJLEVBRkYsNENBRUwsQ0FBTyxDQUFDO0lBQ1QsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsR0FBRyxVQUFVLENBQUM7SUFFckMsSUFBSSxRQUFnQixDQUFDO0lBQ3JCLElBQUksUUFBUSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDakMsUUFBUSxHQUFHLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sdUNBQThCLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBb0IsQ0FBQztLQUN0STtTQUFNLElBQUksVUFBVSxFQUFFO1FBQ25CLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDekI7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztLQUM3RDtJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLFFBQVEsSUFBSSxHQUFH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