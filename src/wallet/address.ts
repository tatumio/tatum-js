import { HarmonyAddress } from "@harmony-js/crypto";
// @ts-ignore
// import {ECDSA_secp256k1, encodeKey, SHA3_256} from '@onflow/util-encode-key';
import * as bech32 from "bech32";
import { fromBase58, fromPublicKey, fromSeed } from "bip32";
import { mnemonicToSeed } from "bip39";
import { ECPair, networks, payments } from "bitcoinjs-lib";
import { derivePath, getPublicKey } from "ed25519-hd-key";
import * as elliptic from "elliptic";
import ethWallet, { hdkey as ethHdKey } from "ethereumjs-wallet";
// @ts-ignore
import { BIP32Interface } from "bip32/types/bip32";
import validator from "validator";
import {
  BCH_DERIVATION_PATH,
  BTC_DERIVATION_PATH,
  CELO_DERIVATION_PATH,
  DOGE_DERIVATION_PATH,
  DOGE_NETWORK,
  DOGE_TEST_NETWORK,
  EGLD_DERIVATION_PATH,
  ETH_DERIVATION_PATH,
  FLOW_DERIVATION_PATH,
  KLAYTN_DERIVATION_PATH,
  LTC_DERIVATION_PATH,
  LTC_NETWORK,
  LTC_TEST_NETWORK,
  LYRA_NETWORK,
  LYRA_TEST_NETWORK,
  MATIC_DERIVATION_PATH,
  ONE_DERIVATION_PATH,
  TESTNET_DERIVATION_PATH,
  TRON_DERIVATION_PATH,
  VET_DERIVATION_PATH,
  XDC_DERIVATION_PATH,
} from "../constants";
import { Currency } from "../model";
import cardano from "./cardano.crypto";
import { generateAddress } from "./tron.crypto";
import isHexadecimal = validator.isHexadecimal;
import isBase58 = validator.isBase58;

const algosdk = require("algosdk");
const base32 = require("base32.js");
const sha512_256 = require("js-sha512").sha512_256;
// tslint:disable:no-var-requires
const bcash = require("@tatumio/bitcoincashjs2-lib");
const cashaddr = require("cashaddrjs");
const coininfo = require("coininfo");
// tslint:disable-next-line:no-var-requires
const TronWeb = require("tronweb");

interface Hash {
  hash: Buffer;
}

interface Bytes extends Hash {
  version: number;
}

interface Decoded extends Hash {
  prefix: string;
  type: string;
  format: string;
}

/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateBtcAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? networks.testnet : networks.bitcoin;
  const w = fromBase58(xpub, network).derivePath(String(i));
  return payments.p2wpkh({ pubkey: w.publicKey, network }).address as string;
};

/**
 * Generate Dogecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateDogeAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK;
  const w = fromBase58(xpub, network).derivePath(String(i));
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string;
};

/**
 * Generate Tron address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateTronAddress = (xpub: string, i: number) => {
  let w: BIP32Interface;

  if (xpub.length == 130 && isHexadecimal(xpub)) {
    w = fromPublicKey(
      Buffer.from(xpub.slice(0, 66), "hex"),
      Buffer.from(xpub.slice(-64), "hex")
    );
  } else if (xpub.length == 111 && isBase58(xpub)) {
    w = fromBase58(xpub);
  } else {
    throw new Error("Unknown xpub format");
  }

  return TronWeb.address.fromHex(generateAddress(w.derive(i).publicKey));
};

/**
 * Generate Litecoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateLtcAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK;
  const w = fromBase58(xpub, network).derivePath(String(i));
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string;
};

/**
 * Generate Bitcoin Cash address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateBchAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? networks.testnet : networks.bitcoin;
  const hdNode = bcash.HDNode.fromBase58(xpub, network);
  const legacy = hdNode.derivePath(String(i)).getAddress();

  const decoded: Decoded = _decode(legacy);

  return cashaddr.encode(decoded.prefix, decoded.type, decoded.hash);
};

/**
 * Generate Ethereum or any other ERC20 address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateEthAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub);
  const wallet = w.deriveChild(i).getWallet();
  return "0x" + wallet.getAddress().toString("hex").toLowerCase();
};

/**
 * Generate XDC address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateXdcAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub);
  const wallet = w.deriveChild(i).getWallet();
  return "xdc" + wallet.getAddress().toString("hex").toLowerCase();
};

/**
 * Generate ONE address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateOneAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub);
  const wallet = w.deriveChild(i).getWallet();
  const harmonyAddress = new HarmonyAddress(
    "0x" + wallet.getAddress().toString("hex")
  );
  return harmonyAddress.basicHex;
};

/**
 * Generate EGLD address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateEgldAddress = async (
  testnet: boolean,
  mnem: string,
  i: number
): Promise<string> => {
  const path =
    (testnet ? TESTNET_DERIVATION_PATH + "'" : EGLD_DERIVATION_PATH) + `/${i}'`;
  const seed = await mnemonicToSeed(mnem);
  const { key } = derivePath(path, seed.toString("hex"));
  const words = bech32.toWords(getPublicKey(key, false));
  const address = bech32.encode("erd", words);
  return address;
};

/**
 * Generate Celo or any other ERC20 address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateCeloAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub);
  const wallet = w.deriveChild(i).getWallet();
  return "0x" + wallet.getAddress().toString("hex").toLowerCase();
};

/**
 * Generate FLOW or FUSD public key
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateFlowPublicKey = (xpub: string, i: number) => {
  const w = fromBase58(xpub).derivePath(String(i));
  const s = new elliptic.ec("secp256k1")
    .keyFromPublic(w.publicKey)
    .getPublic()
    .encode("hex", false);
  return s.slice(2);
};

/**
 * Generate FLOW or FUSD public key from private key
 * @returns blockchain address
 */
