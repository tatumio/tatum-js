// @ts-ignore
import * as fcl from '@onflow/fcl';
// @ts-ignore
import * as sdk from '@onflow/sdk';
// @ts-ignore
import * as types from '@onflow/types';
// @ts-ignore
import {ECDSA_secp256k1, encodeKey, SHA3_256,} from '@onflow/util-encode-key';
import * as elliptic from 'elliptic';
import {SHA3} from 'sha3';
import {validateBody} from '../connector/tatum';
import {FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES} from '../constants';
import {Currency, FlowBurnNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft, TransactionKMS, TransferFlow} from '../model';
import {generatePrivateKeyFromMnemonic} from '../wallet';
import {
    burnFlowNftTokenTxTemplate,
    metadataFlowNftTokenScript,
    mintFlowMultipleNftTokenTxTemplate,
    mintFlowNftTokenTxTemplate,
    prepareAddPublicKeyToAccountTxTemplate,
    prepareCreateAccountWithFUSDFromPublicKeyTxTemplate,
    prepareTransferFlowTxTemplate,
    tokenByAddressFlowNftTokenScript,
    transferFlowNftTokenTxTemplate
} from './flowTransaction';

export enum FlowTxType {
    CREATE_ACCOUNT,
    ADD_PK_TO_ACCOUNT,
    TRANSFER,
    DEPLOY_NFT,
    MINT_NFT,
    MINT_MULTIPLE_NFT,
    BURN_NFT,
    TRANSFER_NFT,
}

interface Account {
    addr?: string
}

interface AccountSignature {
    addr: string
    keyId: number
    signature: string
}

interface AccountAuthorization {
    tempId: string
    addr: string
    keyId: number
    signingFunction: (data: { message: string }) => AccountSignature
}


type Argument = {
    type: string,
    subType?: string,
    value: string | string[]
}

type Transaction = {
    code: string
    args: Argument[]
    proposer: AccountAuthorizer
    authorizations: AccountAuthorizer[]
    payer: AccountAuthorizer
}

type TransactionResult = {
    id: string
    error: string
    events: { data: any }[]
}

type AccountAuthorizer = (
    account?: Account
) => Promise<AccountAuthorization>

const sign = (pk: string, msg: Buffer) => {
    const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk)
    const signature = keyPair.sign(new SHA3(256).update(msg).digest())
    const r = signature.r.toArrayLike(
        Buffer,
        'be',
        32
    )
    const s = signature.s.toArrayLike(
        Buffer,
        'be',
        32
    )

    return Buffer.concat([r, s]).toString('hex')
}

export const getFlowSigner = (
    pk: string,
    address: string,
    keyId = 0,
) => (account: any) => {

    return {
        ...account,
        tempId: `${address}-${keyId}`,
        addr: fcl.sansPrefix(address),
        keyId: Number(keyId),
        signingFunction: async (data: any) => {
            return {
                addr: fcl.withPrefix(address),
                keyId: Number(keyId),
                signature: sign(pk, Buffer.from(data.message, 'hex')),
            }
        }
    }
}

const sendTransaction = async (testnet: boolean, {
    code,
    args,
    proposer,
    authorizations,
    payer,
}: Transaction): Promise<TransactionResult> => {
    fcl.config().put('accessNode.api', testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org')
    const response = await fcl.send([
        fcl.transaction(code),
        fcl.args(args.map(arg => fcl.arg(arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value,
            arg.type === 'Array' ? types[arg.type](types[arg.subType]) : types[arg.type]))),
        fcl.proposer(proposer),
        fcl.authorizations(authorizations),
        fcl.payer(payer),
        fcl.limit(1000),
    ])

    const {transactionId} = response
    const {error, events} = await fcl.tx(response).onceSealed()

    return {
        id: transactionId,
        error,
        events,
    }
}

const sendScript = async (testnet: boolean, code: string, args: Argument[]) => {
    fcl.config().put('accessNode.api', testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org')
    const response = await fcl.send([
        fcl.script(code),
        fcl.args(args.map(arg => fcl.arg(arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value, types[arg.type]))),
    ])
    return fcl.decode(response)
}

export const flowSignKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.FLOW) {
        throw Error('Unsupported chain.')
    }
    const {type, body}: { type: FlowTxType, body: any } = JSON.parse(tx.serializedTransaction)
    switch (type) {
        case FlowTxType.CREATE_ACCOUNT:
            return await flowCreateAccountFromPublicKey(testnet, body.publicKey, body.account, privateKeys[0])
        case FlowTxType.ADD_PK_TO_ACCOUNT:
            return await flowAddPublicKeyToAccount(testnet, body.publicKey, body.account, privateKeys[0])
        case FlowTxType.TRANSFER:
            return await flowSendTransaction(testnet, {...body, privateKey: privateKeys[0]})
        case FlowTxType.TRANSFER_NFT:
            return await sendFlowNftTransferToken(testnet, {...body, privateKey: privateKeys[0]})
        case FlowTxType.MINT_NFT:
            return await sendFlowNftMintToken(testnet, {...body, privateKey: privateKeys[0]})
        case FlowTxType.MINT_MULTIPLE_NFT:
            return await sendFlowNftMintMultipleToken(testnet, {...body, privateKey: privateKeys[0]})
        case FlowTxType.BURN_NFT:
            return await sendFlowNftBurnToken(testnet, {...body, privateKey: privateKeys[0]})
    }
}

