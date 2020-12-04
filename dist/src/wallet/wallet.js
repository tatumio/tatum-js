"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWallet = exports.generateLyraWallet = exports.generateXlmWallet = exports.generateXrpWallet = exports.generateNeoWallet = exports.generateLtcWallet = exports.generateAdaWallet = exports.generateBtcWallet = exports.generateBchWallet = exports.generateEthWallet = exports.generateVetWallet = exports.generateBnbWallet = void 0;
const crypto_1 = require("@binance-chain/javascript-sdk/lib/crypto");
const neon_js_1 = __importStar(require("@cityofzion/neon-js"));
const bip39_1 = require("bip39");
const bitbox_sdk_1 = require("bitbox-sdk");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
// @ts-ignore
const hdkey_1 = __importDefault(require("hdkey"));
const ripple_lib_1 = require("ripple-lib");
const stellar_sdk_1 = require("stellar-sdk");
const constants_1 = require("../constants");
const model_1 = require("../model");
const cardano_wallet_1 = require("cardano-wallet");
/**
 * Generate BnB wallet
 * @param testnet testnet or mainnet version of address
 * @returns wallet
 */
exports.generateBnbWallet = async (testnet) => {
    const privateKey = crypto_1.generatePrivateKey();
    const prefix = testnet ? 'tbnb' : 'bnb';
    return {
        address: crypto_1.getAddressFromPrivateKey(privateKey, prefix),
        privateKey,
    };
};
/**
 * Generate VeChain wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateVetWallet = async (testnet, mnem) => {
    const path = testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.VET_DERIVATION_PATH;
    const hdwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(await bip39_1.mnemonicToSeed(mnem));
    const derivePath = hdwallet.derivePath(path);
    return {
        xpub: derivePath.publicExtendedKey().toString(),
        mnemonic: mnem
    };
};
/**
 * Generate Ethereum or any other ERC20 wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateEthWallet = async (testnet, mnem) => {
    const path = testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.ETH_DERIVATION_PATH;
    const hdwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(await bip39_1.mnemonicToSeed(mnem));
    const derivePath = hdwallet.derivePath(path);
    return {
        xpub: derivePath.publicExtendedKey().toString(),
        mnemonic: mnem
    };
};
/**
 * Generate Bitcoin Cash wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateBchWallet = (testnet, mnem) => {
    const m = new bitbox_sdk_1.Mnemonic();
    const node = new bitbox_sdk_1.HDNode();
    const rootSeedBuffer = m.toSeed(mnem);
    const hdNode = node.fromSeed(rootSeedBuffer, testnet ? 'testnet' : 'mainnet');
    const path = node.derivePath(hdNode, constants_1.BCH_DERIVATION_PATH);
    return {
        mnemonic: mnem,
        xpub: node.toXPub(path),
    };
};
/**
 * Generate Bitcoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateBtcWallet = async (testnet, mnem) => {
    const hdwallet = hdkey_1.default.fromMasterSeed(await bip39_1.mnemonicToSeed(mnem), testnet ? bitcoinjs_lib_1.networks.testnet.bip32 : bitcoinjs_lib_1.networks.bitcoin.bip32);
    return { mnemonic: mnem, xpub: hdwallet.derive(testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.BTC_DERIVATION_PATH).toJSON().xpub };
};
/**
 * Generate Cardano wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateAdaWallet = async (testnet, mnem) => {
    const mnemonic = mnem ? mnem : bip39_1.generateMnemonic(256);
    const entropy = cardano_wallet_1.Entropy.from_english_mnemonics(mnemonic);
    const hdwallet = cardano_wallet_1.Bip44RootPrivateKey.recover(entropy, '');
    return {
        mnemonic,
        xpub: hdwallet.bip44_account(cardano_wallet_1.AccountIndex.new(0x80000000)).bip44_chain(false).public().key().to_hex(),
    };
};
/**
 * Generate Litecoin wallet
 * @param testnet testnet or mainnet version of address
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateLtcWallet = async (testnet, mnem) => {
    const hdwallet = hdkey_1.default.fromMasterSeed(await bip39_1.mnemonicToSeed(mnem), testnet ? constants_1.LTC_TEST_NETWORK.bip32 : constants_1.LTC_NETWORK.bip32);
    return { mnemonic: mnem, xpub: hdwallet.derive(testnet ? constants_1.TESTNET_DERIVATION_PATH : constants_1.LTC_DERIVATION_PATH).toJSON().xpub };
};
/**
 * Generate Neo address and private key.
 */
