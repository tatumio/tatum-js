import { ClassConstructor } from 'class-transformer';
import Web3 from 'web3';
import {
    bscBroadcast,
    celoBroadcast,
    ethBroadcast,
    klaytnBroadcast,
    oneBroadcast,
    polygonBroadcast,
    tronBroadcast,
} from '../blockchain';
import { listing } from '../contracts/marketplace';
import { CeloSmartContractMethodInvocation, Currency, SmartContractMethodInvocation } from '../model';
import {
  getBscClient,
  getCeloClient,
  getClient,
  getXdcClient,
  prepareBscSmartContractWriteMethodInvocation,
  prepareCeloSmartContractWriteMethodInvocation,
  prepareKlaytnClient, prepareKlaytnSmartContractWriteMethodInvocation,
  prepareOneClient,
  prepareOneSmartContractWriteMethodInvocation,
  preparePolygonClient,
  preparePolygonSmartContractWriteMethodInvocation,
  prepareSmartContractWriteMethodInvocation,
  prepareTronSmartContractInvocation,
  prepareXdcSmartContractWriteMethodInvocation,
} from '../transaction';
import Caver from 'caver-js'
import { isNil, isEmpty } from 'lodash';
import { HarmonyAddress } from '@harmony-js/crypto'

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
    case Currency.KLAY:
      return await klaytnBroadcast(txData, signatureId);
    case Currency.TRON:
      return await tronBroadcast(txData, signatureId);
    default:
      throw new Error('Unsupported chain');
  }
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 | Caver => {
  switch (chain) {
    case Currency.CELO:
      return getCeloClient(provider);
    case Currency.ONE:
      return prepareOneClient(testnet, provider);
    case Currency.XDC:
      return getXdcClient(provider);
    case Currency.ETH:
      return getClient(provider);
    case Currency.BSC:
      return getBscClient(provider);
    case Currency.MATIC:
      return preparePolygonClient(testnet, provider);
    case Currency.KLAY:
      return prepareKlaytnClient(testnet, provider);
    default:
      throw new Error('Unsupported chain');
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (testnet: boolean, body: any, clazz: ClassConstructor<object>, methodName: string, params: any[], methodSig?: string,
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
      return await prepareCeloSmartContractWriteMethodInvocation(testnet, {
        ...r,
        feeCurrency: body.feeCurrency || Currency.CELO,
      }, provider);
    case Currency.ONE:
      return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
    case Currency.XDC:
      return await prepareXdcSmartContractWriteMethodInvocation(r, provider);
    case Currency.ETH:
      return await prepareSmartContractWriteMethodInvocation(r, provider);
    case Currency.BSC:
      return await prepareBscSmartContractWriteMethodInvocation(r, provider);
    case Currency.MATIC:
      return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);
    case Currency.KLAY:
      return await prepareKlaytnSmartContractWriteMethodInvocation(testnet, r, provider);
    case Currency.TRON:
      r.methodName = methodSig as string;
      return await prepareTronSmartContractInvocation(testnet, r, body.feeLimit, body.from, provider);
    default:
      throw new Error('Unsupported combination of inputs.');
  }
};

export const normalizeAddress = (chain: Currency, address: string) => {
    if (isNil(chain) || isEmpty(address)) return address
    switch (chain) {
        case Currency.ONE:
            return address?.startsWith('one') ? new HarmonyAddress(address).basicHex : address
        case Currency.XDC:
            if (!address?.startsWith('xdc')) return address
            return address?.trim()?.replace('xdc', '0x')
        default:
            return address
    }
}
