import { ITatumSdkContainer } from "./tatumsdk.container"

/**
 * `TatumSdkExtension` is the base class for all extensions integrated into the Tatum SDK.
 * It provides lifecycle methods for the initialization and disposal of extensions, ensuring
 * consistent integration and teardown processes across various extensions.
 *
 * @property tatumSdkContainer Provides access to the SDK configuration and internal sub-modules along with other registered extensions.
 *
 * @method init Intended to handle the setup or initialization logic for the extension.
 *              This method can accept a variable number of arguments.
 *
 * @method destroy Intended to handle the teardown or disposal logic for the extension,
 *                 ensuring resources are freed and cleanup is performed appropriately.
 */
export abstract class TatumSdkExtension {
    protected constructor(
        protected readonly tatumSdkContainer: ITatumSdkContainer) {
    }

    init(): Promise<void> {
        return Promise.resolve(undefined)
    }
    destroy(): Promise<void> {
        return Promise.resolve(undefined)
    }
}

export type ExtensionConstructor = new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => TatumSdkExtension

export type ExtensionWithConfig = {
    type: ExtensionConstructor
    config: unknown
}

export type ExtensionConstructorOrConfig = ExtensionConstructor | ExtensionWithConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceConstructor<T> = new (...args: any[]) => T
