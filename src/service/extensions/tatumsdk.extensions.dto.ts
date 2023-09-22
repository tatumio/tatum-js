import { ITatumSdkContainer } from "./tatumsdk.container"

export abstract class TatumSdkExtension {
    protected constructor(
        protected readonly tatumSdkContainer: ITatumSdkContainer) {
    }

    abstract init(...args: unknown[]): Promise<void>
    abstract destroy(): void
}

export type ExtensionConstructor = new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => TatumSdkExtension

export type ExtensionWithConfig = {
    type: ExtensionConstructor
    config: unknown
}

export type ExtensionConstructorOrConfig = ExtensionConstructor | ExtensionWithConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceConstructor<T> = new (...args: any[]) => T
