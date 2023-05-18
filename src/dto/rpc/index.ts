import { EvmBasedRpcSuite } from './EvmBasedRpcSuite'
import { SolanaRpcSuite } from './SolanaRpcSuite'
import { UtxoBasedRpcSuite } from './UtxoBasedRpcSuite'
import { XrpRpcSuite } from './XrpRpcSuite'
import {TronRpcSuite} from "./TronRpcSuite";

export * from './EvmBasedRpcSuite'
export * from './SolanaRpcSuite'
export * from './UtxoBasedRpcSuite'
export * from './XrpRpcSuite'
export * from './TronRpcSuite'

// EVM chains
export type Ethereum = EvmBasedRpcSuite
export type ArbitrumNova = EvmBasedRpcSuite
export type ArbitrumOne = EvmBasedRpcSuite
export type Aurora = EvmBasedRpcSuite
export type AvalancheC = EvmBasedRpcSuite
export type BinanceSmartChain = EvmBasedRpcSuite
export type Celo = EvmBasedRpcSuite
export type Cronos = EvmBasedRpcSuite
export type EthereumClassic = EvmBasedRpcSuite
export type Fantom = EvmBasedRpcSuite
export type Gnosis = EvmBasedRpcSuite
export type HarmonyOne = EvmBasedRpcSuite
export type Klaytn = EvmBasedRpcSuite
export type Kucoin = EvmBasedRpcSuite
export type Oasis = EvmBasedRpcSuite
export type Optimism = EvmBasedRpcSuite
export type Palm = EvmBasedRpcSuite
export type Polygon = EvmBasedRpcSuite
export type Vechain = EvmBasedRpcSuite
export type Xdc = EvmBasedRpcSuite
export type Tron = TronRpcSuite

// UTXO chains
export type Bitcoin = UtxoBasedRpcSuite
export type Litecoin = UtxoBasedRpcSuite
export type Dogecoin = UtxoBasedRpcSuite
export type BitcoinCash = UtxoBasedRpcSuite

// other chains
export type Xrp = XrpRpcSuite
export type Solana = SolanaRpcSuite
