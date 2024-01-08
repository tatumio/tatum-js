import { ContainerInstance } from 'typedi'
import { CONFIG, LOGGER, Utils } from '../../util'
import { Logger } from '../logger/logger.types'
import { TatumConfig } from '../tatum'
import { ServiceConstructor } from './tatumsdk.extensions.dto'

export interface ITatumSdkContainer {
  get<T>(type: ServiceConstructor<T>): T
  getRpc<T>(): T
  getConfig(): TatumConfig
  getLogger(): Logger
}

export class TatumSdkContainer implements ITatumSdkContainer {
  constructor(private readonly containerInstance: ContainerInstance) {}

  get<T>(type: ServiceConstructor<T>): T {
    return this.containerInstance.get(type)
  }

  getRpc<T>(): T {
    return Utils.getRpc(this.containerInstance.id, this.containerInstance.get(CONFIG))
  }

  getConfig(): TatumConfig {
    return this.containerInstance.get(CONFIG)
  }

  getLogger(): Logger {
    return this.containerInstance.get(LOGGER)
  }
}