export const generateFlowPublicKeyFromPrivateKey = (pk: string) => {
  const s = new elliptic.ec("secp256k1")
    .keyFromPrivate(pk)
    .getPublic()
    .encode("hex", false);
  return s.slice(2);
};

/**
 * Generate VeChain address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateVetAddress = (testnet: boolean, xpub: string, i: number) => {
  const w = ethHdKey.fromExtendedKey(xpub);
  const wallet = w.deriveChild(i).getWallet();
  return "0x" + wallet.getAddress().toString("hex").toLowerCase();
};

/**
 * Generate Bitcoin address
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
const generateLyraAddress = (testnet: boolean, xpub: string, i: number) => {
  const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK;
  const w = fromBase58(xpub, network).derivePath(String(i));
  return payments.p2pkh({ pubkey: w.publicKey, network }).address as string;
};

/**
 * Generate Bitcoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBtcPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
) => {
  const network = testnet ? networks.testnet : networks.bitcoin;
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : BTC_DERIVATION_PATH)
    .derive(i)
    .toWIF();
};

/**
 * Generate Tron private key from mnemonic seed
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateTronPrivateKey = async (mnemonic: string, i: number) => {
  return (
    fromSeed(await mnemonicToSeed(mnemonic))
      .derivePath(TRON_DERIVATION_PATH)
      .derive(i)
      .privateKey?.toString("hex") ?? ""
  );
};

/**
 * Generate Flow private key from mnemonic seed
 * @returns blockchain private key to the address
 */
const generateFlowPrivateKey = async (
  mnemonic: string,
  i: number,
  alg = "secp256k1"
) => {
  const key = fromSeed(await mnemonicToSeed(mnemonic))
    .derivePath(FLOW_DERIVATION_PATH)
    .derive(i).privateKey as Buffer;
  return new elliptic.ec(alg).keyFromPrivate(key).getPrivate().toString(16);
};

