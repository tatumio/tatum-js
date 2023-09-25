import { ITatumSdkContainer } from "./tatumsdk.container";
import { TatumSdkExtension } from "./tatumsdk.extensions.dto";

export type TxId = string

/**
 * TatumSdkWalletProvider serves as the base class for all wallet providers.
 *
 * @template T Represents the wallet type (e.g., accountId for MetaMask, mnemonic and xpub for local wallets).
 * @template P Represents the transaction payload type specific to a blockchain or transaction.
 *
 * @method getWallet Fetches or initializes the wallet of type T.
 * @method signAndBroadcast Signs a transaction based on the provided payload of type P and broadcasts it to the network.
 */
export abstract class TatumSdkWalletProvider<T, P> extends TatumSdkExtension {
    abstract getWallet(): Promise<T>
    abstract signAndBroadcast(payload: P): Promise<TxId>
}

export type WalletProviderConstructor<T, P> = new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => TatumSdkWalletProvider<T, P>

export type WalletProviderWithConfig<T, P> = {
    type: WalletProviderConstructor<T, P>
    config: unknown
}

export type WalletProviderConstructorOrConfig<T, P> = WalletProviderConstructor<T, P> | WalletProviderWithConfig<T, P>
