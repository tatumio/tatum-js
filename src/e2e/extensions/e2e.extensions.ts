import {
    ITatumSdkContainer,
    Network,
    TatumConfig,
    TatumSdkExtension,
    TatumSdkWalletProvider,
    TxId
} from "../../service";
import { EVM_BASED_NETWORKS } from "../../dto";

export class TestExtension extends TatumSdkExtension {
    private readonly sdkConfig: TatumConfig

    constructor(tatumSdkContainer: ITatumSdkContainer, private readonly mockTestExtension: any) {
        super(tatumSdkContainer)
        this.sdkConfig = this.tatumSdkContainer.getConfig()
    }

    async sayHello(){
        this.mockTestExtension.dummyMethod()
        this.mockTestExtension.network(this.sdkConfig.network)
    }

    init(): Promise<void> {
        this.mockTestExtension.init()
        return Promise.resolve(undefined)
    }

    destroy(): Promise<void> {
        this.mockTestExtension.destroy()
        return Promise.resolve(undefined)
    }

    supportedNetworks: Network[] = EVM_BASED_NETWORKS
}

export class TestWalletProvider extends TatumSdkWalletProvider<string, string> {
    private readonly sdkConfig: TatumConfig

    constructor(tatumSdkContainer: ITatumSdkContainer, private readonly mockTestExtension?: any, someOtherConfig?: {someConfigValue: boolean}) {
        super(tatumSdkContainer)
        this.sdkConfig = this.tatumSdkContainer.getConfig()
        console.log('someOtherConfig', someOtherConfig)
        if(!mockTestExtension){
            this.mockTestExtension = {
                dummyMethod: jest.fn(),
                init: jest.fn(),
                destroy: jest.fn(),
                network: jest.fn()
            }
        }
    }

    async getWallet(){
        this.mockTestExtension.network(this.sdkConfig.network)
        this.mockTestExtension.dummyMethod()
        return 'connected'
    }

    init(): Promise<void> {
        this.mockTestExtension.init()
        return Promise.resolve(undefined)
    }

    destroy(): Promise<void> {
        this.mockTestExtension.destroy()
        return Promise.resolve(undefined)
    }

    signAndBroadcast(payload: string): Promise<TxId> {
        this.mockTestExtension.dummyMethod()
        return Promise.resolve(payload);
    }

    supportedNetworks: Network[] = EVM_BASED_NETWORKS
}
