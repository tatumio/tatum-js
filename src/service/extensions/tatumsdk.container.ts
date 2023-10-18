import { ContainerInstance } from 'typedi'
import { CONFIG, Utils } from '../../util'
import { TatumConfig } from '../tatum'
import { ServiceConstructor } from './tatumsdk.extensions.dto'

export interface ITatumSdkContainer {
  get<T>(type: ServiceConstructor<T>): T
  getRpc<T>(): T
  getConfig(): TatumConfig
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
}
