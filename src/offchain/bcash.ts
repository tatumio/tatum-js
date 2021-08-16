import BigNumber from 'bignumber.js'
// @ts-ignore
import coininfo from 'coininfo'
import {validateBody} from '../connector/tatum'
import {Currency, KeyPair, TransactionKMS, TransferBtcBasedOffchain, WithdrawalResponseData} from '../model'
import {generateAddressFromXPub, generateBchWallet, generatePrivateKeyFromMnemonic, toLegacyAddress} from '../wallet'
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common'
// tslint:disable-next-line:no-var-requires
const bcash = require('@tatumio/bitcoincashjs2-lib')

/**
 * Send Bitcoin Cash transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendBitcoinCashOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
    await validateBody(body, TransferBtcBasedOffchain)
    const {
        mnemonic, keyPair, attr: changeAddress, ...withdrawal
    } = body
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00005'
    }
    const {id, data} = await offchainStoreWithdrawal(withdrawal)
    const {
        amount, address,
    } = withdrawal
    let txData
    try {
        txData = await prepareBitcoinCashSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress, withdrawal.multipleAmounts)
    } catch (e) {
        console.error(e)
        await offchainCancelWithdrawal(id)
        throw e
    }
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.BCH}), id}
    } catch (e) {
        console.error(e)
        try {
            await offchainCancelWithdrawal(id)
        } catch (e1) {
            console.log(e)
            return {id}
        }
        throw e
    }
}

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBitcoinCashOffchainKMSTransaction = async (tx: TransactionKMS, mnemonic: string, testnet: boolean) => {
    if (tx.chain !== Currency.BCH || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.')
    }
    const [data, amountsToDecode] = tx.serializedTransaction.split(':')
    const transaction = bcash.Transaction.fromHex(data)
    const amountsToSign = JSON.parse(amountsToDecode) as number[]
    const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
    const builder = bcash.TransactionBuilder.fromTransaction(transaction, network)
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue
        }
        const ecPair = bcash.ECPair.fromWIF(await generatePrivateKeyFromMnemonic(Currency.BCH, testnet, mnemonic, response.address?.derivationKey || 0), network)
        builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, bcash.ECSignature.SCHNORR)
    }
    return builder.build().toHex()
}

const getAddress = (address: string) => {
    try {
        return toLegacyAddress(address)
    } catch (e) {
        return address
    }
}

/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address, if multiple recipients are present, it should be string separated by ','
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @param multipleAmounts if multiple recipients are present in the address separated by ',', this should be list of amounts to send
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBitcoinCashSignedOffchainTransaction =
    async (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic?: string, keyPair?: KeyPair[],
           changeAddress?: string, multipleAmounts?: string[]) => {
        const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
        const tx = new bcash.TransactionBuilder(network)

        data.forEach((input) => {
            if (input.vIn !== '-1') {
                tx.addInput(input.vIn, input.vInIndex, 0xffffffff, null)
            }
        })

        const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData
        if (multipleAmounts?.length) {
            for (const [i, multipleAmount] of multipleAmounts.entries()) {
                tx.addOutput(getAddress(address.split(',')[i]), Number(new BigNumber(multipleAmount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
            }
        } else {
            tx.addOutput(getAddress(address), Number(new BigNumber(amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)))
        }
        if (new BigNumber(lastVin.amount).isGreaterThan(0)) {
            if (mnemonic && !changeAddress) {
                const {xpub} = await generateBchWallet(testnet, mnemonic)
                tx.addOutput(getAddress(generateAddressFromXPub(Currency.BCH, testnet, xpub, 0)),
                    Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)))
            } else if (changeAddress) {
                tx.addOutput(getAddress(changeAddress), Number(new BigNumber(lastVin.amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)))
            } else {
                throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.')
            }
        }
        for (const [i, input] of data.entries()) {
            // when there is no address field present, input is pool transfer to 0
            if (input.vIn === '-1') {
                continue
            }
            const value = Number(new BigNumber(data[i].amount).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR))
            if (mnemonic) {
                const derivationKey = input.address && input.address.derivationKey ? input.address.derivationKey : 0
                const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, testnet, mnemonic, derivationKey)
                const ecPair = bcash.ECPair.fromWIF(privateKey, network)
                tx.sign(i, ecPair, undefined, 0x01, value, undefined, bcash.ECSignature.SCHNORR)
            } else if (keyPair) {
                // @ts-ignore
                const privateKey = keyPair.find(k => k.address === input.address.address)
                if (privateKey) {
                    const ecPair = bcash.ECPair.fromWIF(privateKey.privateKey, network)
                    tx.sign(i, ecPair, undefined, 0x01, value, undefined, bcash.ECSignature.SCHNORR)
                }
            }
        }

        return tx.build().toHex()
    }
