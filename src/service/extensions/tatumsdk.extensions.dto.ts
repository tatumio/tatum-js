import { TatumSdkContainer } from "./tatumsdk.container"

export abstract class TatumSdkExtension {
    protected constructor(protected readonly tatumSdkContainer: TatumSdkContainer) {
    }

    abstract init(...args: unknown[]): Promise<void>
    abstract destroy(): void
}

export type ExtensionConstructor = new (tatumSdkContainer: TatumSdkContainer, ...args: unknown[]) => TatumSdkExtension

export type ExtensionWithConfig = {
    type: ExtensionConstructor
    config: unknown
}

export type ExtensionConstructorOrConfig = ExtensionConstructor | ExtensionWithConfig

export type ServiceConstructor<T> = new (...args: any[]) => T
