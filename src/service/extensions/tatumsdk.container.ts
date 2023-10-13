import { ContainerInstance } from "typedi";
import { ServiceConstructor } from "./tatumsdk.extensions.dto";
import { TatumConfig } from "../tatum";
import { CONFIG, Utils } from "../../util";

export interface ITatumSdkContainer {
    get<T>(type: ServiceConstructor<T>): T
    getRpc<T>(): T
    getConfig(): TatumConfig
}

export class TatumSdkContainer implements ITatumSdkContainer {
    constructor(private readonly containerInstance: ContainerInstance) {
    }

    get<T>(type: ServiceConstructor<T>): T {
        return this.containerInstance.get(type);
    }

    getRpc<T>(): T {
        return Utils.getRpc(this.containerInstance.id, this.containerInstance.get(CONFIG));
    }

    getConfig(): TatumConfig {
        return this.containerInstance.get(CONFIG);
    }
}