export const flowCreateAccountFromPublicKey = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string):
    Promise<{ txId: string, address: string }> => {
    const code = prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(testnet)
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        1000
    )
    const args = [{type: 'String', value: encodedPublicKey}]
    const auth = getFlowSigner(signerPrivateKey, signerAddress)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id, address: result.events.find((e: any) => e.type === 'flow.AccountCreated')?.data.address}
}

export const flowAddPublicKeyToAccount = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string):
    Promise<{ txId: string, address: string }> => {
    const code = prepareAddPublicKeyToAccountTxTemplate()
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        1000
    )
    const args = [{type: 'String', value: encodedPublicKey}]
    const auth = getFlowSigner(signerPrivateKey, signerAddress)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id, address: result.events[0].data.address}
}

export const getFlowNftMetadata = async (testnet: boolean, account: string, id: string, tokenType: string) => {
    const code = metadataFlowNftTokenScript(testnet)
    const args = [{type: 'Address', value: account}, {type: 'UInt64', value: id}, {type: 'String', value: tokenType}]
    return await sendScript(testnet, code, args)
}

export const getFlowNftTokenByAddress = async (testnet: boolean, account: string, tokenType: string) => {
    const code = tokenByAddressFlowNftTokenScript(testnet)
    const args = [{type: 'Address', value: account}, {type: 'String', value: tokenType}]
    return await sendScript(testnet, code, args)
}

/**
 * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendFlowNftMintToken = async (testnet: boolean, body: FlowMintNft):
    Promise<{ txId: string, tokenId: string }> => {
    await validateBody(body, FlowMintNft);
    const code = mintFlowNftTokenTxTemplate(testnet);
    const {url, contractAddress: tokenType, to, mnemonic, index, account, privateKey} = body;
    const args = [{type: 'Address', value: to}, {type: 'String', value: url}, {type: 'String', value: tokenType}];
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string;
    const auth = getFlowSigner(pk, account);
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth});
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, tokenId: `${result.events.find((e: any) => e.type.includes('TatumMultiNFT.Minted'))?.data.id}`};
}

/**
 * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendFlowNftMintMultipleToken = async (testnet: boolean, body: FlowMintMultipleNft):
    Promise<{ txId: string, tokenId: number[] }> => {
    await validateBody(body, FlowMintMultipleNft)
    const code = mintFlowMultipleNftTokenTxTemplate(testnet)
    const {url, contractAddress: tokenType, to, mnemonic, index, account, privateKey} = body
    const args = [{type: 'Array', subType: 'Address', value: to}, {type: 'Array', subType: 'String', value: url}, {type: 'String', value: tokenType}]
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string
    const auth = getFlowSigner(pk, account)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id, tokenId: result.events.filter((e: any) => e.type.includes('TatumMultiNFT.Minted')).map(e => e.data.id)}
}

/**
 * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendFlowNftTransferToken = async (testnet: boolean, body: FlowTransferNft):
    Promise<{ txId: string }> => {
    await validateBody(body, FlowTransferNft)
    const code = transferFlowNftTokenTxTemplate(testnet)
    const {tokenId, to, mnemonic, index, account, privateKey} = body
    const args = [{type: 'Address', value: to}, {type: 'UInt64', value: tokenId}]
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string
    const auth = getFlowSigner(pk, account)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id}
}

/**
 * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendFlowNftBurnToken = async (testnet: boolean, body: FlowBurnNft):
    Promise<{ txId: string }> => {
    await validateBody(body, FlowBurnNft)
    const code = burnFlowNftTokenTxTemplate(testnet)
    const {tokenId, contractAddress: tokenType, mnemonic, index, account, privateKey} = body
    const args = [{type: 'UInt64', value: tokenId}, {type: 'String', value: tokenType}]
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string
    const auth = getFlowSigner(pk, account)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id}
}

export const flowSendTransaction = async (testnet: boolean, body: TransferFlow):
    Promise<{ txId: string }> => {
    await validateBody(body, TransferFlow)
    let tokenAddress
    let tokenName
    let tokenStorage
    if (body.currency === Currency.FLOW) {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken
        tokenName = 'FlowToken'
        tokenStorage = 'flowToken'
    } else {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD
        tokenName = 'FUSD'
        tokenStorage = 'fusd'
    }
    const code = prepareTransferFlowTxTemplate(testnet, tokenAddress, tokenName, tokenStorage)
    const args = [{value: parseFloat(body.amount).toFixed(8), type: 'UFix64'}, {value: body.to, type: 'Address'}]
    const pk = body.privateKey || await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, body.mnemonic as string, body.index as number)
    const auth = getFlowSigner(pk, body.account)
    const result = await sendTransaction(testnet, {code, args, proposer: auth, authorizations: [auth], payer: auth})
    if (result.error) {
        throw new Error(result.error)
    }
    return {txId: result.id}
}
