// @ts-ignore
import * as fcl from '@onflow/fcl';
// @ts-ignore
import * as types from '@onflow/types';
// @ts-ignore
import {ECDSA_secp256k1, encodeKey, SHA3_256,} from '@onflow/util-encode-key';
import * as elliptic from 'elliptic';
import {SHA3} from 'sha3';
import {flowBroadcastTx, flowGetSignKey, flowSignWithKey} from '../blockchain';
import {validateBody} from '../connector/tatum';
import {FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES} from '../constants';
import {Currency, FlowArgs, FlowBurnNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft, TransactionKMS, TransferFlow, TransferFlowCustomTx} from '../model';
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
    CUSTOM_TX,
}

interface Account {
    addr?: string;
}

interface AccountSignature {
    addr: string;
    keyId: number;
    signature: string;
}

interface AccountAuthorization {
    tempId: string;
    addr: string;
    keyId: number;
    signingFunction: (data: { message: string }) => AccountSignature;
}


type Transaction = {
    code: string
    args: FlowArgs[]
    proposer: AccountAuthorizer
    authorizations: AccountAuthorizer[]
    payer: AccountAuthorizer,
    keyHash?: string,
}

type TransactionResult = {
    id: string
    error: string
    events: { data: any }[]
}

type AccountAuthorizer = (
    account?: Account
) => Promise<AccountAuthorization>

export const flowSign = (pk: string, msg: Buffer) => {
    const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk);
    const signature = keyPair.sign(new SHA3(256).update(msg).digest());
    const r = signature.r.toArrayLike(
        Buffer,
        'be',
        32
    );
    const s = signature.s.toArrayLike(
        Buffer,
        'be',
        32
    );

    return Buffer.concat([r, s]).toString('hex')
}

export const getFlowSigner = (
    pk: string,
    address: string,
    keyId = 0,
) => {
    return {
        signer: (account: any) => {

            return {
                ...account,
                tempId: `${address}-${keyId}`,
                addr: fcl.sansPrefix(address),
                keyId: Number(keyId),
                signingFunction: async (data: any) => {
                    return {
                        addr: fcl.withPrefix(address),
                        keyId: Number(keyId),
                        signature: flowSign(pk, Buffer.from(data.message, 'hex')),
                    };
                }
            };
        }
    };
};

export const getFlowApiSigner = (isPayer: boolean) => {
    const keyHash = Date.now();
    const signer = async (account: any) => {

        const {address, keyId} = await flowGetSignKey(isPayer);
        if (!isPayer) {
            process.env[`FLOW_PROPOSAL_KEY_${keyHash}`] = `${keyId}`;
        }
        return {
            ...account,
            tempId: `${address}-${keyId}`,
            addr: fcl.sansPrefix(address),
            keyId,
            signingFunction: async (data: { message: string }) => {
                return {
                    addr: fcl.withPrefix(address),
                    keyId: Number(keyId),
                    signature: (await flowSignWithKey(data.message, isPayer)).signature,
                };
            }
        };
    };
    return {signer, keyHash: `FLOW_PROPOSAL_KEY_${keyHash}`};
};

