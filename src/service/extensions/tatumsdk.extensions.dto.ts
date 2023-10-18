import { Network } from '../../dto'
import { ITatumSdkContainer } from './tatumsdk.container'

/**
 * `TatumSdkExtension` is the base class for all extensions integrated into the Tatum SDK.
 * It provides lifecycle methods for the initialization and disposal of extensions, ensuring
 * consistent integration and teardown processes across various extensions.
 *
 * @property tatumSdkContainer Provides access to the SDK configuration and internal sub-modules along with other registered extensions.
 *
 *
 * @property supportedNetworks An abstract property that needs to be defined by the extending classes.
 *                             It represents an array of networks that the extension supports.
 *
 * @method init Intended to handle the setup or initialization logic for the extension.
 *
 * @method destroy Intended to handle the teardown or disposal logic for the extension,
 *                 ensuring resources are freed and cleanup is performed appropriately.
 */
export abstract class TatumSdkExtension {
  protected constructor(protected readonly tatumSdkContainer: ITatumSdkContainer) {}

  abstract supportedNetworks: Network[]

  init(): Promise<void> {
    return Promise.resolve(undefined)
  }
  destroy(): Promise<void> {
    return Promise.resolve(undefined)
  }
}
export type ExtensionConstructor = new (
  tatumSdkContainer: ITatumSdkContainer,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => TatumSdkExtension

export type ExtensionWithConfig = {
  type: ExtensionConstructor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
}

export type ExtensionConstructorOrConfig = ExtensionConstructor | ExtensionWithConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceConstructor<T> = new (...args: any[]) => T