exports.generateNeoWallet = () => {
    const privateKey = neon_js_1.default.create.privateKey();
    return { privateKey, address: new neon_js_1.wallet.Account(privateKey).address };
};
/**
 * Generate Xrp address and secret.
 */
exports.generateXrpWallet = () => {
    const { address, secret } = new ripple_lib_1.RippleAPI().generateAddress();
    return { address, secret };
};
/**
 * Generate Stellar address and secret.
 * @param secret secret of the account to generate address
 */
exports.generateXlmWallet = (secret) => {
    const keypair = secret ? stellar_sdk_1.Keypair.fromSecret(secret) : stellar_sdk_1.Keypair.random();
    return { address: keypair.publicKey(), secret: keypair.secret() };
};
/**
 * Generate Scrypta wallet
 * @param mnem mnemonic seed to use
 * @returns wallet
 */
exports.generateLyraWallet = async (mnem) => {
    const hdwallet = hdkey_1.default.fromMasterSeed(await bip39_1.mnemonicToSeed(mnem));
    return { mnemonic: mnem, xpub: hdwallet.derive(constants_1.LYRA_DERIVATION_PATH).toJSON().xpub };
};
/**
 * Generate wallet
 * @param currency blockchain to generate wallet for
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic seed to use. If not present, new one will be generated
 * @returns wallet or a combination of address and private key
 */
exports.generateWallet = (currency, testnet, mnemonic) => {
    const mnem = mnemonic ? mnemonic : bip39_1.generateMnemonic(256);
    switch (currency) {
        case model_1.Currency.BTC:
            return exports.generateBtcWallet(testnet, mnem);
        case model_1.Currency.ADA:
            return exports.generateAdaWallet(testnet, mnem);
        case model_1.Currency.LTC:
            return exports.generateLtcWallet(testnet, mnem);
        case model_1.Currency.BCH:
            return exports.generateBchWallet(testnet, mnem);
        case model_1.Currency.USDT:
        case model_1.Currency.LEO:
        case model_1.Currency.LINK:
        case model_1.Currency.UNI:
        case model_1.Currency.FREE:
        case model_1.Currency.MKR:
        case model_1.Currency.USDC:
        case model_1.Currency.BAT:
        case model_1.Currency.TUSD:
        case model_1.Currency.PAX:
        case model_1.Currency.PAXG:
        case model_1.Currency.PLTC:
        case model_1.Currency.XCON:
        case model_1.Currency.ETH:
        case model_1.Currency.MMY:
            return exports.generateEthWallet(testnet, mnem);
        case model_1.Currency.XRP:
            return exports.generateXrpWallet();
        case model_1.Currency.XLM:
            return exports.generateXlmWallet();
        case model_1.Currency.VET:
            return exports.generateVetWallet(testnet, mnem);
        case model_1.Currency.NEO:
            return exports.generateNeoWallet();
        case model_1.Currency.BNB:
            return exports.generateBnbWallet(testnet);
        case model_1.Currency.LYRA:
            return exports.generateLyraWallet(mnem);
        default:
            throw new Error('Unsupported blockchain.');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3dhbGxldC93YWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFFQUFzRztBQUN0RywrREFBaUQ7QUFDakQsaUNBQXVEO0FBQ3ZELDJDQUE0QztBQUM1QyxpREFBdUM7QUFDdkMseURBQW9EO0FBQ3BELGFBQWE7QUFDYixrREFBMEI7QUFDMUIsMkNBQXFDO0FBQ3JDLDZDQUFvQztBQUNwQyw0Q0FVc0I7QUFDdEIsb0NBQWtDO0FBQ2xDLG1EQUEwRTtBQWUxRTs7OztHQUlHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ3hELE1BQU0sVUFBVSxHQUFHLDJCQUFrQixFQUFFLENBQUM7SUFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN4QyxPQUFPO1FBQ0gsT0FBTyxFQUFFLGlDQUF3QixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7UUFDckQsVUFBVTtLQUNiLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsSUFBWSxFQUFtQixFQUFFO0lBQ3ZGLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUNBQXVCLENBQUMsQ0FBQyxDQUFDLCtCQUFtQixDQUFDO0lBQ3JFLE1BQU0sUUFBUSxHQUFHLHlCQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sc0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsT0FBTztRQUNILElBQUksRUFBRSxVQUFVLENBQUMsaUJBQWlCLEVBQUUs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