/**
 * Generate Litecoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateLtcPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
) => {
  const network = testnet ? LTC_TEST_NETWORK : LTC_NETWORK;
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : LTC_DERIVATION_PATH)
    .derive(i)
    .toWIF();
};

/**
 * Generate Dogecoin private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateDogePrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
) => {
  const network = testnet ? DOGE_TEST_NETWORK : DOGE_NETWORK;
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(testnet ? TESTNET_DERIVATION_PATH : DOGE_DERIVATION_PATH)
    .derive(i)
    .toWIF();
};

/**
 * Generate Bitcoin Cash private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBchPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
) => {
  const network = testnet ? networks.testnet : networks.bitcoin;
  return fromSeed(await mnemonicToSeed(mnemonic), network)
    .derivePath(BCH_DERIVATION_PATH)
    .derive(i)
    .toWIF();
};

export const toLegacyAddress = (address: string) => {
  const { prefix, type, hash }: Decoded = _decode(address);
  let bitcoincash = coininfo.bitcoincash.main;
  switch (prefix) {
    case "bitcoincash":
      bitcoincash = coininfo.bitcoincash.main;
      break;
    case "bchtest":
      bitcoincash = coininfo.bitcoincash.test;
      break;
  }

  let version: number = bitcoincash.versions.public;
  switch (type) {
    case "P2PKH":
      version = bitcoincash.versions.public;
      break;
    case "P2SH":
      version = bitcoincash.versions.scripthash;
      break;
  }

  const hashBuf: Buffer = Buffer.from(hash);

  return bcash.address.toBase58Check(hashBuf, version);
};

const _decode = (address: string): Decoded => {
  const { version, hash }: Bytes = bcash.address.fromBase58Check(address);

  let decoded: Decoded = {
    prefix: "",
    type: "",
    hash,
    format: "",
  };
  switch (version) {
    case networks.bitcoin.pubKeyHash:
      decoded = {
        prefix: "bitcoincash",
        type: "P2PKH",
        hash,
        format: "legacy",
      };
      break;
    case networks.bitcoin.scriptHash:
      decoded = {
        prefix: "bitcoincash",
        type: "P2SH",
        hash,
        format: "legacy",
      };
      break;
    case networks.testnet.pubKeyHash:
      decoded = {
        prefix: "bchtest",
        type: "P2PKH",
        hash,
        format: "legacy",
      };
      break;
    case networks.testnet.scriptHash:
      decoded = {
        prefix: "bchtest",
        type: "P2SH",
        hash,
        format: "legacy",
      };
      break;
  }
  return decoded;
};

/**
 * Generate Ethereum or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEthPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : ETH_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate Klaytn private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateKlayPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : KLAYTN_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate Harmony or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateOnePrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : ONE_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate EGLD private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateEgldPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path =
    (testnet ? TESTNET_DERIVATION_PATH + "'" : EGLD_DERIVATION_PATH) + `/${i}'`;
  const seed = await mnemonicToSeed(mnemonic);
  const { key } = derivePath(path, seed.toString("hex"));
  return key.toString("hex");
};

/**
 * Generate Polygon or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generatePolygonPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : MATIC_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate BSC or any other BEP-20 or BEP721 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateBscPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  return generateEthPrivateKey(testnet, mnemonic, i);
};

/**
 * Generate XDC private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateXdcPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : XDC_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate Celo or any other ERC20 private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateCeloPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : CELO_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Generate VeChain private key from mnemonic seed
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
const generateVetPrivateKey = async (
  testnet: boolean,
  mnemonic: string,
  i: number
): Promise<string> => {
  const path = testnet ? TESTNET_DERIVATION_PATH : VET_DERIVATION_PATH;
  const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic));
  const derivePath = hdwallet.derivePath(path).deriveChild(i);
  return derivePath.getWallet().getPrivateKeyString();
};

/**
 * Convert Bitcoin Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertBtcPrivateKey = (testnet: boolean, privkey: string) => {
  const network = testnet ? networks.testnet : networks.bitcoin;
  const keyPair = ECPair.fromWIF(privkey, network);
  return payments.p2pkh({ pubkey: keyPair.publicKey, network })
    .address as string;
};

/**
 * Convert Scrypta Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertLyraPrivateKey = (testnet: boolean, privkey: string) => {
  const network = testnet ? LYRA_TEST_NETWORK : LYRA_NETWORK;
  const keyPair = ECPair.fromWIF(privkey, network);
  return payments.p2pkh({ pubkey: keyPair.publicKey, network })
    .address as string;
};

/**
 * Convert Ethereum Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privkey private key to use
 * @returns blockchain address
 */
const convertEthPrivateKey = (testnet: boolean, privkey: string) => {
  const wallet = ethWallet.fromPrivateKey(
    Buffer.from(privkey.replace("0x", ""), "hex")
  );
  return wallet.getAddressString() as string;
};

/**
 * Convert Harmony Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertOnePrivateKey = (testnet: boolean, privKey: string) => {
  const wallet = ethWallet.fromPrivateKey(
    Buffer.from(privKey.replace("0x", ""), "hex")
  );
  return wallet.getAddressString() as string;
};

/**
 * Convert EGLD Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertEgldPrivateKey = (testnet: boolean, privKey: string) => {
  const publicKey = getPublicKey(Buffer.from(privKey, "hex"), false).toString(
    "hex"
  );
  const words = bech32.toWords(Buffer.from(publicKey.slice(-64), "hex"));
  const address = bech32.encode("erd", words);
  return address;
};

/**
 * Convert XDC Private Key to Address
 * @param testnet testnet or mainnet version of address
 * @param privKey private key to use
 * @returns blockchain address
 */