const sendTransaction = async (testnet: boolean, {
    code,
    args,
    proposer,
    authorizations,
    payer,
    keyHash,
}: Transaction): Promise<TransactionResult> => {
    fcl.config().put('accessNode.api', testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org');
    let response;
    try {
        response = await fcl.send([
            fcl.transaction(code),
            fcl.args(args.map(arg => fcl.arg(arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value,
                arg.type === 'Array' ? types[arg.type](types[arg.subType]) : types[arg.type]))),
            fcl.proposer(proposer),
            fcl.authorizations(authorizations),
            fcl.payer(payer),
            fcl.limit(1000),
        ]);
    } catch (e) {
        try {
            if (keyHash) {
                await flowBroadcastTx('', undefined, keyHash ? parseInt((process.env[keyHash] || '0') as string) : undefined);
                delete process.env[keyHash];
            }
            // eslint-disable-next-line no-empty
        } catch (_) {
        }
        throw e;
    }

    const {transactionId} = response;
    try {
        const {error, events} = await fcl.tx(response).onceSealed();
        return {
            id: transactionId,
            error,
            events,
        };
    } finally {
        try {
            if (keyHash) {
                await flowBroadcastTx(transactionId, undefined, keyHash ? parseInt((process.env[keyHash] || '0') as string) : undefined);
                delete process.env[keyHash];
            }
            // eslint-disable-next-line no-empty
        } catch (_) {
        }
    }
};

const sendScript = async (testnet: boolean, code: string, args: FlowArgs[]) => {
    fcl.config().put('accessNode.api', testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org');
    const response = await fcl.send([
        fcl.script(code),
        fcl.args(args.map(arg => fcl.arg(arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value, types[arg.type]))),
    ]);
    return fcl.decode(response);
};

export const flowSignKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
    if (tx.chain !== Currency.FLOW) {
        throw Error('Unsupported chain.');
    }
    const {type, body}: { type: FlowTxType, apiManagedProposal: boolean, body: any } = JSON.parse(tx.serializedTransaction);
    switch (type) {
        case FlowTxType.CREATE_ACCOUNT:
            return await flowCreateAccountFromPublicKey(testnet, body.publicKey, body.account, privateKeys[0])
        case FlowTxType.ADD_PK_TO_ACCOUNT:
            return await flowAddPublicKeyToAccount(testnet, body.publicKey, body.account, privateKeys[0])
        case FlowTxType.TRANSFER:
            return await flowSendTransaction(testnet, {...body, privateKey: privateKeys[0]});
        case FlowTxType.TRANSFER_NFT:
            return await sendFlowNftTransferToken(testnet, {...body, privateKey: privateKeys[0]});
        case FlowTxType.MINT_NFT:
            return await sendFlowNftMintToken(testnet, {...body, privateKey: privateKeys[0]});
        case FlowTxType.MINT_MULTIPLE_NFT:
            return await sendFlowNftMintMultipleToken(testnet, {...body, privateKey: privateKeys[0]});
        case FlowTxType.BURN_NFT:
            return await sendFlowNftBurnToken(testnet, {...body, privateKey: privateKeys[0]});
        default:
            return await flowSendCustomTransaction(testnet, {...body, privateKey: privateKeys[0]});
    }
};

/**
 * Create account on the FLOW network. It automatically creates 100 0-weight proposal keys, which are managed by Tatum API - index 1-100.
 * Main 1000 weight authorizer key is stored as a first one on index 0.
 * @param testnet if we use testnet or not
 * @param publicKey public key to assign to address as authorizer (1000 weight) key
 * @param signerAddress address of the authorizer creator of the address on the chain
 * @param signerPrivateKey private key of the authorizer creator of the address on the chain
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 */
export const flowCreateAccountFromPublicKey = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string,
                                                     proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string, address: string }> => {
    const code = prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(testnet);
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        1000
    );
    const args = [{type: 'String', value: encodedPublicKey}];
    const auth = getFlowSigner(signerPrivateKey, signerAddress).signer;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const result = await sendTransaction(testnet, {
        code, args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
        keyHash,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, address: result.events.find((e: any) => e.type === 'flow.AccountCreated')?.data.address};
};

