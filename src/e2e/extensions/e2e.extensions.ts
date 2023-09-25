import { ITatumSdkContainer, TatumConfig, TatumSdkExtension, TatumSdkWalletProvider } from "../../service";

export class TestExtension extends TatumSdkExtension {
    private readonly sdkConfig: TatumConfig

    constructor(tatumSdkContainer: ITatumSdkContainer, private readonly mockTestExtension: any) {
        super(tatumSdkContainer)
        this.sdkConfig = this.tatumSdkContainer.getConfig()
    }

    async sayHello(){
        this.mockTestExtension.sayHello()
        this.mockTestExtension.network(this.sdkConfig.network)
    }

    init(): Promise<void> {
        this.mockTestExtension.init()
        return Promise.resolve(undefined)
    }

    destroy(): void {
        this.mockTestExtension.destroy()
    }
}

export class TestWalletProvider extends TatumSdkWalletProvider {
    private readonly sdkConfig: TatumConfig

    constructor(tatumSdkContainer: ITatumSdkContainer, private readonly mockTestExtension: any) {
        super(tatumSdkContainer)
        this.sdkConfig = this.tatumSdkContainer.getConfig()
    }

    async connect(){
        this.mockTestExtension.network(this.sdkConfig.network)
        return 'connected'
    }

    init(): Promise<void> {
        this.mockTestExtension.init()
        return Promise.resolve(undefined)
    }

    destroy(): void {
        this.mockTestExtension.destroy()
    }
}