const convertXdcPrivateKey = (testnet: boolean, privKey: string) => {
  const wallet = ethWallet.fromPrivateKey(
    Buffer.from(privKey.replace("0x", ""), "hex")
  );
  return wallet.getAddressString().replace("0x", "xdc");
};

/**
 * Generate Algo Address From Private Key
 * @param privKey Private key to use
 * @returns blockchain address
 */
export const generateAlgodAddressFromPrivatetKey = (privKey: string) => {
  const decoder = new base32.Decoder({ type: "rfc4648" });
  const secretKey = decoder.write(privKey).buf;
  const mn = algosdk.secretKeyToMnemonic(secretKey);
  return algosdk.mnemonicToSecretKey(mn).addr;
};

/**
 * Generate address
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param xpub extended public key to generate address from
 * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
 * @returns blockchain address
 */
export const generateAddressFromXPub = (
  currency: Currency,
  testnet: boolean,
  xpub: string,
  i: number
) => {
  switch (currency) {
    case Currency.BTC:
      return generateBtcAddress(testnet, xpub, i);
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return generateTronAddress(xpub, i);
    case Currency.FLOW:
    case Currency.FUSD:
      return generateFlowPublicKey(xpub, i);
    case Currency.LTC:
      return generateLtcAddress(testnet, xpub, i);
    case Currency.DOGE:
      return generateDogeAddress(testnet, xpub, i);
    case Currency.CELO:
    case Currency.CEUR:
    case Currency.CUSD:
      return generateCeloAddress(testnet, xpub, i);
    case Currency.BCH:
      return generateBchAddress(testnet, xpub, i);
    case Currency.USDT:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.USDC:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.MATIC_ETH:
    case Currency.POL_ETH:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.ETH:
    case Currency.BSC:
    case Currency.MATIC:
    case Currency.USDT_MATIC:
    case Currency.USDC_MATIC:
    case Currency.USDC_MATIC_NATIVE:
    case Currency.LATOKEN:
    case Currency.COIIN:
    case Currency.BETH:
    case Currency.GAMEE:
    case Currency.INTENT:
    case Currency.EURTENT:
    case Currency.GOLDAX:
    case Currency.BUSD:
    case Currency.KLAY:
    case Currency.USDC_BSC:
    case Currency.USDT_BSC:
    case Currency.COIIN_BSC:
    case Currency.B2U_BSC:
    case Currency.CAKE:
    case Currency.HAG:
    case Currency.BUSD_BSC:
    case Currency.GMC_BSC:
    case Currency.GMC:
    case Currency.BBTC:
    case Currency.BADA:
    case Currency.RMD:
    case Currency.WBNB:
    case Currency.BDOT:
    case Currency.BXRP:
    case Currency.BLTC:
    case Currency.BBCH:
    case Currency.MMY:
    case Currency.ETH_ARB:
    case Currency.ETH_BASE:
    case Currency.ETH_OP:
    case Currency.USDC_ARB:
    case Currency.USDT_ARB:
    case Currency.USDC_BASE:
    case Currency.USDT_BASE:
    case Currency.USDC_OP:
    case Currency.USDT_OP:
      return generateEthAddress(testnet, xpub, i);
    case Currency.ONE:
      return generateOneAddress(testnet, xpub, i);
    case Currency.XDC:
      return generateXdcAddress(testnet, xpub, i);
    case Currency.EGLD:
      return generateEgldAddress(testnet, xpub, i);
    case Currency.VET:
      return generateVetAddress(testnet, xpub, i);
    case Currency.ADA:
      return cardano.generateAddress(testnet, xpub, i);
    default:
      throw new Error("Unsupported blockchain.");
  }
};

/**
 * Generate private key from mnemonic seed
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param mnemonic mnemonic to generate private key from
 * @param i derivation index of private key to generate.
 * @returns blockchain private key to the address
 */
