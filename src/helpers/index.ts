import {ClassType} from 'class-transformer/ClassTransformer';
import Web3 from 'web3';
import {bscBroadcast, celoBroadcast, ethBroadcast, oneBroadcast, polygonBroadcast, tronBroadcast} from '../blockchain';
import {listing} from '../contracts/marketplace';
import {CeloSmartContractMethodInvocation, Currency, SmartContractMethodInvocation} from '../model';
import {
    getBscClient,
    getCeloClient,
    getClient,
    prepareBscSmartContractWriteMethodInvocation,
    prepareCeloSmartContractWriteMethodInvocation,
    prepareOneClient,
    prepareOneSmartContractWriteMethodInvocation,
    preparePolygonClient,
    preparePolygonSmartContractWriteMethodInvocation,
    prepareSmartContractWriteMethodInvocation
} from '../transaction';

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    switch (chain) {
        case Currency.CELO:
            return await celoBroadcast(txData, signatureId);
        case Currency.ONE:
            return await oneBroadcast(txData, signatureId);
        case Currency.ETH:
            return await ethBroadcast(txData, signatureId);
        case Currency.BSC:
            return await bscBroadcast(txData, signatureId);
        case Currency.MATIC:
            return await polygonBroadcast(txData, signatureId);
        case Currency.TRON:
            return await tronBroadcast(txData, signatureId);
        default:
            throw new Error('Unsupported chain');
    }
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
    switch (chain) {
        case Currency.CELO:
            return getCeloClient(provider);
        case Currency.ONE:
            return prepareOneClient(testnet, provider);
        case Currency.ETH:
            return getClient(provider);
        case Currency.BSC:
            return getBscClient(provider);
        case Currency.MATIC:
            return preparePolygonClient(testnet, provider);
        default:
            throw new Error('Unsupported chain');
    }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (testnet: boolean, body: any, clazz: ClassType<object>, methodName: string, params: any[], methodSig?: string,
                                          provider?: string, abi: any[] = listing.abi) => {
    let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation;
    if (body.chain === Currency.CELO) {
        r = new CeloSmartContractMethodInvocation();
    } else {
        r = new SmartContractMethodInvocation();
    }
    r.fee = body.fee;
    r.nonce = body.nonce;
    r.fromPrivateKey = body.fromPrivateKey;
    r.signatureId = body.signatureId;
    r.index = body.index;
    r.amount = body.amount;
    r.contractAddress = body.contractAddress;
    r.methodName = methodName;
    r.params = params;
    r.methodABI = abi.find(a => a.name === r.methodName);
    switch (body.chain) {
        case Currency.CELO:
            return await prepareCeloSmartContractWriteMethodInvocation(testnet, {...r, feeCurrency: body.feeCurrency || Currency.CELO}, provider);
        case Currency.ONE:
            return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
        case Currency.ETH:
            return await prepareSmartContractWriteMethodInvocation(r, provider);
        case Currency.BSC:
            return await prepareBscSmartContractWriteMethodInvocation(r, provider);
        case Currency.MATIC:
            return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);
        // case Currency.TRON:
        //     r.methodName = methodSig as string
        //     return await prepareTronSmartContractInvocation(testnet, r, body.feeLimit, body.from, provider)
        default:
            throw new Error('Unsupported combination of inputs.');
    }
};
