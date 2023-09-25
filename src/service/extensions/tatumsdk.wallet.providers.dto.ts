import { ITatumSdkContainer } from "./tatumsdk.container";
import { TatumSdkExtension } from "./tatumsdk.extensions.dto";

export abstract class TatumSdkWalletProviders extends TatumSdkExtension {
    protected constructor(tatumSdkContainer: ITatumSdkContainer) {
        super(tatumSdkContainer)
    }

    abstract connect(): Promise<string>
}

export type WalletProviderConstructor = new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => TatumSdkWalletProviders

export type WalletProviderWithConfig = {
    type: WalletProviderConstructor
    config: unknown
}

export type WalletProviderConstructorOrConfig = WalletProviderConstructor | WalletProviderWithConfig
