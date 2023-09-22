import { Constructable } from "typedi/types/types/constructable.type";
import { AbstractConstructable } from "typedi/types/types/abstract-constructable.type";
import { Token as DiToken } from "typedi/types/token.class";
import { ContainerInstance, ServiceIdentifier } from "typedi";

export interface ITatumSdkContainer {
    get<T>(type: Constructable<T>): T;
    get<T>(type: AbstractConstructable<T>): T;
    get<T>(id: string): T;
    get<T>(id: DiToken<T>): T;
    get<T>(id: ServiceIdentifier<T>): T;
}

export class TatumSdkContainer implements ITatumSdkContainer {
    constructor(private readonly containerInstance: ContainerInstance) {

    }

    get<T>(typeOrId: Constructable<T> | AbstractConstructable<T> | string | DiToken<T> | ServiceIdentifier<T>): T {
        return this.containerInstance.get(typeOrId);
    }
}