export const generatePrivateKeyFromMnemonic = (
  currency: Currency,
  testnet: boolean,
  mnemonic: string,
  i: number
) => {
  switch (currency) {
    case Currency.BTC:
      return generateBtcPrivateKey(testnet, mnemonic, i);
    case Currency.LTC:
      return generateLtcPrivateKey(testnet, mnemonic, i);
    case Currency.DOGE:
      return generateDogePrivateKey(testnet, mnemonic, i);
    case Currency.BCH:
      return generateBchPrivateKey(testnet, mnemonic, i);
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return generateTronPrivateKey(mnemonic, i);
    case Currency.MATIC:
    case Currency.USDT_MATIC:
    case Currency.USDC_MATIC:
    case Currency.USDC_MATIC_NATIVE:
      return generatePolygonPrivateKey(testnet, mnemonic, i);
    case Currency.FLOW:
    case Currency.FUSD:
      return generateFlowPrivateKey(mnemonic, i);
    case Currency.CELO:
    case Currency.CEUR:
    case Currency.CUSD:
      return generateCeloPrivateKey(testnet, mnemonic, i);
    case Currency.USDT:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.LATOKEN:
    case Currency.COIIN:
    case Currency.USDC:
    case Currency.RMD:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.ETH:
    case Currency.MATIC_ETH:
    case Currency.POL_ETH:
    case Currency.BSC:
    case Currency.BETH:
    case Currency.GAMEE:
    case Currency.INTENT:
    case Currency.EURTENT:
    case Currency.GOLDAX:
    case Currency.BBTC:
    case Currency.BADA:
    case Currency.WBNB:
    case Currency.BUSD:
    case Currency.USDC_BSC:
    case Currency.USDT_BSC:
    case Currency.COIIN_BSC:
    case Currency.B2U_BSC:
    case Currency.CAKE:
    case Currency.HAG:
    case Currency.BUSD_BSC:
    case Currency.GMC:
    case Currency.GMC_BSC:
    case Currency.BDOT:
    case Currency.BXRP:
    case Currency.BLTC:
    case Currency.BBCH:
    case Currency.MMY:
    case Currency.ETH_ARB:
    case Currency.ETH_BASE:
    case Currency.ETH_OP:
    case Currency.USDC_ARB:
    case Currency.USDT_ARB:
    case Currency.USDC_BASE:
    case Currency.USDT_BASE:
    case Currency.USDC_OP:
    case Currency.USDT_OP:
      return generateEthPrivateKey(testnet, mnemonic, i);
    case Currency.ONE:
      return generateOnePrivateKey(testnet, mnemonic, i);
    case Currency.KLAY:
      return generateKlayPrivateKey(testnet, mnemonic, i);
    case Currency.XDC:
      return generateXdcPrivateKey(testnet, mnemonic, i);
    case Currency.EGLD:
      return generateEgldPrivateKey(testnet, mnemonic, i);
    case Currency.VET:
      return generateVetPrivateKey(testnet, mnemonic, i);
    case Currency.ADA:
      return cardano.generatePrivateKey(mnemonic, i);
    default:
      throw new Error("Unsupported blockchain.");
  }
};

/**
 * Generate address from private key
 * @param currency type of blockchain
 * @param testnet testnet or mainnet version of address
 * @param privateKey private key to use
 * @returns blockchain private key to the address
 */
export const generateAddressFromPrivatekey = (
  currency: Currency,
  testnet: boolean,
  privateKey: string
) => {
  switch (currency) {
    case Currency.BTC:
      return convertBtcPrivateKey(testnet, privateKey);
    case Currency.TRON:
    case Currency.USDT_TRON:
    case Currency.INRT_TRON:
      return TronWeb.address.fromPrivateKey(privateKey);
    case Currency.ETH:
    case Currency.USDT:
    case Currency.GMC:
    case Currency.GMC_BSC:
    case Currency.RMD:
    case Currency.WBTC:
    case Currency.LEO:
    case Currency.LINK:
    case Currency.UNI:
    case Currency.FREE:
    case Currency.MKR:
    case Currency.USDC:
    case Currency.BAT:
    case Currency.TUSD:
    case Currency.PAX:
    case Currency.PAXG:
    case Currency.PLTC:
    case Currency.XCON:
    case Currency.LATOKEN:
    case Currency.COIIN:
    case Currency.REVV:
    case Currency.SAND:
    case Currency.MATIC_ETH:
    case Currency.POL_ETH:
    case Currency.BSC:
    case Currency.MMY:
    case Currency.MATIC:
    case Currency.KLAY:
    case Currency.ETH_ARB:
    case Currency.ETH_BASE:
    case Currency.ETH_OP:
    case Currency.USDC_ARB:
    case Currency.USDT_ARB:
    case Currency.USDC_BASE:
    case Currency.USDT_BASE:
    case Currency.USDC_OP:
    case Currency.USDT_OP:
      return convertEthPrivateKey(testnet, privateKey);
    case Currency.ONE:
      return convertOnePrivateKey(testnet, privateKey);
    case Currency.XDC:
      return convertXdcPrivateKey(testnet, privateKey);
    case Currency.EGLD:
      return convertEgldPrivateKey(testnet, privateKey);
    default:
      throw new Error("Unsupported blockchain.");
  }
};
