import {
    BigNum,
    hash_transaction,
    Transaction,
    TransactionBody,
    TransactionBuilder,
    TransactionWitnessSet,
    Vkeywitnesses,
} from '@emurgo/cardano-serialization-lib-nodejs';
import BigNumber from 'bignumber.js';
import { validateBody } from '../connector/tatum';
import { Currency, KeyPair, TransactionKMS, TransferBtcBasedOffchain, WithdrawalResponseData } from '../model';
import {
    adaToLovelace,
    addAddressInputsWithoutPrivateKey,
    addInput,
    addOutputAda,
    initTransactionBuilder,
    makeWitness,
} from '../transaction';
import { generateAddressFromXPub, generatePrivateKeyFromMnemonic } from '../wallet';
import { offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal } from './common';
import { offchainTransferAdaKMS } from './kms'

/**
 * Send Ada transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendAdaOffchainTransaction = async (testnet: boolean, body: TransferBtcBasedOffchain) => {
    if (body.signatureId) {
        return offchainTransferAdaKMS(body)
    }
    await validateBody(body, TransferBtcBasedOffchain);
    const {
        mnemonic, keyPair, xpub, attr: changeAddress, ...withdrawal
    } = body
    if (!withdrawal.fee) {
        withdrawal.fee = '1'
    }
    const { id, data } = await offchainStoreWithdrawal(withdrawal)
    const {
        amount, address,
    } = withdrawal
    let txData
    try {
        txData = await prepareAdaSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress, xpub, withdrawal.multipleAmounts)
    } catch (e) {
        console.error(e)
        await offchainCancelWithdrawal(id)
        throw e
    }
    try {
        return { ...await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.ADA }), id }
    } catch (e) {
        console.error(e)
        try {
            await offchainCancelWithdrawal(id)
        } catch (e1) {
            console.log(e)
            return { id }
        }
        throw e
    }
}

const prepareAdaSignedOffchainTransaction = async (testnet: boolean, data: WithdrawalResponseData[], amount: string, address: string, mnemonic?: string, keyPair?: KeyPair[],
                                                   changeAddress?: string, xpub?: string, multipleAmounts?: string[], signatureId?: string) => {
    const txBuilder = await initTransactionBuilder()
    const fromAddress = data.filter(input => input.address).map(input => ({ address: input.address.address }))
    await addAddressInputsWithoutPrivateKey(txBuilder, fromAddress)

    addOffchainInputs(txBuilder, data)
    if (multipleAmounts?.length) {
        for (const [i, multipleAmount] of multipleAmounts.entries()) {
            addOutputAda(txBuilder, address.split(',')[i], multipleAmount)
        }
    } else {
        addOutputAda(txBuilder, address, amount)
    }

    const lastVin = data.find(d => d.vIn === '-1') as WithdrawalResponseData
    if (new BigNumber(lastVin.amount).isGreaterThan(0)) {
        if (xpub) {
            const zeroAddress = await generateAddressFromXPub(Currency.ADA, testnet, xpub, 0)
            addOutputAda(txBuilder, zeroAddress, lastVin.amount)
        } else if (changeAddress) {
            addOutputAda(txBuilder, changeAddress, lastVin.amount)
        } else {
            throw new Error('Impossible to prepare transaction. Either xpub or keyPair and attr must be present.')
        }
    }

    const lovelaceFee = adaToLovelace(1)
    txBuilder.set_fee(BigNum.from_str(lovelaceFee))

    const txBody = txBuilder.build()
    if (signatureId) {
        return JSON.stringify({ txData: txBody.to_bytes().toString() })
    }
    const vKeyWitnesses = Vkeywitnesses.new()
    const txHash = hash_transaction(txBody)
    for (const input of data) {
        // when there is no address field present, input is pool transfer to 0
        if (input.vIn === '-1') {
            continue
        }

        if (mnemonic) {
            const derivationKey = input.address?.derivationKey || 0
            const privateKey = await generatePrivateKeyFromMnemonic(Currency.ADA, testnet, mnemonic, derivationKey)
            makeWitness(privateKey, txHash, vKeyWitnesses)
        } else if (keyPair) {
            const { privateKey } = keyPair.find(k => k.address === input.address.address) as KeyPair
            makeWitness(privateKey, txHash, vKeyWitnesses)
        } else {
            throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.')
        }


    }
    const witnesses = TransactionWitnessSet.new()
    witnesses.set_vkeys(vKeyWitnesses)
    return Buffer.from(
        Transaction.new(txBody, witnesses).to_bytes(),
    ).toString('hex')
}

const addOffchainInputs = (transactionBuilder: TransactionBuilder, inputs: WithdrawalResponseData[]) => {
    let amount = new BigNumber(0)
    for (const input of inputs) {
        if (input.vIn !== '-1' && input.amount && input.vInIndex !== undefined && input.address?.address) {
            addInput(transactionBuilder, {
                value: adaToLovelace(input.amount),
                index: input.vInIndex,
                txHash: input.vIn,
            }, input.address.address)
            amount = amount.plus(input.amount)
        }
    }
    return amount
}

/**
 * Sign Ada pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signAdaOffchainKMSTransaction = async (tx: TransactionKMS, mnemonic: string, testnet: boolean) => {
    if (tx.chain !== Currency.ADA || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.')
    }
    const txData = JSON.parse(tx.serializedTransaction).txData
    const transactionBody = TransactionBody.from_bytes(Uint8Array.from(txData.split(',')))
    const txHash = hash_transaction(transactionBody)
    const vKeyWitnesses = Vkeywitnesses.new()
    for (const response of tx.withdrawalResponses) {
        if (response.vIn === '-1') {
            continue
        }
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ADA, testnet, mnemonic, response.address?.derivationKey || 0)
        makeWitness(privateKey, txHash, vKeyWitnesses)
    }
    const witnesses = TransactionWitnessSet.new()
    witnesses.set_vkeys(vKeyWitnesses)
    return Buffer.from(
        Transaction.new(transactionBody, witnesses).to_bytes(),
    ).toString('hex')

}
