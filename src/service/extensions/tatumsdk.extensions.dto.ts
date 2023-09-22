import { TatumSdkContainer } from "./tatumsdk.container";

export interface TatumSdkExtension {
    init(...args: unknown[]): Promise<void>;
    destroy(): void;
}

export type ExtensionConstructor = new (tatumSdkContainer: TatumSdkContainer, ...args: unknown[]) => TatumSdkExtension;

export type ExtensionWithConfig = {
    type: ExtensionConstructor;
    config: unknown;
};

export type ExtensionConstructorOrConfig = ExtensionConstructor | ExtensionWithConfig;
