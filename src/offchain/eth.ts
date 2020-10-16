import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import Web3 from 'web3';
import {TransactionConfig} from 'web3-core';
import {CONTRACT_ADDRESSES, CONTRACT_DECIMALS, TATUM_API_URL} from '../constants';
import tokenAbi from '../contracts/erc20/token_abi';
import {getAccountById, getVirtualCurrencyByName} from '../ledger';
import {Currency, TransactionKMS, TransferEthErc20Offchain, TransferEthOffchain} from '../model';
import {ethGetGasPriceInWei} from '../transaction';
import {generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send Ethereum transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    await validateOrReject(body);
    const {
        mnemonic, index, privateKey, nonce, ...withdrawal
    } = body;
    const {amount, address} = withdrawal;

    let fromPriv: string;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(Currency.ETH, testnet, mnemonic, index) : privateKey as string;
    } else if (privateKey) {
        fromPriv = privateKey;
    } else {
        throw new Error('No mnemonic or private key is present.');
    }

    const web3 = new Web3(provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    const gasPrice = await ethGetGasPriceInWei(web3);

    const account = await getAccountById(withdrawal.senderAccountId);
    const {txData, gasLimit} = await prepareEthSignedOffchainTransaction(amount, fromPriv, address, account.currency, web3, gasPrice, nonce);
    // @ts-ignore
    withdrawal.fee = new BigNumber(web3.utils.fromWei(new BigNumber(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    const {id} = await offchainStoreWithdrawal(withdrawal);
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.ETH}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
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
export const sendEthErc20OffchainTransaction = async (testnet: boolean, body: TransferEthErc20Offchain, provider?: string) => {
    await validateOrReject(body);
    const {
        mnemonic, index, privateKey, nonce, ...withdrawal
    } = body;
    const {amount, address} = withdrawal;

    let fromPriv;
    if (mnemonic && index !== undefined) {
        fromPriv = mnemonic && index ? await generatePrivateKeyFromMnemonic(Currency.ETH, testnet, mnemonic, index) : privateKey as string;
    } else if (privateKey) {
        fromPriv = privateKey;
    } else {
        throw new Error('No mnemonic or private key is present.');
    }

    const web3 = new Web3(provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    web3.eth.accounts.wallet.add(fromPriv);
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;
    const gasPrice = await ethGetGasPriceInWei(web3);

    const account = await getAccountById(withdrawal.senderAccountId);
    const vc = await getVirtualCurrencyByName(account.currency);
    const {txData, gasLimit} = await prepareEthErc20SignedOffchainTransaction(amount, fromPriv, address, web3, vc.erc20Address as string, gasPrice, nonce);
    // @ts-ignore
    withdrawal.fee = new BigNumber(web3.utils.fromWei(new BigNumber(gasLimit).multipliedBy(gasPrice).toString(), 'ether')).toString();
    const {id} = await offchainStoreWithdrawal(withdrawal);
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.ETH}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
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
export const signEthOffchainKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.ETH) {
        throw Error('Unsupported chain.');
    }
    const client = new Web3(provider || `${TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`);
    client.eth.accounts.wallet.clear();
    client.eth.accounts.wallet.add(fromPrivateKey);
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address;
    const transactionConfig = JSON.parse(tx.serializedTransaction);
    transactionConfig.gas = await client.eth.estimateGas(transactionConfig);
    return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string;
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
export const prepareEthSignedOffchainTransaction =
    async (amount: string, privateKey: string, address: string, currency: string, web3: Web3, gasPrice: string, nonce?: number) => {
        let tx: TransactionConfig;
        if (currency === 'ETH') {
            tx = {
                from: 0,
                to: address.trim(),
                value: web3.utils.toWei(amount, 'ether'),
                gasPrice,
                nonce,
            };
        } else {
            if (!Object.keys(CONTRACT_ADDRESSES).includes(currency)) {
                throw new Error('Unsupported ETH ERC20 blockchain.');
            }
            // @ts-ignore
            const contract = new web3.eth.Contract(tokenAbi, CONTRACT_ADDRESSES[currency]);

            tx = {
                from: 0,
                to: CONTRACT_ADDRESSES[currency],
                data: contract.methods.transfer(address.trim(), new BigNumber(amount).multipliedBy(10).pow(CONTRACT_DECIMALS[currency]).toString(16)).encodeABI(),
                gasPrice,
                nonce,
            };
        }
        tx.gas = await web3.eth.estimateGas(tx);
        return {
            txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
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
export const prepareEthErc20SignedOffchainTransaction =
    async (amount: string, privateKey: string, address: string, web3: Web3, tokenAddress: string, gasPrice: string, nonce?: number) => {
        // @ts-ignore
        const contract = new web3.eth.Contract(tokenAbi, tokenAddress);
        let tx: TransactionConfig;
        tx = {
            from: 0,
            to: tokenAddress.trim(),
            data: contract.methods.transfer(address.trim(), new BigNumber(amount).multipliedBy(10).pow(18)).encodeABI(),
            gasPrice,
            nonce,
        };
        tx.gas = await web3.eth.estimateGas(tx);
        return {
            txData: (await web3.eth.accounts.signTransaction(tx, privateKey)).rawTransaction as string,
            gasLimit: tx.gas
        };
    };