/**
 * Add public key to existing blockchain address with defined weight
 * @param testnet
 * @param publicKey key to add
 * @param signerAddress address of the authorizer key
 * @param signerPrivateKey key of the authorize key
 * @param weight defaults to 1000 - weight of the key
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 */
export const flowAddPublicKeyToAccount = async (testnet: boolean, publicKey: string, signerAddress: string, signerPrivateKey: string, weight = 0,
                                                proposer?: (...args: any[]) => any, payer?: (...args: any[]) => any):
    Promise<{ txId: string, address: string }> => {
    const code = prepareAddPublicKeyToAccountTxTemplate();
    const encodedPublicKey = encodeKey(
        publicKey,
        ECDSA_secp256k1,
        SHA3_256,
        weight
    );
    const args = [{type: 'String', value: encodedPublicKey}];
    const auth = getFlowSigner(signerPrivateKey, signerAddress).signer;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const result = await sendTransaction(testnet, {
        code, args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, address: result.events[0].data.address};
};

export const getFlowNftMetadata = async (testnet: boolean, account: string, id: string, tokenType: string) => {
    const code = metadataFlowNftTokenScript(testnet);
    const args = [{type: 'Address', value: account}, {type: 'UInt64', value: id}, {type: 'String', value: tokenType}];
    return await sendScript(testnet, code, args);
};

export const getFlowNftTokenByAddress = async (testnet: boolean, account: string, tokenType: string) => {
    const code = tokenByAddressFlowNftTokenScript(testnet);
    const args = [{type: 'Address', value: account}, {type: 'String', value: tokenType}];
    return await sendScript(testnet, code, args);
};

/**
 * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns txId id of the transaction in the blockchain
 */
export const sendFlowNftMintToken = async (testnet: boolean, body: FlowMintNft, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string, tokenId: string }> => {
    await validateBody(body, FlowMintNft);
    const code = mintFlowNftTokenTxTemplate(testnet);
    const {url, contractAddress: tokenType, to, mnemonic, index, account, privateKey} = body;
    const args = [{type: 'Address', value: to}, {type: 'String', value: url}, {type: 'String', value: tokenType}];
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string;
    const auth = getFlowSigner(pk, account).signer;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const result = await sendTransaction(testnet, {
        code, args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, tokenId: `${result.events.find((e: any) => e.type.includes('TatumMultiNFT.Minted'))?.data.id}`};
};

/**
 * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns txId id of the transaction in the blockchain
 */
export const sendFlowNftMintMultipleToken = async (testnet: boolean, body: FlowMintMultipleNft, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string, tokenId: number[] }> => {
    await validateBody(body, FlowMintMultipleNft);
    const code = mintFlowMultipleNftTokenTxTemplate(testnet);
    const {url, contractAddress: tokenType, to, mnemonic, index, account, privateKey} = body;
    const args = [{type: 'Array', subType: 'Address', value: to}, {type: 'Array', subType: 'String', value: url}, {type: 'String', value: tokenType}];
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const auth = getFlowSigner(pk, account).signer;
    const result = await sendTransaction(testnet, {
        code, args, proposer: proposer ? proposer(false) : proposalSigner, authorizations: [auth],
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
        keyHash,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, tokenId: result.events.filter((e: any) => e.type.includes('TatumMultiNFT.Minted')).map(e => e.data.id)};
};

/**
 * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns {txId: string, events: any[]} id of the transaction in the blockchain and events this tx produced
 */
export const sendFlowNftTransferToken = async (testnet: boolean, body: FlowTransferNft, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string }> => {
    await validateBody(body, FlowTransferNft);
    const code = transferFlowNftTokenTxTemplate(testnet);
    const {tokenId, to, mnemonic, index, account, privateKey} = body;
    const args = [{type: 'Address', value: to}, {type: 'UInt64', value: tokenId}];
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const auth = getFlowSigner(pk, account).signer;
    const result = await sendTransaction(testnet, {
        code, args, proposer: proposer ? proposer(false) : proposalSigner, authorizations: [auth],
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
        keyHash,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id};
};

/**
 * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns txId id of the transaction in the blockchain
 */
export const sendFlowNftBurnToken = async (testnet: boolean, body: FlowBurnNft, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string }> => {
    await validateBody(body, FlowBurnNft);
    const code = burnFlowNftTokenTxTemplate(testnet);
    const {tokenId, contractAddress: tokenType, mnemonic, index, account, privateKey} = body;
    const args = [{type: 'UInt64', value: tokenId}, {type: 'String', value: tokenType}];
    const pk = (mnemonic && index && index >= 0) ? await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, mnemonic, index as number) : privateKey as string;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const auth = getFlowSigner(pk, account).signer;
    const result = await sendTransaction(testnet, {
        code, args, proposer: proposer ? proposer(false) : proposalSigner, authorizations: [auth],
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
        keyHash,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id};
};

/**
 * Send custom transaction to the FLOW network
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns txId id of the transaction in the blockchain
 */
export const flowSendCustomTransaction = async (testnet: boolean, body: TransferFlowCustomTx, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string, events: any[] }> => {
    await validateBody(body, TransferFlowCustomTx);
    const pk = body.privateKey || await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, body.mnemonic as string, body.index as number);
    const auth = getFlowSigner(pk, body.account).signer;
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const result = await sendTransaction(testnet, {
        code: body.transaction, args: body.args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getFlowApiSigner(true).signer
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id, events: result.events};
};

/**
 * Send FLOW or FUSD from account to account.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param proposer function to obtain proposer key from
 * @param payer function to obtain payer key from
 * @returns txId id of the transaction in the blockchain
 */
export const flowSendTransaction = async (testnet: boolean, body: TransferFlow, proposer?: (isPayer: boolean) => any, payer?: (isPayer: boolean) => any):
    Promise<{ txId: string }> => {
    await validateBody(body, TransferFlow);
    let tokenAddress;
    let tokenName;
    let tokenStorage;
    if (body.currency === Currency.FLOW) {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken;
        tokenName = 'FlowToken';
        tokenStorage = 'flowToken';
    } else {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD;
        tokenName = 'FUSD';
        tokenStorage = 'fusd';
    }
    const code = prepareTransferFlowTxTemplate(testnet, tokenAddress, tokenName, tokenStorage);
    const args = [{value: parseFloat(body.amount).toFixed(8), type: 'UFix64'}, {value: body.to, type: 'Address'}];
    const pk = body.privateKey || await generatePrivateKeyFromMnemonic(Currency.FLOW, testnet, body.mnemonic as string, body.index as number);
    const {signer: proposalSigner, keyHash} = proposer ? proposer(false) : getFlowApiSigner(false);
    const auth = getFlowSigner(pk, body.account).signer;
    const result = await sendTransaction(testnet, {
        code, args, proposer: proposer ? proposer(false) : proposalSigner, authorizations: [auth],
        payer: payer ? payer(true) : getFlowApiSigner(true).signer,
        keyHash,
    });
    if (result.error) {
        throw new Error(result.error);
    }
    return {txId: result.id};
};
