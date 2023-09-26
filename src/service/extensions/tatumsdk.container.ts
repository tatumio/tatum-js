import { ContainerInstance } from "typedi";
import { ServiceConstructor } from "./tatumsdk.extensions.dto";
import { TatumConfig } from "../tatum";
import { CONFIG } from "../../util";

export interface ITatumSdkContainer {
    get<T>(type: ServiceConstructor<T>): T
    getConfig(): TatumConfig
}

export class TatumSdkContainer implements ITatumSdkContainer {
    constructor(private readonly containerInstance: ContainerInstance) {
    }

    get<T>(type: ServiceConstructor<T>): T {
        return this.containerInstance.get(type);
    }

    getConfig(): TatumConfig {
        return this.containerInstance.get(CONFIG);
    }
}
